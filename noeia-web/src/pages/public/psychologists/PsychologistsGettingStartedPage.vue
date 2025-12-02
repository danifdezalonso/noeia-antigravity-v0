<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Rocket, ArrowLeft } from 'lucide-vue-next'

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-orange-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/for-psychologists" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mx-auto mb-8">
          <Rocket class="w-8 h-8" />
        </div>

        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Getting started as a <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">solo psychologist</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          You can start alone and add more professionals later.
        </p>
      </section>

      <!-- SECTION 1: Step-by-step timeline -->
      <section class="reveal">
        <div class="relative max-w-4xl mx-auto">
          <!-- Vertical Line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 md:left-1/2 md:-ml-px"></div>

          <div class="space-y-12">
            <!-- Step 1 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 md:text-right order-2 md:order-1">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Create your workspace</h3>
                <p class="text-slate-600">Set up your profile and basic settings.</p>
              </div>
              <div class="w-16 h-16 rounded-full bg-white border-4 border-orange-50 flex items-center justify-center text-orange-600 shrink-0 z-10 shadow-sm order-1 md:order-2">
                <span class="font-bold text-xl">1</span>
              </div>
              <div class="flex-1 order-3 md:order-3"></div>
            </div>

            <!-- Step 2 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 order-3 md:order-1"></div>
              <div class="w-16 h-16 rounded-full bg-white border-4 border-orange-50 flex items-center justify-center text-orange-600 shrink-0 z-10 shadow-sm order-1 md:order-2">
                <span class="font-bold text-xl">2</span>
              </div>
              <div class="flex-1 order-2 md:order-3">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Add your first clients</h3>
                <p class="text-slate-600">Import from a spreadsheet or start from your next sessions.</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 md:text-right order-2 md:order-1">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Run your first week</h3>
                <p class="text-slate-600">Use the calendar for all sessions. Write notes and test NoeIA for summaries.</p>
              </div>
              <div class="w-16 h-16 rounded-full bg-white border-4 border-orange-50 flex items-center justify-center text-orange-600 shrink-0 z-10 shadow-sm order-1 md:order-2">
                <span class="font-bold text-xl">3</span>
              </div>
              <div class="flex-1 order-3 md:order-3"></div>
            </div>

            <!-- Step 4 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 order-3 md:order-1"></div>
              <div class="w-16 h-16 rounded-full bg-white border-4 border-orange-50 flex items-center justify-center text-orange-600 shrink-0 z-10 shadow-sm order-1 md:order-2">
                <span class="font-bold text-xl">4</span>
              </div>
              <div class="flex-1 order-2 md:order-3">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Invite patients to the portal</h3>
                <p class="text-slate-600">Offer them booking, history, and exercises.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Example setup checklist -->
      <section class="reveal bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
        <h2 class="text-3xl font-bold text-slate-900 mb-12 text-center">Your first week checklist</h2>
        
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Before -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">A</div>
              <h3 class="text-xl font-bold text-slate-900">Before first week</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div class="w-5 h-5 rounded border-2 border-slate-300"></div>
                <span class="text-slate-600">Configure availability hours</span>
              </li>
              <li class="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div class="w-5 h-5 rounded border-2 border-slate-300"></div>
                <span class="text-slate-600">Create room resources (if applicable)</span>
              </li>
              <li class="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div class="w-5 h-5 rounded border-2 border-slate-300"></div>
                <span class="text-slate-600">Customize note templates</span>
              </li>
            </ul>
          </div>

          <!-- After -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">B</div>
              <h3 class="text-xl font-bold text-slate-900">After first week</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div class="w-5 h-5 rounded border-2 border-slate-300"></div>
                <span class="text-slate-600">Review AI summary quality</span>
              </li>
              <li class="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div class="w-5 h-5 rounded border-2 border-slate-300"></div>
                <span class="text-slate-600">Send first portal invites</span>
              </li>
              <li class="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div class="w-5 h-5 rounded border-2 border-slate-300"></div>
                <span class="text-slate-600">Check billing report</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <h2 class="text-3xl font-bold text-slate-900 mb-6">You can be fully set up in one afternoon</h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/login">
            <Button size="lg" class="rounded-full px-10 bg-primary-600 hover:bg-primary-700 text-white shadow-xl shadow-primary-200 transition-all hover:scale-105">
              Join the beta
            </Button>
          </RouterLink>
          <Button variant="outline" size="lg" class="rounded-full px-10 border-slate-300 text-slate-700 hover:bg-slate-50">
            Book a 30-min onboarding call
          </Button>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.reveal {
  will-change: opacity, transform;
}
</style>
