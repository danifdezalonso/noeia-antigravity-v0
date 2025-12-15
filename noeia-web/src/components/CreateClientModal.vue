<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { User, Mail, Phone, MapPin, Calendar, FileText, Tag, Shield, Link as LinkIcon, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  isOpen: boolean
  preselectedDoctorId?: string
}>()

const emit = defineEmits(['close', 'save', 'update:isOpen'])

const store = useAppStore()
const { professionals, clients: existingPatients } = storeToRefs(store)

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
  tags: '', 
  isLinked: false,
  linkedPatientId: '',
  relationType: ''
})

// Validation State
const errors = ref<Record<string, string>>({})

const insuranceProviders = [
  'Sanitas', 'Adeslas', 'Mapfre', 'DKV', 'Asisa'
]

const relationTypes = [
  'Parent', 'Child', 'Partner', 'Sibling', 'Other'
]

// Initialize form with pre-selected doctor
watch(() => props.isOpen, (newValue) => {
  if (newValue && props.preselectedDoctorId) {
    const doctor = professionals.value.find(p => p.id === props.preselectedDoctorId)
    if (doctor) {
      form.value.professional = doctor.id
    }
  }
})

onMounted(() => {
    if (professionals.value.length === 0) store.fetchProfessionals()
    if (existingPatients.value.length === 0) store.fetchClients()
})

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
    patient_id: crypto.randomUUID(), // Internal ID
    professionalId: form.value.professional
  })
  emit('close')
}

function handleOpenChange(val: boolean) {
  if (!val) {
     emit('close') 
  }
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>New Patient</DialogTitle>
        <DialogDescription>
          Add a new patient record to the system.
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-6 py-4">
        
        <!-- Section: Personal Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold flex items-center gap-2 text-primary">
            <User class="w-4 h-4" /> Personal Information
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name -->
            <div class="col-span-2">
              <Label class="mb-1 block">Full Name <span class="text-destructive">*</span></Label>
              <Input 
                v-model="form.name"
                placeholder="e.g. Jane Doe"
                :class="{ 'border-destructive': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-xs text-destructive">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <Label class="mb-1 block">Email <span class="text-destructive">*</span></Label>
              <div class="relative">
                <Mail class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input 
                  v-model="form.email"
                  type="email" 
                  placeholder="jane@example.com"
                  class="pl-9"
                  :class="{ 'border-destructive': errors.email }"
                />
              </div>
              <p v-if="errors.email" class="mt-1 text-xs text-destructive">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div>
              <Label class="mb-1 block">Phone</Label>
              <div class="relative">
                <Phone class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+34 600 000 000"
                  class="pl-9"
                />
              </div>
            </div>

            <!-- Date of Birth -->
            <div>
              <Label class="mb-1 block">Date of Birth <span class="text-destructive">*</span></Label>
              <div class="relative">
                <Calendar class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input 
                  v-model="form.dob"
                  type="date" 
                  class="pl-9"
                  :class="{ 'border-destructive': errors.dob }"
                />
              </div>
              <p v-if="errors.dob" class="mt-1 text-xs text-destructive">{{ errors.dob }}</p>
            </div>

            <!-- Address -->
            <div class="col-span-2">
              <Label class="mb-1 block">Address</Label>
              <div class="relative">
                <MapPin class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input 
                  v-model="form.address"
                  placeholder="Street address, City, Zip"
                  class="pl-9"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <!-- Section: Professional & Insurance -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold flex items-center gap-2 text-primary">
            <Shield class="w-4 h-4" /> Professional & Insurance
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Professional -->
            <div class="col-span-2 md:col-span-1">
              <Label class="mb-1 block">Assigned Professional</Label>
              <Select v-model="form.professional">
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="pro in professionals" :key="pro.id" :value="pro.id">
                    {{ pro.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Insurance Toggle -->
            <div class="col-span-2">
              <div class="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                <div class="flex items-center gap-2">
                  <Shield class="w-5 h-5 text-muted-foreground" />
                  <span class="text-sm font-medium">Has Insurance?</span>
                </div>
                <Checkbox :checked="form.hasInsurance" @update:checked="(v: boolean) => form.hasInsurance = v" />
              </div>
            </div>

            <!-- Insurance Details -->
            <template v-if="form.hasInsurance">
              <div class="md:col-span-1">
                <Label class="mb-1 block">Provider <span class="text-destructive">*</span></Label>
                <Select v-model="form.insuranceProvider">
                  <SelectTrigger :class="{ 'border-destructive': errors.insuranceProvider }">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="prov in insuranceProviders" :key="prov" :value="prov">
                      {{ prov }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p v-if="errors.insuranceProvider" class="mt-1 text-xs text-destructive">{{ errors.insuranceProvider }}</p>
              </div>
              <div class="md:col-span-1">
                <Label class="mb-1 block">Policy Number <span class="text-destructive">*</span></Label>
                <Input 
                  v-model="form.policyNumber"
                  placeholder="e.g. 123456789"
                  :class="{ 'border-destructive': errors.policyNumber }"
                />
                <p v-if="errors.policyNumber" class="mt-1 text-xs text-destructive">{{ errors.policyNumber }}</p>
              </div>
            </template>
          </div>
        </div>

        <Separator />

        <!-- Section: Additional Info -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold flex items-center gap-2 text-primary">
            <FileText class="w-4 h-4" /> Additional Details
          </h4>

          <!-- Link to Patient -->
          <div class="p-4 bg-muted/50 rounded-lg border space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <LinkIcon class="w-5 h-5 text-muted-foreground" />
                <div>
                  <span class="block text-sm font-medium">Link to existing patient</span>
                  <span class="block text-xs text-muted-foreground">Connect family members or partners</span>
                </div>
              </div>
              <Checkbox :checked="form.isLinked" @update:checked="(v: boolean) => form.isLinked = v" />
            </div>

            <div v-if="form.isLinked" class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <Label class="block mb-1 text-xs">Related Patient <span class="text-destructive">*</span></Label>
                <Select v-model="form.linkedPatientId">
                  <SelectTrigger :class="{ 'border-destructive': errors.linkedPatientId }">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="p in existingPatients" :key="p.id" :value="p.id">
                      {{ p.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label class="block mb-1 text-xs">Relation Type</Label>
                <Select v-model="form.relationType">
                  <SelectTrigger>
                     <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="type in relationTypes" :key="type" :value="type">
                      {{ type }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <Label class="mb-1 block">Tags</Label>
            <div class="relative">
              <Tag class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input 
                v-model="form.tags"
                placeholder="e.g. Anxiety, New, Urgent (comma separated)"
                class="pl-9"
              />
            </div>
          </div>

          <!-- Notes -->
          <div>
            <Label class="mb-1 block">Internal Notes</Label>
            <Textarea 
              v-model="form.notes"
              rows="3"
              placeholder="Add any initial observations or notes..."
              class="resize-none"
            />
          </div>
        </div>

      </div>

      <DialogFooter class="gap-2 sm:gap-0">
        <div class="mr-auto text-xs text-muted-foreground flex items-center gap-1">
           <AlertCircle class="w-3 h-3" /> Required fields
        </div>
        <Button variant="ghost" @click="emit('close')">Cancel</Button>
        <Button @click="save">Create Patient</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
