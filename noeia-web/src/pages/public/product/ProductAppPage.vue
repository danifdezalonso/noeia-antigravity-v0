<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Smartphone, Calendar, MessageCircle, Activity, ArrowLeft, ArrowRight, Check } from 'lucide-vue-next'

// Animation composable
const useScrollReveal = () => {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-4')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    })

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-4')
      observer.value?.observe(el)
    })
  })
}

useScrollReveal()
</script>

<template>
  <div class="bg-white min-h-screen text-slate-900 selection:bg-purple-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mx-auto mb-8">
          <Smartphone class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Apps for <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">patients, doctors, and clinics</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
          Three focused apps, one shared source of truth. Everyone stays connected, wherever they are.
        </p>

        <!-- Device Mocks Hero -->
        <div class="relative h-[400px] w-full max-w-3xl mx-auto">
          <!-- Tablet / Desktop Panel (Back) -->
          <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-white rounded-xl border border-slate-200 shadow-2xl opacity-50 scale-90"></div>
          
          <!-- Phone 1 (Left - Patient) -->
          <div class="absolute top-20 left-10 lg:left-20 w-[240px] h-[480px] bg-white rounded-[3rem] border-8 border-slate-100 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 overflow-hidden ring-1 ring-slate-200">
            <div class="absolute top-0 inset-x-0 h-6 bg-slate-100 rounded-b-xl w-32 mx-auto z-20"></div>
            <div class="p-4 pt-12 h-full bg-white">
              <div class="flex justify-between items-center mb-6">
                <div class="w-8 h-8 rounded-full bg-slate-100"></div>
                <div class="w-8 h-8 rounded-full bg-slate-50"></div>
              </div>
              <div class="space-y-4">
                <div class="h-32 rounded-2xl bg-purple-50 border border-purple-100 p-4">
                  <div class="text-xs text-purple-600 font-bold uppercase mb-2">Next Session</div>
                  <div class="text-lg font-bold text-slate-900">Tomorrow, 10:00</div>
                  <div class="text-sm text-slate-500">Dr. Sarah Cohen</div>
                </div>
                <div class="h-16 rounded-xl bg-slate-50 flex items-center px-4 gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><MessageCircle class="w-4 h-4" /></div>
                  <div class="h-2 w-24 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phone 2 (Right - Doctor) -->
          <div class="absolute top-0 right-10 lg:right-20 w-[240px] h-[480px] bg-white rounded-[3rem] border-8 border-slate-100 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 z-20 overflow-hidden ring-1 ring-slate-200">
             <div class="absolute top-0 inset-x-0 h-6 bg-slate-100 rounded-b-xl w-32 mx-auto z-20"></div>
             <div class="p-4 pt-12 h-full bg-white">
               <div class="text-lg font-bold text-slate-900 mb-4">My Day</div>
               <div class="space-y-3">
                 <div class="p-3 rounded-xl bg-slate-50 border-l-4 border-emerald-500 shadow-sm">
                   <div class="text-sm font-bold text-slate-900">09:00 AM</div>
                   <div class="text-xs text-slate-500">Ana M. • Anxiety</div>
                 </div>
                 <div class="p-3 rounded-xl bg-slate-50 border-l-4 border-blue-500 shadow-sm">
                   <div class="text-sm font-bold text-slate-900">10:30 AM</div>
                   <div class="text-xs text-slate-500">Carlos R. • Check-in</div>
                 </div>
                 <div class="p-3 rounded-xl bg-slate-50 border-l-4 border-purple-500 shadow-sm">
                   <div class="text-sm font-bold text-slate-900">02:00 PM</div>
                   <div class="text-xs text-slate-500">Maria L. • Intake</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Patient App -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal pt-32">
        <div class="order-2 lg:order-1 flex justify-center">
          <!-- Phone Mock -->
          <div class="w-[280px] h-[560px] bg-white rounded-[3rem] border-8 border-slate-100 shadow-2xl overflow-hidden relative ring-1 ring-slate-200">
            <div class="absolute top-0 inset-x-0 h-6 bg-slate-100 rounded-b-xl w-32 mx-auto z-20"></div>
            <div class="h-full bg-white p-6 pt-12 flex flex-col">
              <div class="flex-1 space-y-6">
                <div class="flex items-center justify-between">
                   <h3 class="text-xl font-bold text-slate-900">Hello, Alex</h3>
                   <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>
                
                <!-- Card 1 -->
                <div class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-200">
                  <div class="flex items-center gap-2 mb-4 opacity-80">
                    <Calendar class="w-4 h-4" />
                    <span class="text-xs font-bold uppercase tracking-wide">Upcoming</span>
                  </div>
                  <div class="text-2xl font-bold mb-1">Tomorrow</div>
                  <div class="text-lg opacity-90 mb-4">10:00 AM</div>
                  <div class="flex items-center gap-2 text-sm bg-white/10 rounded-lg p-2">
                    <div class="w-6 h-6 rounded-full bg-white/20"></div>
                    <span>Dr. Sarah Cohen</span>
                  </div>
                </div>

                <!-- Card 2 -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <div class="font-bold text-slate-900">Homework</div>
                    <div class="text-xs text-slate-500">1/3 done</div>
                  </div>
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <div class="w-5 h-5 rounded-full border-2 border-purple-500 bg-purple-500 flex items-center justify-center">
                        <Check class="w-3 h-3 text-white" />
                      </div>
                      <span class="text-sm text-slate-400 line-through">Breathing exercise</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                      <span class="text-sm text-slate-700">Journal entry</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                      <span class="text-sm text-slate-700">Sleep log</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Bottom Nav -->
              <div class="h-16 border-t border-slate-100 flex items-center justify-around text-slate-400">
                <div class="text-purple-600"><Activity class="w-6 h-6" /></div>
                <div><Calendar class="w-6 h-6" /></div>
                <div><MessageCircle class="w-6 h-6" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Activity class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Patient app: clarity between sessions</h2>
          <p class="text-lg text-slate-600">
            Empower patients to take charge of their journey with tools that extend therapy beyond the office.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Book sessions through a visual calendar.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Chat with your therapist in one dedicated channel.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Review history, exercises, and good practices.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Doctor App -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Smartphone class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Doctor app: your day in your pocket</h2>
          <p class="text-lg text-slate-600">
            Manage your schedule and capture insights immediately, even when you're away from your desk.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Today’s sessions at a glance.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Write quick notes immediately after each session.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Trigger AI summaries while you move between rooms.</span>
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <!-- Phone Mock -->
          <div class="w-[280px] h-[560px] bg-white rounded-[3rem] border-8 border-slate-100 shadow-2xl overflow-hidden relative ring-1 ring-slate-200">
            <div class="absolute top-0 inset-x-0 h-6 bg-slate-100 rounded-b-xl w-32 mx-auto z-20"></div>
            <div class="h-full bg-white p-6 pt-12 flex flex-col">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-slate-900">My Schedule</h3>
                <div class="p-2 bg-slate-50 rounded-lg"><Calendar class="w-4 h-4 text-slate-500" /></div>
              </div>
              
              <div class="space-y-4">
                <!-- Session Card -->
                <div class="bg-white rounded-xl p-4 border-l-4 border-l-blue-500 shadow-sm border border-slate-100">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-slate-900">Ana Martinez</div>
                    <span class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">09:00</span>
                  </div>
                  <div class="text-sm text-slate-500 mb-3">Anxiety • Follow-up</div>
                  <div class="flex gap-2">
                    <button class="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 rounded text-xs font-medium transition-colors text-slate-700">Notes</button>
                    <button class="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 rounded text-xs font-medium transition-colors text-slate-700">History</button>
                  </div>
                </div>

                <!-- Session Card -->
                <div class="bg-white rounded-xl p-4 border-l-4 border-l-purple-500 shadow-sm border border-slate-100">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-slate-900">Carlos Ruiz</div>
                    <span class="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">10:30</span>
                  </div>
                  <div class="text-sm text-slate-500 mb-3">Check-in • Online</div>
                  <div class="flex gap-2">
                    <button class="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 rounded text-xs font-medium transition-colors text-slate-700">Notes</button>
                    <button class="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 rounded text-xs font-medium transition-colors text-slate-700">Link</button>
                  </div>
                </div>
              </div>

              <!-- Quick Action -->
              <div class="mt-auto">
                <button class="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white shadow-lg shadow-blue-200 transition-all">
                  + Quick Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Organization App -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 flex justify-center">
          <!-- Tablet / Small Desktop Panel Mock -->
          <div class="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
            <div class="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <div class="font-bold text-slate-900">Clinic Dashboard</div>
              <div class="w-8 h-8 rounded-full bg-slate-200"></div>
            </div>
            <div class="p-6 grid grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-slate-400 text-xs uppercase font-bold mb-2">Sessions Today</div>
                <div class="text-3xl font-bold text-slate-900">24</div>
                <div class="text-emerald-600 text-xs mt-1">↑ 12% vs last week</div>
              </div>
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-slate-400 text-xs uppercase font-bold mb-2">Active Rooms</div>
                <div class="text-3xl font-bold text-slate-900">5<span class="text-slate-400 text-lg font-normal">/6</span></div>
                <div class="text-blue-600 text-xs mt-1">83% occupancy</div>
              </div>
              <div class="col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-slate-400 text-xs uppercase font-bold mb-4">Revenue Snapshot</div>
                <div class="flex items-end gap-2 h-24">
                  <div class="w-1/6 bg-slate-100 rounded-t h-[40%]"></div>
                  <div class="w-1/6 bg-slate-100 rounded-t h-[60%]"></div>
                  <div class="w-1/6 bg-slate-100 rounded-t h-[50%]"></div>
                  <div class="w-1/6 bg-slate-100 rounded-t h-[80%]"></div>
                  <div class="w-1/6 bg-purple-500 rounded-t h-[90%] shadow-lg shadow-purple-200"></div>
                  <div class="w-1/6 bg-slate-50 rounded-t h-[70%] border border-slate-200 border-dashed"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <div class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
            <Activity class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Organization app: monitor the clinic on the go</h2>
          <p class="text-lg text-slate-600">
            Keep a pulse on your clinic's performance and operations from anywhere.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Sessions today and this week.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Which rooms are in use.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">High-level revenue snapshot.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/ai">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Meet Mia, the AI Assistant <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </RouterLink>
      </section>

    </div>
  </div>
</template>

<style scoped>
.reveal {
  will-change: opacity, transform;
}
</style>
