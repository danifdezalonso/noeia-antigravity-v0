<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  Menu,
  Clock,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
  MessageSquare
} from 'lucide-vue-next'

import OrgSelector from '@/components/OrgSelector.vue'
import GlobalSearch from '@/components/GlobalSearch.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import HelpModal from '@/components/HelpModal.vue'
import AIAssistant from '@/components/AIAssistant.vue'
import CreateClientModal from '@/components/CreateClientModal.vue'

const route = useRoute()
const store = useAppStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isSidebarOpen = ref(false)
const isFeedbackOpen = ref(false)
const isHelpOpen = ref(false)
const isQuickAddOpen = ref(false)
const isClientModalOpen = ref(false)

onMounted(() => {
  store.fetchAll()
})

const defaultNavigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Calendar', href: '/app/calendar', icon: Calendar },
  { name: 'Sessions', href: '/app/sessions', icon: Clock },
  { name: 'Patients', href: '/app/clients', icon: Users },
  { name: 'Billing', href: '/app/billing', icon: CreditCard },
  { name: 'IA', href: '/app/ai', icon: Sparkles },
  { name: 'Settings', href: '/app/settings', icon: Settings },
]

const clientNavigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Calendar', href: '/app/calendar', icon: Calendar },
  { name: 'Messages', href: '/app/messages', icon: MessageSquare },
  { name: 'Payments', href: '/app/billing', icon: CreditCard },
  { name: 'Settings', href: '/app/settings', icon: Settings },
]

const navigation = computed(() => {
  const role = user.value?.app_metadata?.role
  if (role === 'client') {
    return clientNavigation
  }
  return defaultNavigation
})

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    
    <!-- Top Header -->
    <header class="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-50">
      
      <!-- Left: Logo & Org -->
      <div class="flex items-center gap-4">
        <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden text-slate-500 hover:text-slate-700">
          <Menu class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3">
          <!-- Logo -->
          <div class="w-8 h-8 rounded bg-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <!-- Divider -->
          <div class="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <!-- Org Selector -->
          <OrgSelector class="hidden sm:block" />
        </div>
      </div>

      <!-- Right: Search, Actions & Profile -->
      <div class="flex items-center gap-2 sm:gap-4">
        
        <div class="hidden md:block">
          <GlobalSearch />
        </div>

        <!-- Quick Add Button -->
        <div class="relative hidden sm:block">
          <button 
            @click="isQuickAddOpen = !isQuickAddOpen"
            class="flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            <Plus class="w-4 h-4" />
            <span>Add</span>
          </button>

          <div v-if="isQuickAddOpen" class="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
            <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors flex items-center gap-2">
              <Clock class="w-4 h-4" />
              Session
            </button>
            <button 
              @click="isQuickAddOpen = false; isClientModalOpen = true"
              class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors flex items-center gap-2"
            >
              <Users class="w-4 h-4" />
              Patient
            </button>
            <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors flex items-center gap-2">
              <CreditCard class="w-4 h-4" />
              Bill
            </button>
          </div>
          
          <!-- Backdrop -->
          <div v-if="isQuickAddOpen" @click="isQuickAddOpen = false" class="fixed inset-0 z-40 bg-transparent cursor-default"></div>
        </div>

        <!-- Mobile Search Trigger (visible only on mobile) -->
        <button class="md:hidden p-2 text-slate-500 hover:text-slate-700">
          <Search class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-1 sm:gap-2 border-r border-slate-200 pr-2 sm:pr-4 mr-1 sm:mr-2">
          <button 
            @click="isFeedbackOpen = true"
            class="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors text-sm font-medium hidden sm:flex items-center gap-2"
          >
            Feedback
          </button>
          
          <button 
            @click="isHelpOpen = true"
            class="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <HelpCircle class="w-5 h-5" />
          </button>

          <AIAssistant />
        </div>

        <ProfileDropdown />
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <aside 
        class="w-64 bg-slate-50 border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col"
      >
        <nav class="flex-1 px-3 py-6 space-y-1">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all group"
            :class="isActive(item.href) 
              ? 'bg-white text-primary-700 shadow-sm border border-slate-200' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
          >
            <component 
              :is="item.icon" 
              class="w-4 h-4 mr-3 transition-colors"
              :class="isActive(item.href) ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-500'"
            />
            {{ item.name }}
            <ChevronRight v-if="isActive(item.href)" class="w-4 h-4 ml-auto text-primary-400" />
          </RouterLink>
        </nav>

        <div class="p-4 border-t border-slate-200">
          <div class="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <h4 class="text-sm font-semibold text-primary-900 mb-1">Pro Plan</h4>
            <p class="text-xs text-primary-700 mb-3">You have 12 days left in your trial.</p>
            <button class="w-full py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      <!-- Mobile Sidebar Overlay -->
      <div v-if="isSidebarOpen" class="fixed inset-0 z-40 md:hidden">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="isSidebarOpen = false"></div>
        <aside class="absolute inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
          <div class="p-4 border-b border-slate-100 flex items-center justify-between">
            <span class="font-bold text-lg text-slate-900">Menu</span>
            <button @click="isSidebarOpen = false" class="p-2 text-slate-400 hover:text-slate-600">
              <Menu class="w-5 h-5" />
            </button>
          </div>
          <nav class="flex-1 px-4 py-6 space-y-1">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="isSidebarOpen = false"
              class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
              :class="isActive(item.href) ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" :class="isActive(item.href) ? 'text-primary-600' : 'text-slate-400'" />
              {{ item.name }}
            </RouterLink>
          </nav>
        </aside>
      </div>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-white p-4 md:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Modals -->
    <FeedbackModal :is-open="isFeedbackOpen" @close="isFeedbackOpen = false" />
    <HelpModal :is-open="isHelpOpen" @close="isHelpOpen = false" />
    <CreateClientModal :is-open="isClientModalOpen" @close="isClientModalOpen = false" />

  </div>
</template>
