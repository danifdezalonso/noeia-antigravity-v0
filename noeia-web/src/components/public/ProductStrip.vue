<script setup lang="ts">
import { ref } from 'vue'

const activeSlide = ref(0)

const slides = [
  { title: 'Calendar', image: 'https://placehold.co/800x500/f1f5f9/334155?text=Calendar+View' },
  { title: 'Client Record', image: 'https://placehold.co/800x500/f1f5f9/334155?text=Client+Record' },
  { title: 'Admin Dashboard', image: 'https://placehold.co/800x500/f1f5f9/334155?text=Admin+Dashboard' },
  { title: 'Billing', image: 'https://placehold.co/800x500/f1f5f9/334155?text=Billing+Snapshot' }
]

function scrollToSlide(index: number) {
  activeSlide.value = index
  const el = document.getElementById(`slide-${index}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}
</script>

<template>
  <section class="py-20 bg-slate-900 text-white overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
      <h2 class="text-3xl font-bold mb-4">See it in action</h2>
      <div class="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          @click="scrollToSlide(index)"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
          :class="activeSlide === index ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'"
        >
          {{ slide.title }}
        </button>
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div class="flex gap-8 overflow-x-auto px-4 sm:px-6 pb-12 snap-x snap-mandatory no-scrollbar">
      <div class="shrink-0 w-4 sm:w-6 md:w-[calc(50%-400px)]"></div> <!-- Spacer -->
      
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        :id="`slide-${index}`"
        class="shrink-0 w-[85vw] sm:w-[600px] md:w-[800px] snap-center transition-all duration-500"
        :class="activeSlide === index ? 'scale-100 opacity-100' : 'scale-95 opacity-50'"
      >
        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 aspect-[16/10] relative group">
          <!-- Placeholder Image -->
          <img :src="slide.image" class="w-full h-full object-cover" />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>
      </div>

      <div class="shrink-0 w-4 sm:w-6 md:w-[calc(50%-400px)]"></div> <!-- Spacer -->
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
