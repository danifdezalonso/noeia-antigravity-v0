<script setup lang="ts">
import { Search, Paperclip } from 'lucide-vue-next'

const sessions = [
  { id: 1, date: '2024-01-03', type: 'Individual', summary: 'Discussed holiday stress and family interactions.', hasAttachments: true },
  { id: 2, date: '2023-12-20', type: 'Individual', summary: 'End of year review. Progress on goals noted.', hasAttachments: false },
  { id: 3, date: '2023-12-06', type: 'Crisis', summary: 'Urgent session requested due to panic attack.', hasAttachments: true },
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Filters -->
    <div class="flex gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search history..." class="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <select class="text-sm border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500">
        <option>All Types</option>
        <option>Individual</option>
        <option>Group</option>
        <option>Crisis</option>
      </select>
    </div>

    <!-- Timeline -->
    <div class="space-y-4">
      <div v-for="session in sessions" :key="session.id" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary-300 transition-colors group cursor-pointer">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-medium text-slate-900">{{ new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</h3>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 mt-1">
              {{ session.type }}
            </span>
          </div>
          <button class="text-sm text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Open Session</button>
        </div>
        <p class="text-slate-600 text-sm mb-3">{{ session.summary }}</p>
        <div v-if="session.hasAttachments" class="flex items-center gap-2 text-xs text-slate-500">
          <Paperclip class="w-3 h-3" />
          <span>Attachments available</span>
        </div>
      </div>
    </div>
  </div>
</template>
