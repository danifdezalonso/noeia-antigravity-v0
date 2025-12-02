<script setup lang="ts">
import CtaSection from '@/components/public/CtaSection.vue'
</script>

<template>
  <div>
    <section class="py-20 bg-background text-center">
      <h1 class="text-4xl font-bold text-text mb-4">Product Overview</h1>
      <p class="text-text-muted">Everything your practice needs in one workspace.</p>
    </section>
    
    <!-- Placeholder Content -->
    <section class="py-20 max-w-4xl mx-auto px-4">
      <div class="space-y-12">
        <div class="bg-white p-8 rounded-2xl border border-slate-200">
          <h2 class="text-2xl font-bold mb-4">Calendar</h2>
          <p class="text-text-muted">Deep dive into calendar features...</p>
        </div>
        <div class="bg-white p-8 rounded-2xl border border-slate-200">
          <h2 class="text-2xl font-bold mb-4">AI Assistant</h2>
          <p class="text-text-muted">How NoeIA helps you write notes...</p>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
