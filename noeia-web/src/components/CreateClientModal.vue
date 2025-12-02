<script setup lang="ts">
import { ref } from 'vue'
import { X, User, Mail, Phone, MapPin, Calendar, FileText, Tag, Shield, Link as LinkIcon, AlertCircle } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'save'])

// Form State
const form = ref({
  name: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  professional: '',
  hasInsurance: false,
  insuranceProvider: '',
  policyNumber: '',
  notes: '',
  tags: '', // Comma separated string for simplicity in this version
  isLinked: false,
  linkedPatientId: '',
  relationType: ''
})

// Validation State
const errors = ref<Record<string, string>>({})

// Mock Data
const professionals = [
  { id: 1, name: 'Dr. Sarah Smith' },
  { id: 2, name: 'Dr. Michael Jones' },
  { id: 3, name: 'Dr. Emily Chen' },
]

const existingPatients = [
  { id: '1', name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Robert Johnson' },
]

const insuranceProviders = [
  'Sanitas', 'Adeslas', 'Mapfre', 'DKV', 'Asisa'
]

const relationTypes = [
  'Parent', 'Child', 'Partner', 'Sibling', 'Other'
]

// Methods
function validate() {
  errors.value = {}
  let isValid = true

  if (!form.value.name) {
    errors.value.name = 'Name is required'
    isValid = false
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
    isValid = false
  }

  if (!form.value.dob) {
    errors.value.dob = 'Date of birth is required'
    isValid = false
  }

  if (form.value.hasInsurance && !form.value.insuranceProvider) {
    errors.value.insuranceProvider = 'Provider is required'
    isValid = false
  }
  
  if (form.value.hasInsurance && !form.value.policyNumber) {
    errors.value.policyNumber = 'Policy number is required'
    isValid = false
  }

  if (form.value.isLinked && !form.value.linkedPatientId) {
    errors.value.linkedPatientId = 'Patient is required'
    isValid = false
  }

  return isValid
}

function save() {
  if (!validate()) return

  // Process tags
  const tagsArray = form.value.tags.split(',').map(t => t.trim()).filter(t => t)

  emit('save', {
    ...form.value,
    tags: tagsArray,
    patient_id: crypto.randomUUID() // Internal ID
  })
  emit('close')
  
  // Reset form (optional, or rely on parent to destroy/re-create)
  // resetForm()
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <!-- Modal Container -->
    <div class="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Fixed Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white rounded-t-xl z-10">
        <div>
          <h3 class="text-xl font-bold text-slate-900">New Patient</h3>
          <p class="text-sm text-slate-500">Add a new patient record to the system.</p>
        </div>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-8">
        
        <!-- Section: Personal Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <User class="w-4 h-4 text-primary-500" /> Personal Information
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Full Name <span class="text-red-500">*</span></label>
              <input 
                v-model="form.name"
                type="text" 
                placeholder="e.g. Jane Doe"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                :class="errors.name ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
              >
              <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Email <span class="text-red-500">*</span></label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="jane@example.com"
                  class="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
              </div>
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <div class="relative">
                <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+34 600 000 000"
                  class="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
              </div>
            </div>

            <!-- Date of Birth -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Date of Birth <span class="text-red-500">*</span></label>
              <div class="relative">
                <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.dob"
                  type="date" 
                  class="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.dob ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
              </div>
              <p v-if="errors.dob" class="mt-1 text-xs text-red-500">{{ errors.dob }}</p>
            </div>

            <!-- Address -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <div class="relative">
                <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.address"
                  type="text" 
                  placeholder="Street address, City, Zip"
                  class="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
              </div>
            </div>
          </div>
        </div>

        <hr class="border-slate-100" />

        <!-- Section: Professional & Insurance -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Shield class="w-4 h-4 text-primary-500" /> Professional & Insurance
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Professional -->
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-medium text-slate-700 mb-1">Assigned Professional</label>
              <select 
                v-model="form.professional"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="" disabled>Select a doctor</option>
                <option v-for="pro in professionals" :key="pro.id" :value="pro.name">{{ pro.name }}</option>
              </select>
            </div>

            <!-- Insurance Toggle -->
            <div class="col-span-2">
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div class="flex items-center gap-2">
                  <Shield class="w-5 h-5 text-slate-500" />
                  <span class="text-sm font-medium text-slate-700">Has Insurance?</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="form.hasInsurance" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <!-- Insurance Details -->
            <template v-if="form.hasInsurance">
              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-slate-700 mb-1">Provider <span class="text-red-500">*</span></label>
                <select 
                  v-model="form.insuranceProvider"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  :class="errors.insuranceProvider ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                  <option value="" disabled>Select provider</option>
                  <option v-for="prov in insuranceProviders" :key="prov" :value="prov">{{ prov }}</option>
                </select>
                <p v-if="errors.insuranceProvider" class="mt-1 text-xs text-red-500">{{ errors.insuranceProvider }}</p>
              </div>
              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-slate-700 mb-1">Policy Number <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.policyNumber"
                  type="text" 
                  placeholder="e.g. 123456789"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  :class="errors.policyNumber ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                <p v-if="errors.policyNumber" class="mt-1 text-xs text-red-500">{{ errors.policyNumber }}</p>
              </div>
            </template>
          </div>
        </div>

        <hr class="border-slate-100" />

        <!-- Section: Additional Info -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText class="w-4 h-4 text-primary-500" /> Additional Details
          </h4>

          <!-- Link to Patient -->
          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <LinkIcon class="w-5 h-5 text-slate-500" />
                <div>
                  <span class="block text-sm font-medium text-slate-700">Link to existing patient</span>
                  <span class="block text-xs text-slate-500">Connect family members or partners</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.isLinked" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div v-if="form.isLinked" class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 animate-in slide-in-from-top-2 duration-200">
              <div>
                <label class="block text-xs font-medium text-slate-500 mb-1">Related Patient <span class="text-red-500">*</span></label>
                <select 
                  v-model="form.linkedPatientId"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                  :class="errors.linkedPatientId ? 'border-red-300' : 'border-slate-300'"
                >
                  <option value="" disabled>Select patient</option>
                  <option v-for="p in existingPatients" :key="p.id" :value="p.id">{{ p.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-500 mb-1">Relation Type</label>
                <select 
                  v-model="form.relationType"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                >
                  <option value="" disabled>Select relation</option>
                  <option v-for="type in relationTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Tags</label>
            <div class="relative">
              <Tag class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                v-model="form.tags"
                type="text" 
                placeholder="e.g. Anxiety, New, Urgent (comma separated)"
                class="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
            <textarea 
              v-model="form.notes"
              rows="3"
              placeholder="Add any initial observations or notes..."
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
            ></textarea>
          </div>
        </div>

      </div>

      <!-- Fixed Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl z-10">
        <div class="text-xs text-slate-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" />
          <span class="text-red-500">*</span> Required fields
        </div>
        <div class="flex gap-3">
          <Button variant="ghost" @click="$emit('close')">Cancel</Button>
          <Button @click="save">Create Patient</Button>
        </div>
      </div>

    </div>
  </div>
</template>
