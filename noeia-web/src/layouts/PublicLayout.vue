<script setup lang="ts">
import { ref } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import BannerBeta from '@/components/public/BannerBeta.vue'

const isBannerVisible = ref(false)

function handleBannerVisibility(visible: boolean) {
  isBannerVisible.value = visible
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background font-sans text-text antialiased selection:bg-primary-100 selection:text-primary-900">
    <BannerBeta @visibility-change="handleBannerVisibility" />
    
    <div 
      class="transition-all duration-300 ease-out"
      :class="{ 'pt-[52px] lg:pt-[60px]': isBannerVisible }"
    >
      <PublicNavbar :class="{ '!top-[52px] lg:!top-[60px]': isBannerVisible }" />

      <!-- Main Content -->
      <main class="flex-1 pt-20">
        <slot />
      </main>

      <PublicFooter />
    </div>
  </div>
</template>

