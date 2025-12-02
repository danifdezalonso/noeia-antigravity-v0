<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <section class="py-20 lg:py-28 bg-gradient-to-br from-primary-900 to-slate-900 text-white relative overflow-hidden">
    <!-- Decorative blobs -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <h2 class="text-3xl lg:text-5xl font-bold mb-6 tracking-tight">Ready to reclaim your time between sessions?</h2>
      <p class="text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
        Book a demo and see how Noeia fits your practice in 30 minutes. No commitment required.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink to="/login">
          <Button size="lg" class="w-full sm:w-auto rounded-full px-8 bg-white text-primary-900 hover:bg-slate-100 border-none shadow-lg">
            Book a demo
          </Button>
        </RouterLink>
        <RouterLink to="/contact">
          <Button variant="outline" size="lg" class="w-full sm:w-auto rounded-full px-8 border-slate-600 text-white hover:bg-white/10 hover:text-white hover:border-white">
            Talk to us
          </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
