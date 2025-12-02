<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ChevronLeft, ArrowRight, Shield, User, Smartphone, MapPin, Stethoscope } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

import posthog from 'posthog-js'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const currentStep = ref(1)
const totalSteps = 4
const direction = ref('forward')

// Track start
onMounted(() => {
  posthog.capture('onboarding_client_started')
})

// Form Data
const form = ref({
  // Step 1: Identity
  fullName: user.value?.user_metadata?.full_name || '',
  email: user.value?.email || '',
  dob: '',
  
  // Step 2: Contact
  phone: '',
  address: '',
  
  // Step 3: Insurance
  hasInsurance: false,
  insuranceProvider: '',
  policyNumber: '',
  
  // Step 4: Professional
  professionalId: 'pro1' // Default mocked
})

// Mock Professionals
const professionals = [
  { id: 'pro1', name: 'Dr. Sarah Connor', specialty: 'Clinical Psychologist', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'pro2', name: 'Dr. Michael Chen', specialty: 'Psychiatrist', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' }
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
    if (form.value.hasInsurance) {
      if (!form.value.insuranceProvider) {
        errors.value.insuranceProvider = 'Provider is required'
        isValid = false
      }
      if (!form.value.policyNumber) {
        errors.value.policyNumber = 'Policy number is required'
        isValid = false
      }
    }
  }

  return isValid
}

const isStepValid = computed(() => validateStep(currentStep.value))

function nextStep() {
  if (validateStep(currentStep.value)) {
    // Track step completion
    posthog.capture('onboarding_client_step_completed', {
      step_number: currentStep.value,
      step_name: stepTitle.value
    })

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
  posthog.capture('onboarding_client_completed')
  // Here we would save data to backend
  router.push('/app')
}

function skipOnboarding() {
  posthog.capture('onboarding_client_skipped')
  router.push('/app')
}

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Tell us about you'
    case 2: return 'How can we reach you?'
    case 3: return 'Do you use health insurance?'
    case 4: return 'Your professional'
    default: return ''
  }
})

const stepSubtitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'We’ll use this info to set up your profile.'
    case 2: return 'Optional details to help with reminders and scheduling.'
    case 3: return 'Add your insurance to simplify billing.'
    case 4: return 'Confirm who will manage your care.'
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

          <!-- Step 2: Contact -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-5 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number <span class="text-slate-400 font-normal">(Optional)</span></label>
              <div class="relative">
                <Smartphone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Address <span class="text-slate-400 font-normal">(Optional)</span></label>
              <div class="relative">
                <MapPin class="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea 
                  v-model="form.address"
                  rows="3"
                  placeholder="Street address, City, Zip"
                  class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Step 3: Insurance -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-6 py-2">
            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-primary-600">
                  <Shield class="w-5 h-5" />
                </div>
                <span class="text-sm font-medium text-slate-900">I use health insurance</span>
              </div>
              <button 
                @click="form.hasInsurance = !form.hasInsurance"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="form.hasInsurance ? 'bg-primary-600' : 'bg-slate-200'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out"
                  :class="form.hasInsurance ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>

            <div v-if="form.hasInsurance" class="space-y-4 animate-fade-in-down">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Insurance Provider</label>
                <select 
                  v-model="form.insuranceProvider"
                  class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                  :class="errors.insuranceProvider ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
                  <option value="" disabled>Select provider</option>
                  <option value="Blue Cross">Blue Cross</option>
                  <option value="Aetna">Aetna</option>
                  <option value="Cigna">Cigna</option>
                  <option value="UnitedHealthcare">UnitedHealthcare</option>
                </select>
                <p v-if="errors.insuranceProvider" class="text-xs text-red-500 mt-1">{{ errors.insuranceProvider }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Policy Number</label>
                <input 
                  v-model="form.policyNumber"
                  type="text" 
                  placeholder="e.g. ABC123456789"
                  class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  :class="errors.policyNumber ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
                <p v-if="errors.policyNumber" class="text-xs text-red-500 mt-1">{{ errors.policyNumber }}</p>
              </div>
            </div>
          </div>

          <!-- Step 4: Professional -->
          <div v-else-if="currentStep === 4" key="step4" class="space-y-5 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Assigned Professional</label>
              <div class="relative">
                <Stethoscope class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  v-model="form.professionalId"
                  disabled
                  class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 appearance-none cursor-not-allowed"
                >
                  <option v-for="pro in professionals" :key="pro.id" :value="pro.id">{{ pro.name }}</option>
                </select>
              </div>
              <p class="text-xs text-slate-400 mt-1">Assigned by clinic</p>
            </div>

            <!-- Professional Card -->
            <div class="p-4 border border-slate-200 rounded-xl flex items-center gap-4 bg-slate-50/50">
              <img :src="professionals[0]?.avatar" class="w-12 h-12 rounded-full bg-slate-200 object-cover" />
              <div>
                <h3 class="font-semibold text-slate-900">{{ professionals[0]?.name }}</h3>
                <p class="text-sm text-slate-500">{{ professionals[0]?.specialty }}</p>
              </div>
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

.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
