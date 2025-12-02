<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero -->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            See how far you’ve come
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Therapy is a journey. Noeia helps you look back at your sessions, notes, and milestones to see the progress you’re making.
          </p>
        </div>
        
        <!-- Background Gradients -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div class="absolute top-20 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
        
        <!-- SECTION 1: Session History -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">Your journey in a timeline</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <History class="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Complete session log</h3>
                  <p class="text-slate-600 text-sm">Every appointment is saved with its date, time, and topic.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <FileText class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Context for every step</h3>
                  <p class="text-slate-600 text-sm">See what you discussed and what exercises were assigned.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Timeline Visual -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-emerald-200 to-teal-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
              <div class="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-100"></div>
              
              <div class="space-y-8 relative">
                <!-- Item 1 -->
                <div class="flex gap-6">
                  <div class="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white relative z-10 mt-1.5"></div>
                  <div class="flex-1">
                    <div class="text-sm font-bold text-slate-500 mb-1">Today</div>
                    <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div class="font-bold text-slate-900">Session 12: Progress Review</div>
                      <p class="text-sm text-slate-600 mt-2">Reflecting on the last month's changes and setting new goals.</p>
                    </div>
                  </div>
                </div>
                
                <!-- Item 2 -->
                <div class="flex gap-6">
                  <div class="w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white relative z-10 mt-1.5"></div>
                  <div class="flex-1">
                    <div class="text-sm font-bold text-slate-500 mb-1">Last Week</div>
                    <div class="bg-slate-50 rounded-xl p-4 border border-slate-100 opacity-75">
                      <div class="font-bold text-slate-900">Session 11: Coping Strategies</div>
                      <p class="text-sm text-slate-600 mt-2">Introduction to CBT techniques for anxiety management.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Reflections & Notes -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-pink-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
              <div class="space-y-4">
                <div class="p-4 bg-yellow-50 rounded-xl border border-yellow-100 relative">
                  <div class="absolute -top-2 -right-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full border border-yellow-200">Private</div>
                  <div class="text-xs font-bold text-yellow-700 uppercase mb-2">My Reflection</div>
                  <p class="text-slate-800 text-sm italic">
                    "I felt much calmer after applying the breathing technique during the meeting. It actually worked."
                  </p>
                  <div class="mt-3 text-xs text-slate-500 text-right">Added Oct 12</div>
                </div>
                
                <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div class="text-xs font-bold text-blue-700 uppercase mb-2">Therapist Note</div>
                  <p class="text-slate-800 text-sm">
                    Great progress on the homework. Let's focus on the sleep patterns next time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">Capture your thoughts</h2>
            <p class="text-lg text-slate-600">
              Don’t let insights fade away. Write down your thoughts after a session or during the week.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center shrink-0">
                  <PenTool class="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Private journal</h3>
                  <p class="text-slate-600 text-sm">Keep personal notes that only you can see, unless you choose to share them.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                  <MessageSquare class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Prepare for sessions</h3>
                  <p class="text-slate-600 text-sm">Jot down topics you want to discuss so you don’t forget.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- SECTION 3: Simple Progress View -->
        <section class="reveal text-center max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Progress isn’t always linear, but it’s visible</h2>
          <p class="text-lg text-slate-600 mb-12">
            Noeia simply organizes your history so you can see the work you’ve put in over time.
          </p>
          
          <div class="grid sm:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="text-4xl font-bold text-slate-900 mb-2">12</div>
              <div class="text-slate-600 font-medium">Sessions completed</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="text-4xl font-bold text-slate-900 mb-2">8</div>
              <div class="text-slate-600 font-medium">Exercises done</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="text-4xl font-bold text-slate-900 mb-2">3</div>
              <div class="text-slate-600 font-medium">Months of growth</div>
            </div>
          </div>
        </section>

      </div>
    </main>
    
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { History, FileText, PenTool, MessageSquare } from 'lucide-vue-next'

const useScrollReveal = () => {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })
}

useScrollReveal()
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
