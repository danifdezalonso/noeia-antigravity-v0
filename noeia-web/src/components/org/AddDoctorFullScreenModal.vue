<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Loader2, AlertCircle, ChevronDown } from 'lucide-vue-next'
import { z } from 'zod'
import Button from '@/components/ui/Button.vue'

// --- Props & Emits ---
const props = defineProps<{
  isOpen: boolean
  onDoctorCreated?: (doctorId: string) => void
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// --- Zod Schema & Types ---

const doctorBasicsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  professionalType: z.enum(['psychologist', 'psychiatrist', 'clinical_social_worker', 'counselor', 'coach', 'other']),
  otherProfessionalType: z.string().optional(),
  systemRole: z.enum(['clinician', 'org_admin_clinician', 'org_admin_no_clients']),
}).refine((data) => {
  if (data.professionalType === 'other' && !data.otherProfessionalType) {
    return false
  }
  return true
}, {
  message: "Please specify the professional type",
  path: ["otherProfessionalType"]
})

const clinicalProfileSchema = z.object({
  primarySpecialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  clientGroups: z.array(z.string()).min(1, 'Select at least one client group'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  modalities: z.array(z.string()).min(1, 'Select at least one modality'),
})

const licensureSchema = z.object({
  licenseNumber: z.string().optional(),
  licenseAuthority: z.string().optional(),
  licenseRegion: z.string().optional(),
  defaultLocationId: z.string().min(1, 'Select a default location'),
  status: z.enum(['active', 'pending_onboarding', 'inactive']),
  internalReference: z.string().optional(),
})

const sessionDefaultsSchema = z.object({
  defaultSessionLengthMinutes: z.number(),
  acceptedSessionTypes: z.array(z.string()).min(1, 'Select at least one session type'),
  allowDirectOnlineBooking: z.boolean(),
})

const permissionsSchema = z.object({
  canViewOrgBilling: z.enum(['none', 'own_only', 'full_org']),
  canExportClientData: z.boolean(),
  canInviteClients: z.boolean(),
})

const invitationSchema = z.object({
  sendInviteNow: z.boolean(),
  onboardingLanguage: z.enum(['es', 'ca', 'en']),
  customInviteMessage: z.string().max(500, 'Message too long').optional(),
})

const addDoctorSchema = z.intersection(
  doctorBasicsSchema,
  z.intersection(
    clinicalProfileSchema,
    z.intersection(
      licensureSchema,
      z.intersection(
        sessionDefaultsSchema,
        z.intersection(permissionsSchema, invitationSchema)
      )
    )
  )
)

type AddDoctorFormValues = z.infer<typeof addDoctorSchema>

// --- State ---

const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

const initialFormState: AddDoctorFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  professionalType: 'psychologist',
  otherProfessionalType: '',
  systemRole: 'clinician',
  
  primarySpecialties: [],
  clientGroups: [],
  languages: [],
  modalities: [],
  
  licenseNumber: '',
  licenseAuthority: '',
  licenseRegion: '',
  defaultLocationId: '', // Will default to first location if available
  status: 'pending_onboarding',
  internalReference: '',
  
  defaultSessionLengthMinutes: 50,
  acceptedSessionTypes: [],
  allowDirectOnlineBooking: true,
  
  canViewOrgBilling: 'own_only',
  canExportClientData: false,
  canInviteClients: true,
  
  sendInviteNow: true,
  onboardingLanguage: 'es',
  customInviteMessage: ''
}

const form = ref<AddDoctorFormValues>({ ...initialFormState })

// --- Options ---

const professionalTypes = [
  { value: 'psychologist', label: 'Psychologist' },
  { value: 'psychiatrist', label: 'Psychiatrist' },
  { value: 'clinical_social_worker', label: 'Clinical Social Worker' },
  { value: 'counselor', label: 'Counselor' },
  { value: 'coach', label: 'Coach' },
  { value: 'other', label: 'Other' },
]

const systemRoles = [
  { value: 'clinician', label: 'Clinician' },
  { value: 'org_admin_clinician', label: 'Org admin + clinician' },
  { value: 'org_admin_no_clients', label: 'Org admin (no clients)' },
]

const specialtyOptions = [
  'Anxiety', 'Depression', 'Trauma', 'Couples', 'Adolescents', 'ADHD', 'Other'
]

const clientGroupOptions = [
  'Adults', 'Adolescents', 'Children', 'Couples', 'Families', 'Groups'
]

const languageOptions = [
  { value: 'es', label: 'es – Spanish' },
  { value: 'ca', label: 'ca – Catalan' },
  { value: 'en', label: 'en – English' },
  { value: 'other', label: 'Other' },
]

const modalityOptions = [
  { value: 'in_person', label: 'In-person' },
  { value: 'online', label: 'Online' },
  { value: 'phone', label: 'Phone' },
  { value: 'hybrid', label: 'Hybrid' },
]

const locations = [
  { id: "loc-1", name: "Main clinic – Barcelona" },
  { id: "loc-2", name: "Online only" },
]

const sessionLengths = [30, 45, 50, 60]

const sessionTypes = [
  'Individual', 'Couples', 'Family', 'Group'
]

const billingPermissions = [
  { value: 'none', label: 'No access' },
  { value: 'own_only', label: 'Only their own billing' },
  { value: 'full_org', label: 'Full organization billing' },
]

// --- Methods ---

const resetForm = () => {
  form.value = { ...initialFormState }
  // Set default location if available
  if (locations.length > 0 && locations[0]) {
    form.value.defaultLocationId = locations[0].id
  }
  errors.value = {}
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

const validate = () => {
  try {
    addDoctorSchema.parse(form.value)
    errors.value = {}
    return true
  } catch (e) {
    if (e instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const zodError = e as any
      zodError.errors.forEach((err: any) => {
        if (err.path) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      errors.value = fieldErrors
      
      // Scroll to first error
      const firstErrorField = Object.keys(fieldErrors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
    return false
  }
}

const createDoctor = async (values: AddDoctorFormValues): Promise<string> => {
  console.log('Creating doctor with values:', values)
  await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
  return 'mock-doctor-id-123'
}

const handleSubmit = async () => {
  if (!validate()) return

  isLoading.value = true
  try {
    const doctorId = await createDoctor(form.value)
    if (props.onDoctorCreated) {
      props.onDoctorCreated(doctorId)
    }
    emit('close')
  } catch (error) {
    console.error('Failed to create doctor:', error)
    // Show generic error (could be a toast)
    alert('Failed to create doctor. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Helper for multi-select toggle
const toggleSelection = (array: string[], value: string) => {
  const index = array.indexOf(value)
  if (index === -1) {
    array.push(value)
  } else {
    array.splice(index, 1)
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

    <!-- Modal Container -->
    <div class="relative w-full h-full md:h-auto md:max-h-[95vh] md:max-w-4xl bg-white md:rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 shrink-0">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Add doctor</h2>
          <p class="text-sm text-slate-500">Create a new doctor profile and send an invitation to complete onboarding.</p>
        </div>
        <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Scrollable Body -->
      <div class="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
        
        <!-- 1. Doctor Basics -->
        <section class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Doctor basics</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- First Name -->
            <div id="firstName">
              <label class="block text-sm font-medium text-slate-700 mb-1">First Name <span class="text-red-500">*</span></label>
              <input 
                v-model="form.firstName"
                type="text" 
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                :class="errors.firstName ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
              >
              <p v-if="errors.firstName" class="mt-1 text-xs text-red-500">{{ errors.firstName }}</p>
            </div>

            <!-- Last Name -->
            <div id="lastName">
              <label class="block text-sm font-medium text-slate-700 mb-1">Last Name <span class="text-red-500">*</span></label>
              <input 
                v-model="form.lastName"
                type="text" 
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                :class="errors.lastName ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
              >
              <p v-if="errors.lastName" class="mt-1 text-xs text-red-500">{{ errors.lastName }}</p>
            </div>

            <!-- Email -->
            <div id="email" class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Email <span class="text-red-500">*</span></label>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="doctor@example.com"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                :class="errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
              >
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div id="phone">
              <label class="block text-sm font-medium text-slate-700 mb-1">Phone (with country code)</label>
              <input 
                v-model="form.phone"
                type="tel" 
                placeholder="+34 ..."
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
            </div>

            <!-- Professional Type -->
            <div id="professionalType">
              <label class="block text-sm font-medium text-slate-700 mb-1">Professional Type <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="form.professionalType"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                >
                  <option v-for="type in professionalTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <!-- Other Professional Type -->
            <div v-if="form.professionalType === 'other'" id="otherProfessionalType" class="animate-in fade-in slide-in-from-top-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Specify Type <span class="text-red-500">*</span></label>
              <input 
                v-model="form.otherProfessionalType"
                type="text" 
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                :class="errors.otherProfessionalType ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
              >
              <p v-if="errors.otherProfessionalType" class="mt-1 text-xs text-red-500">{{ errors.otherProfessionalType }}</p>
            </div>

            <!-- System Role -->
            <div id="systemRole" class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">System Role <span class="text-red-500">*</span></label>
              <div class="flex flex-wrap gap-4">
                <label v-for="role in systemRoles" :key="role.value" class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="form.systemRole" :value="role.value" class="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300">
                  <span class="text-sm text-slate-700">{{ role.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Clinical Profile -->
        <section class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Clinical profile</h3>
          
          <!-- Specialties -->
          <div id="primarySpecialties">
            <label class="block text-sm font-medium text-slate-700 mb-2">Primary Specialties <span class="text-red-500">*</span></label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="spec in specialtyOptions" 
                :key="spec"
                type="button"
                @click="toggleSelection(form.primarySpecialties, spec)"
                class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors border"
                :class="form.primarySpecialties.includes(spec) 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'"
              >
                {{ spec }}
              </button>
            </div>
            <p v-if="errors.primarySpecialties" class="mt-1 text-xs text-red-500">{{ errors.primarySpecialties }}</p>
          </div>

          <!-- Client Groups -->
          <div id="clientGroups">
            <label class="block text-sm font-medium text-slate-700 mb-2">Client Groups <span class="text-red-500">*</span></label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="group in clientGroupOptions" 
                :key="group"
                type="button"
                @click="toggleSelection(form.clientGroups, group)"
                class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors border"
                :class="form.clientGroups.includes(group) 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'"
              >
                {{ group }}
              </button>
            </div>
            <p v-if="errors.clientGroups" class="mt-1 text-xs text-red-500">{{ errors.clientGroups }}</p>
          </div>

          <!-- Languages -->
          <div id="languages">
            <label class="block text-sm font-medium text-slate-700 mb-2">Languages <span class="text-red-500">*</span></label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label v-for="lang in languageOptions" :key="lang.value" class="flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-slate-50 transition-colors" :class="form.languages.includes(lang.value) ? 'border-primary-200 bg-primary-50' : 'border-slate-200'">
                <input type="checkbox" :value="lang.value" v-model="form.languages" class="rounded text-primary-600 focus:ring-primary-500 border-gray-300">
                <span class="text-sm text-slate-700">{{ lang.label }}</span>
              </label>
            </div>
            <p v-if="errors.languages" class="mt-1 text-xs text-red-500">{{ errors.languages }}</p>
          </div>

          <!-- Modalities -->
          <div id="modalities">
            <label class="block text-sm font-medium text-slate-700 mb-2">Modalities <span class="text-red-500">*</span></label>
            <div class="flex flex-wrap gap-2">
              <label v-for="mod in modalityOptions" :key="mod.value" class="flex items-center gap-2 cursor-pointer px-3 py-1.5 border rounded-lg hover:bg-slate-50 transition-colors" :class="form.modalities.includes(mod.value) ? 'border-primary-200 bg-primary-50' : 'border-slate-200'">
                <input type="checkbox" :value="mod.value" v-model="form.modalities" class="rounded text-primary-600 focus:ring-primary-500 border-gray-300">
                <span class="text-sm text-slate-700">{{ mod.label }}</span>
              </label>
            </div>
            <p v-if="errors.modalities" class="mt-1 text-xs text-red-500">{{ errors.modalities }}</p>
          </div>
        </section>

        <!-- 3. Licensure & Organization -->
        <section class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Licensure & organization</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- License Number -->
            <div id="licenseNumber">
              <label class="block text-sm font-medium text-slate-700 mb-1">License Number</label>
              <input 
                v-model="form.licenseNumber"
                type="text" 
                placeholder="e.g. 12345-COPC"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
            </div>

            <!-- License Authority -->
            <div id="licenseAuthority">
              <label class="block text-sm font-medium text-slate-700 mb-1">Issuing Authority</label>
              <input 
                v-model="form.licenseAuthority"
                type="text" 
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
            </div>

            <!-- License Region -->
            <div id="licenseRegion">
              <label class="block text-sm font-medium text-slate-700 mb-1">License Region</label>
              <input 
                v-model="form.licenseRegion"
                type="text" 
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
            </div>

            <!-- Default Location -->
            <div id="defaultLocationId">
              <label class="block text-sm font-medium text-slate-700 mb-1">Default Location <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="form.defaultLocationId"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  :class="errors.defaultLocationId ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                  <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <p v-if="errors.defaultLocationId" class="mt-1 text-xs text-red-500">{{ errors.defaultLocationId }}</p>
            </div>

            <!-- Status -->
            <div id="status">
              <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <div class="relative">
                <select 
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="pending_onboarding">Pending onboarding</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <!-- Internal Reference -->
            <div id="internalReference">
              <label class="block text-sm font-medium text-slate-700 mb-1">Internal Reference</label>
              <input 
                v-model="form.internalReference"
                type="text" 
                placeholder="For internal use: payroll, etc."
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
            </div>
          </div>
        </section>

        <!-- 4. Session Defaults & Permissions -->
        <section class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Session defaults & permissions</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Session Defaults -->
            <div class="space-y-4">
              <div id="defaultSessionLengthMinutes">
                <label class="block text-sm font-medium text-slate-700 mb-1">Default Session Length</label>
                <div class="flex gap-2">
                  <button 
                    v-for="len in sessionLengths" 
                    :key="len"
                    type="button"
                    @click="form.defaultSessionLengthMinutes = len"
                    class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border"
                    :class="form.defaultSessionLengthMinutes === len
                      ? 'bg-primary-50 border-primary-200 text-primary-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'"
                  >
                    {{ len }} min
                  </button>
                </div>
              </div>

              <div id="acceptedSessionTypes">
                <label class="block text-sm font-medium text-slate-700 mb-1">Accepted Session Types <span class="text-red-500">*</span></label>
                <div class="space-y-2">
                  <label v-for="type in sessionTypes" :key="type" class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" :value="type" v-model="form.acceptedSessionTypes" class="rounded text-primary-600 focus:ring-primary-500 border-gray-300">
                    <span class="text-sm text-slate-700">{{ type }}</span>
                  </label>
                </div>
                <p v-if="errors.acceptedSessionTypes" class="mt-1 text-xs text-red-500">{{ errors.acceptedSessionTypes }}</p>
              </div>

              <div id="allowDirectOnlineBooking">
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <span class="block text-sm font-medium text-slate-700">Direct Online Booking</span>
                    <span class="block text-xs text-slate-500">Allow clients to book directly</span>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.allowDirectOnlineBooking" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Permissions -->
            <div class="space-y-4">
              <div id="canViewOrgBilling">
                <label class="block text-sm font-medium text-slate-700 mb-2">Billing Access</label>
                <div class="space-y-2">
                  <label v-for="perm in billingPermissions" :key="perm.value" class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="form.canViewOrgBilling" :value="perm.value" class="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300">
                    <span class="text-sm text-slate-700">{{ perm.label }}</span>
                  </label>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700">Export Client Data</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.canExportClientData" class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700">Invite Clients</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.canInviteClients" class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. Invitation -->
        <section class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Invitation</h3>
          
          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="block text-sm font-medium text-slate-900">Send invitation now</span>
                <span class="block text-xs text-slate-500">Email a magic link to the doctor</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.sendInviteNow" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div v-if="form.sendInviteNow" class="space-y-4 pt-2 animate-in slide-in-from-top-2">
              <div id="onboardingLanguage">
                <label class="block text-sm font-medium text-slate-700 mb-1">Onboarding Language</label>
                <div class="relative">
                  <select 
                    v-model="form.onboardingLanguage"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option value="es">Spanish</option>
                    <option value="ca">Catalan</option>
                    <option value="en">English</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div id="customInviteMessage">
                <label class="block text-sm font-medium text-slate-700 mb-1">Custom Message (Optional)</label>
                <textarea 
                  v-model="form.customInviteMessage"
                  rows="3"
                  placeholder="e.g. Welcome to the team! Here are some instructions..."
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
                  :class="errors.customInviteMessage ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                ></textarea>
                <p v-if="errors.customInviteMessage" class="mt-1 text-xs text-red-500">{{ errors.customInviteMessage }}</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 z-10 shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" />
          <span class="text-red-500">*</span> Required fields
        </div>
        <div class="flex items-center gap-3">
          <Button variant="ghost" @click="emit('close')">Cancel</Button>
          
          <div class="flex flex-col items-end">
            <Button @click="handleSubmit" :disabled="isLoading" class="min-w-[140px]">
              <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
              {{ form.sendInviteNow ? 'Save & send invite' : 'Save' }}
            </Button>
            <span v-if="form.sendInviteNow" class="text-[10px] text-slate-400 mt-1">
              A magic link will be emailed
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
