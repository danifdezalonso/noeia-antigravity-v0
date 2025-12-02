<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { ArrowRight, BookOpen, Sparkles, FileText, HelpCircle, MessageSquare, History } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const categories = [
  {
    title: 'Guides & Tutorials',
    description: 'Master the platform with step-by-step walkthroughs.',
    icon: BookOpen,
    href: '/resources/guides',
    color: 'bg-blue-50 text-blue-600',
    colSpan: 'md:col-span-2',
    bgImage: 'bg-gradient-to-br from-blue-50 to-indigo-50'
  },
  {
    title: 'Product Updates',
    description: 'See what’s new in Noeia.',
    icon: Sparkles,
    href: '/resources/updates',
    color: 'bg-purple-50 text-purple-600',
    colSpan: 'md:col-span-1',
    bgImage: 'bg-gradient-to-br from-purple-50 to-fuchsia-50'
  },
  {
    title: 'Blog',
    description: 'Insights on therapy and practice management.',
    icon: FileText,
    href: '/resources/blog',
    color: 'bg-emerald-50 text-emerald-600',
    colSpan: 'md:col-span-1',
    bgImage: 'bg-gradient-to-br from-emerald-50 to-teal-50'
  },
  {
    title: 'Help Center',
    description: 'FAQs and support articles.',
    icon: HelpCircle,
    href: '/resources/help',
    color: 'bg-orange-50 text-orange-600',
    colSpan: 'md:col-span-1',
    bgImage: 'bg-gradient-to-br from-orange-50 to-amber-50'
  },
  {
    title: 'Changelog',
    description: 'Detailed release notes.',
    icon: History,
    href: '/resources/changelog',
    color: 'bg-slate-50 text-slate-600',
    colSpan: 'md:col-span-1',
    bgImage: 'bg-gradient-to-br from-slate-50 to-gray-50'
  }
]

const featuredGuides = [
  {
    title: 'Setting up your first clinic',
    category: 'GETTING STARTED',
    readTime: '5 min read',
    image: '/images/guide-clinic.jpg', // Placeholder
    href: '/resources/guides/setting-up-clinic'
  },
  {
    title: 'Automating patient intake forms',
    category: 'WORKFLOW',
    readTime: '3 min read',
    image: '/images/guide-intake.jpg', // Placeholder
    href: '/resources/guides/automating-intake'
  },
  {
    title: 'Understanding revenue reports',
    category: 'FINANCE',
    readTime: '7 min read',
    image: '/images/guide-revenue.jpg', // Placeholder
    href: '/resources/guides/revenue-reports'
  }
]

const latestUpdates = [
  {
    version: 'v2.4.0',
    date: 'Oct 24, 2024',
    title: 'New Calendar View & Mobile App Update',
    description: 'We’ve completely redesigned the calendar for better visibility on mobile devices.',
    href: '/resources/updates/v2-4-0'
  },
  {
    version: 'v2.3.5',
    date: 'Oct 10, 2024',
    title: 'Patient Portal Enhancements',
    description: 'Patients can now upload insurance documents directly from their portal.',
    href: '/resources/updates/v2-3-5'
  }
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero (Preserved) -->
    <section class="pt-32 pb-20 bg-white text-center px-4">
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Resources</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Guides, articles, and updates for modern therapy practices.</p>
    </section>
    
    <!-- Bento Grid Categories -->
    <section class="pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="(category, index) in categories"
          :key="category.title"
          :to="category.href"
          class="group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100"
          :class="[category.colSpan, category.bgImage, isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300" :class="category.color.replace('text-', 'bg-').replace('50', '100')">
                <component :is="category.icon" class="w-6 h-6" :class="category.color.split(' ')[1]" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ category.title }}</h3>
              <p class="text-slate-600 leading-relaxed">{{ category.description }}</p>
            </div>
            <div class="mt-8 flex items-center text-sm font-bold transition-colors" :class="category.color.split(' ')[1]">
              Explore <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <!-- Decorative gradient blob -->
          <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl" :class="category.color.replace('text-', 'bg-').replace('50', '400')"></div>
        </RouterLink>

        <!-- Contact Card -->
        <RouterLink 
          to="/resources/contact"
          class="group relative overflow-hidden rounded-3xl p-8 bg-slate-900 text-white md:col-span-1 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 500ms"
        >
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
                <MessageSquare class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-2">Contact Us</h3>
              <p class="text-slate-400 leading-relaxed">Have questions? We're here to help.</p>
            </div>
            <div class="mt-8 flex items-center text-sm font-bold text-white">
              Get in touch <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Featured Guides -->
    <section class="py-24 bg-slate-50 border-y border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-slate-900">Featured Guides</h2>
          <RouterLink to="/resources/guides" class="text-primary-600 font-semibold hover:text-primary-700 flex items-center transition-colors">
            View all guides <ArrowRight class="w-4 h-4 ml-2" />
          </RouterLink>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <RouterLink 
            v-for="(guide, i) in featuredGuides" 
            :key="i" 
            :to="guide.href"
            class="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="h-48 bg-slate-200 relative overflow-hidden">
              <!-- Placeholder for image -->
              <div class="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300"></div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold text-primary-600 tracking-wider">{{ guide.category }}</span>
                <span class="text-xs text-slate-500">{{ guide.readTime }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">{{ guide.title }}</h3>
              <div class="flex items-center text-sm font-medium text-slate-600 mt-4 group-hover:text-primary-600 transition-colors">
                Read guide <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Latest Updates & Help -->
    <section class="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid md:grid-cols-2 gap-16">
        <!-- Latest Updates -->
        <div>
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-slate-900">Latest Updates</h2>
            <RouterLink to="/resources/updates" class="text-primary-600 font-semibold hover:text-primary-700 flex items-center transition-colors">
              All updates <ArrowRight class="w-4 h-4 ml-2" />
            </RouterLink>
          </div>
          <div class="space-y-8">
            <div v-for="(update, i) in latestUpdates" :key="i" class="group border-l-2 border-slate-200 pl-6 hover:border-primary-500 transition-colors duration-300">
              <div class="flex items-center gap-3 mb-2">
                <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">{{ update.version }}</span>
                <span class="text-sm text-slate-500">{{ update.date }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                <RouterLink :to="update.href">{{ update.title }}</RouterLink>
              </h3>
              <p class="text-slate-600 leading-relaxed">{{ update.description }}</p>
            </div>
          </div>
        </div>

        <!-- Help Center Entry -->
        <div class="bg-slate-900 rounded-3xl p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div class="relative z-10">
            <div class="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
              <HelpCircle class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-3xl font-bold mb-4">Need help?</h2>
            <p class="text-slate-300 text-lg mb-8 leading-relaxed">Our help center has answers to common questions about setting up your clinic, billing, and more.</p>
            <RouterLink to="/resources/help">
              <button class="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center">
                Visit Help Center <ArrowRight class="w-4 h-4 ml-2" />
              </button>
            </RouterLink>
          </div>
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full -ml-12 -mb-12 blur-3xl"></div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
