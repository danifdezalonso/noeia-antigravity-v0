<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Menu, X, ChevronDown, Sparkles, Smartphone, Building, ArrowRight, Calendar, CheckCircle2, Rocket, User, Users, BookOpen, FileText, Activity, HelpCircle, History, Mail } from 'lucide-vue-next'

import posthog from 'posthog-js'

const trackCta = (text: string, destination: string) => {
  posthog.capture('cta_clicked', {
    cta_location: 'navbar',
    cta_text: text,
    cta_destination: destination
  })
}

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
  { name: 'Pricing', href: '/pricing', hasDropdown: false },
  { name: 'Resources', href: '/resources', hasDropdown: true },
]

// Navigation Data
const productMenu = {
  columns: [
    {
      title: 'Platform',
      items: [
        { 
          name: 'Website platform', 
          href: '/product/website', 
          description: 'Desktop workspace for clinics.',
          icon: Building,
          color: 'bg-blue-100 text-blue-600'
        },
        { 
          name: 'Mobile Apps', 
          href: '/product/app', 
          description: 'For patients and doctors.',
          icon: Smartphone,
          color: 'bg-purple-100 text-purple-600'
        },
        { 
          name: 'AI Assistant', 
          href: '/product/ai', 
          description: 'NoeIA, your clinical co-pilot.',
          icon: Sparkles,
          color: 'bg-emerald-100 text-emerald-600'
        },
        { 
          name: 'AI Agents', 
          href: '/product/agents', 
          description: 'Automated billing and revenue.',
          icon: Sparkles,
          color: 'bg-indigo-100 text-indigo-600'
        },
      ]
    },
    {
      title: 'Features',
      items: [
        { name: 'Calendar & scheduling', href: '/product/calendar', description: 'Smart scheduling for clinics.' },
        { name: 'Client records', href: '/product/records', description: 'Timelines and history.' },
        { name: 'Offices & rooms', href: '/product/offices', description: 'Space management.' },
        { name: 'Admin & billing', href: '/product/admin', description: 'Invoices and revenue.' },
        { name: 'Security', href: '/product/security', description: 'Bank-grade protection.' },
      ]
    }
  ],
  featured: {
    title: 'New: AI Agents',
    description: 'Your 24/7 billing and revenue co-workers handle invoices and collections.',
    image: '/images/ai-agents.png', // Placeholder
    color: 'bg-gradient-to-br from-blue-500 to-cyan-400'
  },
  bottomBar: {
    label: 'GUIDE',
    text: 'What is Revenue Automation?',
    href: '/resources/revenue-automation'
  }
}

const psychologistsMenu = {
  columns: [
    {
      title: 'Overview',
      items: [
        { name: 'Why Noeia', href: '/for-psychologists', description: 'Reduce admin, stay in control.', icon: CheckCircle2, color: 'bg-orange-100 text-orange-600' },
        { name: 'Daily workflow', href: '/for-psychologists/workflow', description: 'Calendar → sessions → notes.', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
        { name: 'Getting started', href: '/for-psychologists/getting-started', description: 'Solo practice setup guide.', icon: Rocket, color: 'bg-pink-100 text-pink-600' },
      ]
    },
    {
      title: 'Deep Dive',
      items: [
        { name: 'Records & docs', href: '/for-psychologists/records', description: 'Structure your notes.' },
        { name: 'AI for notes', href: '/for-psychologists/ai', description: 'NoeIA as your assistant.' },
        { name: 'Patient portal', href: '/for-psychologists/portal', description: 'Control what patients see.' },
      ]
    }
  ],
  featured: {
    title: 'Meet NoeIA',
    description: 'See how AI can save you 10 hours a week on documentation.',
    color: 'bg-gradient-to-br from-purple-600 to-indigo-500'
  },
  bottomBar: {
    label: 'GUIDE',
    text: 'Switching from paper notes to digital',
    href: '/resources/switching-guide'
  }
}

const clinicsMenu = {
  columns: [
    {
      title: 'Management',
      items: [
        { name: 'Clinic overview', href: '/for-clinics', description: 'Run a modern therapy clinic on one platform.', icon: Building, color: 'bg-blue-100 text-blue-600' },
        { name: 'Team & roles', href: '/for-clinics/team', description: 'Manage doctors, managers, and admins.', icon: Users, color: 'bg-purple-100 text-purple-600' },
        { name: 'Onboarding', href: '/for-clinics/onboarding', description: 'From first setup to full rollout.', icon: Rocket, color: 'bg-pink-100 text-pink-600' },
      ]
    },
    {
      title: 'Operations',
      items: [
        { name: 'Offices & rooms', href: '/for-clinics/offices', description: 'Organize physical spaces and avoid clashes.' },
        { name: 'Global calendar', href: '/for-clinics/calendar', description: 'Per doctor, per room, per modality.' },
        { name: 'Billing & reporting', href: '/for-clinics/billing', description: 'See revenue by doctor and period.' },
      ]
    }
  ],
  featured: {
    title: 'Clinic OS',
    description: 'The operating system for modern mental health practices.',
    color: 'bg-gradient-to-br from-indigo-500 to-blue-500'
  },
  bottomBar: {
    label: 'GUIDE',
    text: 'Scaling from solo to group practice',
    href: '/resources/scaling-guide'
  }
}

const patientsMenu = {
  columns: [
    {
      title: 'Overview',
      items: [
        { name: 'Overview', href: '/for-patients', description: 'What Noeia looks like for patients.', icon: User, color: 'bg-blue-100 text-blue-600' },
        { name: 'Patient app', href: '/for-patients/app', description: 'Booking, chat, and a clear view of therapy.', icon: Smartphone, color: 'bg-purple-100 text-purple-600' },
        { name: 'Getting started', href: '/for-patients/getting-started', description: 'What to expect as a patient using Noeia.', icon: Rocket, color: 'bg-pink-100 text-pink-600' },
      ]
    },
    {
      title: 'Features',
      items: [
        { name: 'Booking & calendar', href: '/for-patients/booking', description: 'See availability and manage your sessions.' },
        { name: 'History & progress', href: '/for-patients/history', description: 'Follow your sessions and improvements over time.' },
        { name: 'Exercises & guidance', href: '/for-patients/exercises', description: 'Keep your homework and tools in one place.' },
        { name: 'Privacy & data', href: '/for-patients/privacy', description: 'How your information is handled and protected.' },
      ]
    }
  ],
  featured: {
    title: 'Your Safe Space',
    description: 'Experience therapy with tools designed for your privacy and progress.',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-400'
  },
  bottomBar: {
    label: 'HELP',
    text: 'How to prepare for your first session',
    href: '/resources/first-session-guide'
  }
}

const resourcesMenu = {
  columns: [
    {
      title: 'Learning',
      items: [
        { name: 'Overview', href: '/resources', description: 'Guides, updates, and help in one place.', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
        { name: 'Guides', href: '/resources/guides', description: 'Deep dives on workflows and best practices.', icon: FileText, color: 'bg-indigo-100 text-indigo-600' },
        { name: 'Blog & articles', href: '/resources/blog', description: 'Thoughts on therapy workflows and tools.', icon: Activity, color: 'bg-emerald-100 text-emerald-600' },
      ]
    },
    {
      title: 'Support & Updates',
      items: [
        { name: 'Help center', href: '/resources/help', description: 'FAQs and how-to answers.', icon: HelpCircle, color: 'bg-orange-100 text-orange-600' },
        { name: 'Product updates', href: '/resources/updates', description: 'What’s new in Noeia.', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
        { name: 'Changelog', href: '/resources/changelog', description: 'Raw release notes by date.', icon: History, color: 'bg-slate-100 text-slate-600' },
        { name: 'Contact & support', href: '/resources/contact', description: 'Talk to the team or request help.', icon: Mail, color: 'bg-pink-100 text-pink-600' },
      ]
    }
  ],
  featured: {
    title: 'Featured Guide',
    description: 'Learn how to set up your first clinic in Noeia with our comprehensive walkthrough.',
    color: 'bg-gradient-to-br from-indigo-500 to-violet-500'
  },
  bottomBar: {
    label: 'SUPPORT',
    text: 'Need help setting up?',
    href: '/resources/contact'
  }
}

const currentMegaMenu = computed(() => {
  if (activeDropdown.value === 'Product') return productMenu
  if (activeDropdown.value === 'For psychologists') return psychologistsMenu
  if (activeDropdown.value === 'For clinics') return clinicsMenu
  if (activeDropdown.value === 'For patients') return patientsMenu
  if (activeDropdown.value === 'Resources') return resourcesMenu
  return null
})
</script>

<template>
  <header 
    class="fixed top-0 z-50 w-full transition-all duration-300"
    :class="isScrolled || activeDropdown ? 'bg-white border-b border-slate-200 shadow-sm py-3' : 'bg-transparent border-transparent py-5'"
    @mouseleave="activeDropdown = null"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center relative z-50 h-20">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group mr-12 shrink-0">
        <span class="font-bold text-xl tracking-tight text-primary-500 group-hover:text-primary-600 transition-colors">noeia</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <div 
          v-for="item in navItems" 
          :key="item.name"
          class="relative group"
          @mouseenter="item.hasDropdown ? activeDropdown = item.name : activeDropdown = null"
        >
          <RouterLink 
            :to="item.href" 
            class="text-sm font-medium transition-all duration-200 flex items-center gap-1 px-4 py-2 rounded-full hover:bg-slate-50"
            :class="activeDropdown === item.name ? 'text-primary-600 bg-slate-50' : 'text-slate-600'"
          >
            {{ item.name }}
            <ChevronDown 
              v-if="item.hasDropdown" 
              class="w-3.5 h-3.5 transition-transform duration-200 opacity-50 group-hover:opacity-100"
              :class="{ 'rotate-180': activeDropdown === item.name }"
            />
          </RouterLink>
        </div>
      </nav>

      <!-- Actions -->
      <div class="hidden lg:flex items-center gap-4 ml-auto">
        <RouterLink 
          to="/login" 
          class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors px-4 py-2"
          @click="trackCta('Sign in', '/login')"
        >
          Sign in
        </RouterLink>
        <RouterLink to="/login" @click="trackCta('Get a demo', '/login')">
          <Button class="rounded-full px-6 bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-primary-500/25 transition-all">
            Get a demo <ArrowRight class="w-4 h-4 ml-2" />
          </Button>
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden ml-auto p-2 text-slate-600 hover:text-primary-600 transition-colors">
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
        class="absolute top-full left-0 w-full z-40"
        @mouseenter="activeDropdown = activeDropdown"
        @mouseleave="activeDropdown = null"
      >
        <!-- Generic Mega Menu Layout -->
        <div 
          v-if="(activeDropdown === 'Product' || activeDropdown === 'For psychologists' || activeDropdown === 'For clinics' || activeDropdown === 'For patients' || activeDropdown === 'Resources') && currentMegaMenu" 
          class="bg-white border-b border-slate-100 shadow-xl"
        >
          <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div class="grid grid-cols-12 gap-12">
              
              <!-- Columns -->
              <div 
                v-for="(col, idx) in currentMegaMenu.columns" 
                :key="idx"
                class="col-span-3"
              >
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">{{ col.title }}</h3>
                <div class="space-y-6">
                  <RouterLink 
                    v-for="item in col.items" 
                    :key="item.name" 
                    :to="item.href"
                    class="group block transform transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div class="flex items-start gap-4">
                      <div v-if="'icon' in item" class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors" :class="'color' in item ? item.color : ''">
                        <component :is="item.icon" class="w-5 h-5" />
                      </div>
                      <div>
                        <div class="font-bold text-slate-900 group-hover:text-primary-600 transition-colors text-sm mb-1">{{ item.name }}</div>
                        <div class="text-xs text-slate-500 group-hover:text-slate-600 transition-colors leading-relaxed">{{ item.description }}</div>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>

              <!-- Featured Card -->
              <div class="col-span-3" v-if="currentMegaMenu.featured">
                <div class="h-full rounded-2xl p-6 relative overflow-hidden group" :class="currentMegaMenu.featured.color">
                  <div class="relative z-10">
                    <div class="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Featured</div>
                    <h3 class="text-white font-bold text-lg mb-2">{{ currentMegaMenu.featured.title }}</h3>
                    <p class="text-white/90 text-sm leading-relaxed mb-4">{{ currentMegaMenu.featured.description }}</p>
                  </div>
                  <!-- Decorative circles -->
                  <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div class="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
                </div>
              </div>

            </div>

            <!-- Bottom Bar -->
            <div v-if="currentMegaMenu.bottomBar" class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span class="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{{ currentMegaMenu.bottomBar.label }}</span>
                <span class="text-sm text-slate-600">{{ currentMegaMenu.bottomBar.text }}</span>
              </div>
              <RouterLink :to="currentMegaMenu.bottomBar.href" class="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 group">
                Read more <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </RouterLink>
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
      <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl lg:hidden flex flex-col p-4 space-y-4 max-h-[80vh] overflow-y-auto">
        <nav class="flex flex-col space-y-2">
          <template v-for="item in navItems" :key="item.name">
            <!-- Product Mobile -->
            <div v-if="item.name === 'Product'" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-3 border-l-2 border-slate-100 ml-2">
                <template v-for="col in productMenu.columns" :key="col.title">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">{{ col.title }}</div>
                  <RouterLink 
                    v-for="subItem in col.items" 
                    :key="subItem.name"
                    :to="subItem.href"
                    @click="isMenuOpen = false"
                    class="block"
                  >
                    <div class="text-sm font-bold text-slate-900">{{ subItem.name }}</div>
                    <div class="text-xs text-slate-500">{{ subItem.description }}</div>
                  </RouterLink>
                </template>
              </div>
            </div>
            <!-- Psychologists Mobile -->
            <div v-else-if="item.name === 'For psychologists'" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-3 border-l-2 border-slate-100 ml-2">
                <template v-for="col in psychologistsMenu.columns" :key="col.title">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">{{ col.title }}</div>
                  <RouterLink 
                    v-for="subItem in col.items" 
                    :key="subItem.name"
                    :to="subItem.href"
                    @click="isMenuOpen = false"
                    class="block"
                  >
                    <div class="text-sm font-bold text-slate-900">{{ subItem.name }}</div>
                    <div class="text-xs text-slate-500">{{ subItem.description }}</div>
                  </RouterLink>
                </template>
              </div>
            </div>
            <!-- For Clinics Mobile -->
            <div v-else-if="item.name === 'For clinics'" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-3 border-l-2 border-slate-100 ml-2">
                <template v-for="col in clinicsMenu.columns" :key="col.title">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">{{ col.title }}</div>
                  <RouterLink 
                    v-for="subItem in col.items" 
                    :key="subItem.name"
                    :to="subItem.href"
                    @click="isMenuOpen = false"
                    class="block"
                  >
                    <div class="text-sm font-bold text-slate-900">{{ subItem.name }}</div>
                    <div class="text-xs text-slate-500">{{ subItem.description }}</div>
                  </RouterLink>
                </template>
              </div>
            </div>
            <!-- For Patients Mobile -->
            <div v-else-if="item.name === 'For patients'" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-3 border-l-2 border-slate-100 ml-2">
                <template v-for="col in patientsMenu.columns" :key="col.title">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">{{ col.title }}</div>
                  <RouterLink 
                    v-for="subItem in col.items" 
                    :key="subItem.name"
                    :to="subItem.href"
                    @click="isMenuOpen = false"
                    class="block"
                  >
                    <div class="text-sm font-bold text-slate-900">{{ subItem.name }}</div>
                    <div class="text-xs text-slate-500">{{ subItem.description }}</div>
                  </RouterLink>
                </template>
              </div>
            </div>
            <!-- Resources Mobile -->
            <div v-else-if="item.name === 'Resources'" class="space-y-2">
              <div class="font-bold text-slate-900 px-2 py-2">{{ item.name }}</div>
              <div class="pl-4 space-y-3 border-l-2 border-slate-100 ml-2">
                <template v-for="col in resourcesMenu.columns" :key="col.title">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">{{ col.title }}</div>
                  <RouterLink 
                    v-for="subItem in col.items" 
                    :key="subItem.name"
                    :to="subItem.href"
                    @click="isMenuOpen = false"
                    class="block"
                  >
                    <div class="text-sm font-bold text-slate-900">{{ subItem.name }}</div>
                    <div class="text-xs text-slate-500">{{ subItem.description }}</div>
                  </RouterLink>
                </template>
              </div>
            </div>
            <!-- Other Links -->
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
          <RouterLink 
            to="/login" 
            @click="() => { isMenuOpen = false; trackCta('Sign in', '/login') }" 
            class="w-full text-center py-2 text-sm font-medium text-slate-500 hover:text-primary-600"
          >
            Sign in
          </RouterLink>
          <RouterLink 
            to="/login" 
            @click="() => { isMenuOpen = false; trackCta('Get a demo', '/login') }" 
            class="w-full flex justify-center"
          >
            <Button class="w-full rounded-full px-6 bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-primary-500/25 transition-all">
              Get a demo <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
