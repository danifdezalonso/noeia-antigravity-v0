<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Rocket, CheckCircle2, Calendar, Users, MessageSquare, FileText } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="relative overflow-hidden pb-20 lg:pb-32">
    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12 mb-24">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-medium mb-6">
          <Rocket class="w-3 h-3" />
          Migration & Setup
        </div>
        <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          Onboard your clinic without stopping the work
        </h1>
        <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
          Move gradually. Start with a few professionals and scale to the full team when you're ready. We help you every step of the way.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
      
      <!-- Section 1: Phased rollout plan -->
      <div 
        class="relative"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out;"
      >
        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block"></div>
        
        <div class="grid lg:grid-cols-3 gap-8 relative z-10">
          <!-- Step 1 -->
          <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 font-bold text-xl">1</div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">Pilot with 1–2 professionals</h3>
            <ul class="space-y-3 text-slate-600 text-sm">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Set up offices, rooms, and basic calendar use.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Run all sessions of the pilot team inside Noeia.
              </li>
            </ul>
          </div>

          <!-- Step 2 -->
          <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 font-bold text-xl">2</div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">Add the rest of the team</h3>
            <ul class="space-y-3 text-slate-600 text-sm">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Migrate schedules week by week.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Introduce notes and AI features to everyone.
              </li>
            </ul>
          </div>

          <!-- Step 3 -->
          <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6 font-bold text-xl">3</div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">Connect patients</h3>
            <ul class="space-y-3 text-slate-600 text-sm">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Invite patients to the secure portal.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Start sending summaries and exercises.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Section 2: Example setup in one week -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-start"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.2s;"
      >
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Example setup in one week</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            You don't need months to switch. Most clinics are fully operational on Noeia within 5 to 7 days.
          </p>
          
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar class="w-5 h-5 text-slate-400" /> Days 1–2: Foundation
              </h3>
              <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">1</div>
                  <span class="text-slate-700">Configure clinic workspace & branding</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">2</div>
                  <span class="text-slate-700">Create professionals and assign roles</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users class="w-5 h-5 text-slate-400" /> Days 3–5: Migration
              </h3>
              <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">3</div>
                  <span class="text-slate-700">Import or re-create upcoming sessions</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">4</div>
                  <span class="text-slate-700">Train team on notes + AI features</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">5</div>
                  <span class="text-slate-700">Invite first patients to portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-200 text-center">
          <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <MessageSquare class="w-8 h-8 text-primary-600" />
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">We're here to help</h2>
          <p class="text-slate-600 mb-8 max-w-md mx-auto">
            We support admin and managers in rolling out Noeia. Start with a call, continue with a documented plan.
          </p>
          <div class="flex flex-col gap-3 max-w-xs mx-auto">
            <Button size="lg" class="w-full justify-center">
              Book an onboarding call
            </Button>
            <Button variant="outline" class="w-full justify-center group bg-white">
              Download rollout plan
              <FileText class="w-4 h-4 ml-2 text-slate-400 group-hover:text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
