<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Calendar, ArrowLeft, ArrowRight, Check, Clock, FileText, Send, Sparkles } from 'lucide-vue-next'

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-blue-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/for-psychologists" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Overview
          </RouterLink>
        </div>

        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Your daily workflow, <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">end-to-end</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Start from the calendar, run your sessions, capture notes, and send follow-ups without leaving Noeia.
        </p>
      </section>

      <!-- SECTION 1: Start in the calendar -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Start in the calendar</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">See today’s sessions in one vertical list or a week view.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Handle cancellations and rescheduling by dragging sessions.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Mark online vs in-person, assign rooms if needed.</span>
            </li>
          </ul>
        </div>
        
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Day View Mock -->
            <div class="space-y-4">
              <div class="flex justify-between items-center mb-4">
                <div class="font-bold text-slate-900">Today, Oct 24</div>
                <div class="text-xs text-slate-500">3 Sessions</div>
              </div>
              <div class="space-y-3">
                <div class="flex gap-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div class="text-xs font-bold text-blue-600 w-12 pt-1">09:00</div>
                  <div>
                    <div class="font-bold text-slate-900">Alex M.</div>
                    <div class="text-xs text-slate-500">Initial Consultation • Room 1</div>
                  </div>
                </div>
                <div class="flex gap-4 p-3 rounded-lg bg-white border border-slate-200 opacity-60">
                  <div class="text-xs font-bold text-slate-500 w-12 pt-1">11:00</div>
                  <div>
                    <div class="font-bold text-slate-900">Sarah J.</div>
                    <div class="text-xs text-slate-500">Follow-up • Online</div>
                  </div>
                </div>
                <div class="flex gap-4 p-3 rounded-lg bg-white border border-slate-200 opacity-60">
                  <div class="text-xs font-bold text-slate-500 w-12 pt-1">14:00</div>
                  <div>
                    <div class="font-bold text-slate-900">Team Meeting</div>
                    <div class="text-xs text-slate-500">Internal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Enter the session -->
      <section class="reveal">
        <div class="relative group max-w-4xl mx-auto">
          <div class="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-8 shadow-2xl">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="flex-1 space-y-4">
                <h2 class="text-2xl font-bold text-slate-900">Enter the session</h2>
                <p class="text-slate-600">Click a session to open a split view: left side the session details, right side the client record and notes.</p>
                <div class="flex items-center gap-4 pt-2">
                  <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Clock class="w-6 h-6" />
                  </div>
                  <div>
                    <div class="font-bold text-slate-900">Alex M.</div>
                    <div class="text-sm text-slate-500">09:00 - 09:50 • Room 1</div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0">
                <Button class="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                  Open Session Notes <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Capture notes fast -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Notes UI Mock -->
            <div class="space-y-4">
              <div class="p-4 rounded-lg bg-slate-50 border border-slate-200 min-h-[120px] text-sm text-slate-600 font-mono">
                Patient discussed anxiety triggers at work. Mentioned conflict with manager. We explored cognitive reframing...
              </div>
              <div class="flex justify-center">
                <button class="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors">
                  <Sparkles class="w-3 h-3" /> Generate Summary
                </button>
              </div>
              <div class="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span class="text-xs font-bold text-slate-900 uppercase">AI Summary</span>
                </div>
                <div class="space-y-2">
                  <div class="h-2 bg-slate-100 rounded w-full"></div>
                  <div class="h-2 bg-slate-100 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Capture notes fast</h2>
          <p class="text-lg text-slate-600">
            Write in your own words. NoeIA structures it into summaries and key points.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Free-form notes area.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">One-click ‘Generate summary’ using AI.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Mark what stays private vs what might be shared.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 4: Follow-up -->
      <section class="text-center max-w-3xl mx-auto reveal">
        <h2 class="text-3xl font-bold text-slate-900 mb-8">Always know what happens next</h2>
        <div class="grid md:grid-cols-3 gap-8 mb-12 text-left">
          <div class="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 mb-4 shadow-sm">
              <Calendar class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 mb-2">Next Session</h3>
            <p class="text-sm text-slate-500">Add a quick plan for the next session.</p>
          </div>
          <div class="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 mb-4 shadow-sm">
              <FileText class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 mb-2">Exercises</h3>
            <p class="text-sm text-slate-500">Attach exercises or homework to the session.</p>
          </div>
          <div class="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 mb-4 shadow-sm">
              <Send class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 mb-2">Portal Update</h3>
            <p class="text-sm text-slate-500">Optionally send a short summary to the patient.</p>
          </div>
        </div>
        
        <!-- Mini Timeline Visual -->
        <div class="inline-flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-full shadow-lg">
          <div class="text-xs font-bold text-slate-400 uppercase">Timeline</div>
          <div class="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div class="text-sm font-bold text-slate-900">Session #12</div>
          <ArrowRight class="w-4 h-4 text-slate-300" />
          <div class="text-sm font-bold text-blue-600">Next: Oct 31</div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/for-psychologists/records">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Records & Documentation <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
