<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Calendar, FileText, Users, Lock, Monitor, ArrowRight, CheckCircle2, Sparkles } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const features = [
  {
    title: 'Calendar designed for real sessions',
    description: 'Block your week, manage cancellations, and reschedule instantly. No clutter, no generic appointment software vibes.'
  },
  {
    title: 'Session notes that write themselves',
    description: 'Paste your raw thoughts after a session. Noeia turns them into a clean summary, structured reflections, and a plan.'
  },
  {
    title: 'Client records you can trust',
    description: 'Every file, every message, every progress thread in one timeline. No hunting across folders, PDFs, or WhatsApp screenshots.'
  },
  {
    title: 'Private workspace & modality freedom',
    description: 'Your clinical notes are private. Work online or in person, assign rooms, and manage telehealth seamlessly.'
  }
]
</script>

<template>
  <div class="relative overflow-hidden pb-20 lg:pb-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <!-- Left Column: Copy -->
        <div 
          class="transition-all duration-700 ease-out transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-medium mb-6">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Clinical Workspace
          </div>
          
          <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            For psychologists who want more time with their patients
          </h1>
          
          <p class="text-lg text-slate-600 mb-12 leading-relaxed max-w-lg">
            Work at your pace. Capture what matters. Let Noeia handle the parts that slow you down.
          </p>

          <div class="space-y-8 mb-12">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="flex gap-4 transition-all duration-500"
              :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <div class="flex-shrink-0 mt-1">
                <CheckCircle2 class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 class="text-slate-900 font-semibold mb-1">{{ feature.title }}</h3>
                <p class="text-slate-600 text-sm leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <Button size="lg" class="rounded-full px-8 bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-600/20 transition-all hover:scale-[1.02]">
              Start your free trial
            </Button>
            <Button variant="ghost" size="lg" class="rounded-full px-8 text-slate-600 hover:bg-slate-50 group">
              See how it works
              <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <!-- Right Column: Bento Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
          
          <!-- Card A: Calendar (Span 2) -->
          <div 
            class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 200ms;"
          >
            <div class="flex justify-between items-start mb-6 relative z-10">
              <div class="flex items-center gap-2 text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-full">
                <Calendar class="w-3 h-3" />
                Smart Calendar
              </div>
              <div class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-500 transition-colors duration-300"></div>
            </div>

            <div class="flex gap-6 items-end">
              <div class="flex-1">
                <div class="text-2xl font-bold text-slate-900 mb-1">09:00 AM</div>
                <div class="text-primary-600 font-medium mb-4">Session with Alex · Room A</div>
                
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-xs text-slate-500">
                    <div class="w-1 h-4 bg-primary-300 rounded-full"></div>
                    Next: 10:30 AM - Initial Consultation
                  </div>
                  <div class="flex items-center gap-2 text-xs text-slate-400">
                    <div class="w-1 h-4 bg-slate-200 rounded-full"></div>
                    12:00 PM - Lunch Break
                  </div>
                </div>
              </div>
              
              <!-- Calendar Visual -->
              <div class="w-32 h-32 bg-slate-50 rounded-xl border border-slate-200 relative -mb-6 -mr-6 transform group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-transform duration-500 p-3">
                <div class="grid grid-cols-2 gap-2 h-full">
                   <div class="bg-primary-100 rounded h-16 w-full border-l-2 border-primary-500"></div>
                   <div class="bg-white rounded h-16 w-full border border-slate-100"></div>
                   <div class="bg-white rounded h-full w-full border border-slate-100 col-span-2"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card B: AI Notes -->
          <div 
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 300ms;"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-slate-900">AI Notes</h3>
              <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles class="w-2.5 h-2.5 text-purple-500" /> Auto
              </div>
            </div>
            
            <div class="space-y-3 relative overflow-hidden h-32">
               <div class="text-xs text-slate-400 font-mono mb-2"># Summary</div>
               <div class="text-sm text-slate-600 leading-relaxed">
                 Patient expressed anxiety regarding career transition. Discussed coping mechanisms...
               </div>
               <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
            </div>
          </div>

          <!-- Card C: Client Records -->
          <div 
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 400ms;"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-slate-900">Records</h3>
              <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Timeline
              </div>
            </div>

            <div class="relative pl-4 border-l border-slate-200 space-y-4">
              <div class="relative">
                <div class="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-white"></div>
                <div class="text-xs text-slate-500 mb-0.5">Today</div>
                <div class="text-sm text-slate-900 font-medium">Session Note</div>
              </div>
              <div class="relative opacity-60">
                <div class="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <div class="text-xs text-slate-500 mb-0.5">Yesterday</div>
                <div class="text-sm text-slate-900 font-medium">Intake Form</div>
              </div>
            </div>
          </div>

          <!-- Card D: Privacy & Modality -->
          <div 
            class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group flex items-center justify-between shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 500ms;"
          >
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Private & Flexible</h3>
              <p class="text-slate-500 text-sm">Your space, your rules</p>
            </div>
            
            <div class="flex gap-2">
              <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <Lock class="w-3 h-3 text-slate-400" /> Private
              </div>
              <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <Monitor class="w-3 h-3 text-slate-400" /> Online
              </div>
              <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 hidden sm:flex">
                <Users class="w-3 h-3 text-slate-400" /> In-person
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
