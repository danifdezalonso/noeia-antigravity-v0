<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { Search, BookOpen, ArrowRight, Clock } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const categories = ['All Guides', 'Getting Started', 'Workflow', 'Finance', 'Patient Management']
const activeCategory = ref('All Guides')

const guides = [
  {
    title: 'Setting up your first clinic',
    category: 'Getting Started',
    readTime: '5 min read',
    description: 'A complete walkthrough of configuring your clinic settings, adding rooms, and inviting your team.',
    image: '/images/guide-clinic.jpg'
  },
  {
    title: 'Automating patient intake forms',
    category: 'Workflow',
    readTime: '3 min read',
    description: 'Learn how to set up automatic intake forms that are sent to patients before their first appointment.',
    image: '/images/guide-intake.jpg'
  },
  {
    title: 'Understanding revenue reports',
    category: 'Finance',
    readTime: '7 min read',
    description: 'Deep dive into the financial reporting tools available in Noeia to track your clinic’s growth.',
    image: '/images/guide-revenue.jpg'
  },
  {
    title: 'Managing patient records securely',
    category: 'Patient Management',
    readTime: '4 min read',
    description: 'Best practices for maintaining HIPAA compliance while managing digital patient records.',
    image: '/images/guide-records.jpg'
  },
  {
    title: 'Customizing your calendar view',
    category: 'Workflow',
    readTime: '2 min read',
    description: 'Tips and tricks to make the calendar work for your specific scheduling needs.',
    image: '/images/guide-calendar.jpg'
  },
  {
    title: 'Integrating with insurance providers',
    category: 'Finance',
    readTime: '6 min read',
    description: 'How to connect Noeia with major insurance providers for streamlined billing.',
    image: '/images/guide-insurance.jpg'
  }
]
</script>

<template>
  <div class="bg-white min-h-screen pt-32">
    <!-- Hero -->
    <section class="text-center px-4 mb-16">
      <div class="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6">
        <BookOpen class="w-8 h-8 text-blue-600" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Guides & Tutorials</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">Master the platform with step-by-step walkthroughs and best practices.</p>
      
      <!-- Search -->
      <div class="max-w-xl mx-auto relative">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for guides..." 
          class="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all shadow-sm"
        >
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
      <div class="flex flex-wrap justify-center gap-2">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="activeCategory === category ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- Guides Grid -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(guide, index) in guides" 
          :key="index"
          class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="h-48 bg-slate-100 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition-transform duration-500"></div>
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
              {{ guide.category }}
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center text-xs text-slate-500 mb-3">
              <Clock class="w-3.5 h-3.5 mr-1" />
              {{ guide.readTime }}
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">{{ guide.title }}</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{{ guide.description }}</p>
            <div class="flex items-center text-sm font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
              Read guide <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
