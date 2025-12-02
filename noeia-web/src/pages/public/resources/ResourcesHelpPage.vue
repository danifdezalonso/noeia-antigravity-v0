<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { Search, HelpCircle, User, CreditCard, Stethoscope, Shield, Settings, MessageCircle, ChevronRight } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const categories = [
  {
    title: 'Account & Profile',
    description: 'Manage your settings, team members, and notifications.',
    icon: User,
    color: 'bg-blue-100 text-blue-600',
    articles: ['Resetting your password', 'Inviting team members', 'Two-factor authentication']
  },
  {
    title: 'Billing & Subscriptions',
    description: 'Invoices, payment methods, and plan upgrades.',
    icon: CreditCard,
    color: 'bg-green-100 text-green-600',
    articles: ['Understanding your invoice', 'Updating payment method', 'Changing your plan']
  },
  {
    title: 'Clinical Tools',
    description: 'Notes, calendars, and patient management.',
    icon: Stethoscope,
    color: 'bg-purple-100 text-purple-600',
    articles: ['Creating SOAP notes', 'Scheduling recurring appointments', 'Patient intake forms']
  },
  {
    title: 'Privacy & Security',
    description: 'HIPAA compliance, data protection, and access logs.',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    articles: ['HIPAA compliance guide', 'Data export requests', 'Audit logs']
  },
  {
    title: 'Integrations',
    description: 'Connecting with Google Calendar, Stripe, and more.',
    icon: Settings,
    color: 'bg-orange-100 text-orange-600',
    articles: ['Syncing Google Calendar', 'Stripe integration setup', 'Zoom for telehealth']
  },
  {
    title: 'Patient Portal',
    description: 'What your patients see and how they use Noeia.',
    icon: MessageCircle,
    color: 'bg-teal-100 text-teal-600',
    articles: ['Patient portal overview', 'Troubleshooting patient login', 'Sharing documents']
  }
]
</script>

<template>
  <div class="bg-white min-h-screen pt-32">
    <!-- Hero -->
    <section class="text-center px-4 mb-16">
      <div class="inline-flex items-center justify-center p-3 bg-orange-50 rounded-2xl mb-6">
        <HelpCircle class="w-8 h-8 text-orange-600" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Help Center</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">Find answers to your questions and learn how to get the most out of Noeia.</p>
      
      <!-- Search -->
      <div class="max-w-2xl mx-auto relative">
        <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for articles, guides, or troubleshooting..." 
          class="w-full pl-16 pr-6 py-5 rounded-2xl border border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all shadow-lg shadow-slate-200/50 text-lg"
        >
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="group bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300" :class="category.color">
            <component :is="category.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ category.title }}</h3>
          <p class="text-slate-500 text-sm leading-relaxed mb-6">{{ category.description }}</p>
          
          <ul class="space-y-3">
            <li v-for="article in category.articles" :key="article">
              <a href="#" class="flex items-center justify-between text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors group/link py-1">
                {{ article }}
                <ChevronRight class="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Still need help? -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      <div class="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Still need help?</h2>
        <p class="text-slate-500 mb-8 max-w-lg mx-auto">Our support team is available Monday through Friday, 9am to 5pm EST.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Email Support
          </button>
          <button class="px-6 py-3 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30">
            Start Live Chat
          </button>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
