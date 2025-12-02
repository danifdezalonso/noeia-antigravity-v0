<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Calendar, FileText, Users, Building } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.1 })

  const section = document.getElementById('features')
  if (section) observer.observe(section)
})

const features = [
  {
    title: 'Clinic-wide calendar',
    description: 'See every professional, every room, and every session in one view—filter by person, room, or modality.',
    icon: Calendar,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Context-aware AI notes',
    description: 'Paste your rough notes and let Noeia turn them into structured summaries, treatment plans, and next-session prompts.',
    icon: FileText,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Client records that stay in sync',
    description: 'History, documents, and messages in one place. No more jumping between folders, spreadsheets, and email.',
    icon: Users,
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Configurable offices and rooms',
    description: 'Manage your physical rooms, assign them to professionals, and avoid double-booking in a few clicks.',
    icon: Building,
    color: 'bg-orange-50 text-orange-600'
  }
]
</script>

<template>
  <section id="features" class="py-20 lg:py-28 bg-background">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-text mb-4">Designed around how psychologists actually work.</h2>
        <p class="text-lg text-text-muted">Everything you need to run a modern practice, without the clutter.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group opacity-0 translate-y-8"
          :class="{ 'animate-fade-up': isVisible }"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-1" :class="feature.color">
            <component :is="feature.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-text mb-3 group-hover:text-primary-600 transition-colors">{{ feature.title }}</h3>
          <p class="text-text-muted leading-relaxed">{{ feature.description }}</p>
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
