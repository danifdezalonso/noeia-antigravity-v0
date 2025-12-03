<script setup lang="ts">
import { Paperclip, Download, Eye, Plus } from 'lucide-vue-next'


const attachments = [
  { id: 1, name: 'intake_form.pdf', size: '2.4 MB' },
  { id: 2, name: 'lab_results.pdf', size: '1.1 MB' },
]
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attachments</h3>
      <button class="text-primary-600 hover:text-primary-700">
        <Plus class="w-4 h-4" />
      </button>
    </div>
    
    <div class="space-y-2">
      <div v-for="file in attachments" :key="file.id" class="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition-colors group">
        <div class="flex items-center gap-2 overflow-hidden">
          <Paperclip class="w-3 h-3 text-slate-400 shrink-0" />
          <div class="truncate">
            <div class="text-sm font-medium text-slate-700 truncate">{{ file.name }}</div>
            <div class="text-xs text-slate-400">{{ file.size }}</div>
          </div>
        </div>
        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button class="p-1 text-slate-400 hover:text-slate-600 rounded">
            <Eye class="w-3 h-3" />
          </button>
          <button class="p-1 text-slate-400 hover:text-slate-600 rounded">
            <Download class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
