<script setup lang="ts">
import { ref } from 'vue'
import SessionsToFinalize from './SessionsToFinalize.vue'
import FinalizedSessionView from './FinalizedSessionView.vue'

const activeSegment = ref<'finalize' | 'finalized'>('finalize')
</script>

<template>
  <div class="h-full flex flex-col bg-slate-50">
    <!-- Segmented Control -->
    <div class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-center shrink-0">
      <div class="bg-slate-100 p-1 rounded-lg inline-flex">
        <button
          @click="activeSegment = 'finalize'"
          class="px-4 py-1.5 text-sm font-medium rounded-md transition-all"
          :class="activeSegment === 'finalize' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          Sessions to finalize
        </button>
        <button
          @click="activeSegment = 'finalized'"
          class="px-4 py-1.5 text-sm font-medium rounded-md transition-all"
          :class="activeSegment === 'finalized' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          Finalized
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-hidden">
      <SessionsToFinalize v-if="activeSegment === 'finalize'" />
      <FinalizedSessionView v-else />
    </div>
  </div>
</template>
