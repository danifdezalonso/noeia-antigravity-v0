<script setup lang="ts">
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import PricingSection from '@/components/public/PricingSection.vue'
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <PublicNavbar class="!bg-white !border-slate-200" />
    
    <main class="flex-grow pt-4">
      <PricingSection />
    </main>

    <PublicFooter class="!bg-white !border-slate-200 text-slate-600" />
  </div>
</template>
