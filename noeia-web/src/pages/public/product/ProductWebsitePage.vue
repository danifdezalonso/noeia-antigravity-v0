<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Building, Users, Shield, Check, ArrowLeft, ArrowRight } from 'lucide-vue-next'

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

const permissions = [
  { role: 'Admins', access: ['Manage team', 'Offices & rooms', 'Billing & revenue', 'All calendars'], color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { role: 'Doctors', access: ['My calendar', 'My patients', 'My notes', 'Room booking'], color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { role: 'Support', access: ['Scheduling', 'Patient intake', 'Basic billing', 'Room view'], color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
]
</script>

<template>
  <div class="bg-white min-h-screen text-slate-900 selection:bg-blue-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal">
        <div class="mb-8">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div class="space-y-6">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Building class="w-6 h-6" />
            </div>
            <h1 class="text-5xl font-bold tracking-tight leading-tight text-slate-900">
              Website platform: <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">your clinical workspace</span>
            </h1>
            <p class="text-xl text-slate-600 leading-relaxed">
              Everything clinics and professionals need to run their days: calendar, records, rooms, and team controls.
            </p>
            <div class="flex gap-4">
              <RouterLink to="/login">
                <Button size="lg" class="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all hover:scale-105">
                  See a sample day
                </Button>
              </RouterLink>
            </div>
          </div>
          
          <!-- Hero Image / Mock -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            <div class="relative rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xl aspect-[4/3] flex flex-col">
              <!-- Top Bar -->
              <div class="h-10 border-b border-slate-100 bg-slate-50 flex items-center px-4 gap-2">
                <div class="w-3 h-3 rounded-full bg-slate-200"></div>
                <div class="w-3 h-3 rounded-full bg-slate-200"></div>
                <div class="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <!-- Content -->
              <div class="flex-1 flex">
                <!-- Sidebar -->
                <div class="w-16 border-r border-slate-100 bg-slate-50 flex flex-col items-center py-4 gap-6">
                  <div class="w-8 h-8 rounded bg-blue-100"></div>
                  <div class="w-8 h-8 rounded bg-white border border-slate-200"></div>
                  <div class="w-8 h-8 rounded bg-white border border-slate-200"></div>
                  <div class="w-8 h-8 rounded bg-white border border-slate-200"></div>
                </div>
                <!-- Main Area -->
                <div class="flex-1 bg-white p-6">
                  <div class="h-full rounded border border-slate-100 bg-slate-50 p-4 grid grid-cols-4 gap-4">
                    <!-- Calendar Mock -->
                    <div class="col-span-3 space-y-4">
                      <div class="flex justify-between">
                        <div class="w-32 h-6 rounded bg-white border border-slate-200"></div>
                        <div class="w-24 h-6 rounded bg-white border border-slate-200"></div>
                      </div>
                      <div class="grid grid-cols-5 gap-2 h-48">
                        <div class="bg-white border border-slate-200 rounded p-2 border-l-2 border-l-blue-500 shadow-sm"></div>
                        <div class="bg-white border border-slate-200 rounded p-2 shadow-sm"></div>
                        <div class="bg-white border border-slate-200 rounded p-2 border-l-2 border-l-purple-500 shadow-sm"></div>
                        <div class="bg-white border border-slate-200 rounded p-2 shadow-sm"></div>
                        <div class="bg-white border border-slate-200 rounded p-2 border-l-2 border-l-emerald-500 shadow-sm"></div>
                      </div>
                    </div>
                    <!-- Right Panel -->
                    <div class="col-span-1 space-y-3 border-l border-slate-200 pl-4">
                      <div class="w-full h-8 rounded bg-white border border-slate-200"></div>
                      <div class="w-full h-24 rounded bg-white border border-slate-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: For Organizations -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Admin Table Mock -->
            <div class="space-y-4">
              <div class="flex justify-between items-center mb-6">
                <div class="w-32 h-6 rounded bg-slate-100"></div>
                <div class="w-24 h-8 rounded bg-purple-50"></div>
              </div>
              <div class="space-y-2">
                <!-- Header -->
                <div class="grid grid-cols-4 gap-4 text-xs text-slate-400 uppercase font-bold pb-2 border-b border-slate-100">
                  <div class="col-span-2">Professional</div>
                  <div>Role</div>
                  <div class="text-right">Revenue</div>
                </div>
                <!-- Rows -->
                <div class="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-50">
                  <div class="col-span-2 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div>
                      <div class="w-24 h-4 bg-slate-100 rounded mb-1"></div>
                      <div class="w-16 h-3 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                  <div><span class="px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold">Admin</span></div>
                  <div class="text-right text-slate-600 font-medium">$12,450</div>
                </div>
                <div class="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-50">
                  <div class="col-span-2 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div>
                      <div class="w-20 h-4 bg-slate-100 rounded mb-1"></div>
                      <div class="w-16 h-3 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                  <div><span class="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">Doctor</span></div>
                  <div class="text-right text-slate-600 font-medium">$8,200</div>
                </div>
                <div class="grid grid-cols-4 gap-4 items-center py-2">
                  <div class="col-span-2 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div>
                      <div class="w-24 h-4 bg-slate-100 rounded mb-1"></div>
                      <div class="w-16 h-3 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                  <div><span class="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">Doctor</span></div>
                  <div class="text-right text-slate-600 font-medium">$9,150</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Shield class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">For organizations: control and visibility</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Multi-professional calendar with filters by doctor, room, and modality.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Doctors, patients, and rooms in one place.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Billing and revenue overview by doctor and period.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: For Doctors -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">For doctors: your own clean workspace</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Day/Week calendar tailored to therapy sessions, not generic bookings.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Quick access to client records and notes from the calendar.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Session-first notes that transform into summaries.</span>
            </li>
          </ul>
        </div>
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Doctor View Mock -->
            <div class="flex gap-4 h-[300px]">
              <!-- Schedule List -->
              <div class="w-1/3 border-r border-slate-100 pr-4 space-y-3">
                <div class="text-xs font-bold text-slate-400 uppercase">Today</div>
                <div class="p-3 rounded-lg bg-emerald-50 border-l-2 border-emerald-500">
                  <div class="text-sm font-bold text-slate-900">09:00 AM</div>
                  <div class="text-xs text-slate-500">Ana M. • Anxiety</div>
                </div>
                <div class="p-3 rounded-lg bg-slate-50 border-l-2 border-slate-300 opacity-50">
                  <div class="text-sm font-bold text-slate-900">10:30 AM</div>
                  <div class="text-xs text-slate-500">Carlos R. • Check-in</div>
                </div>
                <div class="p-3 rounded-lg bg-slate-50 border-l-2 border-slate-300 opacity-50">
                  <div class="text-sm font-bold text-slate-900">02:00 PM</div>
                  <div class="text-xs text-slate-500">Maria L. • Intake</div>
                </div>
              </div>
              <!-- Patient Panel -->
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <div class="font-bold text-slate-900">Ana Martinez</div>
                    <div class="text-xs text-slate-500">Last session: 1 week ago</div>
                  </div>
                </div>
                <div class="h-32 rounded-lg bg-slate-50 border border-slate-100 p-3">
                  <div class="text-xs text-slate-500 mb-2">Session Notes</div>
                  <div class="space-y-2">
                    <div class="h-2 w-full bg-slate-200 rounded"></div>
                    <div class="h-2 w-5/6 bg-slate-200 rounded"></div>
                    <div class="h-2 w-4/6 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Permission Matrix -->
      <section class="max-w-4xl mx-auto reveal">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Same platform, different permissions</h2>
          <p class="text-lg text-slate-600">Secure access controls tailored to clinical roles.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="role in permissions" 
            :key="role.role"
            class="bg-white border rounded-2xl p-6 hover:shadow-lg transition-all"
            :class="role.border"
          >
            <h3 class="text-xl font-bold mb-4" :class="role.color">{{ role.role }}</h3>
            <ul class="space-y-3">
              <li v-for="item in role.access" :key="item" class="flex items-center gap-2 text-sm text-slate-600">
                <Check class="w-4 h-4 text-slate-400" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/app">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Explore the Apps <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
