<script setup lang="ts">
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import { Heart, Shield, Zap } from 'lucide-vue-next'

const values = [
  {
    title: 'Empathy First',
    description: 'We build for humans, not users. Every pixel is crafted with respect for the emotional work you do.',
    icon: Heart,
    color: 'text-rose-500 bg-rose-50'
  },
  {
    title: 'Radical Privacy',
    description: 'Your client data is sacred. We use bank-level encryption and never sell your data.',
    icon: Shield,
    color: 'text-emerald-500 bg-emerald-50'
  },
  {
    title: 'Calm Efficiency',
    description: 'Technology should get out of the way. We design for flow, focus, and peace of mind.',
    icon: Zap,
    color: 'text-amber-500 bg-amber-50'
  }
]

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { name: 'Dr. Emily Chen', role: 'Clinical Advisor', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { name: 'Marcus Johnson', role: 'Head of Engineering', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
  { name: 'Sarah Wu', role: 'Head of Design', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
]
</script>

<template>
  <div class="min-h-screen bg-white font-sans selection:bg-primary-100 selection:text-primary-900">
    <PublicNavbar />

    <div class="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <!-- Hero -->
      <div class="text-center max-w-3xl mx-auto mb-24 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Calm technology for those who help others.
        </h1>
        <p class="text-xl text-slate-500 leading-relaxed">
          We believe that therapists deserve tools that are as thoughtful and compassionate as the care they provide.
        </p>
      </div>

      <!-- Story Section -->
      <div class="grid md:grid-cols-2 gap-16 items-center mb-32 animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-100 to-purple-100 rounded-3xl transform rotate-3"></div>
            <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team working together" 
                class="relative rounded-3xl shadow-xl border border-white/50"
            />
        </div>
        <div>
            <h2 class="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div class="space-y-4 text-lg text-slate-600">
                <p>
                    Noeia started with a simple observation: most practice management software is clunky, outdated, and stressful to use.
                </p>
                <p>
                    We saw brilliant therapists spending hours wrestling with bad UI instead of resting or focusing on their clients. We knew there had to be a better way.
                </p>
                <p>
                    So we built Noeia. Not just as a tool, but as an operating system for modern therapy. A place where administrative chaos transforms into clarity and calm.
                </p>
            </div>
        </div>
      </div>

      <!-- Values -->
      <div class="mb-32 animate-fade-in-up" style="animation-delay: 0.4s;">
        <h2 class="text-3xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
        <div class="grid md:grid-cols-3 gap-8">
            <div v-for="value in values" :key="value.title" class="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div :class="value.color" class="w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <component :is="value.icon" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-3">{{ value.title }}</h3>
                <p class="text-slate-600">{{ value.description }}</p>
            </div>
        </div>
      </div>

      <!-- Team -->
      <div class="animate-fade-in-up" style="animation-delay: 0.6s;">
        <h2 class="text-3xl font-bold text-slate-900 mb-12 text-center">Meet the Team</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div v-for="member in team" :key="member.name" class="text-center group">
                <div class="relative mb-4 mx-auto w-32 h-32">
                    <div class="absolute inset-0 bg-primary-100 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                    <img :src="member.image" :alt="member.name" class="relative w-32 h-32 rounded-full border-4 border-white shadow-sm" />
                </div>
                <h3 class="font-bold text-slate-900">{{ member.name }}</h3>
                <p class="text-sm text-slate-500">{{ member.role }}</p>
            </div>
        </div>
      </div>
    </div>

    <!-- Footer (Simplified) -->
    <footer class="bg-white border-t border-slate-100 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
          © 2024 Noeia Inc. All rights reserved.
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
</style>
