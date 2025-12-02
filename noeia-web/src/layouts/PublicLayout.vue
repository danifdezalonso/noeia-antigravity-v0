<script setup lang="ts">
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background font-sans text-text antialiased selection:bg-primary-100 selection:text-primary-900">
    <PublicNavbar />

    <!-- Main Content -->
    <main class="flex-1 pt-20">
      <slot />
    </main>

    <PublicFooter />
  </div>
</template>

