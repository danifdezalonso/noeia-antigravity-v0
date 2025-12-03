<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div>
    <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Navigation</h3>
    <div class="flex items-center justify-between bg-slate-50 rounded-lg p-2">
      <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
        <ChevronLeft class="w-4 h-4" />
      </Button>
      <div class="text-center">
        <div class="text-sm font-medium text-slate-900">Jan 10, 2024</div>
        <div class="text-xs text-slate-500">Current Session</div>
      </div>
      <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
        <ChevronRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
