<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { FileText, ArrowRight, User, Calendar } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const articles = [
  {
    title: 'The Future of Digital Therapy: Trends to Watch in 2025',
    excerpt: 'From AI-assisted notes to virtual reality exposure therapy, technology is reshaping how we deliver care. Here are the key trends every modern clinic should know.',
    author: 'Dr. Sarah Chen',
    date: 'Oct 28, 2024',
    readTime: '8 min read',
    category: 'Industry Trends',
    image: '/images/blog-future.jpg',
    href: '/resources/blog/future-of-therapy'
  },
  {
    title: 'Reducing No-Shows: 5 Strategies That Actually Work',
    excerpt: 'Missed appointments cost clinics thousands every year. We analyzed data from 500+ clinics to find the most effective ways to improve attendance rates.',
    author: 'Mark Davis',
    date: 'Oct 15, 2024',
    readTime: '5 min read',
    category: 'Practice Management',
    image: '/images/blog-noshows.jpg',
    href: '/resources/blog/reducing-no-shows'
  },
  {
    title: 'Building a Strong Therapeutic Alliance via Telehealth',
    excerpt: 'Connecting with patients through a screen presents unique challenges. Learn techniques to foster trust and rapport in a virtual setting.',
    author: 'Dr. Emily White',
    date: 'Oct 02, 2024',
    readTime: '6 min read',
    category: 'Clinical Practice',
    image: '/images/blog-telehealth.jpg',
    href: '/resources/blog/telehealth-alliance'
  },
  {
    title: 'HIPAA Compliance in the Age of AI',
    excerpt: 'As AI tools become more prevalent in healthcare, understanding the privacy implications is crucial. A guide to staying compliant while innovating.',
    author: 'Legal Team',
    date: 'Sep 25, 2024',
    readTime: '10 min read',
    category: 'Compliance',
    image: '/images/blog-compliance.jpg',
    href: '/resources/blog/hipaa-ai'
  },
  {
    title: 'Marketing Your Private Practice: A Beginner’s Guide',
    excerpt: 'You’re a great therapist, but are you reaching the right patients? Simple, ethical marketing strategies to grow your practice.',
    author: 'Jessica Lee',
    date: 'Sep 10, 2024',
    readTime: '7 min read',
    category: 'Marketing',
    image: '/images/blog-marketing.jpg',
    href: '/resources/blog/marketing-guide'
  },
  {
    title: 'Burnout Prevention for Mental Health Professionals',
    excerpt: 'Caring for others requires caring for yourself. Practical self-care strategies and boundary-setting tips for therapists.',
    author: 'Dr. Michael Brown',
    date: 'Aug 28, 2024',
    readTime: '5 min read',
    category: 'Wellness',
    image: '/images/blog-burnout.jpg',
    href: '/resources/blog/burnout-prevention'
  }
]
</script>

<template>
  <div class="bg-white min-h-screen pt-32">
    <!-- Hero -->
    <section class="text-center px-4 mb-20">
      <div class="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6">
        <FileText class="w-8 h-8 text-emerald-600" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Blog & Insights</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Thoughts on therapy, practice management, and the future of mental healthcare.</p>
    </section>

    <!-- Featured Article (First one) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
      <div 
        class="group relative rounded-3xl overflow-hidden bg-slate-900 text-white grid md:grid-cols-2 transition-all duration-500 hover:shadow-2xl"
        :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10 md:hidden"></div>
        <div class="relative h-64 md:h-auto overflow-hidden md:order-2">
           <div class="absolute inset-0 bg-slate-800"></div> <!-- Placeholder image bg -->
           <!-- Actual image would go here -->
        </div>
        <div class="relative z-20 p-8 md:p-16 flex flex-col justify-center md:order-1">
          <div class="text-emerald-400 font-bold tracking-wider text-sm mb-4 uppercase">{{ articles[0]?.category }}</div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6 leading-tight group-hover:text-emerald-400 transition-colors">{{ articles[0]?.title }}</h2>
          <p class="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-3">{{ articles[0]?.excerpt }}</p>
          
          <div class="flex items-center gap-4 text-sm text-slate-400 mb-8">
            <div class="flex items-center gap-2">
              <User class="w-4 h-4" />
              {{ articles[0]?.author }}
            </div>
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4" />
              {{ articles[0]?.date }}
            </div>
          </div>

          <div class="flex items-center font-bold text-white group-hover:text-emerald-400 transition-colors">
            Read article <ArrowRight class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(article, index) in articles.slice(1)" 
          :key="index"
          class="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${(index + 1) * 50}ms` }"
        >
          <div class="h-56 bg-slate-100 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition-transform duration-500"></div>
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
              {{ article.category }}
            </div>
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <div class="flex items-center gap-3 text-xs text-slate-500 mb-4">
              <span>{{ article.date }}</span>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{{ article.readTime }}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">{{ article.title }}</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{{ article.excerpt }}</p>
            
            <div class="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
               <div class="text-xs font-medium text-slate-900">{{ article.author }}</div>
               <div class="flex items-center text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                 Read <ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
