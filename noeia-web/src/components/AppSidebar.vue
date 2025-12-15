<script setup lang="ts">
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  User,
  Settings, 
  Clock,
  CreditCard,
  Sparkles,
  MessageSquare,
  Stethoscope,
  Building
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

const route = useRoute()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const defaultNavigation = [
  { name: 'Dashboard', href: '/app/doctor', icon: LayoutDashboard },
  { name: 'Calendar', href: '/app/doctor/calendar', icon: Calendar },
  { name: 'Sessions', href: '/app/doctor/sessions', icon: Clock },
  { name: 'Patients', href: '/app/doctor/patients', icon: Users },
  { name: 'Messages', href: '/app/doctor/messages', icon: MessageSquare },
  { name: 'Billing', href: '/app/doctor/billing', icon: CreditCard },
  { name: 'IA', href: '/app/doctor/ai', icon: Sparkles },
  { name: 'Settings', href: '/app/doctor/settings', icon: Settings },
]

const clientNavigation = [
  { name: 'Dashboard', href: '/app/client', icon: LayoutDashboard },
  { name: 'Calendar', href: '/app/client/calendar', icon: Calendar },
  { name: 'Messages', href: '/app/client/messages', icon: MessageSquare },
  { name: 'Billing', href: '/app/client/billing', icon: CreditCard },
  { name: 'Profile', href: '/app/client/profile', icon: User },
  { name: 'Settings', href: '/app/client/settings', icon: Settings },
]

const organizationNavigation = [
  { name: 'Dashboard', href: '/app/organization', icon: LayoutDashboard },
  { name: 'Doctors', href: '/app/organization/doctors', icon: Stethoscope },
  { name: 'Patients', href: '/app/organization/patients', icon: Users },
  { name: 'Calendar', href: '/app/organization/calendar', icon: Calendar },
  { name: 'Messages', href: '/app/organization/messages', icon: MessageSquare },
  { name: 'Office', href: '/app/organization/office', icon: Building },
  { name: 'Billing', href: '/app/organization/billing', icon: CreditCard },
  { name: 'Settings', href: '/app/organization/settings', icon: Settings },
]

const navigation = computed(() => {
  const role = user.value?.app_metadata?.role
  if (role === 'client') {
    return clientNavigation
  } else if (role === 'organization') {
    return organizationNavigation
  }
  return defaultNavigation
})

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="border-b border-sidebar-border h-14 flex items-center px-4">
      <div class="flex items-center gap-2 font-bold text-lg text-sidebar-foreground">
        <div class="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="truncate">Noeia</span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in navigation" :key="item.name">
              <SidebarMenuButton 
                as-child 
                :is-active="isActive(item.href)"
                :tooltip="item.name"
              >
                <RouterLink :to="item.href">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class="p-4 border-t border-sidebar-border">
      <div class="bg-primary/10 rounded-xl p-4 border border-primary/20">
        <h4 class="text-sm font-semibold text-primary mb-1">Pro Plan</h4>
        <p class="text-xs text-muted-foreground mb-3">12 days left.</p>
        <Button size="sm" class="w-full">Upgrade</Button>
      </div>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
