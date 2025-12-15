<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Calendar, Clock, User, Users, AlignLeft, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

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
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ form.id ? 'Edit Event' : 'New Event' }}</DialogTitle>
        <DialogDescription>
          Fill in the details for this calendar event.
        </DialogDescription>
      </DialogHeader>
      
      <div class="grid gap-4 py-4">
        
        <!-- Event Type -->
        <div class="flex p-1 bg-muted rounded-lg">
          <button 
            v-for="type in eventTypes" 
            :key="type.value"
            @click="form.type = type.value"
            class="flex-1 py-1.5 text-sm font-medium rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="form.type === type.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- Doctor Selection -->
        <div class="space-y-2">
          <Label>Professional</Label>
          <div class="relative">
            <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Select v-model="form.doctorId">
              <SelectTrigger class="pl-9 w-full">
                <SelectValue placeholder="Select Professional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="doc in doctors" :key="doc.id" :value="doc.id.toString()">
                  {{ doc.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Patient Selection (Session Only) -->
        <div v-if="isSession" class="space-y-2">
          <Label>Patient</Label>
          <div class="relative">
            <Users class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Select v-model="form.patientId">
              <SelectTrigger class="pl-9 w-full">
                <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="patient in patients" :key="patient.id" :value="patient.id.toString()">
                  {{ patient.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Location & Room (Session Only) -->
        <div v-if="isSession" class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label>Location</Label>
            <Select v-model="form.location">
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div v-if="form.location === 'Offline'" class="space-y-2">
            <Label>Room</Label>
            <Select v-model="form.roomId">
              <SelectTrigger>
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="room in filteredRooms" :key="room.id" :value="room.id.toString()">
                  {{ room.number }} - {{ room.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Title (Meeting Only) -->
        <div v-if="!isSession && !isBlock" class="space-y-2">
          <Label>Title</Label>
          <Input 
            v-model="form.title" 
            placeholder="Meeting Title"
          />
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2 space-y-2">
            <Label>Date</Label>
            <div class="relative">
              <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                v-model="form.date" 
                type="date" 
                class="pl-9"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label>Start</Label>
            <div class="relative">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                v-model="form.startTime" 
                type="time" 
                class="pl-9"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label>End</Label>
            <div class="relative">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                v-model="form.endTime" 
                type="time" 
                class="pl-9"
              />
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <Label>Notes</Label>
          <div class="relative">
            <AlignLeft class="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea 
              v-model="form.description" 
              rows="3" 
              placeholder="Add description..."
              class="pl-9 resize-none"
            />
          </div>
        </div>

      </div>

      <DialogFooter class="flex flex-row justify-between sm:justify-between w-full gap-2">
         <Button 
          v-if="form.id"
          variant="destructive"
          @click="remove" 
          type="button"
        >
          <Trash2 class="w-4 h-4 mr-2" />
          Delete
        </Button>
        <div v-else class="flex-1"></div> <!-- Spacer for new events -->
        
        <div class="flex gap-2">
          <Button variant="outline" @click="$emit('close')">Cancel</Button>
          <Button @click="save">Save Event</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
