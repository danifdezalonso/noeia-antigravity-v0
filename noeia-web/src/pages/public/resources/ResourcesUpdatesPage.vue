<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { Sparkles, ArrowRight, Calendar } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const updates = [
  {
    version: 'v2.4.0',
    date: 'October 24, 2024',
    title: 'New Calendar View & Mobile App Update',
    description: 'We’ve completely redesigned the calendar for better visibility on mobile devices. Now you can easily switch between day, week, and month views with a single tap.',
    features: [
      'New "Agenda" view for mobile',
      'Improved drag-and-drop rescheduling',
      'Color-coded appointment types',
      'Faster loading times for large clinics'
    ],
    image: '/images/update-calendar.jpg'
  },
  {
    version: 'v2.3.5',
    date: 'October 10, 2024',
    title: 'Patient Portal Enhancements',
    description: 'Patients can now upload insurance documents directly from their portal, reducing administrative overhead for your front desk.',
    features: [
      'Secure document upload',
      'Insurance card scanning',
      'Automatic notification for admins'
    ],
    image: '/images/update-portal.jpg'
  },
  {
    version: 'v2.3.0',
    date: 'September 28, 2024',
    title: 'AI-Powered Clinical Notes (Beta)',
    description: 'Introducing NoeIA, your clinical co-pilot. Automatically transcribe sessions and generate SOAP notes in seconds.',
    features: [
      'Real-time transcription',
      'SOAP note generation',
      'Customizable templates',
      'HIPAA compliant processing'
    ],
    image: '/images/update-ai.jpg'
  }
]
</script>

<template>
  <div class="bg-white min-h-screen pt-32">
    <!-- Hero -->
    <section class="text-center px-4 mb-20">
      <div class="inline-flex items-center justify-center p-3 bg-purple-50 rounded-2xl mb-6">
        <Sparkles class="w-8 h-8 text-purple-600" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Product Updates</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">See what’s new in Noeia. We release improvements every week.</p>
    </section>

    <!-- Updates Timeline -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      <div class="space-y-16 relative">
        <!-- Vertical Line -->
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -ml-px hidden md:block"></div>

        <div 
          v-for="(update, index) in updates" 
          :key="index"
          class="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Date Badge (Desktop: Center) -->
          <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 items-center justify-center w-8 h-8 rounded-full bg-white border-4 border-slate-100 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
          </div>

          <!-- Content Side -->
          <div class="flex-1 md:text-right md:pr-8 order-2 md:order-1" :class="{ 'md:text-left md:pl-8 md:order-3': index % 2 !== 0 }">
             <!-- Mobile Date -->
            <div class="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 md:hidden">
              <Calendar class="w-4 h-4" />
              {{ update.date }}
            </div>
            
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
               <div class="h-48 bg-slate-100 relative overflow-hidden">
                 <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 group-hover:scale-105 transition-transform duration-500"></div>
                 <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">
                   {{ update.version }}
                 </div>
               </div>
               <div class="p-8">
                 <div class="hidden md:flex items-center gap-2 text-sm font-bold text-slate-500 mb-4" :class="{ 'justify-end': index % 2 === 0 }">
                    <Calendar class="w-4 h-4" />
                    {{ update.date }}
                 </div>
                 <h3 class="text-2xl font-bold text-slate-900 mb-4">{{ update.title }}</h3>
                 <p class="text-slate-600 leading-relaxed mb-6">{{ update.description }}</p>
                 
                 <ul class="space-y-2 mb-6">
                   <li v-for="feature in update.features" :key="feature" class="flex items-start gap-2 text-sm text-slate-700" :class="{ 'md:justify-end': index % 2 === 0 }">
                     <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0 md:order-2" :class="{ 'md:mr-0 md:ml-2': index % 2 === 0 }"></div>
                     <span :class="{ 'md:text-right': index % 2 === 0 }">{{ feature }}</span>
                   </li>
                 </ul>

                 <div class="flex items-center font-bold text-primary-600 group-hover:text-primary-700 transition-colors" :class="{ 'md:justify-end': index % 2 === 0 }">
                   Read full notes <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                 </div>
               </div>
            </div>
          </div>
          
          <!-- Empty Side for Alignment -->
          <div class="flex-1 hidden md:block order-1 md:order-3" :class="{ 'md:order-1': index % 2 !== 0 }"></div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
