<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'save'])

const form = ref({
  professional: '',
  name: '',
  email: '',
  phone: '',
  relatedPatient: '',
  relationType: ''
})

// Mock Professionals
const professionals = [
  { id: 1, name: 'Dr. Smith' },
  { id: 2, name: 'Dr. Jones' },
]

// Mock Patients for linking
const patients = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Michael Chen' },
]

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
        <h3 class="text-lg font-semibold text-slate-900">New Patient</h3>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- Professional -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Professional</label>
          <select 
            v-model="form.professional"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="" disabled>Select professional</option>
            <option v-for="pro in professionals" :key="pro.id" :value="pro.name">{{ pro.name }}</option>
          </select>
        </div>

        <!-- Patient Name -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Patient name</label>
          <input 
            v-model="form.name"
            type="text" 
            placeholder="e.g. Jane Doe"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="jane@example.com"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Phone (optional)</label>
          <input 
            v-model="form.phone"
            type="tel" 
            placeholder="+34 600 000 000"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
        </div>

        <!-- Link to patient -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Link to patient</label>
          <div class="flex gap-2">
            <select 
              v-model="form.relatedPatient"
              class="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="">None</option>
              <option v-for="patient in patients" :key="patient.id" :value="patient.name">{{ patient.name }}</option>
            </select>
            <select 
              v-if="form.relatedPatient"
              v-model="form.relationType"
              class="w-1/3 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="" disabled>Relation</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Partner">Partner</option>
              <option value="Sibling">Sibling</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
        <Button variant="ghost" @click="$emit('close')">Cancel</Button>
        <Button @click="save">Save</Button>
      </div>
    </div>
  </div>
</template>
