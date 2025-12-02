<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X, ArrowRight } from 'lucide-vue-next'

const isVisible = ref(false)
const isDismissed = ref(true) // Start as dismissed to prevent flash

const emit = defineEmits(['visibility-change'])

onMounted(() => {
  const dismissed = localStorage.getItem('noeiaBetaBannerDismissed')
  if (!dismissed) {
    isDismissed.value = false
    // Small delay to allow animation
    setTimeout(() => {
      isVisible.value = true
      emit('visibility-change', true)
    }, 100)
  }
})

function dismiss() {
  isVisible.value = false
  emit('visibility-change', false)
  setTimeout(() => {
    isDismissed.value = true
    localStorage.setItem('noeiaBetaBannerDismissed', 'true')
  }, 300) // Match transition duration
}
</script>

<template>
  <div 
    v-if="!isDismissed"
    class="fixed top-0 left-0 right-0 z-[60] overflow-hidden transition-all duration-300 ease-out"
    :class="isVisible ? 'h-[52px] lg:h-[60px] opacity-100 translate-y-0' : 'h-0 opacity-0 -translate-y-full'"
    role="region"
    aria-label="Beta announcement banner"
  >
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6]"></div>

    <div class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      <!-- Spacer for centering on desktop -->
      <div class="hidden lg:block w-24"></div>

      <!-- Center Text -->
      <div class="flex-1 text-center">
        <p class="text-white font-medium text-sm lg:text-base leading-tight">
          We’re in beta — join for free while we improve Noeia, gather user feedback, and grow.
        </p>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-4 lg:gap-6 shrink-0">
        <RouterLink 
          to="/login" 
          class="text-white font-bold text-sm lg:text-base hover:underline underline-offset-4 decoration-2 decoration-white/0 hover:decoration-white transition-all flex items-center gap-1"
        >
          Join us <ArrowRight class="w-4 h-4" />
        </RouterLink>

        <button 
          @click="dismiss"
          class="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Close announcement banner"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
