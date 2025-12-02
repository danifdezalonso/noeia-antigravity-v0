<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Menu, X, ChevronDown, Sparkles, Smartphone, Building, FileText, Activity, BookOpen, HelpCircle, Mail, ArrowRight } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeDropdown = ref<string | null>(null)

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = [
  { name: 'Product', href: '/product', hasDropdown: true },
  { name: 'For psychologists', href: '/for-psychologists', hasDropdown: true },
  { name: 'For clinics', href: '/for-clinics', hasDropdown: true },
  { name: 'For patients', href: '/for-patients', hasDropdown: true },
  { name: 'Pricing', href: '/pricing', hasDropdown: true },
  { name: 'Resources', href: '/resources', hasDropdown: true },
]

// Navigation Data
const productMenu = {
  pillars: [
    { 
      name: 'Website platform', 
      href: '/product/website', 
      description: 'Desktop workspace for clinics and professionals.',
      icon: Building,
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      name: 'Apps', 
      href: '/product/app', 
      description: 'Dedicated apps for patients, doctors, and organizations.',
      icon: Smartphone,
      color: 'text-purple-600 bg-purple-50'
    },
    { 
      name: 'AI assistant', 
      href: '/product/ai', 
      description: 'Mia, a context-aware assistant for notes and summaries.',
      icon: Sparkles,
      color: 'text-emerald-600 bg-emerald-50'
    },
  ],
  features: [
    { name: 'Calendar & scheduling', href: '/product/calendar' },
    { name: 'Client records & history', href: '/product/records' },
    { name: 'Offices & rooms', href: '/product/offices' },
    { name: 'Admin & billing', href: '/product/admin' },
    { name: 'Security & data', href: '/product/security' },
  ]
}

const psychologistsMenu = [
  { name: 'Why Noeia', href: '/for-psychologists#why', description: 'For individual professionals' },
  { name: 'Daily workflow', href: '/for-psychologists#workflow', description: 'Calendar → Notes → Follow-up' },
  { name: 'Patient records', href: '/for-psychologists#records', description: 'Documentation examples' },
  { name: 'AI for notes', href: '/for-psychologists#ai', description: 'Automated summaries & reports' },
  { name: 'Patient portal', href: '/for-psychologists#portal', description: 'From the therapist view' },
  { name: 'Getting started', href: '/for-psychologists#start', description: 'Solo practice setup' },
]

const clinicsMenu = [
  { name: 'Clinic overview', href: '/for-clinics#overview', description: 'Multi-professional setup' },
  { name: 'Doctors & roles', href: '/for-clinics#roles', description: 'Admin, manager & therapist roles' },
  { name: 'Offices & rooms', href: '/for-clinics#rooms', description: 'Space management' },
  { name: 'Global calendar', href: '/for-clinics#calendar', description: 'Per doctor or per room' },
  { name: 'Billing & reporting', href: '/for-clinics#billing', description: 'Track revenue by doctor' },
  { name: 'Onboarding', href: '/for-clinics#onboarding', description: 'Migrating a new clinic' },
]

const patientsMenu = [
  { name: 'App overview', href: '/for-patients#app', description: 'Your mental health pocket companion' },
  { name: 'Booking & calendar', href: '/for-patients#booking', description: 'Manage your appointments' },
  { name: 'Session history', href: '/for-patients#history', description: 'Summaries & progress' },
  { name: 'Chat with therapist', href: '/for-patients#chat', description: 'Secure messaging' },
  { name: 'Exercises & homework', href: '/for-patients#homework', description: 'Track your progress' },
  { name: 'Privacy FAQ', href: '/for-patients#privacy', description: 'How we handle your data' },
]

const pricingMenu = [
  { name: 'Plans & features', href: '/pricing#plans', description: 'Full feature matrix' },
  { name: 'Solo vs Clinic', href: '/pricing#comparison', description: 'Which plan is right for you?' },
  { name: 'Current offer', href: '/pricing#offer', description: 'Beta pricing details' },
  { name: 'Billing FAQ', href: '/pricing#faq', description: 'Invoices & payments' },
]

const resourcesMenu = [
  { name: 'Guides & how-tos', icon: BookOpen, href: '/resources#guides', color: 'text-indigo-600 bg-indigo-50' },
  { name: 'Product updates', icon: Activity, href: '/resources#updates', color: 'text-pink-600 bg-pink-50' },
  { name: 'Blog', icon: FileText, href: '/resources#blog', color: 'text-teal-600 bg-teal-50' },
  { name: 'Help center', icon: HelpCircle, href: '/resources#help', color: 'text-cyan-600 bg-cyan-50' },
  { name: 'Contact support', icon: Mail, href: '/resources#contact', color: 'text-blue-600 bg-blue-50' },
]

</script>

<template>
  <header 
    class="fixed top-0 z-50 w-full transition-all duration-300"
    :class="isScrolled || activeDropdown ? 'bg-white border-b border-slate-200 shadow-sm py-3' : 'bg-transparent border-transparent py-5'"
    @mouseleave="activeDropdown = null"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative z-50">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <span class="font-bold text-xl tracking-tight text-primary-500 group-hover:text-primary-600 transition-colors">noeia</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <div 
          v-for="item in navItems" 
          :key="item.name"
          class="relative"
          @mouseenter="item.hasDropdown ? activeDropdown = item.name : activeDropdown = null"
        >
          <RouterLink 
            :to="item.href" 
            class="text-sm font-medium transition-colors flex items-center gap-1 py-2"
            :class="activeDropdown === item.name ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'"
          >
            {{ item.name }}
            <ChevronDown v-if="item.hasDropdown" class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': activeDropdown === item.name }" />
          </RouterLink>
        </div>
      </nav>

      <!-- Actions -->
      <div class="hidden lg:flex items-center gap-4">
        <RouterLink to="/login" class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
          Sign in
        </RouterLink>
        <RouterLink to="/login">
          <Button size="sm" class="rounded-full px-6 bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            Get a demo
          </Button>
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden p-2 text-slate-600 hover:text-primary-600 transition-colors">
        <Menu v-if="!isMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mega Menu Dropdowns -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="activeDropdown" 
        class="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl pt-6 pb-8 z-40"
        @mouseenter="activeDropdown = activeDropdown"
        @mouseleave="activeDropdown = null"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          
          <!-- Product Menu -->
          <div v-if="activeDropdown === 'Product'" class="grid grid-cols-12 gap-8">
            <!-- Pillars (Left Column) -->
            <div class="col-span-7 grid gap-4">
               <RouterLink 
                  v-for="pillar in productMenu.pillars" 
                  :key="pillar.name"
                  :to="pillar.href"
                  class="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 relative overflow-hidden"
                >
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors" :class="pillar.color">
                    <component :is="pillar.icon" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{{ pillar.name }}</div>
                    <div class="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">{{ pillar.description }}</div>
                  </div>
                </RouterLink>
            </div>

            <!-- Core Features (Right Column) -->
            <div class="col-span-5 border-l border-slate-100 pl-8">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">More features</h3>
              <div class="space-y-2">
                <RouterLink 
                  v-for="feature in productMenu.features" 
                  :key="feature.name" 
                  :to="feature.href"
                  class="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span class="text-sm font-medium text-slate-700 group-hover:text-primary-600 transition-colors">{{ feature.name }}</span>
                  <ArrowRight class="w-4 h-4 text-slate-300 group-hover:text-primary-400 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-200" />
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- For Psychologists Menu -->
          <div v-if="activeDropdown === 'For psychologists'" class="grid grid-cols-3 gap-8">
            <RouterLink 
              v-for="item in psychologistsMenu" 
              :key="item.name"
              :to="item.href"
              class="group block p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div class="text-base font-bold text-slate-900 group-hover:text-primary-600 mb-1">{{ item.name }}</div>
              <div class="text-sm text-slate-500">{{ item.description }}</div>
            </RouterLink>
          </div>

          <!-- For Clinics Menu -->
          <div v-if="activeDropdown === 'For clinics'" class="grid grid-cols-3 gap-8">
             <RouterLink 
              v-for="item in clinicsMenu" 
              :key="item.name"
              :to="item.href"
              class="group block p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div class="text-base font-bold text-slate-900 group-hover:text-primary-600 mb-1">{{ item.name }}</div>
              <div class="text-sm text-slate-500">{{ item.description }}</div>
            </RouterLink>
          </div>

          <!-- For Patients Menu -->
          <div v-if="activeDropdown === 'For patients'" class="grid grid-cols-3 gap-8">
             <RouterLink 
              v-for="item in patientsMenu" 
              :key="item.name"
              :to="item.href"
              class="group block p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div class="text-base font-bold text-slate-900 group-hover:text-primary-600 mb-1">{{ item.name }}</div>
              <div class="text-sm text-slate-500">{{ item.description }}</div>
            </RouterLink>
          </div>

          <!-- Pricing Menu -->
          <div v-if="activeDropdown === 'Pricing'" class="grid grid-cols-4 gap-6">
             <RouterLink 
              v-for="item in pricingMenu" 
              :key="item.name"
              :to="item.href"
              class="group block p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 text-center"
            >
              <div class="text-base font-bold text-slate-900 group-hover:text-primary-600 mb-1">{{ item.name }}</div>
              <div class="text-sm text-slate-500">{{ item.description }}</div>
            </RouterLink>
          </div>

          <!-- Resources Menu -->
          <div v-if="activeDropdown === 'Resources'" class="grid grid-cols-5 gap-4">
            <RouterLink 
              v-for="item in resourcesMenu" 
              :key="item.name"
              :to="item.href"
              class="group flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors" :class="item.color">
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <div class="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">{{ item.name }}</div>
            </RouterLink>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl lg:hidden flex flex-col p-4 space-y-4 max-h-[80vh] overflow-y-auto">
        <nav class="flex flex-col space-y-2">
          <template v-for="item in navItems" :key="item.name">
            <div v-if="item.name === 'Product'" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-3 border-l-2 border-slate-100 ml-2">
                <!-- Pillars -->
                <RouterLink 
                  v-for="pillar in productMenu.pillars" 
                  :key="pillar.name"
                  :to="pillar.href"
                  @click="isMenuOpen = false"
                  class="block"
                >
                  <div class="text-sm font-bold text-slate-900">{{ pillar.name }}</div>
                  <div class="text-xs text-slate-500">{{ pillar.description }}</div>
                </RouterLink>
                <!-- Features -->
                 <div class="pt-2">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Features</div>
                    <RouterLink 
                      v-for="feature in productMenu.features" 
                      :key="feature.name"
                      :to="feature.href"
                      @click="isMenuOpen = false"
                      class="block text-sm text-slate-600 py-1"
                    >
                      {{ feature.name }}
                    </RouterLink>
                 </div>
              </div>
            </div>
            <div v-else class="space-y-2">
              <RouterLink 
                :to="item.href"
                @click="isMenuOpen = false"
                class="font-bold text-slate-900 px-2 py-2 block hover:text-primary-600"
              >
                {{ item.name }}
              </RouterLink>
            </div>
          </template>
        </nav>
        <div class="flex flex-col gap-3 pt-4 border-t border-slate-100">
          <RouterLink to="/login" @click="isMenuOpen = false" class="w-full text-center py-2 text-sm font-medium text-slate-500 hover:text-primary-600">
            Sign in
          </RouterLink>
          <RouterLink to="/login" @click="isMenuOpen = false" class="w-full">
            <Button block class="rounded-full bg-primary-500 hover:bg-primary-600">Get a demo</Button>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
