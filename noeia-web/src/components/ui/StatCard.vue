<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  title: string
  value: string | number
  trend?: string
  trendUp?: boolean
  icon?: Component
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-medium text-slate-500">{{ title }}</h3>
      <div v-if="icon" class="p-2 bg-primary-50 rounded-lg text-primary-600">
        <component :is="icon" class="w-5 h-5" />
      </div>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-2xl font-bold text-slate-900">{{ value }}</span>
      <span 
        v-if="trend" 
        class="text-xs font-medium px-2 py-0.5 rounded-full"
        :class="trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
      >
        {{ trend }}
      </span>
    </div>
  </div>
</template>
