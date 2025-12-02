<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Smartphone, ArrowLeft, ArrowRight, Check, MessageSquare, Eye } from 'lucide-vue-next'

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-indigo-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/for-psychologists" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-8">
          <Smartphone class="w-8 h-8" />
        </div>

        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Patient portal <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">under your control</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Give patients clarity between sessions without losing professional boundaries.
        </p>
      </section>

      <!-- SECTION 1: What patients see -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">What patients see</h2>
          <p class="text-lg text-slate-600">
            Patients see upcoming sessions, simple summaries, exercises, and a dedicated chat.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Next session details and link.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Shared summaries and homework.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Secure messaging channel.</span>
            </li>
          </ul>
        </div>
        
        <div class="flex justify-center">
          <div class="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden">
            <!-- Notch -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
            
            <!-- Screen Content -->
            <div class="w-full h-full bg-slate-50 overflow-y-auto pt-10 px-4 pb-4 space-y-4">
              <!-- Header -->
              <div class="flex justify-between items-center">
                <div class="font-bold text-slate-900">Hello, Alex</div>
                <div class="w-8 h-8 rounded-full bg-slate-200"></div>
              </div>
              
              <!-- Next Session Card -->
              <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div class="text-xs font-bold text-indigo-600 uppercase mb-2">Next Session</div>
                <div class="font-bold text-slate-900 text-lg">Oct 31, 10:00</div>
                <div class="text-sm text-slate-500 mb-3">Online Video Call</div>
                <button class="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Join Waiting Room</button>
              </div>

              <!-- Messages -->
              <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-xs font-bold text-slate-400 uppercase">Messages</div>
                  <div class="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <div class="flex gap-3 items-center">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">Dr</div>
                  <div class="text-sm text-slate-600 truncate">Please fill out the form...</div>
                </div>
              </div>

              <!-- Exercises -->
              <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div class="text-xs font-bold text-slate-400 uppercase mb-2">To Do</div>
                <div class="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div class="w-4 h-4 border-2 border-slate-300 rounded"></div>
                  <div class="text-sm text-slate-700">Anxiety Log</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: What you decide -->
      <section class="reveal">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">You decide what crosses the line</h2>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          <div class="space-y-4">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5" />
                </div>
                <span class="text-slate-600">Choose which summaries to share.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5" />
                </div>
                <span class="text-slate-600">Attach only the exercises you want visible.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5" />
                </div>
                <span class="text-slate-600">Control tone and level of detail.</span>
              </li>
            </ul>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
            <div class="flex items-center justify-between mb-6">
              <div class="font-bold text-slate-900">Session Summary Visibility</div>
              <Eye class="w-5 h-5 text-slate-400" />
            </div>
            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div class="text-sm font-medium text-slate-700">Share with patient</div>
              <!-- Toggle Switch Mock -->
              <div class="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
              </div>
            </div>
            <p class="text-xs text-slate-500 mt-4">
              When disabled, this summary remains visible only to you and authorized clinical staff.
            </p>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Boundaries with messaging -->
      <section class="text-center max-w-3xl mx-auto reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <MessageSquare class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Boundaries with messaging</h2>
        <div class="grid md:grid-cols-3 gap-6 text-left mt-8 mb-8">
          <div class="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p class="text-sm text-slate-600">One secure channel, not mixed with personal apps.</p>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p class="text-sm text-slate-600">Set expectations for response times.</p>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p class="text-sm text-slate-600">Keep session-critical discussions for the actual session.</p>
          </div>
        </div>
        
        <!-- Chat Preview -->
        <div class="bg-white rounded-xl p-4 border border-slate-200 max-w-sm mx-auto shadow-sm text-left">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold text-slate-400">Secure Chat</span>
            <span class="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold">Not for crisis</span>
          </div>
          <div class="flex gap-2 mb-2">
             <div class="bg-slate-100 rounded-lg rounded-tl-none p-2 text-xs text-slate-600 max-w-[80%]">
               Hi Dr. Sarah, can we move our session to Tuesday?
             </div>
             <span class="text-[10px] text-slate-300 self-end">10:42</span>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/for-psychologists/getting-started">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Getting Started <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
