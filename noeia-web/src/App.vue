<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const auth = useAuthStore()
const route = useRoute()

const layout = computed(() => {
  return route.meta.layout === 'app' ? AppLayout : PublicLayout
})

onMounted(() => {
  auth.checkAuth()
})
</script>

<template>
  <TooltipProvider>
    <component :is="layout">
      <router-view />
    </component>
    <Toaster />
  </TooltipProvider>
</template>
