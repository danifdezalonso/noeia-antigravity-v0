<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Calendar, Users, ArrowLeft, ArrowRight, Check, Filter, Clock } from 'lucide-vue-next'

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
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-8">
          <Calendar class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Calendar designed for <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">therapy practices</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          See everyone’s day and every room in one view. No more double bookings or confusion.
        </p>
      </section>

      <!-- SECTION 2: Multi-professional View -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Calendar UI Mock -->
            <div class="space-y-4">
              <!-- Filters -->
              <div class="flex gap-2 mb-4">
                <div class="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <Filter class="w-3 h-3" /> All Doctors
                </div>
                <div class="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600">Room 1</div>
                <div class="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600">Room 2</div>
              </div>
              
              <!-- Grid -->
              <div class="grid grid-cols-4 gap-2 h-[300px]">
                <!-- Time Column -->
                <div class="col-span-1 space-y-8 text-xs text-slate-400 text-right pr-2 pt-2">
                  <div>09:00</div>
                  <div>10:00</div>
                  <div>11:00</div>
                  <div>12:00</div>
                </div>
                <!-- Columns -->
                <div class="col-span-3 grid grid-cols-3 gap-2 relative">
                  <!-- Grid Lines -->
                  <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div class="border-t border-slate-100 w-full"></div>
                    <div class="border-t border-slate-100 w-full"></div>
                    <div class="border-t border-slate-100 w-full"></div>
                    <div class="border-t border-slate-100 w-full"></div>
                  </div>
                  
                  <!-- Events -->
                  <div class="bg-blue-50 border-l-2 border-blue-500 rounded p-2 text-xs h-24 mt-4 shadow-sm">
                    <div class="font-bold text-blue-900">Dr. Sarah</div>
                    <div class="text-blue-700">Ana M.</div>
                  </div>
                  <div class="bg-purple-50 border-l-2 border-purple-500 rounded p-2 text-xs h-24 mt-12 shadow-sm">
                     <div class="font-bold text-purple-900">Dr. Mike</div>
                     <div class="text-purple-700">Group</div>
                  </div>
                  <div class="bg-emerald-50 border-l-2 border-emerald-500 rounded p-2 text-xs h-24 mt-0 shadow-sm">
                     <div class="font-bold text-emerald-900">Dr. Jen</div>
                     <div class="text-emerald-700">Intake</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Multi-professional view</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Filter by doctor, room, or modality.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">See who is overloaded or underbooked at a glance.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Session Control -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Total session control</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Create, move, and cancel sessions with drag-and-drop.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Mark online vs in-person to manage room usage.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Visual hints prevent double-booking rooms.</span>
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <div class="bg-white rounded-xl p-6 border border-slate-200 w-full max-w-md shadow-xl hover:scale-[1.02] transition-transform">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock class="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div class="font-bold text-slate-900">New Session</div>
                  <div class="text-xs text-slate-500">Drag to reschedule</div>
                </div>
              </div>
              <div class="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-bold">Confirmed</div>
            </div>
            <div class="space-y-3">
              <div class="h-2 bg-slate-100 rounded w-full"></div>
              <div class="h-2 bg-slate-100 rounded w-2/3"></div>
            </div>
            <div class="mt-6 flex gap-2">
              <button class="flex-1 py-2 bg-blue-600 rounded-lg text-sm font-bold text-white hover:bg-blue-700 transition-colors">Edit</button>
              <button class="flex-1 py-2 bg-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Integration -->
      <section class="text-center max-w-3xl mx-auto reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Users class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Integrated with records & AI</h2>
        <p class="text-lg text-slate-600 mb-8">
          Clicking a session instantly opens the client record and AI tools on the side, so you have context immediately.
        </p>
        <RouterLink to="/product/records">
          <Button variant="outline" class="border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400">
            See Client Records
          </Button>
        </RouterLink>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/records">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Client Records <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
