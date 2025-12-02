<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Calendar, AlertCircle, FileText, CheckCircle2 } from 'lucide-vue-next'

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
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
          <Calendar class="w-3 h-3" />
          Global Scheduling
        </div>
        <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          A clinic-wide calendar that actually makes sense
        </h1>
        <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
          See all professionals and rooms in one place without losing detail. Filter, organize, and manage your practice's time efficiently.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
      
      <!-- Section 1: All professionals, one view -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-center"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out;"
      >
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">All professionals, one view</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            Stop switching between different calendars. Get a unified view of your entire clinic's operations.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Filter by doctor, office, room, or modality.</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Spot underused professionals and overloaded days.</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Switch between day, week, and month views instantly.</span>
            </li>
          </ul>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl">
          <!-- Mock Calendar Header -->
          <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
            <div class="flex gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">SC</div>
              <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">MW</div>
              <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">ER</div>
            </div>
            <div class="text-sm font-medium text-slate-600">Week View</div>
          </div>
          
          <!-- Mock Calendar Grid -->
          <div class="grid grid-cols-5 gap-2 h-64">
            <div class="bg-slate-50 rounded-lg p-2 relative">
              <div class="text-xs text-slate-400 mb-2">Mon</div>
              <div class="absolute top-12 left-1 right-1 h-16 bg-blue-100 border-l-2 border-blue-500 rounded text-[10px] p-1 text-blue-700">Dr. Chen</div>
              <div class="absolute top-32 left-1 right-1 h-20 bg-purple-100 border-l-2 border-purple-500 rounded text-[10px] p-1 text-purple-700">Mark W.</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-2 relative">
              <div class="text-xs text-slate-400 mb-2">Tue</div>
              <div class="absolute top-10 left-1 right-1 h-24 bg-green-100 border-l-2 border-green-500 rounded text-[10px] p-1 text-green-700">Dr. Rodriguez</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-2 relative">
              <div class="text-xs text-slate-400 mb-2">Wed</div>
              <div class="absolute top-14 left-1 right-1 h-16 bg-blue-100 border-l-2 border-blue-500 rounded text-[10px] p-1 text-blue-700">Dr. Chen</div>
              <div class="absolute top-36 left-1 right-1 h-16 bg-blue-100 border-l-2 border-blue-500 rounded text-[10px] p-1 text-blue-700">Dr. Chen</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-2 relative">
              <div class="text-xs text-slate-400 mb-2">Thu</div>
              <div class="absolute top-8 left-1 right-1 h-32 bg-purple-100 border-l-2 border-purple-500 rounded text-[10px] p-1 text-purple-700">Mark W.</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-2 relative">
              <div class="text-xs text-slate-400 mb-2">Fri</div>
              <div class="absolute top-16 left-1 right-1 h-20 bg-green-100 border-l-2 border-green-500 rounded text-[10px] p-1 text-green-700">Dr. Rodriguez</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Conflict hints -->
      <div 
        class="bg-amber-50 rounded-3xl p-8 lg:p-12 border border-amber-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.2s;"
      >
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 relative">
             <div class="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
               <div class="flex gap-4">
                 <div class="flex-1 bg-blue-50 p-3 rounded border border-blue-100">
                   <div class="text-xs text-blue-600 font-bold">10:00 AM - Room 1</div>
                   <div class="text-sm font-medium text-slate-900">Session A</div>
                 </div>
                 <div class="flex-1 bg-red-50 p-3 rounded border border-red-100 relative">
                   <div class="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                     <AlertCircle class="w-3 h-3" /> Conflict
                   </div>
                   <div class="text-xs text-red-600 font-bold">10:00 AM - Room 1</div>
                   <div class="text-sm font-medium text-slate-900">Session B</div>
                 </div>
               </div>
             </div>
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">Conflict detection</h2>
            <p class="text-lg text-slate-600 mb-6">
              We highlight potential conflicts so your team can resolve them before patients notice.
            </p>
            <p class="text-slate-600">
              Whether it's a double-booked room or a doctor scheduled in two places at once, Noeia flags it immediately.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 3: Patient and record linkage -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-center"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.4s;"
      >
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Connected to care</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            Every session in the calendar is tied to a patient record, notes, and AI suggestions. It's not just a time slot; it's a clinical event.
          </p>
          <Button variant="outline" class="group">
            Explore Patient Records
            <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-6">
          <div class="w-1/3 space-y-3">
             <div class="h-20 bg-blue-50 border-l-4 border-blue-500 rounded p-2 cursor-pointer ring-2 ring-primary-500 ring-offset-2">
               <div class="text-xs font-bold text-blue-700">11:00 AM</div>
               <div class="text-sm font-medium text-slate-900">Alex M.</div>
             </div>
             <div class="h-20 bg-slate-50 border-l-4 border-slate-300 rounded p-2 opacity-50"></div>
             <div class="h-20 bg-slate-50 border-l-4 border-slate-300 rounded p-2 opacity-50"></div>
          </div>
          <div class="w-2/3 border-l border-slate-100 pl-6">
             <div class="flex items-center gap-3 mb-4">
               <div class="w-10 h-10 rounded-full bg-slate-200"></div>
               <div>
                 <div class="font-bold text-slate-900">Alex M.</div>
                 <div class="text-xs text-slate-500">Patient since 2023</div>
               </div>
             </div>
             <div class="space-y-2">
               <div class="flex items-center gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded">
                 <FileText class="w-4 h-4" /> Last note: 2 days ago
               </div>
               <div class="flex items-center gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded">
                 <AlertCircle class="w-4 h-4" /> Pending assessment
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
