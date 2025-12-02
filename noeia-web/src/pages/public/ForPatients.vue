<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import Button from '@/components/ui/Button.vue'
import { Activity, ArrowRight, CheckCircle2, Lock } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  // Simple fade-in on mount since it's a page now
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const features = [
  {
    title: 'Direct booking through a real calendar',
    description: 'See your therapist’s availability and book from a visual calendar. No back-and-forth. No reception desk.'
  },
  {
    title: 'Dedicated chat with your therapist',
    description: 'One secure channel. No mixing therapy with personal WhatsApp or social apps. Messages stay in the therapeutic context.'
  },
  {
    title: 'Session history you can actually understand',
    description: 'Chronological view of past sessions, shared summaries, and goals. No hunting through old emails.'
  },
  {
    title: 'Progress, exercises and good practices',
    description: 'Track how you feel, follow exercises, and keep guidance in a single space instead of scattered PDFs and notes.'
  },
  {
    title: 'One app, multiple professionals',
    description: 'If you see more than one professional in the same clinic, you keep all appointments and materials in one app, with separate spaces per therapist.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col font-sans text-slate-900">
    <PublicNavbar />
    
    <main class="flex-grow pt-24 pb-20 lg:pb-32 relative overflow-hidden">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
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
              For patients who need structure outside the session
            </h1>
            
            <p class="text-lg text-slate-600 mb-12 leading-relaxed max-w-lg">
              A private app where therapy stays organized: sessions, communication, progress, and guidance in one space.
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
                Offer the patient app to your clients
              </Button>
              <Button variant="ghost" size="lg" class="rounded-full px-8 text-slate-600 hover:bg-slate-50 group">
                See how the patient app works
                <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <!-- Right Column: Bento Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
            
            <!-- Card A: Mobile App / Calendar (Span 2) -->
            <div 
              class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative shadow-sm"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
              style="transition-delay: 200ms;"
            >
              <div class="flex justify-between items-start mb-6 relative z-10">
                <div class="flex items-center gap-2 text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-full">
                  <Activity class="w-3 h-3" />
                  Patient app · Home
                </div>
                <div class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-500 transition-colors duration-300"></div>
              </div>

              <div class="flex gap-6 items-end">
                <div class="flex-1">
                  <div class="text-2xl font-bold text-slate-900 mb-1">Next session</div>
                  <div class="text-primary-600 font-medium mb-4">Tue, 17:00 · Online</div>
                  
                  <!-- Mini Calendar Visual -->
                  <div class="grid grid-cols-7 gap-1 max-w-[200px]">
                    <div v-for="i in 7" :key="i" class="h-1 rounded-full bg-slate-200" :class="i === 3 ? 'bg-primary-500' : ''"></div>
                  </div>
                </div>
                
                <!-- Phone Mockup Visual -->
                <div class="w-24 h-32 bg-slate-50 rounded-t-xl border-t-4 border-x-4 border-slate-200 relative -mb-6 transform group-hover:translate-y-2 transition-transform duration-500">
                  <div class="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-300 rounded-full"></div>
                  <div class="p-3 pt-6 space-y-2">
                    <div class="h-2 w-full bg-slate-200 rounded"></div>
                    <div class="h-16 w-full bg-primary-50 rounded border border-primary-100"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card B: Chat -->
            <div 
              class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
              style="transition-delay: 300ms;"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-bold text-slate-900">Chat</h3>
                <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock class="w-2.5 h-2.5" /> Secure
                </div>
              </div>
              
              <div class="space-y-3">
                <!-- Message 1 -->
                <div class="flex gap-2">
                  <div class="bg-slate-100 rounded-2xl rounded-tl-none p-2 text-xs text-slate-600 max-w-[80%]">
                    Hi, just confirming our session for tomorrow?
                  </div>
                </div>
                <!-- Message 2 -->
                <div class="flex gap-2 justify-end">
                  <div class="bg-primary-50 text-primary-900 border border-primary-100 rounded-2xl rounded-tr-none p-2 text-xs max-w-[80%]">
                    Yes, see you at 5pm!
                  </div>
                </div>
              </div>
            </div>

            <!-- Card C: Session History -->
            <div 
              class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
              style="transition-delay: 400ms;"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-bold text-slate-900">History</h3>
                <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Summaries
                </div>
              </div>

              <div class="relative pl-4 border-l border-slate-200 space-y-4">
                <div class="relative">
                  <div class="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-white"></div>
                  <div class="text-xs text-slate-500 mb-0.5">Last week</div>
                  <div class="text-sm text-slate-900 font-medium">Anxiety follow-up</div>
                </div>
                <div class="relative opacity-60">
                  <div class="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                  <div class="text-xs text-slate-500 mb-0.5">2 weeks ago</div>
                  <div class="text-sm text-slate-900 font-medium">First intake</div>
                </div>
              </div>
            </div>

            <!-- Card D: Exercises -->
            <div 
              class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group flex items-center justify-between shadow-sm"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
              style="transition-delay: 500ms;"
            >
              <div>
                <h3 class="text-lg font-bold text-slate-900 mb-1">Exercises & guidance</h3>
                <p class="text-slate-500 text-sm">Keep track of your homework</p>
              </div>
              
              <div class="flex gap-2">
                <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-purple-400"></div> Breathing
                </div>
                <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Mood
                </div>
                <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 hidden sm:flex">
                  <div class="w-1.5 h-1.5 rounded-full bg-orange-400"></div> Sleep
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>
