<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Building, Calendar, ArrowLeft, ArrowRight, Check, MapPin, Users } from 'lucide-vue-next'

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
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mx-auto mb-8">
          <Building class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Offices and rooms <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">without chaos</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Manage physical spaces as easily as digital ones. Avoid conflicts and optimize usage.
        </p>
      </section>

      <!-- SECTION 2: Room Definitions -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Room List UI Mock -->
            <div class="space-y-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-lg text-slate-900">Clinic Rooms</h3>
                <button class="text-xs bg-slate-50 hover:bg-slate-100 px-3 py-1 rounded border border-slate-200 transition-colors text-slate-600">+ Add Room</button>
              </div>
              
              <div class="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">1</div>
                  <div>
                    <div class="font-bold text-slate-900">The Blue Room</div>
                    <div class="text-xs text-slate-500">Capacity: 4 • Sofa, Armchair</div>
                  </div>
                </div>
                <div class="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-bold">Active</div>
              </div>

              <div class="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 font-bold">2</div>
                  <div>
                    <div class="font-bold text-slate-900">Consultation A</div>
                    <div class="text-xs text-slate-500">Capacity: 3 • Desk, Chairs</div>
                  </div>
                </div>
                <div class="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-bold">Active</div>
              </div>

              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between opacity-60">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 font-bold">3</div>
                  <div>
                    <div class="font-bold text-slate-700">Group Room</div>
                    <div class="text-xs text-slate-500">Capacity: 12 • Circle seating</div>
                  </div>
                </div>
                <div class="px-2 py-1 bg-slate-200 text-slate-500 text-xs rounded font-bold">Maintenance</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Define your spaces</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Name rooms, set numbers, and add descriptions.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Mark rooms as active or inactive for maintenance.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Set capacity and amenities for easy booking.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Assignment -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Smart assignment</h2>
          <p class="text-lg text-slate-600">
            Assign specific rooms to doctors permanently, or make them shared resources bookable by the hour.
          </p>
          <div class="grid gap-4">
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Users class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Dedicated</div>
                <div class="text-sm text-slate-500">Room 1 is exclusively for Dr. Sarah.</div>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Shared</div>
                <div class="text-sm text-slate-500">Room 2 is bookable by any staff member.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
           <!-- Assignment Mock -->
           <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl w-full max-w-sm">
             <div class="text-center mb-6">
               <div class="w-16 h-16 rounded-full bg-slate-100 mx-auto mb-3 flex items-center justify-center border border-slate-200">
                 <div class="w-12 h-12 rounded-full bg-slate-300"></div>
               </div>
               <div class="font-bold text-lg text-slate-900">Dr. Sarah Cohen</div>
               <div class="text-sm text-slate-500">Psychologist</div>
             </div>
             <div class="space-y-4">
               <div class="text-xs font-bold text-slate-400 uppercase">Default Room</div>
               <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                 <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">1</div>
                   <span class="font-medium text-slate-900">The Blue Room</span>
                 </div>
                 <Check class="w-4 h-4 text-emerald-500" />
               </div>
               <div class="text-xs font-bold text-slate-400 uppercase pt-2">Secondary Access</div>
               <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                 <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded bg-orange-50 flex items-center justify-center text-orange-600 font-bold border border-orange-100">2</div>
                   <span class="font-medium text-slate-900">Consultation A</span>
                 </div>
                 <div class="w-4 h-4 rounded-full border border-slate-300"></div>
               </div>
             </div>
           </div>
        </div>
      </section>

      <!-- SECTION 4: Calendar Integration -->
      <section class="text-center max-w-3xl mx-auto reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Calendar class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Seamless calendar integration</h2>
        <p class="text-lg text-slate-600 mb-8">
          Choose a room when creating sessions. See room usage directly on the calendar view to prevent overlaps.
        </p>
        <RouterLink to="/product/admin">
          <Button variant="outline" class="border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400">
            Next: Admin & Billing
          </Button>
        </RouterLink>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/admin">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Admin & Billing <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
