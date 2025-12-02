<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, Check, Calendar, Sparkles, Clock, User } from 'lucide-vue-next'

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

    <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <!-- Left Column: Copy -->
        <div 
          class="max-w-2xl transition-all duration-700 ease-out transform"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-6">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            SaaS for psychologists & clinics
          </div>
          
          <h1 class="text-5xl lg:text-6xl font-bold tracking-tight text-text mb-6 leading-[1.1]">
            The workspace for <span class="text-primary-500">modern therapy</span> practices.
          </h1>
          
          <p class="text-lg lg:text-xl text-text-muted mb-8 leading-relaxed max-w-lg">
            Noeia centralizes calendar, notes, and client communication so psychologists can spend more time in session—and less time in their inbox.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
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

          <p class="text-sm text-text-light flex items-center gap-2">
            <Check class="w-4 h-4 text-secondary-500" />
            Designed with psychologists, built for solo practices and multi-clinic teams.
          </p>
        </div>

        <!-- Right Column: Hero Card -->
        <div 
          class="relative lg:h-[600px] flex items-center justify-center transition-all duration-1000 ease-out delay-200 transform perspective-1000"
          :class="isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-y-12'"
        >
          <!-- Main App Card -->
          <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-3xl group">
            <!-- Fake Browser Header -->
            <div class="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400/80"></div>
                <div class="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div class="mx-auto w-1/2 h-5 bg-white rounded-md shadow-sm border border-slate-100 flex items-center justify-center text-[10px] text-slate-400">
                app.noeia.com/calendar
              </div>
            </div>

            <!-- App Content -->
            <div class="p-4 bg-white h-[400px] flex gap-4">
              <!-- Mini Sidebar -->
              <div class="w-12 flex flex-col items-center gap-4 pt-2 border-r border-slate-100 pr-2">
                <div class="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold text-xs">N</div>
                <div class="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center"><Calendar class="w-4 h-4" /></div>
                <div class="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-400 flex items-center justify-center"><User class="w-4 h-4" /></div>
              </div>

              <!-- Calendar View -->
              <div class="flex-1">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-semibold text-slate-800">October 2023</h3>
                  <div class="flex gap-1">
                    <div class="w-6 h-6 rounded bg-slate-100"></div>
                    <div class="w-6 h-6 rounded bg-slate-100"></div>
                  </div>
                </div>
                
                <!-- Calendar Grid -->
                <div class="grid grid-cols-1 gap-3">
                  <!-- Event 1 -->
                  <div class="p-3 rounded-xl bg-primary-50 border border-primary-100 border-l-4 border-l-primary-500 shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
                    <div class="flex justify-between items-start mb-1">
                      <span class="text-xs font-bold text-primary-700">Initial Consultation</span>
                      <span class="text-[10px] text-primary-500 font-medium bg-white px-1.5 py-0.5 rounded-full">09:00 AM</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-primary-600 mb-2">
                      <User class="w-3 h-3" />
                      Sarah Johnson
                    </div>
                    <div class="flex items-center gap-1 text-[10px] text-primary-400">
                      <Clock class="w-3 h-3" />
                      50 min • Room A
                    </div>
                  </div>

                  <!-- Event 2 -->
                  <div class="p-3 rounded-xl bg-secondary-50 border border-secondary-100 border-l-4 border-l-secondary-500 shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer opacity-90">
                    <div class="flex justify-between items-start mb-1">
                      <span class="text-xs font-bold text-secondary-800">Therapy Session</span>
                      <span class="text-[10px] text-secondary-600 font-medium bg-white px-1.5 py-0.5 rounded-full">11:00 AM</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-secondary-700 mb-2">
                      <User class="w-3 h-3" />
                      Michael Brown
                    </div>
                  </div>

                  <!-- Event 3 -->
                  <div class="p-3 rounded-xl bg-white border border-slate-200 border-l-4 border-l-slate-300 shadow-sm opacity-60">
                    <div class="flex justify-between items-start">
                      <span class="text-xs font-bold text-slate-600">Lunch Break</span>
                      <span class="text-[10px] text-slate-400">13:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating AI Panel -->
            <div class="absolute bottom-6 -right-6 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 transform transition-all duration-700 delay-500"
              :class="isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'"
            >
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-primary-400 to-secondary-400 flex items-center justify-center text-white">
                  <Sparkles class="w-3 h-3" />
                </div>
                <span class="text-xs font-bold text-slate-700">Mia AI Assistant</span>
              </div>
              <div class="space-y-2">
                <div class="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                <div class="h-2 w-full bg-slate-100 rounded-full"></div>
                <div class="h-2 w-5/6 bg-slate-100 rounded-full"></div>
              </div>
              <div class="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                <span class="text-[10px] text-slate-400">Drafting summary...</span>
                <div class="w-16 h-5 bg-primary-500 rounded text-white text-[10px] flex items-center justify-center font-medium">Approve</div>
              </div>
            </div>
          </div>

          <!-- Floating Stats -->
          <div class="absolute -left-8 top-20 bg-white/90 backdrop-blur rounded-lg shadow-lg border border-slate-100 p-3 transform transition-all duration-700 delay-700"
            :class="isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
          >
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">+37%</div>
              <div class="text-xs font-medium text-slate-600">Faster<br>documentation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-12 {
  transform: rotateY(12deg);
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
