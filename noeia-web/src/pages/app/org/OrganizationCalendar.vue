<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Check, Plus } from 'lucide-vue-next'
import CalendarEventModal from '@/components/org/CalendarEventModal.vue'

// Mock Doctors & Colors
const doctors = [
  { id: 1, name: 'Dr. Anna Ruiz', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  { id: 2, name: 'Dr. Marc Vidal', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  { id: 3, name: 'Dr. Júlia Serra', color: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  { id: 4, name: 'Dr. Omar López', color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
]

// Mock Patients
const patients = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Michael Brown' },
  { id: 3, name: 'Emma Wilson' },
  { id: 4, name: 'David Lee' },
  { id: 5, name: 'Laura P.' },
  { id: 6, name: 'Hugo G.' },
]

// Mock Rooms
const rooms = [
  { id: 1, number: '101', name: 'Consultation A', assignedTo: 'all', assignedDoctorIds: [] },
  { id: 2, number: '102', name: 'Consultation B', assignedTo: 'specific', assignedDoctorIds: [1, 2] },
  { id: 3, number: '201', name: 'Group Therapy Room', assignedTo: 'all', assignedDoctorIds: [] },
]

const selectedDoctors = ref<number[]>([1, 2, 3, 4])

function toggleDoctor(id: number) {
  if (selectedDoctors.value.includes(id)) {
    selectedDoctors.value = selectedDoctors.value.filter(d => d !== id)
  } else {
    selectedDoctors.value.push(id)
  }
}

// Mock Events
const events = ref([
  { id: 1, doctorId: 1, type: 'Session', title: 'Laura P.', time: '10:00 - 11:00', startTime: '10:00', endTime: '11:00', day: 1, patientId: 5, location: 'Offline', roomId: 1 }, // Mon
  { id: 2, doctorId: 2, type: 'Session', title: 'Hugo G.', time: '11:30 - 12:30', startTime: '11:30', endTime: '12:30', day: 1, patientId: 6, location: 'Online', roomId: null }, // Mon
  { id: 3, doctorId: 3, type: 'Session', title: 'Carlos R.', time: '15:00 - 16:00', startTime: '15:00', endTime: '16:00', day: 2, patientId: null, location: 'Online', roomId: null }, // Tue
  { id: 4, doctorId: 4, type: 'Session', title: 'Sofía D.', time: '09:00 - 09:45', startTime: '09:00', endTime: '09:45', day: 3, patientId: null, location: 'Offline', roomId: 2 }, // Wed
  { id: 5, doctorId: 1, type: 'Meeting', title: 'Group Session', time: '17:00 - 18:00', startTime: '17:00', endTime: '18:00', day: 4, patientId: null, location: 'Offline', roomId: 3 }, // Thu
  { id: 6, doctorId: 2, type: 'Meeting', title: 'Team Meeting', time: '09:00 - 10:00', startTime: '09:00', endTime: '10:00', day: 5, patientId: null, location: 'Online', roomId: null }, // Fri
])

const weekDays = [
  { name: 'Mon', date: '23' },
  { name: 'Tue', date: '24' },
  { name: 'Wed', date: '25' },
  { name: 'Thu', date: '26' },
  { name: 'Fri', date: '27' }
]
const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const filteredEvents = computed(() => {
  return events.value.filter(event => selectedDoctors.value.includes(event.doctorId))
})

function getEventsForDayAndHour(dayIndex: number, hour: string) {
  const hourNum = parseInt(hour.split(':')[0])
  return filteredEvents.value.filter(event => {
    const eventHour = parseInt(event.startTime.split(':')[0])
    return event.day === dayIndex + 1 && eventHour === hourNum
  })
}

function getDoctorById(id: number) {
  return doctors.find(d => d.id === id)
}

// Modal Logic
const isModalOpen = ref(false)
const selectedEvent = ref<any>(null)

function openCreateModal(initialData: any = {}) {
  selectedEvent.value = null
  // Pre-fill data if provided (e.g. from drag)
  if (initialData.startTime) {
    // We need to pass this somehow to the modal, but the modal resets form on open.
    // Let's modify modal to accept initialForm state or handle it here.
    // For now, we'll just open it blank or with minimal defaults if we don't change modal.
    // Actually, let's hack it by passing a "fake" event object that looks like a new event
    selectedEvent.value = {
      ...initialData,
      id: null, // Ensure it's treated as new
      type: 'Session',
      doctorId: '',
      patientId: '',
      location: 'Online',
      roomId: '',
      title: '',
      description: ''
    }
  }
  isModalOpen.value = true
}

function openEditModal(event: any) {
  selectedEvent.value = { ...event }
  isModalOpen.value = true
}

function handleSaveEvent(eventData: any) {
  if (eventData.id) {
    // Edit
    const index = events.value.findIndex(e => e.id === eventData.id)
    if (index !== -1) {
      events.value[index] = { 
        ...eventData, 
        doctorId: parseInt(eventData.doctorId),
        patientId: eventData.patientId ? parseInt(eventData.patientId) : null,
        roomId: eventData.roomId ? parseInt(eventData.roomId) : null,
        time: `${eventData.startTime} - ${eventData.endTime}`,
        day: new Date(eventData.date).getDay() // Simplified day logic for mock
      }
    }
  } else {
    // Create
    events.value.push({
      ...eventData,
      id: Date.now(),
      doctorId: parseInt(eventData.doctorId),
      patientId: eventData.patientId ? parseInt(eventData.patientId) : null,
      roomId: eventData.roomId ? parseInt(eventData.roomId) : null,
      time: `${eventData.startTime} - ${eventData.endTime}`,
      day: new Date(eventData.date).getDay() // Simplified day logic for mock
    })
  }
  isModalOpen.value = false
}

function handleDeleteEvent(id: number) {
  events.value = events.value.filter(e => e.id !== id)
  isModalOpen.value = false
}

function getEventStyle(event: any) {
  const doctor = getDoctorById(event.doctorId)
  if (event.type === 'Block') {
    return 'bg-slate-100 text-slate-500 border-slate-200 opacity-70'
  }
  return doctor?.color
}

// Drag to Create Logic
const isDragging = ref(false)
const dragStart = ref<{ day: number, hour: string } | null>(null)
const dragEnd = ref<{ day: number, hour: string } | null>(null)

function handleMouseDown(dayIndex: number, hour: string) {
  isDragging.value = true
  dragStart.value = { day: dayIndex, hour }
  dragEnd.value = { day: dayIndex, hour }
}

function handleMouseOver(dayIndex: number, hour: string) {
  if (isDragging.value && dragStart.value) {
    // Only allow dragging within the same day for simplicity
    if (dayIndex === dragStart.value.day) {
      dragEnd.value = { day: dayIndex, hour }
    }
  }
}

function handleMouseUp() {
  if (isDragging.value && dragStart.value && dragEnd.value) {
    // Open modal with range
    const startHour = parseInt(dragStart.value.hour.split(':')[0])
    const endHour = parseInt(dragEnd.value.hour.split(':')[0])
    
    const minHour = Math.min(startHour, endHour)
    const maxHour = Math.max(startHour, endHour)
    
    const startTime = `${minHour.toString().padStart(2, '0')}:00`
    const endTime = `${(maxHour + 1).toString().padStart(2, '0')}:00`
    
    // Calculate date based on day index (Mock: Oct 23 is Mon)
    const baseDate = new Date('2023-10-23')
    baseDate.setDate(baseDate.getDate() + dragStart.value.day)
    const dateStr = baseDate.toISOString().split('T')[0]

    openCreateModal({
      date: dateStr,
      startTime,
      endTime
    })
  }
  isDragging.value = false
  dragStart.value = null
  dragEnd.value = null
}

function isSlotSelected(dayIndex: number, hour: string) {
  if (!isDragging.value || !dragStart.value || !dragEnd.value) return false
  if (dayIndex !== dragStart.value.day) return false
  
  const currentHour = parseInt(hour.split(':')[0])
  const startHour = parseInt(dragStart.value.hour.split(':')[0])
  const endHour = parseInt(dragEnd.value.hour.split(':')[0])
  
  return currentHour >= Math.min(startHour, endHour) && currentHour <= Math.max(startHour, endHour)
}
</script>

<template>
  <div class="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Calendar</h1>
        <p class="text-slate-500">Manage schedules for all professionals.</p>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
          <button class="p-1 hover:bg-slate-50 rounded-md text-slate-500">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <span class="text-sm font-medium px-2">Oct 23 - 27, 2023</span>
          <button class="p-1 hover:bg-slate-50 rounded-md text-slate-500">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
        
        <button 
          @click="openCreateModal"
          class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus class="w-4 h-4" />
          New Event
        </button>
      </div>
    </div>

    <!-- Doctor Filters -->
    <div class="flex flex-wrap gap-2 flex-shrink-0">
      <button 
        v-for="doctor in doctors" 
        :key="doctor.id"
        @click="toggleDoctor(doctor.id)"
        class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
        :class="selectedDoctors.includes(doctor.id) 
          ? 'bg-white border-slate-300 shadow-sm text-slate-900' 
          : 'bg-slate-50 border-transparent text-slate-400 opacity-60'"
      >
        <span class="w-2 h-2 rounded-full" :class="doctor.dot"></span>
        {{ doctor.name }}
        <Check v-if="selectedDoctors.includes(doctor.id)" class="w-3 h-3 ml-1 text-slate-400" />
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-0 select-none" @mouseup="handleMouseUp">
      <!-- Days Header -->
      <div class="grid grid-cols-6 border-b border-slate-200 bg-slate-50 flex-shrink-0">
        <div class="p-4 border-r border-slate-200 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Time
        </div>
        <div v-for="day in weekDays" :key="day.name" class="p-3 border-r border-slate-200 last:border-r-0 text-center">
          <div class="text-sm font-semibold text-slate-700">{{ day.name }}</div>
          <div class="text-xs text-slate-500">{{ day.date }}</div>
        </div>
      </div>

      <!-- Time Slots -->
      <div class="overflow-y-auto flex-1">
        <div v-for="hour in hours" :key="hour" class="grid grid-cols-6 border-b border-slate-100 last:border-b-0 min-h-[40px]">
          <!-- Time Column -->
          <div class="p-2 border-r border-slate-200 text-xs text-slate-500 text-center sticky left-0 bg-white h-[40px] flex items-center justify-center">
            {{ hour }}
          </div>
          
          <!-- Day Columns -->
          <div 
            v-for="(day, index) in weekDays" 
            :key="day.name" 
            class="border-r border-slate-100 last:border-r-0 relative p-0.5 group h-[40px]"
            @mousedown="handleMouseDown(index, hour)"
            @mouseover="handleMouseOver(index, hour)"
          >
            <!-- Drag Selection Highlight -->
            <div 
              v-if="isSlotSelected(index, hour)"
              class="absolute inset-0 bg-primary-100 opacity-50 z-0 pointer-events-none"
            ></div>

            <!-- Events -->
            <div 
              v-for="event in getEventsForDayAndHour(index, hour)" 
              :key="event.id"
              @click.stop="openEditModal(event)"
              class="absolute inset-x-0.5 p-1 rounded border text-[10px] cursor-pointer hover:shadow-md transition-shadow z-10 overflow-hidden"
              :class="getEventStyle(event)"
              :style="{ top: '2px', height: 'calc(100% - 4px)' }"
            >
              <div class="font-semibold truncate">{{ event.title }}</div>
              <div v-if="event.type !== 'Block'" class="mt-0.5 flex items-center gap-1 opacity-75">
                <span class="w-1 h-1 rounded-full bg-current"></span>
                <span class="truncate">{{ getDoctorById(event.doctorId)?.name.split(' ')[1] }}</span>
              </div>
            </div>
            
            <!-- Hover Effect -->
            <div class="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>

    <CalendarEventModal
      :is-open="isModalOpen"
      :event="selectedEvent"
      :doctors="doctors"
      :patients="patients"
      :rooms="rooms"
      @close="isModalOpen = false"
      @save="handleSaveEvent"
      @delete="handleDeleteEvent"
    />
  </div>
</template>
