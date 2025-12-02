<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, Check } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <section class="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-secondary-200/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="flex flex-col items-center text-center gap-12 lg:gap-20">
        
        <!-- Top: Copy -->
        <div 
          class="max-w-4xl mx-auto transition-all duration-700 ease-out transform"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-6 mx-auto">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            SaaS for psychologists & clinics
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-bold tracking-tight text-text mb-6 leading-[1.1]">
            The workspace for <span class="text-primary-500">modern therapy</span> practices.
          </h1>
          
          <p class="text-lg lg:text-xl text-text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
            Noeia centralizes calendar, notes, and client communication so psychologists can spend more time in session—and less time in their inbox.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <RouterLink to="/login">
              <Button size="lg" class="w-full sm:w-auto rounded-full px-8 bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-primary-500/25 transition-all">
                Book a live demo
                <ArrowRight class="w-4 h-4 ml-2" />
              </Button>
            </RouterLink>
            <RouterLink to="/product">
              <Button variant="outline" size="lg" class="w-full sm:w-auto rounded-full px-8 border-slate-300 hover:bg-slate-50 text-text">
                Explore the product
              </Button>
            </RouterLink>
          </div>

          <p class="text-sm text-text-light flex items-center justify-center gap-2">
            <Check class="w-4 h-4 text-secondary-500" />
            Designed with psychologists, built for solo practices and multi-clinic teams.
          </p>
        </div>

        <!-- Bottom: Hero Card -->
        <div 
          class="relative w-full max-w-6xl flex items-center justify-center perspective-2000"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        >
          <!-- Main App Image with Linear-style Tilt -->
          <div 
            class="relative w-full transform transition-all duration-1000 ease-out hover:scale-[1.01]"
            :class="isLoaded ? 'rotate-x-12 translate-y-0' : 'translate-y-24 opacity-0'"
            style="transform-style: preserve-3d;"
          >
            <!-- Glow Effect behind -->
            <div class="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-secondary-500/10 blur-3xl -z-10 transform scale-95 translate-y-10"></div>
            
            <!-- The Image -->
            <img 
              src="/images/dashboard-preview.png" 
              alt="Noeia Dashboard Preview" 
              class="w-full rounded-xl shadow-2xl border border-white/20 ring-1 ring-black/5"
            />

            <!-- Reflection/Sheen -->
            <div class="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-2000 {
  perspective: 2000px;
}
.rotate-x-12 {
  transform: rotateX(12deg);
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
