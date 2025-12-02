<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero -->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Booking that doesn’t feel like paperwork
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            See your therapist’s availability on a calendar and book directly from it.
          </p>
        </div>
        
        <!-- Background Gradients -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
        
        <!-- SECTION 1: Availability View -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">See when they are free</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Calendar class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Real-time availability</h3>
                  <p class="text-slate-600 text-sm">View your therapist’s available slots in a month or week view.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle class="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Instant confirmation</h3>
                  <p class="text-slate-600 text-sm">Pick the time that works for you without contacting reception.</p>
                </div>
              </li>
            </ul>
            <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
              <span class="text-primary-600 font-bold">Note:</span> Availability is controlled by your clinic and therapist; you only see safe times to book.
            </div>
          </div>
          
          <!-- Calendar Mockup -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-blue-200 to-cyan-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
              <!-- Calendar Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="font-bold text-lg text-slate-900">October 2024</div>
                <div class="flex gap-2">
                  <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"><ChevronLeft class="w-4 h-4 text-slate-600" /></div>
                  <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"><ChevronRight class="w-4 h-4 text-slate-600" /></div>
                </div>
              </div>
              <!-- Calendar Grid -->
              <div class="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                <div class="text-slate-400 py-2">Mon</div>
                <div class="text-slate-400 py-2">Tue</div>
                <div class="text-slate-400 py-2">Wed</div>
                <div class="text-slate-400 py-2">Thu</div>
                <div class="text-slate-400 py-2">Fri</div>
                <div class="text-slate-400 py-2">Sat</div>
                <div class="text-slate-400 py-2">Sun</div>
              </div>
              <div class="grid grid-cols-7 gap-2">
                <!-- Empty slots -->
                <div v-for="i in 2" :key="`empty-${i}`" class="aspect-square"></div>
                <!-- Days -->
                <div v-for="i in 31" :key="`day-${i}`" class="aspect-square rounded-lg flex items-center justify-center relative group cursor-pointer hover:bg-slate-50 transition-colors" :class="[12, 14, 15, 19, 21].includes(i) ? 'bg-primary-50 hover:bg-primary-100' : ''">
                  <span :class="[12, 14, 15, 19, 21].includes(i) ? 'text-primary-700 font-bold' : 'text-slate-600'">{{ i }}</span>
                  <div v-if="[12, 14, 15, 19, 21].includes(i)" class="absolute bottom-2 w-1 h-1 rounded-full bg-primary-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Booking Flow -->
        <section class="reveal text-center">
          <h2 class="text-3xl font-bold text-slate-900 mb-12">Book a session in a few taps</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Step 1 -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/30 transition-all">
              <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-slate-500">1</div>
              <h3 class="font-bold text-lg text-slate-900 mb-2">Choose a day</h3>
              <p class="text-slate-600 text-sm">Browse the calendar to find a date that fits your schedule.</p>
            </div>
            <!-- Step 2 -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/30 transition-all">
              <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-slate-500">2</div>
              <h3 class="font-bold text-lg text-slate-900 mb-2">Select time & modality</h3>
              <p class="text-slate-600 text-sm">Pick a specific slot and choose between Online or In-person.</p>
            </div>
            <!-- Step 3 -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/30 transition-all">
              <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-slate-500">3</div>
              <h3 class="font-bold text-lg text-slate-900 mb-2">Confirm & add to calendar</h3>
              <p class="text-slate-600 text-sm">One tap to confirm. We'll send you a calendar invite automatically.</p>
            </div>
          </div>
        </section>

        <!-- SECTION 3: Managing Sessions -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-emerald-200 to-blue-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 space-y-4">
              <!-- Session Item 1 -->
              <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex items-center gap-4">
                  <div class="text-center">
                    <div class="text-xs text-slate-500 uppercase font-bold">Oct</div>
                    <div class="text-xl font-bold text-slate-900">14</div>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900">Regular Session</div>
                    <div class="text-xs text-slate-500">10:00 AM · Online</div>
                  </div>
                </div>
                <div class="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold border border-green-100">Confirmed</div>
              </div>
              <!-- Session Item 2 -->
              <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-75">
                <div class="flex items-center gap-4">
                  <div class="text-center">
                    <div class="text-xs text-slate-500 uppercase font-bold">Oct</div>
                    <div class="text-xl font-bold text-slate-900">21</div>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900">Regular Session</div>
                    <div class="text-xs text-slate-500">10:00 AM · In person</div>
                  </div>
                </div>
                <div class="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">Rescheduled</div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">See what’s coming and what changed</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                  <List class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Upcoming sessions list</h3>
                  <p class="text-slate-600 text-sm">A clear summary list of all your planned appointments.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center shrink-0">
                  <Bell class="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Status updates & reminders</h3>
                  <p class="text-slate-600 text-sm">Clear indicators if something is rescheduled, plus reminders before each session.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </main>
    
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, List, Bell } from 'lucide-vue-next'

const useScrollReveal = () => {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })
}

useScrollReveal()
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
