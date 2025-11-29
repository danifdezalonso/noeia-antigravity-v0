<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

defineProps<{
  isOpen: boolean
  selectedDate?: Date
}>()

const emit = defineEmits(['close', 'save'])
const store = useAppStore()
const { clients, professionals } = storeToRefs(store)

const form = ref({
  title: '',
  type: 'session',
  clientId: '',
  professionalId: '',
  date: '',
  time: '10:00',
  duration: '50',
  notes: ''
})

onMounted(() => {
  // Set defaults if available
  if (professionals.value && professionals.value.length > 0 && professionals.value[0]) {
    form.value.professionalId = professionals.value[0].id
  }
})

function save() {
  emit('save', { ...form.value })
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 class="text-lg font-semibold text-slate-900">New Event</h3>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
          <input 
            v-model="form.title"
            type="text" 
            placeholder="e.g. Therapy Session"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
        </div>

        <!-- Type & Professional -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <select 
              v-model="form.type"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="session">Therapy Session</option>
              <option value="consultation">Consultation</option>
              <option value="meeting">Team Meeting</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Professional</label>
            <select 
              v-model="form.professionalId"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option v-for="pro in professionals" :key="pro.id" :value="pro.id">{{ pro.name }}</option>
            </select>
          </div>
        </div>

        <!-- Client (if session) -->
        <div v-if="form.type === 'session' || form.type === 'consultation'">
          <label class="block text-sm font-medium text-slate-700 mb-1">Client</label>
          <select 
            v-model="form.clientId"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="" disabled>Select a client</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
          </select>
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-1">
            <label class="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input 
              v-model="form.date"
              type="date" 
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
          <div class="col-span-1">
            <label class="block text-sm font-medium text-slate-700 mb-1">Time</label>
            <input 
              v-model="form.time"
              type="time" 
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
          <div class="col-span-1">
            <label class="block text-sm font-medium text-slate-700 mb-1">Duration (min)</label>
            <input 
              v-model="form.duration"
              type="number" 
              step="15"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea 
            v-model="form.notes"
            rows="3"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
        <Button variant="ghost" @click="$emit('close')">Cancel</Button>
        <Button @click="save">Save Event</Button>
      </div>
    </div>
  </div>
</template>
