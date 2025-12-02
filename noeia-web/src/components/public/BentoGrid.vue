<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Calendar, Sparkles, Users, Building, ArrowRight, CheckCircle2 } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.1 })

  const section = document.getElementById('bento-grid')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="bento-grid" class="py-24 bg-slate-50/50 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Everything you need to run a <span class="text-primary-600">modern practice</span>.
        </h2>
        <p class="text-lg text-slate-600">
          Powerful tools designed for the unique needs of psychologists and clinics.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
        
        <!-- Card 1: Calendar (Large, Span 2) -->
        <div 
          class="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row gap-8"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
          style="transition-delay: 100ms;"
        >
          <div class="flex-1 z-10 flex flex-col justify-center">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Calendar class="w-6 h-6" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">Clinic-wide calendar</h3>
            <p class="text-slate-600 leading-relaxed mb-6">
              See every professional, every room, and every session in one view. Filter by person, room, or modality with zero latency.
            </p>
            <div class="flex items-center text-sm font-medium text-primary-600 group-hover:translate-x-1 transition-transform cursor-pointer">
              Explore scheduling <ArrowRight class="w-4 h-4 ml-1" />
            </div>
          </div>
          
          <!-- Visual: Calendar UI -->
          <div class="flex-1 relative min-h-[200px] md:min-h-0">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-50 rounded-xl border border-slate-100 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500 origin-top-right">
              <!-- Calendar Header -->
              <div class="h-10 border-b border-slate-200 flex items-center px-4 gap-2 bg-white">
                <div class="w-20 h-4 bg-slate-100 rounded-full"></div>
                <div class="ml-auto flex gap-1">
                  <div class="w-6 h-6 rounded-full bg-slate-100"></div>
                  <div class="w-6 h-6 rounded-full bg-slate-100"></div>
                </div>
              </div>
              <!-- Calendar Body -->
              <div class="p-3 grid grid-cols-3 gap-2">
                <div class="h-24 bg-blue-50 rounded-lg border-l-4 border-blue-500 p-2 transform group-hover:translate-y-1 transition-transform duration-700">
                  <div class="w-12 h-3 bg-blue-200 rounded mb-1"></div>
                  <div class="w-16 h-2 bg-blue-100 rounded"></div>
                </div>
                <div class="h-24"></div>
                <div class="h-24 bg-purple-50 rounded-lg border-l-4 border-purple-500 p-2 transform group-hover:translate-y-2 transition-transform duration-700 delay-75">
                   <div class="w-10 h-3 bg-purple-200 rounded mb-1"></div>
                  <div class="w-14 h-2 bg-purple-100 rounded"></div>
                </div>
                 <div class="h-24"></div>
                 <div class="h-24 bg-orange-50 rounded-lg border-l-4 border-orange-500 p-2 transform group-hover:translate-y-1 transition-transform duration-700 delay-100">
                   <div class="w-12 h-3 bg-orange-200 rounded mb-1"></div>
                  <div class="w-8 h-2 bg-orange-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: AI Notes (Tall/Standard, Span 1) -->
        <div 
          class="md:col-span-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
          style="transition-delay: 200ms;"
        >
          <!-- Visual: AI Chat -->
          <div class="h-48 mb-6 relative">
             <div class="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent rounded-xl flex items-center justify-center">
                <div class="relative w-48">
                  <!-- Message 1 -->
                  <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 mb-3 transform group-hover:translate-x-2 transition-transform duration-500">
                    <div class="flex gap-2 items-center mb-1">
                      <Sparkles class="w-3 h-3 text-purple-500" />
                      <div class="h-2 w-16 bg-slate-100 rounded"></div>
                    </div>
                    <div class="space-y-1">
                      <div class="h-1.5 w-full bg-slate-50 rounded"></div>
                      <div class="h-1.5 w-3/4 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                  <!-- Message 2 -->
                   <div class="bg-purple-500 p-3 rounded-2xl rounded-tr-none shadow-md shadow-purple-200 ml-auto w-32 transform group-hover:-translate-x-2 transition-transform duration-500 delay-75">
                    <div class="h-2 w-20 bg-white/30 rounded mb-2"></div>
                    <div class="h-1.5 w-full bg-white/20 rounded"></div>
                  </div>
                </div>
             </div>
          </div>
          
          <div class="mt-auto">
             <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">AI Documentation</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Turn raw session notes into structured clinical summaries instantly.
            </p>
          </div>
        </div>

        <!-- Card 3: Client Records (Tall/Standard, Span 1) -->
        <div 
          class="md:col-span-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
          style="transition-delay: 300ms;"
        >
           <div class="mt-auto order-2">
             <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Unified Records</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              History, documents, and messages in one secure timeline.
            </p>
          </div>

          <!-- Visual: File Stack -->
          <div class="h-48 mb-6 relative order-1">
             <div class="absolute inset-0 flex items-center justify-center">
               <!-- Card Back -->
               <div class="absolute w-40 h-24 bg-slate-50 border border-slate-200 rounded-xl transform -rotate-6 translate-y-2 group-hover:-rotate-12 group-hover:translate-x-[-10px] transition-all duration-500"></div>
               <!-- Card Middle -->
               <div class="absolute w-40 h-24 bg-slate-50 border border-slate-200 rounded-xl transform rotate-3 translate-y-1 group-hover:rotate-6 group-hover:translate-x-[5px] transition-all duration-500"></div>
               <!-- Card Front -->
               <div class="absolute w-40 h-24 bg-white border border-slate-200 rounded-xl shadow-sm p-3 transform group-hover:scale-105 transition-all duration-500 flex flex-col gap-2">
                 <div class="flex items-center gap-2">
                   <div class="w-6 h-6 rounded-full bg-green-100"></div>
                   <div class="h-2 w-20 bg-slate-100 rounded"></div>
                 </div>
                 <div class="h-1.5 w-full bg-slate-50 rounded mt-2"></div>
                 <div class="h-1.5 w-2/3 bg-slate-50 rounded"></div>
               </div>
             </div>
          </div>
        </div>

        <!-- Card 4: Office Management (Large, Span 2) -->
        <div 
          class="md:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row gap-8 text-white"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
          style="transition-delay: 400ms;"
        >
          <!-- Visual: Room Map -->
          <div class="flex-1 relative min-h-[200px] md:min-h-0 order-2 md:order-1">
            <div class="absolute inset-0 bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex flex-col gap-3 group-hover:bg-slate-800 transition-colors duration-500">
               <div class="flex gap-3">
                 <div class="flex-1 h-20 rounded-lg bg-slate-700/50 border border-slate-600 p-2 flex flex-col justify-between group-hover:border-green-500/50 transition-colors duration-300">
                   <span class="text-[10px] text-slate-400">Room A</span>
                   <div class="flex items-center gap-1 text-[10px] text-green-400">
                     <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div> Available
                   </div>
                 </div>
                 <div class="flex-1 h-20 rounded-lg bg-slate-700/50 border border-slate-600 p-2 flex flex-col justify-between group-hover:border-red-500/50 transition-colors duration-300">
                   <span class="text-[10px] text-slate-400">Room B</span>
                   <div class="flex items-center gap-1 text-[10px] text-red-400">
                     <div class="w-1.5 h-1.5 rounded-full bg-red-400"></div> Occupied
                   </div>
                 </div>
               </div>
               <div class="h-12 rounded-lg bg-slate-700/30 border border-slate-600/50 flex items-center justify-center text-slate-500 text-xs">
                 Reception Area
               </div>
            </div>
          </div>

          <div class="flex-1 z-10 flex flex-col justify-center order-1 md:order-2">
            <div class="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Building class="w-6 h-6" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Space Management</h3>
            <p class="text-slate-400 leading-relaxed mb-6">
              Manage your physical rooms, assign them to professionals, and avoid double-booking.
            </p>
            <div class="flex items-center gap-4">
               <div class="flex items-center text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full">
                 <CheckCircle2 class="w-3 h-3 mr-1.5 text-green-400" /> Auto-conflict detection
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any specific animations if Tailwind isn't enough, but Tailwind classes are mostly used here */
</style>
