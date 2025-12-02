<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.1 })

  const section = document.getElementById('how-it-works')
  if (section) observer.observe(section)
})

const steps = [
  {
    num: '01',
    title: 'Set up your organization',
    description: 'Create your workspace, define your offices and rooms, and invite your team of psychologists.'
  },
  {
    num: '02',
    title: 'Run your day from the calendar',
    description: 'Book sessions, assign rooms, and keep everyone’s schedule in sync. Clients get reminders automatically.'
  },
  {
    num: '03',
    title: 'Let AI handle the repetitive work',
    description: 'Paste your notes or write naturally. Noeia understands the client’s history and generates summaries, reports, and next-session ideas.'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-20 lg:py-28 bg-white border-t border-slate-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-text mb-4">How does Noeia work?</h2>
        <p class="text-lg text-text-muted">From first setup to your next session, in three steps.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="relative bg-white p-6 rounded-2xl border border-transparent hover:border-slate-100 hover:shadow-lg transition-all duration-300 group opacity-0 translate-y-8"
          :class="{ 'animate-fade-up': isVisible }"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="w-12 h-12 rounded-full bg-white border-2 border-slate-100 text-slate-400 font-bold flex items-center justify-center mb-6 group-hover:border-primary-500 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
            {{ step.num }}
          </div>
          <h3 class="text-xl font-bold text-text mb-3">{{ step.title }}</h3>
          <p class="text-text-muted text-sm leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
