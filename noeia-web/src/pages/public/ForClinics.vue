<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Calendar, Users, Building, GitMerge, BarChart3, ArrowRight, CheckCircle2, Sparkles, Smartphone } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const features = [
  {
    title: 'Clinic-wide calendar',
    description: 'View everyone at once. Filter by professional, room, or modality. Adjust capacity in seconds.'
  },
  {
    title: 'Doctors & roles',
    description: 'Managers, supervisors, external collaborators. Assign permissions without relabeling accounts or duplicating profiles.'
  },
  {
    title: 'Office & room management',
    description: 'Define rooms by number or name. Make them available to everyone or dedicate them to specific doctors.'
  },
  {
    title: 'Client routing & revenue clarity',
    description: 'Assign patients to doctors and track billing by professional. Compare occupancy, payouts, and volume.'
  }
]
</script>

<template>
  <div class="relative overflow-hidden pb-20 lg:pb-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <!-- Left Column: Copy -->
        <div 
          class="transition-all duration-700 ease-out transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-medium mb-6">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Clinic Management
          </div>
          
          <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            For clinics that run on coordination, not chaos
          </h1>
          
          <p class="text-lg text-slate-600 mb-12 leading-relaxed max-w-lg">
            One system for your professionals, rooms, schedules, and billing—without hiring extra admins.
          </p>

          <div class="space-y-8 mb-12">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="flex gap-4 transition-all duration-500"
              :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <div class="flex-shrink-0 mt-1">
                <CheckCircle2 class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 class="text-slate-900 font-semibold mb-1">{{ feature.title }}</h3>
                <p class="text-slate-600 text-sm leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <Button size="lg" class="rounded-full px-8 bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-600/20 transition-all hover:scale-[1.02]">
              Book a demo
            </Button>
            <Button variant="ghost" size="lg" class="rounded-full px-8 text-slate-600 hover:bg-slate-50 group">
              See clinic features
              <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <!-- Right Column: Bento Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
          
          <!-- Card A: Clinic Calendar (Span 2) -->
          <div 
            class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 200ms;"
          >
            <div class="flex justify-between items-start mb-6 relative z-10">
              <div class="flex items-center gap-2 text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-full">
                <Calendar class="w-3 h-3" />
                Team Schedule
              </div>
              <div class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-500 transition-colors duration-300"></div>
            </div>

            <div class="flex gap-6 items-end">
              <div class="flex-1">
                <div class="text-2xl font-bold text-slate-900 mb-1">Full Visibility</div>
                <div class="text-primary-600 font-medium mb-4">3 Rooms · 5 Doctors</div>
                
                <div class="flex -space-x-2">
                   <div class="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs text-blue-600 font-bold">SC</div>
                   <div class="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs text-purple-600 font-bold">MD</div>
                   <div class="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xs text-orange-600 font-bold">ER</div>
                   <div class="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500 font-bold">+2</div>
                </div>
              </div>
              
              <!-- Calendar Visual -->
              <div class="w-32 h-32 bg-slate-50 rounded-xl border border-slate-200 relative -mb-6 -mr-6 transform group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-transform duration-500 p-2 grid grid-cols-3 gap-1">
                 <div class="bg-blue-100 rounded h-full w-full border-t-2 border-blue-500"></div>
                 <div class="bg-purple-100 rounded h-16 w-full border-t-2 border-purple-500 mt-4"></div>
                 <div class="bg-orange-100 rounded h-20 w-full border-t-2 border-orange-500"></div>
              </div>
            </div>
          </div>

          <!-- Card B: Room Management -->
          <div 
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 300ms;"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-slate-900">Rooms</h3>
              <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Building class="w-2.5 h-2.5" /> Manage
              </div>
            </div>
            
            <div class="space-y-3">
               <div class="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span class="text-xs font-medium text-slate-700">Room 1</span>
                  <span class="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Available</span>
               </div>
               <div class="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span class="text-xs font-medium text-slate-700">Room 2</span>
                  <span class="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Occupied</span>
               </div>
            </div>
          </div>

          <!-- Card C: Revenue -->
          <div 
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 400ms;"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-slate-900">Revenue</h3>
              <div class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                <BarChart3 class="w-2.5 h-2.5" /> Reports
              </div>
            </div>

            <div class="flex items-end gap-2 h-24 mt-2">
               <div class="w-1/3 bg-primary-200 rounded-t h-[60%] group-hover:h-[70%] transition-all duration-500"></div>
               <div class="w-1/3 bg-primary-300 rounded-t h-[80%] group-hover:h-[90%] transition-all duration-500"></div>
               <div class="w-1/3 bg-primary-500 rounded-t h-[40%] group-hover:h-[100%] transition-all duration-500 relative">
                  <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">+24%</div>
               </div>
            </div>
          </div>

          <!-- Card D: Routing & Roles -->
          <div 
            class="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group flex items-center justify-between shadow-sm"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            style="transition-delay: 500ms;"
          >
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Routing & Roles</h3>
              <p class="text-slate-500 text-sm">Assign patients and manage permissions</p>
            </div>
            
            <div class="flex gap-2">
              <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <GitMerge class="w-3 h-3 text-slate-400" /> Routing
              </div>
              <div class="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <Users class="w-3 h-3 text-slate-400" /> Roles
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Section 1: Why Noeia for clinics -->
  <div id="why-noeia-clinics" class="max-w-6xl mx-auto px-4 py-20 space-y-24 border-t border-white/10 pt-16">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- Left Copy -->
      <div 
        class="transition-all duration-700 ease-out transform"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition-delay: 600ms;"
      >
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Why Noeia for clinics and group practices</h2>
        <p class="text-lg text-slate-600 mb-8 leading-relaxed">
          You coordinate multiple professionals, rooms, and patients every day. Spreadsheets and generic booking tools don’t understand that reality. Noeia gives you a shared workspace where schedules, rooms, documentation, and billing are all part of the same system.
        </p>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
            <span class="text-slate-700">One calendar, multiple professionals and rooms.</span>
          </li>
          <li class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
            <span class="text-slate-700">Clear ownership for each patient and session.</span>
          </li>
          <li class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
            <span class="text-slate-700">Billing and reporting by doctor, not just by clinic.</span>
          </li>
          <li class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
            <span class="text-slate-700">Apps and portals for professionals and patients.</span>
          </li>
        </ul>
      </div>

      <!-- Right Visual -->
      <div 
        class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group shadow-sm"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition-delay: 700ms;"
      >
        <div class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-sm font-bold text-slate-900">Today · Clinic overview</span>
          </div>
          <div class="text-xs text-slate-500">Live Dashboard</div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div class="text-2xl font-bold text-slate-900 mb-1">24</div>
            <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Sessions today</div>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div class="text-2xl font-bold text-slate-900 mb-1">8</div>
            <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Active professionals</div>
          </div>
          <div class="col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
            <div>
              <div class="text-2xl font-bold text-slate-900 mb-1">3/4</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Rooms in use</div>
            </div>
            <div class="flex gap-1">
               <div class="w-2 h-8 rounded bg-red-400"></div>
               <div class="w-2 h-8 rounded bg-red-400"></div>
               <div class="w-2 h-8 rounded bg-red-400"></div>
               <div class="w-2 h-8 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: The three clinic pillars -->
    <div 
      class="transition-all duration-700 ease-out transform"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      style="transition-delay: 800ms;"
    >
      <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">Three pillars for modern clinics</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Card 1 -->
        <RouterLink to="/product/website" class="block group">
          <div class="h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shadow-sm">
            <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Building class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">Website platform</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Desktop control center for managers and admins: doctors, rooms, schedules, and billing.
            </p>
          </div>
        </RouterLink>

        <!-- Card 2 -->
        <RouterLink to="/product/app" class="block group">
          <div class="h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shadow-sm">
            <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Smartphone class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">Apps for your team and patients</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Doctors and patients use dedicated apps so everyone sees what they need.
            </p>
          </div>
        </RouterLink>

        <!-- Card 3 -->
        <RouterLink to="/product/ai" class="block group">
          <div class="h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shadow-sm">
            <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles class="w-6 h-6 text-pink-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">NoeIA, the AI assistant</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Help your professionals write better notes and reports in less time.
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
