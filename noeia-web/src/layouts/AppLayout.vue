<script setup lang="ts">
import { ref, onMounted, computed, provide, h } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

import { 
  Plus,
  Search,
  Bell,
  HelpCircle,
  Clock,
  Users,
  Stethoscope,
  CreditCard
} from 'lucide-vue-next'

import OrgSelector from '@/components/OrgSelector.vue'
import GlobalSearch from '@/components/GlobalSearch.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import HelpModal from '@/components/HelpModal.vue'
import CreateClientModal from '@/components/CreateClientModal.vue'
import GlobalMessaging from '@/components/messaging/GlobalMessaging.vue'
import AddDoctorFullScreenModal from '@/components/org/AddDoctorFullScreenModal.vue'
import AddPatientFullScreenModal from '@/components/org/AddPatientFullScreenModal.vue'

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const route = useRoute()
const store = useAppStore()
const { toast } = useToast()

const isFeedbackOpen = ref(false)
const isHelpOpen = ref(false)
const isQuickAddOpen = ref(false)
const isNotificationsOpen = ref(false)
const isClientModalOpen = ref(false)
const isAddDoctorModalOpen = ref(false)
const addDoctorCallback = ref<((id: string) => void) | undefined>(undefined)
const isAddPatientModalOpen = ref(false)
const addPatientCallback = ref<((id: string) => void) | undefined>(undefined)

function openAddDoctorModal(callback?: (id: string) => void) {
  addDoctorCallback.value = callback
  isAddDoctorModalOpen.value = true
}

function openAddPatientModal(callback?: (id: string) => void) {
  addPatientCallback.value = callback
  isAddPatientModalOpen.value = true
}

function handleSessionNotificationClick() {
  isNotificationsOpen.value = false
  // Navigate to AI view
  window.location.href = '/app/doctor/ai'
}

const isFullWidth = computed(() => {
  return ['doctor-ai', 'doctor-messages', 'client-messages', 'org-messages'].includes(route.name as string)
})

// Show session reminder toast on mount
onMounted(() => {
  // Show toast after a short delay to ensure UI is ready
  setTimeout(() => {
    toast({
      title: "🔔 Session starting soon",
      description: "Session with John Doe starts in 10 minutes",
      duration: 10000, // Show for 10 seconds
      class: "border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950",
      action: h('button', {
        class: 'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors',
        onClick: () => {
          window.location.href = '/app/doctor/ai'
        }
      }, 'Prepare Notes')
    })
  }, 1000)
})

provide('openAddDoctorModal', openAddDoctorModal)
provide('openAddPatientModal', openAddPatientModal)

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="overflow-x-hidden">
      <div class="flex h-full w-full overflow-hidden">
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
          <!-- Top Header -->
          <header class="h-14 bg-background border-b flex items-center justify-between px-4 sticky top-0 z-50 shrink-0">
            
            <!-- Left: Logo & Org -->
            <div class="flex items-center gap-4">
              <SidebarTrigger />
              <Separator orientation="vertical" class="h-6 hidden sm:block" />

              <div class="flex items-center gap-3">
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
                  class="flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  <Plus class="w-4 h-4" />
                  <span>Add</span>
                </button>

                <div v-if="isQuickAddOpen" class="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
                  <button class="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                    <Clock class="w-4 h-4" />
                    Session
                  </button>
                  <button 
                    @click="isQuickAddOpen = false; isClientModalOpen = true"
                    class="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Users class="w-4 h-4" />
                    Patient
                  </button>
                  <button 
                    v-if="route.path.startsWith('/app/organization')"
                    @click="isQuickAddOpen = false; openAddDoctorModal()"
                    class="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Stethoscope class="w-4 h-4" />
                    Doctor
                  </button>
                  <button class="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                    <CreditCard class="w-4 h-4" />
                    Bill
                  </button>
                </div>
                
                <!-- Backdrop -->
                <div v-if="isQuickAddOpen" @click="isQuickAddOpen = false" class="fixed inset-0 z-40 bg-transparent cursor-default"></div>
              </div>

              <!-- Mobile Search Trigger (visible only on mobile) -->
              <button class="md:hidden p-2 text-muted-foreground hover:text-foreground">
                <Search class="w-5 h-5" />
              </button>

              <!-- Notifications Bell -->
              <div class="relative">
                <button 
                  @click="isNotificationsOpen = !isNotificationsOpen"
                  class="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  title="Notifications"
                >
                  <Bell class="w-5 h-5" />
                  <!-- Notification badge -->
                  <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <!-- Notifications Dropdown -->
                <div v-if="isNotificationsOpen" class="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-[9999] animate-in fade-in zoom-in-95 duration-100">
                  <div class="p-4 border-b border-border">
                    <h3 class="font-semibold text-sm">Notifications</h3>
                  </div>
                  
                  <div class="max-h-96 overflow-y-auto">
                    <!-- Session Reminder Notification -->
                    <button 
                      @click="handleSessionNotificationClick"
                      class="w-full text-left p-4 hover:bg-muted transition-colors border-b border-border"
                    >
                      <div class="flex gap-3">
                        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock class="w-5 h-5 text-blue-600" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-foreground">Session starting soon</p>
                          <p class="text-xs text-muted-foreground mt-1">Session with John Doe starts in 10 minutes</p>
                          <p class="text-xs text-blue-600 mt-1">Click to prepare session notes</p>
                        </div>
                        <div class="flex-shrink-0">
                          <span class="text-xs text-muted-foreground">10m</span>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  <div class="p-3 border-t border-border text-center">
                    <button class="text-xs text-muted-foreground hover:text-foreground">
                      View all notifications
                    </button>
                  </div>
                </div>

                <!-- Backdrop -->
                <div v-if="isNotificationsOpen" @click="isNotificationsOpen = false" class="fixed inset-0 z-[90] bg-transparent cursor-default"></div>
              </div>

              <div class="flex items-center gap-1 sm:gap-2 border-r pr-2 sm:pr-4 mr-1 sm:mr-2">
                <button 
                  @click="isFeedbackOpen = true"
                  class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors text-sm font-medium hidden sm:flex items-center gap-2"
                >
                  Feedback
                </button>
                
                <button 
                  @click="isHelpOpen = true"
                  class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                >
                  <HelpCircle class="w-5 h-5" />
                </button>
              </div>

              <ProfileDropdown />
            </div>
          </header>

          <!-- Main Content -->
          <main 
            class="flex-1 overflow-y-auto bg-background transition-all"
            :class="isFullWidth ? 'p-0' : 'p-4 md:p-8'"
          >
            <div :class="isFullWidth ? 'h-full' : 'max-w-7xl mx-auto'">
              <slot />
            </div>
          </main>
        </div>
        
        <!-- Right Sidebar -->
        <RightSidebar />
      </div>

      <!-- Modals -->
      <FeedbackModal :is-open="isFeedbackOpen" @close="isFeedbackOpen = false" />
      <HelpModal :is-open="isHelpOpen" @close="isHelpOpen = false" />
      <CreateClientModal :is-open="isClientModalOpen" @close="isClientModalOpen = false" />
      <AddDoctorFullScreenModal 
        :is-open="isAddDoctorModalOpen" 
        @close="isAddDoctorModalOpen = false"
        @doctor-created="(id) => {
          if (addDoctorCallback) addDoctorCallback(id)
        }"
      />
      <AddPatientFullScreenModal 
        v-model="isAddPatientModalOpen"
        @created="(id) => {
          if (addPatientCallback) addPatientCallback(id)
        }"
      />

      <!-- Global Messaging -->
      <GlobalMessaging />
    </SidebarInset>
    
    <!-- Toast Notifications -->
    <Toaster />
  </SidebarProvider>
</template>
