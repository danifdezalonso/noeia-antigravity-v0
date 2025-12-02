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

  const section = document.getElementById('social-proof')
  if (section) observer.observe(section)
})

const logos = [
  'Mindful Clinic', 'TherapySpace', 'Wellness Center', 'PsychAssociates', 'CalmHealth'
]
</script>

<template>
  <section id="social-proof" class="py-10 border-b border-slate-100 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
      <p class="text-sm font-medium text-text-light mb-6">Built for professionals who work with real people, not tickets.</p>
      
      <div class="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-0 transition-opacity duration-1000" :class="{ 'opacity-100': isVisible }">
        <div 
          v-for="(logo, index) in logos" 
          :key="index"
          class="text-xl font-bold text-slate-300 hover:text-slate-500 transition-colors cursor-default select-none"
        >
          {{ logo }}
        </div>
      </div>
    </div>
  </section>
</template>
