<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Calendar, FileText, MessageCircle, Shield, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const features = [
  {
    title: 'Your therapy, your timeline',
    description: 'See upcoming sessions, past appointments, and your personal progress journey in one clean view.'
  },
  {
    title: 'Secure messaging',
    description: 'Message your psychologist directly. Share thoughts, journals, or updates between sessions in a private, encrypted space.'
  },
  {
    title: 'Resources & Homework',
    description: 'Access worksheets, reading materials, and exercises assigned by your therapist. Complete them on your phone.'
  },
  {
    title: 'Simple billing',
    description: 'View invoices, manage payment methods, and handle insurance claims without the paperwork headache.'
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
            Patient App
          </div>
          
          <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Your mental health journey, in your pocket
          </h1>
          
          <p class="text-lg text-slate-600 mb-12 leading-relaxed max-w-lg">
            Connect with your psychologist, manage appointments, and track your progress. Secure, simple, and always there when you need it.
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
              Download the App
            </Button>
            <Button variant="ghost" size="lg" class="rounded-full px-8 text-slate-600 hover:bg-slate-50 group">
              Learn more
              <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <!-- Right Column: Bento Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
          
          <!-- Card A: Upcoming Session (Span 2) -->
          <div 
            class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 200ms;"
          >
            <div class="flex justify-between items-start mb-6 relative z-10">
              <div class="flex items-center gap-2 text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-full">
                <Calendar class="w-3 h-3" />
                Next Session
              </div>
              <div class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-500 transition-colors duration-300"></div>
            </div>

            <div class="flex gap-6 items-end">
              <div class="flex-1">
                <div class="text-2xl font-bold text-slate-900 mb-1">Tomorrow, 10:00 AM</div>
                <div class="text-primary-600 font-medium mb-4">Dr. Sarah Mitchell · Online</div>
                
                <div class="flex items-center gap-3">
                   <Button size="sm" class="rounded-full bg-primary-600 text-white text-xs px-4">Join Call</Button>
                   <Button variant="ghost" size="sm" class="rounded-full text-slate-500 text-xs">Reschedule</Button>
                </div>
              </div>
              
              <!-- Visual -->
              <div class="w-24 h-24 bg-primary-50 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative -mb-4 -mr-4">
                 <div class="w-16 h-16 rounded-full bg-primary-200 animate-pulse"></div>
                 <Smartphone class="w-8 h-8 text-primary-600 absolute" />
              </div>
            </div>
          </div>

          <!-- Card B: Secure Messaging -->
          <div 
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 300ms;"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-slate-900">Chat</h3>
              <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <MessageCircle class="w-2.5 h-2.5" /> Secure
              </div>
            </div>
            
            <div class="space-y-3">
               <div class="bg-slate-50 p-3 rounded-xl rounded-tl-none text-xs text-slate-600">
                  Hi, I've completed the journal entry for this week.
               </div>
               <div class="bg-primary-50 p-3 rounded-xl rounded-tr-none text-xs text-primary-700 ml-4">
                  Great! We'll discuss it in our next session.
               </div>
            </div>
          </div>

          <!-- Card C: Resources -->
          <div 
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 400ms;"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-slate-900">Library</h3>
              <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                <FileText class="w-2.5 h-2.5" /> Files
              </div>
            </div>

            <div class="space-y-2">
               <div class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <div class="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600">
                     <FileText class="w-4 h-4" />
                  </div>
                  <div>
                     <div class="text-xs font-bold text-slate-900">CBT Worksheet</div>
                     <div class="text-[10px] text-slate-500">PDF · 2.4 MB</div>
                  </div>
               </div>
               <div class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <div class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                     <FileText class="w-4 h-4" />
                  </div>
                  <div>
                     <div class="text-xs font-bold text-slate-900">Sleep Log</div>
                     <div class="text-[10px] text-slate-500">PDF · 1.1 MB</div>
                  </div>
               </div>
            </div>
          </div>

          <!-- Card D: Privacy -->
          <div 
            class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group flex items-center justify-between shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 500ms;"
          >
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">100% Private</h3>
              <p class="text-slate-500 text-sm">End-to-end encrypted & HIPAA compliant</p>
            </div>
            
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
               <Shield class="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
