<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ChevronLeft, ArrowRight, User, Mail, Lock, Building, Upload, X, Check, Eye, EyeOff } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const currentStep = ref(1)
const totalSteps = 4
const direction = ref('forward')

// Form Data
const form = ref({
  // Step 1: Account
  fullName: user.value?.user_metadata?.full_name || '',
  email: user.value?.email || '',
  password: '',
  
  // Step 2: Organization
  orgName: '',
  orgLogo: null as File | null,
  orgLogoPreview: '',
  referralSource: '',
  
  // Step 3: Team
  teamInvites: [] as string[],
  currentInvite: '',
  
  // Step 4: Plan
  selectedPlan: 'free' // 'free' | 'premium'
})

const showPassword = ref(false)

const referralOptions = [
  'Search Engine (Google, Bing)',
  'Social Media (LinkedIn, Twitter)',
  'Professional Network / Colleague',
  'Conference or Event',
  'Advertisement',
  'Other'
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
    if (!form.value.email.trim()) {
      errors.value.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errors.value.email = 'Invalid email address'
      isValid = false
    }
    if (!form.value.password) {
      errors.value.password = 'Password is required'
      isValid = false
    } else if (form.value.password.length < 8) {
      errors.value.password = 'Password must be at least 8 characters'
      isValid = false
    }
  } else if (step === 2) {
    if (!form.value.orgName.trim()) {
      errors.value.orgName = 'Organization name is required'
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

const finishOnboarding = async () => {
  // Save data...
  router.push('/app/org/dashboard')
}

function skipOnboarding() {
  router.push('/app/org/dashboard')
}

// Team Invites Logic
function addInvite() {
  const email = form.value.currentInvite.trim()
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (!form.value.teamInvites.includes(email)) {
      form.value.teamInvites.push(email)
    }
    form.value.currentInvite = ''
  }
}

function removeInvite(email: string) {
  form.value.teamInvites = form.value.teamInvites.filter(e => e !== email)
}

// Logo Upload Logic
function handleLogoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    form.value.orgLogo = file
    form.value.orgLogoPreview = URL.createObjectURL(file)
  }
}

function removeLogo() {
  form.value.orgLogo = null
  form.value.orgLogoPreview = ''
}

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Create your account'
    case 2: return 'Organization details'
    case 3: return 'Invite your professionals'
    case 4: return 'Choose your plan'
    default: return ''
  }
})

const stepSubtitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Establish the legal holder of the organization.'
    case 2: return 'Tell us about your clinic or practice.'
    case 3: return 'Send invites to your team members.'
    case 4: return 'Select the plan that fits your needs.'
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
    <div class="w-full max-w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col h-[650px] relative overflow-hidden">
      
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
          
          <!-- Step 1: Account -->
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
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.email"
                  type="email" 
                  class="w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  :class="errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
              </div>
              <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full pl-9 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  :class="errors.password ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
                <button 
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
                </button>
              </div>
              <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
              <p v-else class="text-xs text-slate-400 mt-1">Min. 8 characters with 1 special character.</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Where did you hear about us? <span class="text-slate-400 font-normal">(Optional)</span></label>
              <div class="relative">
                <select 
                  v-model="form.referralSource"
                  class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white appearance-none"
                  :class="errors.referralSource ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
                  <option value="" disabled>Select an option</option>
                  <option v-for="option in referralOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Organization -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-5 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
              <div class="relative">
                <Building class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="form.orgName"
                  type="text" 
                  placeholder="e.g. City Wellness Clinic"
                  class="w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  :class="errors.orgName ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'"
                >
              </div>
              <p v-if="errors.orgName" class="text-xs text-red-500 mt-1">{{ errors.orgName }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Organization Logo <span class="text-slate-400 font-normal">(Optional)</span></label>
              
              <div v-if="!form.orgLogoPreview" class="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer relative h-40">
                <input type="file" accept="image/*" @change="handleLogoUpload" class="absolute inset-0 opacity-0 cursor-pointer" />
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 text-slate-400">
                  <Upload class="w-6 h-6" />
                </div>
                <p class="text-sm text-slate-600 font-medium">Click to upload logo</p>
                <p class="text-xs text-slate-400">Square crop recommended</p>
              </div>

              <div v-else class="relative w-32 h-32 mx-auto animate-fade-in-scale">
                <img :src="form.orgLogoPreview" class="w-full h-full object-cover rounded-xl shadow-sm border border-slate-200" />
                <button 
                  @click="removeLogo"
                  class="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md border border-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Step 3: Team -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-6 py-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Invite Professionals</label>
              <div class="flex gap-2 mb-2">
                <div class="relative flex-1">
                  <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    v-model="form.currentInvite"
                    @keydown.enter.prevent="addInvite"
                    type="email" 
                    placeholder="colleague@example.com"
                    class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  >
                </div>
                <Button @click="addInvite" :disabled="!form.currentInvite" variant="outline">
                  Add
                </Button>
              </div>
              <p class="text-xs text-slate-400">Invitations will be sent upon completion.</p>
            </div>

            <!-- Chips -->
            <div v-if="form.teamInvites.length > 0" class="flex flex-wrap gap-2 animate-fade-in">
              <div 
                v-for="email in form.teamInvites" 
                :key="email"
                class="flex items-center gap-1 pl-3 pr-1 py-1 bg-primary-50 text-primary-700 rounded-full text-sm border border-primary-100 animate-scale-in"
              >
                <span>{{ email }}</span>
                <button @click="removeInvite(email)" class="p-1 hover:bg-primary-100 rounded-full transition-colors">
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div v-else class="text-center py-8 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              No invitations added yet.
            </div>
          </div>

          <!-- Step 4: Plan -->
          <div v-else-if="currentStep === 4" key="step4" class="space-y-4 py-2">
            
            <!-- Free Plan -->
            <div 
              @click="form.selectedPlan = 'free'"
              class="relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              :class="form.selectedPlan === 'free' ? 'border-primary-600 bg-primary-50/30' : 'border-slate-200 hover:border-slate-300'"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="font-bold text-slate-900">Free Starter</h3>
                  <p class="text-sm text-slate-500">Perfect for solo practitioners.</p>
                </div>
                <div v-if="form.selectedPlan === 'free'" class="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white">
                  <Check class="w-4 h-4" />
                </div>
                <div v-else class="w-6 h-6 rounded-full border-2 border-slate-300"></div>
              </div>
              <div class="text-2xl font-bold text-slate-900 mb-4">€0<span class="text-sm font-normal text-slate-500">/mo</span></div>
              <ul class="space-y-2 text-sm text-slate-600">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-green-500" /> Up to 5 clients</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-green-500" /> Basic scheduling</li>
              </ul>
            </div>

            <!-- Premium Plan -->
            <div 
              @click="form.selectedPlan = 'premium'"
              class="relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              :class="form.selectedPlan === 'premium' ? 'border-primary-600 bg-primary-50/30' : 'border-slate-200 hover:border-slate-300'"
            >
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-sm">
                RECOMMENDED
              </div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="font-bold text-slate-900">Professional</h3>
                  <p class="text-sm text-slate-500">For growing clinics.</p>
                </div>
                <div v-if="form.selectedPlan === 'premium'" class="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white">
                  <Check class="w-4 h-4" />
                </div>
                <div v-else class="w-6 h-6 rounded-full border-2 border-slate-300"></div>
              </div>
              <div class="text-2xl font-bold text-slate-900 mb-4">€29<span class="text-sm font-normal text-slate-500">/mo</span></div>
              <ul class="space-y-2 text-sm text-slate-600">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-green-500" /> Unlimited clients</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-green-500" /> Advanced analytics</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-green-500" /> Team management</li>
              </ul>
            </div>

            <p class="text-xs text-center text-slate-400 mt-4">
              No credit card required for trial. You can upgrade later.
            </p>
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

.animate-scale-in {
  animation: scaleIn 0.15s ease-out forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
