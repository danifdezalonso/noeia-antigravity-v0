<script setup lang="ts">
import { ref } from 'vue'
import { Save } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const notes = ref('Session Date: January 15, 2024\nPatient: Sarah Mitchell\nDuration: 60 minutes\n\nSession Summary:\nToday\'s session focused on anxiety management techniques...')
const template = ref('soap')
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="text-sm text-slate-500">Template:</span>
        <select v-model="template" class="text-sm border-slate-200 rounded-md focus:ring-primary-500 focus:border-primary-500">
          <option value="soap">SOAP Note</option>
          <option value="dap">DAP Note</option>
          <option value="free">Free Text</option>
        </select>
      </div>
      <div class="flex gap-2">
        <Button variant="ghost" size="sm">Discard Changes</Button>
        <Button size="sm">
          <Save class="w-4 h-4 mr-2" />
          Save Notes
        </Button>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[600px] p-6">
      <textarea
        v-model="notes"
        class="w-full h-full resize-none focus:outline-none text-slate-700 leading-relaxed font-mono text-sm"
      ></textarea>
    </div>
  </div>
</template>
