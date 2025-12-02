<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ChevronLeft, ArrowRight, User, Smartphone, Briefcase, FileText, Upload, X } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const currentStep = ref(1)
const totalSteps = 4
const direction = ref('forward')

// Form Data
const form = ref({
  // Step 1: Identity
  fullName: user.value?.user_metadata?.full_name || '',
  email: user.value?.email || '',
  dob: '',
  
  // Step 2: Profile
  description: '',
  avatar: null as File | null,
  avatarPreview: '',
  
  // Step 3: Specialty
  specialty: '',
  
  // Step 4: Contact
  phone: ''
})

// Specialties
const specialties = [
  'Clinical Psychology',
  'Psychiatry',
  'Counseling Psychology',
  'Neuropsychology',
  'Child Psychology',
  'Forensic Psychology',
  'Health Psychology',
  'Sports Psychology'
]

// Validation
const errors = ref<Record<string, string>>({})

function validateStep(step: number): boolean {
  errors.value = {}
  let isValid = true

  if (step === 1) {
    if (!form.value.fullName.trim()) {
      errors.value.fullName = 'Full name is required'
      isValid = false
    }
    if (!form.value.dob) {
      errors.value.dob = 'Date of birth is required'
      isValid = false
    }
  } else if (step === 3) {
    if (!form.value.specialty) {
      errors.value.specialty = 'Specialty is required'
      isValid = false
    }
  } else if (step === 4) {
    if (!form.value.phone.trim()) {
      errors.value.phone = 'Phone number is required'
      isValid = false
    }
  }

  return isValid
}

const isStepValid = computed(() => validateStep(currentStep.value))

function nextStep() {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) {
      direction.value = 'forward'
      currentStep.value++
    } else {
      finishOnboarding()
    }
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    direction.value = 'backward'
    currentStep.value--
  }
}

function finishOnboarding() {
  // Here we would save data to backend
  router.push('/app')
}

function skipOnboarding() {
  router.push('/app/clients')
}

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    form.value.avatar = file
    form.value.avatarPreview = URL.createObjectURL(file)
  }
}

function removeAvatar() {
  form.value.avatar = null
  form.value.avatarPreview = ''
}

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Tell us who you are'
    case 2: return 'Introduce yourself'
    case 3: return 'Select your specialty'
    case 4: return 'Professional contact'
    default: return ''
  }
})

const stepSubtitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'We’ll set up your professional profile.'
    case 2: return 'Help clients understand your background.'
    case 3: return 'Choose your main field of practice.'
    case 4: return 'How clients and the clinic can reach you.'
    default: return ''
  }
})

const progress = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100)

</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    
    <!-- Developer Skip -->
    <!-- Developer Skip -->
    <button 
      @click="skipOnboarding"
      class="absolute top-4 right-4 z-50 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
    >
      DEV SKIP
    </button>

    <!-- Main Card -->
    <div class="w-full max-w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col h-[600px] relative overflow-hidden">
      
      <!-- Header -->
      <div class="px-8 pt-8 pb-4 bg-white z-10">
        <div class="flex items-center justify-between text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
          <span>Step {{ currentStep }} of {{ totalSteps }}</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <!-- Progress Bar -->
        <div class="h-1 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
          <div 
            class="h-full bg-primary-600 transition-all duration-300 ease-out"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        
        <h1 class="text-2xl font-bold text-slate-900 mb-1 transition-all duration-300">{{ stepTitle }}</h1>
        <p class="text-slate-500 text-sm transition-all duration-300">{{ stepSubtitle }}</p>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto px-8 py-2 relative">
        <Transition :name="direction === 'forward' ? 'slide-left' : 'slide-right'" mode="out-in">
          
          <!-- Step 1: Identity -->
          <div v-if="currentStep === 1" key="step1" class="space-y-5 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.fullName"
                  type="text" 
                  class="w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  :class="errors.fullName ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
              </div>
              <p v-if="errors.fullName" class="text-xs text-red-500 mt-1">{{ errors.fullName }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                disabled
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
              >
              <p class="text-xs text-slate-400 mt-1">Invitation email (cannot be changed)</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input 
                v-model="form.dob"
                type="date" 
                class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                :class="errors.dob ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
              >
              <p v-if="errors.dob" class="text-xs text-red-500 mt-1">{{ errors.dob }}</p>
            </div>
          </div>

          <!-- Step 2: Profile -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-5 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Profile Picture <span class="text-slate-400 font-normal">(Optional)</span></label>
              
              <div v-if="!form.avatarPreview" class="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer relative">
                <input type="file" accept="image/*" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer" />
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 text-slate-400">
                  <Upload class="w-6 h-6" />
                </div>
                <p class="text-sm text-slate-600 font-medium">Click to upload</p>
                <p class="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 800x800px)</p>
              </div>

              <div v-else class="relative w-32 h-32 mx-auto animate-fade-in-scale">
                <img :src="form.avatarPreview" class="w-full h-full object-cover rounded-xl shadow-sm border border-slate-200" />
                <button 
                  @click="removeAvatar"
                  class="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md border border-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Description <span class="text-slate-400 font-normal">(Optional)</span></label>
              <div class="relative">
                <FileText class="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea 
                  v-model="form.description"
                  rows="4"
                  placeholder="Tell clients about your experience and approach..."
                  class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Step 3: Specialty -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-6 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Specialty</label>
              <div class="relative">
                <Briefcase class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  v-model="form.specialty"
                  class="w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                  :class="errors.specialty ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
                  <option value="" disabled>Select your specialty</option>
                  <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
                </select>
              </div>
              <p v-if="errors.specialty" class="text-xs text-red-500 mt-1">{{ errors.specialty }}</p>
            </div>
          </div>

          <!-- Step 4: Contact -->
          <div v-else-if="currentStep === 4" key="step4" class="space-y-5 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <div class="relative">
                <Smartphone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  class="w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  :class="errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
              </div>
              <p v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</p>
            </div>
          </div>

        </Transition>
      </div>

      <!-- Footer Actions -->
      <div class="p-8 bg-white border-t border-slate-100 z-10 flex items-center justify-between">
        <button 
          v-if="currentStep > 1"
          @click="prevStep"
          class="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 px-2 py-2"
        >
          <ChevronLeft class="w-4 h-4" /> Back
        </button>
        <div v-else></div> <!-- Spacer -->

        <Button 
          @click="nextStep"
          :disabled="!isStepValid"
          class="min-w-[120px]"
        >
          {{ currentStep === totalSteps ? 'Finish' : 'Continue' }}
          <ArrowRight v-if="currentStep < totalSteps" class="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Slide Left (Forward) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Slide Right (Backward) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.animate-fade-in-scale {
  animation: fadeInScale 0.2s ease-out forwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
