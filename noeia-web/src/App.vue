<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

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
  <component :is="layout">
    <router-view />
  </component>
</template>
