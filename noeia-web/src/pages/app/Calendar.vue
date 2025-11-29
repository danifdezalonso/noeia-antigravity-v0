<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import CreateEventModal from '@/components/CreateEventModal.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { enrichedSessions } = storeToRefs(store)

const currentDate = ref(new Date())
const currentView = ref('Month') // Month, Week, Day, List
const isModalOpen = ref(false)
const selectedDate = ref<Date | null>(null)

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
  store.addSession({
    title: eventData.title,
    clientId: eventData.clientId,
    professionalId: eventData.professionalId,
    start: `${eventData.date}T${eventData.time}`,
    end: `${eventData.date}T${eventData.time}`, // Should calc duration based on eventData.duration
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

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
            <div v-for="hour in hours" :key="hour" class="h-20 border-b border-slate-100 relative group">
              <!-- Grid lines -->
              <div class="absolute inset-0 hover:bg-slate-50 transition-colors cursor-pointer" @click="handleDateClick(day.getDate())"></div>
              
              <!-- Events in this slot -->
              <div 
                v-for="event in getEventsForTimeSlot(day, hour)" 
                :key="event.id"
                class="absolute inset-x-1 top-1 bottom-1 rounded px-2 py-1 text-xs border overflow-hidden z-10 cursor-pointer hover:brightness-95 transition-all"
                :class="{
                  'bg-blue-50 text-blue-700 border-blue-100': event.status === 'Confirmed',
                  'bg-amber-50 text-amber-700 border-amber-100': event.status === 'Pending',
                  'bg-green-50 text-green-700 border-green-100': event.status === 'Completed'
                }"
              >
                <div class="font-semibold">{{ event.title }}</div>
                <div>{{ formatTime(event.start) }} - {{ event.clientName }}</div>
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
  </div>
</template>
