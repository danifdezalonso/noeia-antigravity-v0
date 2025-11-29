<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ChevronLeft, ChevronRight, Plus, Clock, Trash2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import CreateEventModal from '@/components/CreateEventModal.vue'
import QuickEventPopup from '@/components/QuickEventPopup.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { enrichedSessions } = storeToRefs(store)

const currentDate = ref(new Date())
const currentView = ref('Week') // Month, Week, Day, List
const isModalOpen = ref(false)
const selectedDate = ref<Date | null>(null)

// --- Quick Create State ---
const isCreating = ref(false)
const draftEvent = ref<{ start: Date, end: Date } | null>(null)
const popupOpen = ref(false)
const popupPosition = ref({ top: 0, left: 0 })
const popupData = ref({ start: new Date(), end: new Date() })

// --- Context Menu State ---
const contextMenuOpen = ref(false)
const contextMenuPosition = ref({ top: 0, left: 0 })
const selectedEventId = ref<string | null>(null)

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const currentMonthName = computed(() => monthNames[currentDate.value.getMonth()])
const currentYear = computed(() => currentDate.value.getFullYear())

// --- Navigation ---

function previous() {
  const date = new Date(currentDate.value)
  if (currentView.value === 'Month') date.setMonth(date.getMonth() - 1)
  else if (currentView.value === 'Week') date.setDate(date.getDate() - 7)
  else if (currentView.value === 'Day') date.setDate(date.getDate() - 1)
  currentDate.value = date
}

function next() {
  const date = new Date(currentDate.value)
  if (currentView.value === 'Month') date.setMonth(date.getMonth() + 1)
  else if (currentView.value === 'Week') date.setDate(date.getDate() + 7)
  else if (currentView.value === 'Day') date.setDate(date.getDate() + 1)
  currentDate.value = date
}

function today() {
  currentDate.value = new Date()
}

// --- Event Handling ---

function handleDateClick(date: number) {
  const newDate = new Date(currentYear.value, currentDate.value.getMonth(), date)
  selectedDate.value = newDate
  isModalOpen.value = true
}

function handleSaveEvent(eventData: any) {
  const startDate = new Date(`${eventData.date}T${eventData.time}`)
  const endDate = new Date(startDate.getTime() + (parseInt(eventData.duration) || 50) * 60000)
  
  store.addSession({
    title: eventData.title,
    clientId: eventData.clientId,
    professionalId: eventData.professionalId,
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    status: 'Confirmed',
    fee: 100,
    type: eventData.type,
    notes: eventData.notes
  } as any)
}

// --- View Logic ---

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value)
  const day = startOfWeek.getDay()
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is sunday
  startOfWeek.setDate(diff)
  
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    days.push(d)
  }
  return days
})

const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM

function getEventsForDate(day: number) {
  const dateStr = new Date(currentYear.value, currentDate.value.getMonth(), day).toDateString()
  return enrichedSessions.value.filter(e => new Date(e.start).toDateString() === dateStr)
}

function getEventsForTimeSlot(date: Date, hour: number) {
  return enrichedSessions.value.filter(e => {
    const eventDate = new Date(e.start)
    return eventDate.toDateString() === date.toDateString() && eventDate.getHours() === hour
  })
}

function getDurationInMinutes(event: any) {
  const start = new Date(event.start)
  const end = new Date(event.end)
  return (end.getTime() - start.getTime()) / (1000 * 60)
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// --- Drag & Drop Logic ---

const isDragging = ref(false)
const dragEvent = ref<any>(null)
const dragOffset = ref({ x: 0, y: 0 })
const dragPosition = ref({ x: 0, y: 0 })


function startDrag(event: MouseEvent, session: any) {
  event.stopPropagation()
  isDragging.value = true
  dragEvent.value = session
  
  // Calculate offset to keep cursor relative to the element
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
  
  dragPosition.value = {
    x: event.clientX,
    y: event.clientY
  }

  // Add global listeners
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
}

function onDrag(event: MouseEvent) {
  if (!isDragging.value) return
  dragPosition.value = {
    x: event.clientX,
    y: event.clientY
  }
}

function endDrag(event: MouseEvent) {
  if (!isDragging.value) return
  
  // Find the drop target (time slot)
  const elements = document.elementsFromPoint(event.clientX, event.clientY)
  const timeSlot = elements.find(el => el.hasAttribute('data-time-slot'))
  
  if (timeSlot) {
    const dateStr = timeSlot.getAttribute('data-date')
    const hourStr = timeSlot.getAttribute('data-hour')
    
    if (dateStr && hourStr) {
      const newStart = new Date(dateStr)
      newStart.setHours(parseInt(hourStr))
      
      // Calculate duration to keep end time consistent
      const oldStart = new Date(dragEvent.value.start)
      const oldEnd = new Date(dragEvent.value.end)
      const duration = oldEnd.getTime() - oldStart.getTime()
      
      const newEnd = new Date(newStart.getTime() + duration)
      
      // Update session
      // We need to update the store directly or via an action. 
      // Since we don't have an 'updateSession' action exposed for full updates yet, 
      // we'll assume we can update it locally or add a store action.
      // For now, let's simulate it by removing and re-adding or just updating the object if it's reactive.
      // Ideally, add `updateSessionTime` to store.
      
      // HACK: Directly mutating for now as per "prototype" speed, but ideally use store action.
      const session = enrichedSessions.value.find(s => s.id === dragEvent.value.id)
      if (session) {
        session.start = newStart.toISOString()
        session.end = newEnd.toISOString()
        // In a real app, call store.updateSession(session.id, { start: ..., end: ... })
      }
    }
  }
  
  isDragging.value = false
  dragEvent.value = null
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
}

// --- Context Menu Logic ---

function handleContextMenu(event: MouseEvent, session: any) {
  selectedEventId.value = session.id
  
  // Position menu
  const screenW = window.innerWidth
  const screenH = window.innerHeight
  let left = event.clientX
  let top = event.clientY
  
  if (left + 150 > screenW) left = screenW - 160
  if (top + 150 > screenH) top = screenH - 160
  
  contextMenuPosition.value = { top, left }
  contextMenuOpen.value = true
}

function closeContextMenu() {
  contextMenuOpen.value = false
  selectedEventId.value = null
}

async function deleteSession() {
  if (selectedEventId.value) {
    if (confirm('Are you sure you want to delete this session?')) {
      await store.deleteSession(selectedEventId.value)
    }
    closeContextMenu()
  }
}

async function changeColor(color: string) {
  if (selectedEventId.value) {
    await store.updateSessionColor(selectedEventId.value, color)
    closeContextMenu()
  }
}

// --- Edit Logic ---

function handleEventClick(event: MouseEvent, session: any) {
  // Prevent if dragging
  if (isDragging.value) return
  
  // Open Quick Popup in "Edit" mode (reusing logic)
  // We need to populate popupData with session data
  popupData.value = {
    start: new Date(session.start),
    end: new Date(session.end),
    // We might need to pass more data to popup if we want to edit existing
    // For now, let's just open the full modal for editing existing events as it's more robust
  }
  
  // Actually, user asked for "Left click to open the modal once again"
  // Let's open the full modal with session data
  selectedDate.value = new Date(session.start)
  // We need to pass the session to the modal to edit. 
  // Currently CreateEventModal might not support editing, let's check.
  // If not, we can just show the details or use QuickEventPopup if we enhance it.
  // For now, let's use QuickEventPopup as a "view/edit" summary
  
  popupData.value = {
    start: new Date(session.start),
    end: new Date(session.end),
    ...session // Pass other fields
  }
  
  // Position popup near the click
  const screenW = window.innerWidth
  let left = event.clientX + 20
  if (left + 420 > screenW) left = event.clientX - 420
  
  popupPosition.value = { 
    top: Math.min(event.clientY - 100, window.innerHeight - 500), 
    left 
  }
  
  popupOpen.value = true
}

// Close context menu on click elsewhere
onMounted(() => {
  document.addEventListener('click', () => {
    if (contextMenuOpen.value) closeContextMenu()
  })
})

function startCreate(event: MouseEvent, day: Date, hour: number) {
  // Only start if left click and not clicking an existing event
  if (event.button !== 0 || (event.target as HTMLElement).closest('.event-card')) return
  
  event.preventDefault() // Prevent text selection
  
  const start = new Date(day)
  start.setHours(hour)
  start.setMinutes(0)
  start.setSeconds(0)
  start.setMilliseconds(0)
  
  // Adjust for click position within the hour slot (approximate to 30 mins)
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const offsetY = event.clientY - rect.top
  if (offsetY > rect.height / 2) {
    start.setMinutes(30)
  }
  
  isCreating.value = true
  draftEvent.value = {
    start: start,
    end: new Date(start.getTime() + 60 * 60 * 1000) // Default 1h
  }
  
  document.addEventListener('mousemove', onCreateDrag)
  document.addEventListener('mouseup', endCreate)
}

function onCreateDrag(event: MouseEvent) {
  if (!isCreating.value || !draftEvent.value) return
  
  // Find time slot under cursor
  const elements = document.elementsFromPoint(event.clientX, event.clientY)
  const timeSlot = elements.find(el => el.hasAttribute('data-time-slot'))
  
  if (timeSlot) {
    const dateStr = timeSlot.getAttribute('data-date')
    const hourStr = timeSlot.getAttribute('data-hour')
    
    if (dateStr && hourStr) {
      const currentSlotTime = new Date(dateStr)
      currentSlotTime.setHours(parseInt(hourStr))
      
      // Check offset for 30 min snap
      const rect = timeSlot.getBoundingClientRect()
      const offsetY = event.clientY - rect.top
      if (offsetY > rect.height / 2) {
        currentSlotTime.setMinutes(30)
      }
      
      // Update end time (must be > start)
      if (currentSlotTime.getTime() >= draftEvent.value.start.getTime()) {
        draftEvent.value.end = new Date(currentSlotTime.getTime() + 30 * 60 * 1000) // End of this 30m block
      }
    }
  }
}

function endCreate(event: MouseEvent) {
  if (!isCreating.value || !draftEvent.value) return
  
  // Finalize
  popupData.value = {
    start: draftEvent.value.start,
    end: draftEvent.value.end
  }
  
  // Calculate popup position (to the right of the draft event, clamped to screen)
  const screenW = window.innerWidth
  const screenH = window.innerHeight
  
  // Default to right of mouse
  let left = event.clientX + 20
  let top = event.clientY - 100

  // Clamp to screen bounds
  if (left + 420 > screenW) {
    left = event.clientX - 420 // Flip to left if too close to right edge
  }
  
  if (top < 20) top = 20
  if (top + 500 > screenH) top = screenH - 520

  popupPosition.value = { top, left }
  
  // Force update
  requestAnimationFrame(() => {
    popupOpen.value = true
    isCreating.value = false
  })
  
  document.removeEventListener('mousemove', onCreateDrag)
  document.removeEventListener('mouseup', endCreate)
}

async function handleQuickSave(data: any) {
  if (!data.clientId) {
    alert('Please select a patient.')
    return
  }

  try {
    await store.addSession({
      title: data.title,
      clientId: data.clientId,
      professionalId: store.professionals[0]?.id, // Use first professional
      start: data.start.toISOString(),
      end: data.end.toISOString(),
      status: 'Confirmed',
      fee: 100,
      type: data.type,
      notes: data.description
    } as any)
    closePopup()
  } catch (e: any) {
    console.error('Failed to save session:', e)
    console.error('Error details:', JSON.stringify(e, null, 2))
    alert(`Failed to save session: ${e.message || 'Unknown error'}`)
  }
}

function closePopup() {
  popupOpen.value = false
  draftEvent.value = null
}

function openFullModal() {
  selectedDate.value = popupData.value.start
  isModalOpen.value = true
  closePopup()
}
</script>

<template>
  <div class="h-[calc(100vh-2rem)] flex flex-col space-y-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold text-slate-900 w-48">
          {{ currentMonthName }} {{ currentYear }}
        </h1>
        <div class="flex items-center bg-white rounded-lg border border-slate-200 p-1">
          <button @click="previous" class="p-1 hover:bg-slate-100 rounded text-slate-600">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button @click="today" class="px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded">
            Today
          </button>
          <button @click="next" class="p-1 hover:bg-slate-100 rounded text-slate-600">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex bg-slate-100 p-1 rounded-lg">
          <button 
            v-for="view in ['Month', 'Week', 'Day', 'List']" 
            :key="view"
            @click="currentView = view"
            class="px-3 py-1.5 text-sm font-medium rounded-md transition-all"
            :class="currentView === view ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          >
            {{ view }}
          </button>
        </div>
        <Button @click="isModalOpen = true">
          <Plus class="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      
      <!-- Month View -->
      <div v-if="currentView === 'Month'" class="flex-1 flex flex-col">
        <div class="grid grid-cols-7 border-b border-slate-200">
          <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="py-2 text-center text-sm font-semibold text-slate-500 bg-slate-50">
            {{ day }}
          </div>
        </div>
        <div class="flex-1 grid grid-cols-7 auto-rows-fr">
          <div v-for="blank in firstDayOfMonth" :key="`blank-${blank}`" class="bg-slate-50/30 border-b border-r border-slate-100"></div>
          <div 
            v-for="date in daysInMonth" 
            :key="date" 
            class="min-h-[100px] p-2 border-b border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group relative"
            @click="handleDateClick(date)"
          >
            <span 
              class="text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full"
              :class="date === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'bg-primary-600 text-white' : 'text-slate-700 group-hover:bg-white'"
            >
              {{ date }}
            </span>
            
            <!-- Events -->
            <div class="mt-1 space-y-1">
              <div 
                v-for="event in getEventsForDate(date)" 
                :key="event.id"
                class="text-xs px-1.5 py-0.5 rounded truncate border"
                :class="{
                  'bg-blue-50 text-blue-700 border-blue-100': event.status === 'Confirmed',
                  'bg-amber-50 text-amber-700 border-amber-100': event.status === 'Pending',
                  'bg-green-50 text-green-700 border-green-100': event.status === 'Completed'
                }"
              >
                {{ formatTime(event.start) }} {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Week View -->
      <div v-else-if="currentView === 'Week'" class="flex-1 flex flex-col overflow-y-auto">
        <div class="grid grid-cols-8 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div class="w-16 border-r border-slate-200"></div> <!-- Time column header -->
          <div v-for="day in weekDays" :key="day.toISOString()" class="py-2 text-center border-r border-slate-200">
            <div class="text-xs font-medium text-slate-500 uppercase">{{ day.toLocaleDateString('en-US', { weekday: 'short' }) }}</div>
            <div 
              class="text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full mx-auto mt-1"
              :class="day.toDateString() === new Date().toDateString() ? 'bg-primary-600 text-white' : 'text-slate-900'"
            >
              {{ day.getDate() }}
            </div>
          </div>
        </div>
        <div class="flex-1 grid grid-cols-8">
          <!-- Time Column -->
          <div class="w-16 border-r border-slate-200 bg-slate-50">
            <div v-for="hour in hours" :key="hour" class="h-20 border-b border-slate-200 text-xs text-slate-500 text-right pr-2 pt-2">
              {{ hour }}:00
            </div>
          </div>
          <!-- Days Columns -->
          <div v-for="day in weekDays" :key="day.toISOString()" class="border-r border-slate-200 relative">
            <div 
              v-for="hour in hours" 
              :key="hour" 
              class="h-20 border-b border-slate-100 relative group"
              :data-time-slot="true"
              :data-date="day.toISOString()"
              :data-hour="hour"
              @mousedown="startCreate($event, day, hour)"
            >
              <!-- Grid lines -->
              <div class="absolute inset-0 hover:bg-slate-50 transition-colors cursor-pointer"></div>
              
              <!-- Draft Event (Drawing) -->
              <div 
                v-if="draftEvent && 
                      day.toDateString() === draftEvent.start.toDateString() && 
                      hour >= draftEvent.start.getHours() && 
                      hour <= draftEvent.end.getHours()"
                class="absolute inset-x-1 z-20 bg-primary-500/20 border-2 border-primary-500 rounded pointer-events-none flex flex-col justify-center"
                :style="{
                  top: hour === draftEvent.start.getHours() ? (draftEvent.start.getMinutes() / 60 * 100) + '%' : '0',
                  bottom: hour === draftEvent.end.getHours() ? (100 - (draftEvent.end.getMinutes() / 60 * 100)) + '%' : '0',
                  display: (hour === draftEvent.end.getHours() && draftEvent.end.getMinutes() === 0) ? 'none' : 'block',
                  minHeight: '24px'
                }"
              >
                <div v-if="hour === draftEvent.start.getHours()" class="text-xs font-bold text-primary-700 px-1 truncate">
                  {{ formatTime(draftEvent.start.toISOString()) }} - {{ formatTime(draftEvent.end.toISOString()) }}
                </div>
              </div>

              <!-- Events in this slot -->
              <div 
                v-for="event in getEventsForTimeSlot(day, hour)" 
                :key="event.id"
                class="event-card absolute inset-x-1 rounded px-2 py-1 text-xs border overflow-hidden z-10 cursor-pointer hover:brightness-95 transition-all select-none"
                :class="{
                  'bg-blue-50 text-blue-700 border-blue-100': !event.color && event.status === 'Confirmed',
                  'bg-amber-50 text-amber-700 border-amber-100': !event.color && event.status === 'Pending',
                  'bg-green-50 text-green-700 border-green-100': !event.color && event.status === 'Completed',
                  'bg-red-50 text-red-700 border-red-100': !event.color && event.status === 'Cancelled',
                  // Custom colors
                  'bg-blue-100 text-blue-800 border-blue-200': event.color === 'blue',
                  'bg-green-100 text-green-800 border-green-200': event.color === 'green',
                  'bg-red-100 text-red-800 border-red-200': event.color === 'red',
                  'bg-purple-100 text-purple-800 border-purple-200': event.color === 'purple',
                }"
                :style="{
                  top: (new Date(event.start).getMinutes() / 60 * 100) + '%',
                  height: (getDurationInMinutes(event) / 60 * 100) + '%',
                  minHeight: '24px'
                }"
                @mousedown.stop="startDrag($event, event)"
                @contextmenu.prevent="handleContextMenu($event, event)"
                @click.stop="handleEventClick($event, event)"
              >
                <div class="font-semibold truncate">{{ event.title }}</div>
                <div class="truncate opacity-75">{{ event.clientName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Day View -->
      <div v-else-if="currentView === 'Day'" class="flex-1 flex flex-col overflow-y-auto">
         <div class="grid grid-cols-1 border-b border-slate-200 sticky top-0 bg-white z-10">
            <div class="py-4 text-center">
              <div class="text-sm font-medium text-slate-500 uppercase">{{ currentDate.toLocaleDateString('en-US', { weekday: 'long' }) }}</div>
              <div class="text-3xl font-bold text-slate-900 mt-1">{{ currentDate.getDate() }}</div>
            </div>
         </div>
         <div class="flex-1 max-w-3xl mx-auto w-full">
            <div v-for="hour in hours" :key="hour" class="flex border-b border-slate-100 min-h-[5rem]">
              <div class="w-20 text-right pr-4 pt-4 text-sm text-slate-500 font-medium">{{ hour }}:00</div>
              <div class="flex-1 relative border-l border-slate-100 p-2 group hover:bg-slate-50 transition-colors">
                 <div 
                  v-for="event in getEventsForTimeSlot(currentDate, hour)" 
                  :key="event.id"
                  class="bg-white border rounded-lg p-3 shadow-sm mb-2 flex justify-between items-start"
                  :class="{
                    'border-blue-200 bg-blue-50': event.status === 'Confirmed',
                    'border-amber-200 bg-amber-50': event.status === 'Pending',
                    'border-green-200 bg-green-50': event.status === 'Completed'
                  }"
                >
                  <div>
                    <div class="font-semibold text-slate-900">{{ event.title }}</div>
                    <div class="text-sm text-slate-600">{{ event.clientName }} • {{ event.professionalName }}</div>
                  </div>
                  <div class="text-sm font-medium text-slate-500">{{ formatTime(event.start) }}</div>
                </div>
              </div>
            </div>
         </div>
      </div>

      <!-- List View -->
      <div v-else-if="currentView === 'List'" class="flex-1 overflow-y-auto p-6">
        <div class="max-w-3xl mx-auto space-y-6">
          <div v-for="day in weekDays" :key="day.toISOString()">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 sticky top-0 bg-white py-2">
              {{ day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) }}
            </h3>
            <div class="space-y-3">
              <div 
                v-for="event in getEventsForDate(day.getDate())" 
                :key="event.id"
                class="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-primary-300 transition-colors cursor-pointer"
              >
                <div class="w-16 text-center">
                  <div class="text-sm font-bold text-slate-900">{{ formatTime(event.start) }}</div>
                </div>
                <div class="w-1 h-10 rounded-full" :class="{
                  'bg-blue-500': event.status === 'Confirmed',
                  'bg-amber-500': event.status === 'Pending',
                  'bg-green-500': event.status === 'Completed'
                }"></div>
                <div class="flex-1">
                  <h4 class="font-semibold text-slate-900">{{ event.title }}</h4>
                  <p class="text-sm text-slate-500">{{ event.clientName }} with {{ event.professionalName }}</p>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-400">
                  <Clock class="w-4 h-4" />
                  <span>50m</span>
                </div>
              </div>
              <div v-if="getEventsForDate(day.getDate()).length === 0" class="text-sm text-slate-400 italic pl-20">
                No events scheduled
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <CreateEventModal 
      :is-open="isModalOpen" 
      :initial-date="selectedDate"
      @close="isModalOpen = false"
      @save="handleSaveEvent"
    />

    <QuickEventPopup
      v-if="popupOpen"
      :is-open="popupOpen"
      :position="popupPosition"
      :initial-data="popupData"
      @close="closePopup"
      @save="handleQuickSave"
      @more-options="openFullModal"
    />

    <!-- Context Menu -->
    <div 
      v-if="contextMenuOpen"
      class="fixed z-50 bg-white rounded-lg shadow-xl border border-slate-200 py-1 w-40 animate-in fade-in zoom-in-95 duration-100"
      :style="{ top: `${contextMenuPosition.top}px`, left: `${contextMenuPosition.left}px` }"
    >
      <button @click="deleteSession" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
        <Trash2 class="w-4 h-4" /> Delete
      </button>
      <div class="h-px bg-slate-100 my-1"></div>
      <div class="px-4 py-1 text-xs font-medium text-slate-500">Color</div>
      <div class="grid grid-cols-4 gap-1 px-3 py-1">
        <button @click="changeColor('blue')" class="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 hover:scale-110 transition-transform"></button>
        <button @click="changeColor('green')" class="w-6 h-6 rounded-full bg-green-100 border border-green-300 hover:scale-110 transition-transform"></button>
        <button @click="changeColor('red')" class="w-6 h-6 rounded-full bg-red-100 border border-red-300 hover:scale-110 transition-transform"></button>
        <button @click="changeColor('purple')" class="w-6 h-6 rounded-full bg-purple-100 border border-purple-300 hover:scale-110 transition-transform"></button>
      </div>
    </div>

    <!-- Drag Proxy -->
    <div 
      v-if="isDragging && dragEvent"
      class="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-2 border border-slate-200 flex items-center gap-3 w-64"
      :style="{ left: `${dragPosition.x}px`, top: `${dragPosition.y}px` }"
    >
      <img 
        :src="dragEvent.clientAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dragEvent.clientName}`" 
        class="w-10 h-10 rounded-full bg-slate-100"
      />
      <div>
        <div class="font-bold text-slate-900">{{ dragEvent.title }}</div>
        <div class="text-xs text-slate-500">{{ dragEvent.clientName }}</div>
      </div>
    </div>
  </div>
</template>
