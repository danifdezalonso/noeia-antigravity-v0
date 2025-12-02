<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Check, ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { RouterLink } from 'vue-router'

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.1 })

  const section = document.getElementById('pricing-preview')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="pricing-preview" class="py-20 lg:py-28 bg-background">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- Text -->
        <div class="max-w-lg">
          <h2 class="text-3xl lg:text-4xl font-bold text-text mb-6">Simple pricing that grows with your practice.</h2>
          <p class="text-lg text-text-muted mb-8">
            Start with a plan that fits your size today. Upgrade when you add more professionals or locations.
          </p>
          <RouterLink to="/pricing" class="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            See full pricing <ArrowRight class="w-4 h-4 ml-2" />
          </RouterLink>
        </div>

        <!-- Cards -->
        <div class="grid sm:grid-cols-2 gap-6">
          <!-- Solo Card -->
          <div 
            class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 opacity-0 translate-y-8"
            :class="{ 'animate-fade-up': isVisible }"
            style="animation-delay: 100ms;"
          >
            <h3 class="text-xl font-bold text-text mb-2">Solo</h3>
            <p class="text-sm text-text-muted mb-4">Perfect for independent professionals.</p>
            <div class="text-3xl font-bold text-text mb-6">€29<span class="text-sm font-normal text-text-muted">/mo</span></div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <Check class="w-4 h-4 text-green-500" /> All core features
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <Check class="w-4 h-4 text-green-500" /> 1 Calendar
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <Check class="w-4 h-4 text-green-500" /> 1 Office
              </li>
            </ul>
            <Button variant="outline" block class="rounded-full">Start Trial</Button>
          </div>

          <!-- Clinic Card -->
          <div 
            class="bg-white p-6 rounded-2xl border-2 border-primary-100 shadow-lg relative overflow-hidden transition-all duration-500 opacity-0 translate-y-8"
            :class="{ 'animate-fade-up': isVisible }"
            style="animation-delay: 200ms;"
          >
            <div class="absolute top-0 right-0 bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">POPULAR</div>
            <h3 class="text-xl font-bold text-text mb-2">Clinic</h3>
            <p class="text-sm text-text-muted mb-4">For growing teams.</p>
            <div class="text-3xl font-bold text-text mb-6">€89<span class="text-sm font-normal text-text-muted">/mo</span></div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <Check class="w-4 h-4 text-green-500" /> Team management
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <Check class="w-4 h-4 text-green-500" /> Multiple offices
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <Check class="w-4 h-4 text-green-500" /> Admin controls
              </li>
            </ul>
            <Button block class="rounded-full bg-primary-600 hover:bg-primary-700">Start Trial</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
