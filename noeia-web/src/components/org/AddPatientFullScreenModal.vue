<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Loader2, AlertCircle, ChevronDown } from 'lucide-vue-next'
import { z } from 'zod'
import Button from '@/components/ui/Button.vue'

// --- Props & Emits ---
const props = defineProps<{
  modelValue: boolean
  onCreated?: (patientId: string) => void
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'created', patientId: string): void
}>()

// --- Zod Schema & Types ---

const patientBasicsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  preferredName: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(5, 'Phone number too short').optional().or(z.literal('')),
  dateOfBirth: z.string().optional().refine((val) => !val || new Date(val) <= new Date(), {
    message: 'Date of birth cannot be in the future'
  }),
  gender: z.enum(['female', 'male', 'non_binary', 'prefer_not_to_say', 'other']),
  pronouns: z.string().optional(),
})

const contactSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  postalCode: z.string().optional(),
  preferredLanguage: z.enum(['es', 'ca', 'en', 'other']),
  otherLanguage: z.string().optional(),
}).refine((data) => {
  if (data.preferredLanguage === 'other' && !data.otherLanguage) {
    return false
  }
  return true
}, {
  message: "Please specify the language",
  path: ["otherLanguage"]
})

const clinicalContextSchema = z.object({
  presentingIssues: z.array(z.string()),
  riskLevel: z.enum(['unknown', 'low', 'moderate', 'high']),
  internalNotes: z.string().optional(),
})

const assignmentSchema = z.object({
  assignedDoctorId: z.string().optional(),
  assignedLocationId: z.string().optional(),
  patientStatus: z.enum(['active', 'onboarding', 'paused', 'archived']),
  tags: z.array(z.string()),
})

const emergencyContactSchema = z.object({
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
}).refine((data) => {
  const hasAny = !!data.emergencyContactName || !!data.emergencyContactRelationship || !!data.emergencyContactPhone
  if (hasAny) {
    return !!data.emergencyContactName && !!data.emergencyContactRelationship && !!data.emergencyContactPhone
  }
  return true
}, {
  message: "All emergency contact fields are required if any are filled",
  path: ["emergencyContactName"] // Highlight name primarily
})

const sessionDefaultsSchema = z.object({
  defaultSessionLengthMinutes: z.number(),
  preferredModality: z.enum(['in_person', 'online', 'phone', 'hybrid']),
  timeZone: z.string().optional(),
})

const billingSchema = z.object({
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
}).refine((data) => {
  if (data.hasInsurance) {
    return !!data.insuranceProvider && !!data.insurancePolicyNumber
  }
  return true
}, {
  message: "Provider and Policy Number are required when insurance is enabled",
  path: ["insuranceProvider"] // Highlight provider primarily
})

const relatedPatientSchema = z.object({
  isRelatedToPatient: z.boolean(),
  relatedPatientId: z.string().optional(),
  relationType: z.string().optional(),
}).refine((data) => {
  if (data.isRelatedToPatient) {
    return !!data.relatedPatientId && !!data.relationType
  }
  return true
}, {
  message: "Related patient and relation type are required",
  path: ["relatedPatientId"]
})

const portalSchema = z.object({
  enablePortalAccess: z.boolean(),
  sendPortalInviteNow: z.boolean(),
  onboardingLanguage: z.enum(['es', 'ca', 'en']),
  customInviteMessage: z.string().max(500, 'Message too long').optional(),
})

const addPatientSchema = patientBasicsSchema
  .and(contactSchema)
  .and(clinicalContextSchema)
  .and(assignmentSchema)
  .and(emergencyContactSchema)
  .and(sessionDefaultsSchema)
  .and(billingSchema)
  .and(relatedPatientSchema)
  .and(portalSchema)
  .superRefine((data, ctx) => {
    if (data.enablePortalAccess && data.sendPortalInviteNow) {
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required to send portal invitation",
          path: ["email"]
        })
      }
    }
  })

type AddPatientFormValues = z.infer<typeof addPatientSchema>

// --- State ---

const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

const initialFormState: AddPatientFormValues = {
  firstName: '',
  lastName: '',
  preferredName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: 'prefer_not_to_say',
  pronouns: '',
  
  country: '',
  city: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  preferredLanguage: 'es',
  otherLanguage: '',
  
  presentingIssues: [],
  riskLevel: 'unknown',
  internalNotes: '',
  
  assignedDoctorId: '',
  assignedLocationId: '',
  patientStatus: 'onboarding',
  tags: [],
  
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactPhone: '',
  
  defaultSessionLengthMinutes: 50,
  preferredModality: 'in_person',
  timeZone: 'Europe/Madrid',
  
  hasInsurance: false,
  insuranceProvider: '',
  insurancePolicyNumber: '',

  isRelatedToPatient: false,
  relatedPatientId: '',
  relationType: '',
  
  enablePortalAccess: true,
  sendPortalInviteNow: true,
  onboardingLanguage: 'es',
  customInviteMessage: ''
}

const form = ref<AddPatientFormValues>({ ...initialFormState })

// --- Options ---

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' },
]

const languageOptions = [
  { value: 'es', label: 'es – Spanish' },
  { value: 'ca', label: 'ca – Catalan' },
  { value: 'en', label: 'en – English' },
  { value: 'other', label: 'Other' },
]

const presentingIssueOptions = [
  'Anxiety', 'Depression', 'Stress', 'Relationships', 'Trauma', 'ADHD', 'Other'
]

const riskLevels = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'low', label: 'Low' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'high', label: 'High' },
]

const doctors = [
  { id: "doc-1", name: "Dr. Ana Ruiz" },
  { id: "doc-2", name: "Dr. Marc Vidal" },
]

const locations = [
  { id: "loc-1", name: "Main clinic – Barcelona" },
  { id: "loc-2", name: "Online only" },
]

const patientStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
]

const sessionLengths = [30, 45, 50, 60]

const modalities = [
  { value: 'in_person', label: 'In person' },
  { value: 'online', label: 'Online' },
  { value: 'phone', label: 'Phone' },
  { value: 'hybrid', label: 'Hybrid' },
]

const timeZones = [
  { id: "Europe/Madrid", label: "Europe/Madrid" },
  { id: "Europe/London", label: "Europe/London" },
]



const insuranceProviders = [
  'Aetna', 'Blue Cross', 'Cigna', 'UnitedHealthcare', 'Other'
]

const relationTypes = [
  'Parent', 'Child', 'Partner', 'Sibling', 'Other'
]

const existingPatients = [
  { id: 'pat-1', name: 'Sarah Johnson' },
  { id: 'pat-2', name: 'Michael Brown' },
]

// --- Methods ---

const resetForm = () => {
  form.value = { ...initialFormState }
  errors.value = {}
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

const validate = () => {
  try {
    addPatientSchema.parse(form.value)
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

const createPatient = async (values: AddPatientFormValues): Promise<string> => {
  console.log('Creating patient with values:', values)
  await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
  return 'mock-patient-id-456'
}

const handleSubmit = async () => {
  if (!validate()) return

  isLoading.value = true
  try {
    const patientId = await createPatient(form.value)
    emit('created', patientId)
    if (props.onCreated) {
      props.onCreated(patientId)
    }
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Failed to create patient:', error)
    alert('Could not create patient. Please try again.')
  } finally {
    isLoading.value = false
  }
}

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
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="emit('update:modelValue', false)"></div>

      <!-- Modal Container -->
      <div class="relative w-full h-full md:h-auto md:max-h-[95vh] md:max-w-4xl bg-white md:rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 shrink-0">
          <div>
            <h2 id="modal-title" class="text-xl font-bold text-slate-900">Add patient</h2>
            <p class="text-sm text-slate-500">Create a new patient profile and optionally invite them to their portal.</p>
          </div>
          <button @click="emit('update:modelValue', false)" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors" aria-label="Close">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-8 bg-white">
          
          <!-- Alert for generic errors -->
          <div v-if="Object.keys(errors).length > 0 && !errors.firstName" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle class="w-5 h-5" />
            <span>Please correct the errors below.</span>
          </div>

          <!-- 1. Patient Basics -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Patient basics</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- First Name -->
              <div id="firstName">
                <label class="block text-sm font-medium text-slate-700 mb-1">First Name <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.firstName ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                  autofocus
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

              <!-- Preferred Name -->
              <div id="preferredName">
                <label class="block text-sm font-medium text-slate-700 mb-1">Preferred Name</label>
                <input 
                  v-model="form.preferredName"
                  type="text" 
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
              </div>

              <!-- Email -->
              <div id="email">
                <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                <p class="mt-1 text-xs text-slate-500">Required only if you want to send portal invitation.</p>
                <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
              </div>

              <!-- Phone -->
              <div id="phone">
                <label class="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
              </div>

              <!-- Date of Birth -->
              <div id="dateOfBirth">
                <label class="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input 
                  v-model="form.dateOfBirth"
                  type="date" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.dateOfBirth ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                <p v-if="errors.dateOfBirth" class="mt-1 text-xs text-red-500">{{ errors.dateOfBirth }}</p>
              </div>

              <!-- Gender -->
              <div id="gender">
                <label class="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <div class="relative">
                  <select 
                    v-model="form.gender"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option v-for="opt in genderOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <!-- Pronouns -->
              <div id="pronouns">
                <label class="block text-sm font-medium text-slate-700 mb-1">Pronouns</label>
                <input 
                  v-model="form.pronouns"
                  type="text" 
                  placeholder="e.g. they/them"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
              </div>
            </div>
          </section>

          <!-- 2. Contact & Demographics -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Contact & demographics</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="country">
                <label class="block text-sm font-medium text-slate-700 mb-1">Country</label>
                <input v-model="form.country" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              <div id="city">
                <label class="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input v-model="form.city" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              <div id="addressLine1" class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1">Address Line 1</label>
                <input v-model="form.addressLine1" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              <div id="addressLine2">
                <label class="block text-sm font-medium text-slate-700 mb-1">Address Line 2</label>
                <input v-model="form.addressLine2" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              <div id="postalCode">
                <label class="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                <input v-model="form.postalCode" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              
              <div id="preferredLanguage">
                <label class="block text-sm font-medium text-slate-700 mb-1">Preferred Language <span class="text-red-500">*</span></label>
                <div class="relative">
                  <select 
                    v-model="form.preferredLanguage"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option v-for="lang in languageOptions" :key="lang.value" :value="lang.value">{{ lang.label }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div v-if="form.preferredLanguage === 'other'" id="otherLanguage" class="animate-in fade-in slide-in-from-top-2">
                <label class="block text-sm font-medium text-slate-700 mb-1">Specify Language <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.otherLanguage"
                  type="text" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  :class="errors.otherLanguage ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
                <p v-if="errors.otherLanguage" class="mt-1 text-xs text-red-500">{{ errors.otherLanguage }}</p>
              </div>
            </div>
          </section>

          <!-- 3. Clinical Context -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Clinical context</h3>
            
            <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
              <div id="presentingIssues">
                <label class="block text-sm font-medium text-slate-700 mb-2">Presenting Issues</label>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="issue in presentingIssueOptions" 
                    :key="issue"
                    type="button"
                    @click="toggleSelection(form.presentingIssues, issue)"
                    class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors border"
                    :class="form.presentingIssues.includes(issue) 
                      ? 'bg-primary-50 border-primary-200 text-primary-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'"
                  >
                    {{ issue }}
                  </button>
                </div>
              </div>

              <div id="riskLevel">
                <label class="block text-sm font-medium text-slate-700 mb-2">Risk Level</label>
                <div class="flex flex-wrap gap-4">
                  <label v-for="level in riskLevels" :key="level.value" class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="form.riskLevel" :value="level.value" class="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300">
                    <span class="text-sm text-slate-700">{{ level.label }}</span>
                  </label>
                </div>
              </div>

              <div id="internalNotes">
                <label class="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
                <textarea 
                  v-model="form.internalNotes"
                  rows="3"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
                ></textarea>
                <p class="mt-1 text-xs text-slate-500">Only visible to the professional team, not to the patient.</p>
              </div>
            </div>
          </section>

          <!-- 4. Assignment & Organization -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Assignment & organization</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="assignedDoctorId">
                <label class="block text-sm font-medium text-slate-700 mb-1">Assigned Doctor</label>
                <div class="relative">
                  <select 
                    v-model="form.assignedDoctorId"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option value="">Select doctor</option>
                    <option v-for="doc in doctors" :key="doc.id" :value="doc.id">{{ doc.name }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div id="assignedLocationId">
                <label class="block text-sm font-medium text-slate-700 mb-1">Assigned Location</label>
                <div class="relative">
                  <select 
                    v-model="form.assignedLocationId"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option value="">Select location</option>
                    <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div id="patientStatus">
                <label class="block text-sm font-medium text-slate-700 mb-1">Patient Status</label>
                <div class="relative">
                  <select 
                    v-model="form.patientStatus"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option v-for="status in patientStatuses" :key="status.value" :value="status.value">{{ status.label }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div id="tags">
                <label class="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="tag in ['Priority', 'Pro Bono', 'Insurance', 'Self Pay']" 
                    :key="tag"
                    type="button"
                    @click="toggleSelection(form.tags, tag)"
                    class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors border"
                    :class="form.tags.includes(tag) 
                      ? 'bg-primary-50 border-primary-200 text-primary-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- 5. Emergency Contact -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Emergency contact</h3>
            <p class="text-sm text-slate-500">Optional, but recommended. If you fill any field we’ll require all three.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div id="emergencyContactName">
                <label class="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input 
                  v-model="form.emergencyContactName" 
                  type="text" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  :class="errors.emergencyContactName ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                >
              </div>
              <div id="emergencyContactRelationship">
                <label class="block text-sm font-medium text-slate-700 mb-1">Relationship</label>
                <input 
                  v-model="form.emergencyContactRelationship" 
                  type="text" 
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
              <div id="emergencyContactPhone">
                <label class="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input 
                  v-model="form.emergencyContactPhone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
            </div>
            <p v-if="errors.emergencyContactName" class="text-xs text-red-500">{{ errors.emergencyContactName }}</p>
          </section>

          <!-- 6. Session Defaults -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Session defaults</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div id="preferredModality">
                <label class="block text-sm font-medium text-slate-700 mb-1">Preferred Modality</label>
                <div class="relative">
                  <select 
                    v-model="form.preferredModality"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option v-for="mod in modalities" :key="mod.value" :value="mod.value">{{ mod.label }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div id="timeZone">
                <label class="block text-sm font-medium text-slate-700 mb-1">Time Zone</label>
                <div class="relative">
                  <select 
                    v-model="form.timeZone"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                  >
                    <option v-for="tz in timeZones" :key="tz.id" :value="tz.id">{{ tz.label }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          <!-- 7. Insurance -->
          <section class="space-y-4">
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="block text-sm font-medium text-slate-900">Has Insurance?</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="form.hasInsurance" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div v-if="form.hasInsurance" class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                <div id="insuranceProvider">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Provider <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select 
                      v-model="form.insuranceProvider"
                      class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                      :class="errors.insuranceProvider ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                    >
                      <option value="">Select provider</option>
                      <option v-for="prov in insuranceProviders" :key="prov" :value="prov">{{ prov }}</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <p v-if="errors.insuranceProvider" class="mt-1 text-xs text-red-500">{{ errors.insuranceProvider }}</p>
                </div>

                <div id="insurancePolicyNumber">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Policy Number <span class="text-red-500">*</span></label>
                  <input 
                    v-model="form.insurancePolicyNumber"
                    type="text" 
                    placeholder="e.g. 123456789"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    :class="errors.insurancePolicyNumber ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                  >
                  <p v-if="errors.insurancePolicyNumber" class="mt-1 text-xs text-red-500">{{ errors.insurancePolicyNumber }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 8. Additional Details (Related Patient) -->
          <section class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Additional details</h3>
            
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="block text-sm font-medium text-slate-900">Link to existing patient</span>
                  <span class="block text-xs text-slate-500">Connect family members or partners</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="form.isRelatedToPatient" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div v-if="form.isRelatedToPatient" class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                <div id="relatedPatientId">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Related Patient <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select 
                      v-model="form.relatedPatientId"
                      class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                      :class="errors.relatedPatientId ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                    >
                      <option value="">Select patient</option>
                      <option v-for="pat in existingPatients" :key="pat.id" :value="pat.id">{{ pat.name }}</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <p v-if="errors.relatedPatientId" class="mt-1 text-xs text-red-500">{{ errors.relatedPatientId }}</p>
                </div>

                <div id="relationType">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Relation Type <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select 
                      v-model="form.relationType"
                      class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none"
                      :class="errors.relationType ? 'border-red-300 focus:ring-red-200' : 'border-slate-300'"
                    >
                      <option value="">Select relation</option>
                      <option v-for="type in relationTypes" :key="type" :value="type">{{ type }}</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 9. Portal & Invitation -->
          <section class="space-y-4 pt-4 border-t border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Portal & invitation</h3>
                <p class="text-sm text-slate-500">Enable portal access for this patient</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.enablePortalAccess" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div v-if="form.enablePortalAccess" class="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4 animate-in slide-in-from-top-2">
              <div class="flex items-center justify-between">
                <div>
                  <span class="block text-sm font-medium text-slate-900">Send portal invite now</span>
                  <span class="block text-xs text-slate-500">Email a magic link to the patient</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="form.sendPortalInviteNow" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div v-if="form.sendPortalInviteNow" class="space-y-4">
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
                    v-model="form.customInviteMessage!"
                    rows="3"
                    placeholder="e.g. Welcome to our clinic! Here is how to prepare..."
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
        <div class="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white z-10 shrink-0">
          <div class="text-xs text-slate-500">
            <span v-if="form.enablePortalAccess && form.sendPortalInviteNow">
              A magic link will be emailed so the patient can access their portal.
            </span>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="ghost" @click="emit('update:modelValue', false)">Cancel</Button>
            
            <Button @click="handleSubmit" :disabled="isLoading" class="min-w-[100px]">
              <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
              {{ form.enablePortalAccess && form.sendPortalInviteNow ? 'Save & send invite' : 'Save' }}
            </Button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>
