<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight, Calendar, Users, FileText, Sparkles } from 'lucide-vue-next'
import PublicNavbar from '@/components/public/PublicNavbar.vue'

const features = [
  {
    title: 'Smart Calendar',
    description: 'Effortless scheduling with automated reminders and timezone detection.',
    icon: Calendar,
    class: 'col-span-12 md:col-span-8 bg-blue-50/50 border-blue-100',
    iconClass: 'text-blue-600 bg-blue-100'
  },
  {
    title: 'AI Session Notes',
    description: 'Focus on your client. Let AI handle the documentation.',
    icon: Sparkles,
    class: 'col-span-12 md:col-span-4 bg-purple-50/50 border-purple-100',
    iconClass: 'text-purple-600 bg-purple-100'
  },
  {
    title: 'Client Management',
    description: 'A secure, organized home for all your client records and history.',
    icon: Users,
    class: 'col-span-12 md:col-span-4 bg-emerald-50/50 border-emerald-100',
    iconClass: 'text-emerald-600 bg-emerald-100'
  },
  {
    title: 'Seamless Billing',
    description: 'Generate invoices and track payments without the headache.',
    icon: FileText,
    class: 'col-span-12 md:col-span-8 bg-amber-50/50 border-amber-100',
    iconClass: 'text-amber-600 bg-amber-100'
  }
]

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans selection:bg-primary-100 selection:text-primary-900">
    <!-- Navbar -->
    <PublicNavbar />

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 mb-8 animate-fade-in-up"
          style="animation-delay: 0.1s;"
        >
          <span class="flex h-2 w-2 rounded-full bg-primary-500"></span>
          Now available in public beta
        </div>
        
        <h1 
          class="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1] animate-fade-in-up"
          style="animation-delay: 0.2s;"
        >
          The operating system for <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">modern therapy</span>
        </h1>
        
        <p 
          class="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style="animation-delay: 0.3s;"
        >
          Manage clients, sessions, and billing in one beautiful, calm workspace. Designed for psychologists who value clarity and focus.
        </p>
        
        <div 
          class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style="animation-delay: 0.4s;"
        >
          <router-link 
            to="/login" 
            class="group px-8 py-4 text-lg font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
          >
            Start for free
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </router-link>
          <button class="px-8 py-4 text-lg font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all">
            View demo
          </button>
        </div>

        <!-- Hero Image / Dashboard Preview -->
        <div 
          class="mt-20 relative rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-2xl shadow-slate-200/50 p-2 animate-fade-in-up"
          style="animation-delay: 0.6s;"
        >
          <div class="rounded-xl overflow-hidden bg-slate-50 aspect-[16/9] relative group">
             <!-- Abstract UI Representation -->
             <div class="absolute inset-0 flex items-center justify-center text-slate-300">
                <div class="w-full h-full bg-white relative overflow-hidden">
                    <!-- Sidebar -->
                    <div class="absolute left-0 top-0 bottom-0 w-64 border-r border-slate-100 bg-slate-50/50 p-6 flex flex-col gap-4">
                        <div class="h-8 w-8 bg-primary-100 rounded-lg mb-4"></div>
                        <div class="h-4 w-32 bg-slate-200 rounded"></div>
                        <div class="h-4 w-24 bg-slate-200 rounded"></div>
                        <div class="h-4 w-28 bg-slate-200 rounded"></div>
                    </div>
                    <!-- Main Content -->
                    <div class="absolute left-64 right-0 top-0 bottom-0 p-8">
                        <div class="flex justify-between items-center mb-8">
                            <div class="h-8 w-48 bg-slate-200 rounded"></div>
                            <div class="h-8 w-8 bg-slate-200 rounded-full"></div>
                        </div>
                        <div class="grid grid-cols-3 gap-6">
                            <div class="h-32 bg-slate-100 rounded-xl border border-slate-200"></div>
                            <div class="h-32 bg-slate-100 rounded-xl border border-slate-200"></div>
                            <div class="h-32 bg-slate-100 rounded-xl border border-slate-200"></div>
                        </div>
                        <div class="mt-8 h-64 bg-slate-100 rounded-xl border border-slate-200"></div>
                    </div>
                </div>
             </div>
             
             <!-- Overlay Gradient -->
             <div class="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section (Bento Grid) -->
    <section id="features" class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your practice</h2>
          <p class="text-lg text-slate-500 max-w-2xl mx-auto">Powerful tools wrapped in a simple, elegant interface.</p>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            :class="feature.class"
            class="group relative rounded-3xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div class="relative z-10">
              <div :class="feature.iconClass" class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
                <component :is="feature.icon" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">{{ feature.title }}</h3>
              <p class="text-slate-600">{{ feature.description }}</p>
            </div>
            
            <!-- Decorative Background Element -->
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by modern therapists</h2>
        </div>
        
        <div class="flex gap-6 overflow-hidden mask-linear-fade">
            <!-- Mock Testimonials -->
            <div class="flex gap-6 animate-scroll">
                <div v-for="i in 5" :key="i" class="w-80 flex-shrink-0 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div class="flex items-center gap-1 text-amber-400 mb-4">
                        <Sparkles class="w-4 h-4 fill-current" />
                        <Sparkles class="w-4 h-4 fill-current" />
                        <Sparkles class="w-4 h-4 fill-current" />
                        <Sparkles class="w-4 h-4 fill-current" />
                        <Sparkles class="w-4 h-4 fill-current" />
                    </div>
                    <p class="text-slate-700 mb-6">"Noeia has completely transformed how I manage my practice. It's so calm and easy to use."</p>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-slate-200 rounded-full"></div>
                        <div>
                            <div class="font-medium text-slate-900">Dr. Sarah J.</div>
                            <div class="text-xs text-slate-500">Clinical Psychologist</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900"></div>
        <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to upgrade your practice?</h2>
            <p class="text-xl text-slate-400 mb-10">Join thousands of therapists who have found their peace of mind with Noeia.</p>
            <router-link 
                to="/login" 
                class="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-all hover:shadow-xl hover:-translate-y-1"
            >
                Get started for free
                <ArrowRight class="w-5 h-5" />
            </router-link>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-100 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-xs">N</div>
          <span class="font-bold text-lg tracking-tight text-slate-900">Noeia</span>
        </div>
        <div class="flex gap-8 text-sm text-slate-500">
          <a href="#" class="hover:text-slate-900">Privacy</a>
          <a href="#" class="hover:text-slate-900">Terms</a>
          <a href="#" class="hover:text-slate-900">Twitter</a>
          <a href="#" class="hover:text-slate-900">LinkedIn</a>
        </div>
        <div class="text-sm text-slate-400">
          © 2024 Noeia Inc. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
}

/* Add more custom animations if needed */
</style>
