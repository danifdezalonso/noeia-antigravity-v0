<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Sparkles, FileText, ArrowLeft, ArrowRight, Check, Shield, Clock } from 'lucide-vue-next'

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
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-8">
          <Sparkles class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          NoeIA, your <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">AI assistant</span> <br>
          for therapeutic work
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
          Helps write, never decides for you. NoeIA uses context to draft summaries, leaving you in full control.
        </p>

        <div class="flex justify-center">
          <RouterLink to="/login">
            <Button size="lg" class="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105">
              See AI in action
            </Button>
          </RouterLink>
        </div>
      </section>

      <!-- SECTION 2: From Notes to Summaries -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- UI Mock -->
            <div class="grid grid-cols-2 gap-4 h-[400px]">
              <!-- Left: Rough Notes -->
              <div class="bg-white rounded-lg p-4 border border-slate-200 flex flex-col shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase mb-3">Your Rough Notes</div>
                <div class="font-mono text-sm text-slate-600 space-y-2">
                  <p>- pt feeling anxious about new job</p>
                  <p>- sleep poor, 4h/night</p>
                  <p>- discussed coping strategies</p>
                  <p>- breathing exercises helped</p>
                  <p>- next week: review sleep log</p>
                </div>
              </div>
              <!-- Right: Structured Summary -->
              <div class="bg-emerald-50 rounded-lg p-4 border border-emerald-100 flex flex-col relative overflow-hidden shadow-sm">
                <div class="absolute top-0 right-0 p-2">
                  <Sparkles class="w-4 h-4 text-emerald-600" />
                </div>
                <div class="text-xs font-bold text-emerald-600 uppercase mb-3">NoeIA's Draft</div>
                <div class="text-sm text-slate-700 space-y-4">
                  <div>
                    <span class="font-bold text-emerald-700 text-xs uppercase block mb-1">Presenting Problem</span>
                    <p class="opacity-90">Patient reports increased anxiety related to recent employment transition.</p>
                  </div>
                  <div>
                    <span class="font-bold text-emerald-700 text-xs uppercase block mb-1">Symptoms</span>
                    <p class="opacity-90">Significant insomnia reported (approx. 4 hours sleep/night).</p>
                  </div>
                  <div>
                    <span class="font-bold text-emerald-700 text-xs uppercase block mb-1">Intervention</span>
                    <p class="opacity-90">Discussed coping strategies; breathing exercises identified as helpful.</p>
                  </div>
                </div>
                <!-- Action Buttons -->
                <div class="mt-auto flex gap-2 pt-4">
                   <button class="flex-1 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 transition-colors">Approve</button>
                   <button class="flex-1 py-1 bg-white border border-emerald-200 text-emerald-600 rounded text-xs font-bold hover:bg-emerald-50 transition-colors">Edit</button>
                </div>
              </div>
            </div>
            <!-- Arrow -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 border border-slate-200 z-10 shadow-lg">
              <ArrowRight class="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileText class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">From rough notes to structured summaries</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Paste your notes or write freely during the session.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">NoeIA proposes a structured summary based on your template.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">You edit, refine, or discard any part before saving.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Session Preparation -->
      <section class="max-w-4xl mx-auto reveal text-center">
        <h2 class="text-3xl font-bold text-slate-900 mb-12">Enter next session with a clear plan</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <Activity class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">What changed?</h3>
            <p class="text-slate-500 text-sm">NoeIA highlights changes in symptoms or life events since the last visit.</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-4 mx-auto">
              <Clock class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">What to revisit?</h3>
            <p class="text-slate-500 text-sm">Reminders about homework assigned or topics tabled for later.</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-4 mx-auto">
              <Shield class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Risks & Supports</h3>
            <p class="text-slate-500 text-sm">Quick view of risk factors and support systems identified previously.</p>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Documentation Speed -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <div class="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
            <Clock class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Turn hours into minutes</h2>
          <p class="text-lg text-slate-600">
            Reduce the administrative burden so you can focus on your patients or your own downtime.
          </p>
          <div class="grid grid-cols-2 gap-8 pt-4">
            <div>
              <div class="text-4xl font-bold text-slate-900 mb-1">40%</div>
              <div class="text-slate-500 text-sm">Less time on documentation</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-slate-900 mb-1">0</div>
              <div class="text-slate-500 text-sm">Backlogged notes at weekend</div>
            </div>
          </div>
        </div>
        <div class="relative group">
           <div class="absolute -inset-1 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
           <div class="relative rounded-xl bg-white border border-slate-200 p-8 shadow-2xl flex items-center justify-center h-[300px]">
             <div class="text-center space-y-4">
               <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500">
                 <span class="w-2 h-2 rounded-full bg-red-500"></span>
                 <span>Manual: 15 mins/session</span>
               </div>
               <div class="flex justify-center">
                 <ArrowRight class="w-6 h-6 text-slate-400 rotate-90" />
               </div>
               <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-lg">
                 <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span>With NoeIA: 3 mins/session</span>
               </div>
             </div>
           </div>
        </div>
      </section>

      <!-- SECTION 5: Boundaries -->
      <section class="max-w-3xl mx-auto text-center reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Shield class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-6">You stay in control</h2>
        <div class="space-y-4 text-lg text-slate-600">
          <p>NoeIA never replaces your clinical thinking.</p>
          <p>You decide what goes into the record.</p>
          <p>All drafts are visible, editable, and require your approval.</p>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/calendar">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Core Features <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
