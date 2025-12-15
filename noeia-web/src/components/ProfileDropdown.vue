<script setup lang="ts">
import { Settings, Sparkles, Palette, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const auth = useAuthStore()

const menuItems = [
  { label: 'Account Preferences', icon: Settings },
  { label: 'Features Preview', icon: Sparkles },
  { label: 'Theme', icon: Palette },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :src="auth.user?.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ auth.user?.user_metadata?.full_name || 'User' }}</p>
          <p class="text-xs leading-none text-muted-foreground">{{ auth.user?.email }}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-for="item in menuItems" :key="item.label">
        <component :is="item.icon" class="mr-2 h-4 w-4" />
        <span>{{ item.label }}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="auth.logout()" class="text-red-600 focus:text-red-600">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
