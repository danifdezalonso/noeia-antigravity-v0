<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  href?: string
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Get a demo',
  href: '#'
})

</script>

<template>
  <component 
    :is="href ? 'a' : 'button'"
    :href="href"
    @click="onClick"
    class="relative group inline-flex items-center justify-center rounded-full p-[1px] overflow-hidden cursor-pointer"
  >
    <!-- Rotating Gradient Border -->
    <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    
    <!-- Button Content -->
    <span class="relative inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-200 group-hover:bg-slate-900">
      {{ text }}
      <!-- Glare Effect -->
      <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>
    </span>
  </component>
</template>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
