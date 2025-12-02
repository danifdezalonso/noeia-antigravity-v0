<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Sparkles, ArrowLeft, ArrowRight, Check, FileText, Shield, Brain } from 'lucide-vue-next'

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
      
      <!-- HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/for-psychologists" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mx-auto mb-8">
          <Sparkles class="w-8 h-8" />
        </div>

        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          NoeIA, your assistant for <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">notes and reports</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          She helps you write faster. You keep full control of the content and tone.
        </p>
      </section>

      <!-- SECTION 1: Turn rough notes into summaries -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Turn rough notes into summaries</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Paste or write rough notes as you always do.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Ask NoeIA for a structured summary.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Edit freely before saving.</span>
            </li>
          </ul>
        </div>
        
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl grid gap-4">
            <!-- Rough Notes -->
            <div class="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-xs font-bold text-slate-400 uppercase mb-2">Rough Notes</div>
              <p class="text-sm text-slate-600 font-mono leading-relaxed">
                Pt feels stuck at work. Boss is micromanaging. Anxiety 7/10. Sleep is bad (4h/night). We did breathing exercise.
              </p>
            </div>
            
            <!-- Arrow -->
            <div class="flex justify-center">
              <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Sparkles class="w-4 h-4" />
              </div>
            </div>

            <!-- AI Summary -->
            <div class="p-4 rounded-lg bg-white border border-purple-100 shadow-sm ring-1 ring-purple-50">
              <div class="flex items-center justify-between mb-3">
                <div class="text-xs font-bold text-purple-600 uppercase">NoeIA Draft</div>
                <div class="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">Editable</div>
              </div>
              <div class="space-y-3 text-sm text-slate-700">
                <div>
                  <span class="font-bold text-slate-900">Context:</span> Patient reports increased workplace stress due to micromanagement.
                </div>
                <div>
                  <span class="font-bold text-slate-900">Symptoms:</span> Anxiety rated 7/10; significant sleep disruption (4h/night).
                </div>
                <div>
                  <span class="font-bold text-slate-900">Intervention:</span> Guided breathing exercise performed in session.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Prepare the next session -->
      <section class="reveal">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Go into the room with a plan</h2>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          <div class="order-2 md:order-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <div class="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
              <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Brain class="w-4 h-4" />
              </div>
              <div class="font-bold text-slate-900">Session #9 Preparation</div>
            </div>
            <ul class="space-y-3 text-sm text-slate-600">
              <li class="flex gap-2">
                <span class="text-blue-500">•</span>
                <span>Check in on sleep hygiene homework.</span>
              </li>
              <li class="flex gap-2">
                <span class="text-blue-500">•</span>
                <span>Revisit conflict with manager - any changes?</span>
              </li>
              <li class="flex gap-2">
                <span class="text-blue-500">•</span>
                <span>Goal: Introduce cognitive restructuring for work triggers.</span>
              </li>
            </ul>
          </div>

          <div class="order-1 md:order-2 space-y-4">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5" />
                </div>
                <span class="text-slate-600">NoeIA surfaces what changed since last time.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5" />
                </div>
                <span class="text-slate-600">Highlights open topics you haven’t closed.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5" />
                </div>
                <span class="text-slate-600">Suggests 2–3 lines to focus the session.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Reports & documents -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Draft longer documents faster</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Generate draft reports from the timeline and notes.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Keep your voice by editing before sharing.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Reuse templates for recurring document types.</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white border border-slate-200 rounded-xl p-8 shadow-lg">
          <div class="flex items-center gap-3 mb-6">
            <FileText class="w-6 h-6 text-slate-400" />
            <h3 class="text-lg font-bold text-slate-900">Monthly Progress Report</h3>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <div class="h-4 bg-slate-100 rounded w-1/3"></div>
              <div class="h-2 bg-slate-50 rounded w-full"></div>
              <div class="h-2 bg-slate-50 rounded w-full"></div>
              <div class="h-2 bg-slate-50 rounded w-5/6"></div>
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-slate-100 rounded w-1/4"></div>
              <div class="h-2 bg-slate-50 rounded w-full"></div>
              <div class="h-2 bg-slate-50 rounded w-4/5"></div>
            </div>
            <div class="pt-4 flex justify-end gap-2">
              <button class="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded">Discard</button>
              <button class="px-3 py-1 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded shadow-sm">Save to PDF</button>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Boundaries -->
      <section class="text-center max-w-3xl mx-auto reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Shield class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-4">You stay in control</h2>
        <div class="grid md:grid-cols-3 gap-6 text-left mt-8">
          <div class="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p class="text-sm text-slate-600">NoeIA never replaces clinical judgment.</p>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p class="text-sm text-slate-600">You see drafts before they become part of the record.</p>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p class="text-sm text-slate-600">All AI activity stays inside the workspace.</p>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/for-psychologists/portal">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Patient Portal <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
