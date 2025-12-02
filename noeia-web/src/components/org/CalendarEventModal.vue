<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X, Calendar, Clock, User, Users, AlignLeft } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  isOpen: boolean
  event?: any
  doctors: any[]
  patients: any[]
  rooms: any[]
}>()

const emit = defineEmits(['close', 'save', 'delete'])

const form = ref({
  id: null,
  type: 'Session', // Session, Meeting, Block
  title: '',
  doctorId: '',
  patientId: '',
  location: 'Online', // Online, Offline
  roomId: '',
  date: '',
  startTime: '09:00',
  endTime: '10:00',
  description: ''
})

const eventTypes = [
  { value: 'Session', label: 'Session' },
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Block', label: 'Block Time' }
]

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.event) {
      // Edit mode
      form.value = { ...props.event }
      // Ensure IDs are strings for selects
      form.value.doctorId = props.event.doctorId ? props.event.doctorId.toString() : ''
      form.value.patientId = props.event.patientId ? props.event.patientId.toString() : ''
    } else {
      // Create mode - reset form
      form.value = {
        id: null,
        type: 'Session',
        title: '',
        doctorId: '',
        patientId: '',
        location: 'Online',
        roomId: '',
        date: new Date().toISOString().split('T')[0] || '',
        startTime: '09:00',
        endTime: '10:00',
        description: ''
      }
    }
  }
})

const isSession = computed(() => form.value.type === 'Session')
const isBlock = computed(() => form.value.type === 'Block')

const filteredRooms = computed(() => {
  if (!form.value.doctorId) return []
  const doctorId = parseInt(form.value.doctorId)
  return props.rooms.filter(room => 
    room.assignedTo === 'all' || room.assignedDoctorIds.includes(doctorId)
  )
})

function save() {
  // Basic validation
  if (!form.value.doctorId || !form.value.date || !form.value.startTime || !form.value.endTime) {
    return
  }
  
  // Auto-generate title for sessions/blocks if empty
  if (!form.value.title) {
    if (isSession.value) {
      const patient = props.patients.find(p => p.id.toString() === form.value.patientId)
      form.value.title = patient ? patient.name : 'Session'
    } else if (isBlock.value) {
      form.value.title = 'Blocked'
    }
  }

  emit('save', { ...form.value })
}

function remove() {
  if (confirm('Are you sure you want to delete this event?')) {
    emit('delete', form.value.id)
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-semibold text-lg text-slate-900">
          {{ form.id ? 'Edit Event' : 'New Event' }}
        </h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-6 space-y-4">
        
        <!-- Event Type -->
        <div class="flex p-1 bg-slate-100 rounded-lg">
          <button 
            v-for="type in eventTypes" 
            :key="type.value"
            @click="form.type = type.value"
            class="flex-1 py-1.5 text-sm font-medium rounded-md transition-all"
            :class="form.type === type.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- Doctor Selection -->
        <div>
          <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Professional</label>
          <div class="relative">
            <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              v-model="form.doctorId" 
              class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
            >
              <option value="" disabled>Select Professional</option>
              <option v-for="doc in doctors" :key="doc.id" :value="doc.id.toString()">{{ doc.name }}</option>
            </select>
          </div>
        </div>

        <!-- Patient Selection (Session Only) -->
        <div v-if="isSession">
          <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Patient</label>
          <div class="relative">
            <Users class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              v-model="form.patientId" 
              class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
            >
              <option value="" disabled>Select Patient</option>
              <option v-for="patient in patients" :key="patient.id" :value="patient.id.toString()">{{ patient.name }}</option>
            </select>
          </div>
        </div>

        <!-- Location & Room (Session Only) -->
        <div v-if="isSession" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Location</label>
            <select 
              v-model="form.location" 
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div v-if="form.location === 'Offline'">
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Room</label>
            <select 
              v-model="form.roomId" 
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="" disabled>Select Room</option>
              <option v-for="room in filteredRooms" :key="room.id" :value="room.id.toString()">{{ room.number }} - {{ room.name }}</option>
            </select>
          </div>
        </div>

        <!-- Title (Meeting Only) -->
        <div v-if="!isSession && !isBlock">
          <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="Meeting Title"
            class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Date</label>
            <div class="relative">
              <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                v-model="form.date" 
                type="date" 
                class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Start</label>
            <div class="relative">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                v-model="form.startTime" 
                type="time" 
                class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">End</label>
            <div class="relative">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                v-model="form.endTime" 
                type="time" 
                class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Notes</label>
          <div class="relative">
            <AlignLeft class="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <textarea 
              v-model="form.description" 
              rows="3" 
              placeholder="Add description..."
              class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            ></textarea>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between gap-3">
        <button 
          v-if="form.id"
          @click="remove" 
          class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete
        </button>
        <div v-else></div> <!-- Spacer -->
        
        <div class="flex gap-3">
          <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Cancel</button>
          <Button @click="save">Save Event</Button>
        </div>
      </div>
    </div>
  </div>
</template>
