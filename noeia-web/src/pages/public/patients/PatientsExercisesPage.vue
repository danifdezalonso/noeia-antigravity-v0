<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero -->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Tools for your daily life
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Access exercises, reading materials, and questionnaires assigned by your therapist, all in one easy-to-find library.
          </p>
        </div>
        
        <!-- Background Gradients -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
        
        <!-- SECTION 1: Central Library -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">Everything in one place</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Library class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Your personal library</h3>
                  <p class="text-slate-600 text-sm">No more searching through emails or chat history for that PDF or link.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                  <CheckSquare class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Clear to-dos</h3>
                  <p class="text-slate-600 text-sm">See exactly what’s pending and mark it as done when you’re ready.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Library Visual -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-blue-200 to-purple-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-bold text-lg text-slate-900">Active Exercises</h3>
                <div class="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg border border-primary-100">2 Pending</div>
              </div>
              
              <div class="space-y-3">
                <!-- Item 1 -->
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors cursor-pointer group">
                  <div class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary-200 transition-colors">
                    <FileText class="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">Anxiety Scale (GAD-7)</div>
                    <div class="text-xs text-slate-500">Questionnaire · 5 min</div>
                  </div>
                  <ChevronRight class="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
                
                <!-- Item 2 -->
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors cursor-pointer group">
                  <div class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary-200 transition-colors">
                    <PlayCircle class="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">Breathing Technique</div>
                    <div class="text-xs text-slate-500">Audio Guide · 10 min</div>
                  </div>
                  <ChevronRight class="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
                
                <!-- Item 3 (Completed) -->
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                  <div class="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                    <Check class="w-5 h-5 text-emerald-600" />
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-slate-900 line-through decoration-slate-400">Sleep Diary</div>
                    <div class="text-xs text-slate-500">Completed yesterday</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Linked to Sessions -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-orange-200 to-red-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
              <div class="mb-4 pb-4 border-b border-slate-100">
                <div class="text-xs font-bold text-slate-500 uppercase mb-1">Session Context</div>
                <div class="font-bold text-slate-900 text-lg">Managing Work Stress</div>
                <div class="text-sm text-slate-500">Tue, 12 Oct</div>
              </div>
              
              <div>
                <div class="text-xs font-bold text-slate-500 uppercase mb-3">Assigned Homework</div>
                <div class="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
                  <div class="mt-0.5">
                    <BookOpen class="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Read: "The Art of Saying No"</div>
                    <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                      Please read the first chapter before our next meeting. It relates to the boundary setting we discussed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">Connected to your work</h2>
            <p class="text-lg text-slate-600">
              Exercises aren’t random. In Noeia, they are often linked to specific sessions, so you understand the "why" behind them.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Link class="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Contextual learning</h3>
                  <p class="text-slate-600 text-sm">See which session sparked a particular exercise or reading.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <MessageCircle class="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Discuss results easily</h3>
                  <p class="text-slate-600 text-sm">Your therapist can see your completion status, making follow-up easier.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- SECTION 3: Best Practices -->
        <section class="reveal text-center max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-slate-900 mb-12">Build good habits</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Clock class="w-6 h-6 text-slate-600" />
              </div>
              <h3 class="font-bold text-slate-900 mb-2">Do it at your pace</h3>
              <p class="text-slate-600 text-sm">Complete exercises when you have the time and mental space.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Smartphone class="w-6 h-6 text-slate-600" />
              </div>
              <h3 class="font-bold text-slate-900 mb-2">Mobile friendly</h3>
              <p class="text-slate-600 text-sm">Fill out questionnaires on your phone during your commute.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield class="w-6 h-6 text-slate-600" />
              </div>
              <h3 class="font-bold text-slate-900 mb-2">Private results</h3>
              <p class="text-slate-600 text-sm">Your answers are shared only with your therapist, securely.</p>
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
import { Library, BookOpen, CheckSquare, ChevronRight, Link, FileText, PlayCircle, Clock, Check, MessageCircle, Smartphone, Shield } from 'lucide-vue-next'

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
