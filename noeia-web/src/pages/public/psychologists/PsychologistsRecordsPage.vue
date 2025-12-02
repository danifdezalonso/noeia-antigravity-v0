<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { FileText, ArrowLeft, ArrowRight, Check, Lock, Share2, Clock } from 'lucide-vue-next'

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-emerald-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/for-psychologists" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Overview
          </RouterLink>
        </div>

        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Client records that <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">stay readable over time</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          You can’t remember every detail from every session. Noeia keeps each case coherent without turning it into a rigid form.
        </p>
      </section>

      <!-- SECTION 1: Timeline per client -->
      <section class="grid lg:grid-cols-2 gap-16 items-start reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Timeline UI Mock -->
            <div class="relative pl-8 border-l-2 border-slate-100 space-y-8">
              <!-- Item 1 -->
              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm">
                  <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-slate-900">Session #8</div>
                    <div class="text-xs text-slate-500">May 17</div>
                  </div>
                  <div class="flex gap-2 mb-3">
                    <span class="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-medium">Notes</span>
                    <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded font-medium">AI Summary</span>
                  </div>
                  <p class="text-sm text-slate-600">Discussed progress on exposure exercises. Patient reported lower anxiety levels.</p>
                </div>
              </div>
              <!-- Item 2 -->
              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-slate-300 shadow-sm"></div>
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-slate-700">Session #7</div>
                    <div class="text-xs text-slate-500">May 3</div>
                  </div>
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-medium">Shared Summary</span>
                  </div>
                </div>
              </div>
              <!-- Item 3 -->
              <div class="relative">
                 <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-slate-300 shadow-sm"></div>
                 <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                   <div class="flex justify-between items-start mb-2">
                     <div class="font-bold text-slate-700">Exercise Assigned</div>
                     <div class="text-xs text-slate-500">Apr 28</div>
                   </div>
                   <p class="text-sm text-slate-500">Mood Tracking Log</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Timeline per client</h2>
          <p class="text-lg text-slate-600">
            Each client has a timeline: sessions, notes, documents, and AI summaries.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Scroll through previous sessions and see summaries.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Jump to documents tied to specific dates.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">See when you last assigned exercises or tasks.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 2: Therapist-only vs shared -->
      <section class="reveal">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Your private notes vs shared information</h2>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Column A -->
          <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <Lock class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-bold text-slate-900">Therapist-only</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                <span class="text-slate-600">Internal reflective notes.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                <span class="text-slate-600">Risk hypotheses.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                <span class="text-slate-600">Content never shared with patient.</span>
              </li>
            </ul>
          </div>

          <!-- Column B -->
          <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Share2 class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-bold text-slate-900">Shared</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <span class="text-slate-600">Short summaries.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <span class="text-slate-600">Exercises and homework.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <span class="text-slate-600">Treatment goals and agreements.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Toggle Mock -->
        <div class="flex justify-center mt-12">
           <div class="bg-slate-50 rounded-full p-1 border border-slate-200 flex items-center shadow-inner">
             <button class="px-6 py-2 rounded-full bg-white text-slate-900 text-sm font-bold shadow-sm border border-slate-100 flex items-center gap-2">
               <Lock class="w-3 h-3 text-slate-400" /> Private
             </button>
             <button class="px-6 py-2 rounded-full text-slate-500 text-sm font-bold hover:text-slate-700 flex items-center gap-2">
               <Share2 class="w-3 h-3" /> Share with patient
             </button>
           </div>
        </div>
      </section>

      <!-- SECTION 3: Documentation examples -->
      <section class="reveal">
        <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">Documentation examples</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
              <Clock class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 mb-3">Short session summary</h3>
            <ul class="space-y-2 text-sm text-slate-600">
              <li>• Key themes discussed</li>
              <li>• Patient's current mood</li>
              <li>• Agreed next steps</li>
            </ul>
          </div>
          <!-- Card 2 -->
          <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
              <FileText class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 mb-3">Progress review note</h3>
            <ul class="space-y-2 text-sm text-slate-600">
              <li>• Comparison to baseline</li>
              <li>• Goal achievement status</li>
              <li>• Treatment plan adjustment</li>
            </ul>
          </div>
          <!-- Card 3 -->
          <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 mb-4">
              <Lock class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 mb-3">Crisis follow-up note</h3>
            <ul class="space-y-2 text-sm text-slate-600">
              <li>• Risk assessment details</li>
              <li>• Safety plan review</li>
              <li>• Immediate actions taken</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/for-psychologists/ai">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: AI for Notes <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
