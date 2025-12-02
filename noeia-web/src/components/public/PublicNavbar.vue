<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Menu, X, ChevronDown, Calendar, Sparkles, Users, CreditCard, Shield, Smartphone, ArrowRight } from 'lucide-vue-next'

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
  { name: 'For psychologists', href: '/for-psychologists' },
  { name: 'For clinics', href: '/for-clinics' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
]

// Mega Menu Data
const productFeatures = [
  { name: 'Smart Calendar', description: 'Automated scheduling & reminders', icon: Calendar, href: '/product#calendar', color: 'text-blue-600 bg-blue-50' },
  { name: 'AI Documentation', description: 'Notes that write themselves', icon: Sparkles, href: '/product#ai', color: 'text-purple-600 bg-purple-50' },
  { name: 'Client Portal', description: 'Secure messaging & intake', icon: Users, href: '/product#portal', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Billing & Invoicing', description: 'Get paid faster', icon: CreditCard, href: '/product#billing', color: 'text-amber-600 bg-amber-50' },
]

const platformLinks = [
  { name: 'Security & HIPAA', href: '/security' },
  { name: 'Mobile App', href: '/mobile' },
  { name: 'Integrations', href: '/integrations' },
  { name: 'API Documentation', href: '/docs' },
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
      <nav class="hidden md:flex items-center gap-8">
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
      <div class="hidden md:flex items-center gap-4">
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
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-slate-600 hover:text-primary-600 transition-colors">
        <Menu v-if="!isMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mega Menu Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="activeDropdown === 'Product'" 
        class="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl pt-4 pb-12 z-40"
        @mouseenter="activeDropdown = 'Product'"
        @mouseleave="activeDropdown = null"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-12 gap-12">
          <!-- Products Column -->
          <div class="col-span-4">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Products</h3>
            <div class="space-y-2">
              <RouterLink 
                v-for="feature in productFeatures" 
                :key="feature.name" 
                :to="feature.href"
                class="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors" :class="feature.color">
                  <component :is="feature.icon" class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">{{ feature.name }}</div>
                  <div class="text-sm text-slate-500">{{ feature.description }}</div>
                </div>
              </RouterLink>
            </div>
          </div>

          <!-- Platform Column -->
          <div class="col-span-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Platform</h3>
            <ul class="space-y-4">
              <li v-for="link in platformLinks" :key="link.name">
                <RouterLink 
                  :to="link.href" 
                  class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors block"
                >
                  {{ link.name }}
                </RouterLink>
              </li>
            </ul>
            
            <div class="mt-8 pt-8 border-t border-slate-100">
              <RouterLink to="/docs" class="inline-flex items-center text-sm font-medium text-slate-900 hover:text-primary-600 transition-colors">
                View Documentation <ArrowRight class="w-4 h-4 ml-1" />
              </RouterLink>
            </div>
          </div>

          <!-- Featured Card -->
          <div class="col-span-5">
            <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-6 h-full relative overflow-hidden group">
              <div class="relative z-10">
                <div class="w-10 h-10 rounded-lg bg-primary-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
                  <Sparkles class="w-5 h-5" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Meet Mia AI</h3>
                <p class="text-slate-600 text-sm mb-6 max-w-xs">
                  Your 24/7 clinical assistant. Mia drafts session notes, treatment plans, and letters in seconds.
                </p>
                
                <!-- Mock Chat UI -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 max-w-sm transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold">M</div>
                    <span class="text-xs font-medium text-slate-500">Mia</span>
                  </div>
                  <div class="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg rounded-tl-none mb-2">
                    I've drafted a summary for Sarah's session based on your notes.
                  </div>
                  <div class="flex justify-end">
                     <div class="text-xs text-white bg-primary-600 px-3 py-1.5 rounded-full">Review Draft</div>
                  </div>
                </div>
              </div>
              
              <!-- Decorative Blob -->
              <div class="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
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
      <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl md:hidden flex flex-col p-4 space-y-4 max-h-[80vh] overflow-y-auto">
        <nav class="flex flex-col space-y-2">
          <template v-for="item in navItems" :key="item.name">
            <div v-if="item.hasDropdown" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-2 border-l-2 border-slate-100 ml-2">
                <RouterLink 
                  v-for="feature in productFeatures" 
                  :key="feature.name"
                  :to="feature.href"
                  @click="isMenuOpen = false"
                  class="block text-sm text-slate-600 py-1"
                >
                  {{ feature.name }}
                </RouterLink>
              </div>
            </div>
            <RouterLink 
              v-else
              :to="item.href" 
              @click="isMenuOpen = false"
              class="text-base font-medium text-slate-600 hover:text-primary-600 py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {{ item.name }}
            </RouterLink>
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
