<script setup lang="ts">
import { ref } from 'vue'
import { Settings, Sparkles, Palette, LogOut } from 'lucide-vue-next'

const isOpen = ref(false)

const menuItems = [
  { label: 'Account Preferences', icon: Settings },
  { label: 'Features Preview', icon: Sparkles },
  { label: 'Theme', icon: Palette },
]
</script>

<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 hover:bg-slate-100 rounded-full p-1 transition-colors"
    >
      <img 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
        alt="User Avatar" 
        class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"
      />
    </button>

    <div v-if="isOpen" class="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1 overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <p class="text-sm font-medium text-slate-900">Dani Fernandez</p>
        <p class="text-xs text-slate-500 truncate">dani@example.com</p>
      </div>
      
      <div class="py-1">
        <button 
          v-for="item in menuItems" 
          :key="item.label"
          class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
        >
          <component :is="item.icon" class="w-4 h-4 text-slate-400" />
          {{ item.label }}
        </button>
      </div>

      <div class="border-t border-slate-100 py-1">
        <button class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
          <LogOut class="w-4 h-4" />
          Log out
        </button>
      </div>
    </div>

    <!-- Backdrop -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-40"></div>
  </div>
</template>
