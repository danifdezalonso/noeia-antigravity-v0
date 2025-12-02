<script setup lang="ts">
import CtaSection from '@/components/public/CtaSection.vue'
</script>

<template>
  <div>
    <section class="py-20 bg-background text-center">
      <h1 class="text-4xl font-bold text-text mb-4">Resources</h1>
      <p class="text-text-muted">Guides, articles, and updates for modern therapy practices.</p>
    </section>
    
    <section class="py-20 max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
          <div class="h-40 bg-slate-100 rounded-xl mb-4"></div>
          <div class="text-xs font-bold text-primary-600 mb-2">GUIDE</div>
          <h3 class="text-xl font-bold mb-2">How to streamline your practice</h3>
          <p class="text-sm text-text-muted">Learn the best practices for managing a multi-clinician team...</p>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
