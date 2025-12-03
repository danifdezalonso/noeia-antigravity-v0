<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'

const sessions = [
  { id: 1, date: '2024-01-10', title: 'Anxiety Management', type: 'Individual' },
  { id: 2, date: '2024-01-03', title: 'Holiday Stress', type: 'Individual' },
  { id: 3, date: '2023-12-20', title: 'Year End Review', type: 'Individual' },
]

const selectedSessionId = ref(1)
</script>

<template>
  <div>
    <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Finalized Sessions</h3>
    <div class="space-y-1">
      <button
        v-for="session in sessions"
        :key="session.id"
        @click="selectedSessionId = session.id"
        class="w-full text-left p-2 rounded-lg transition-all flex items-start gap-2 group"
        :class="selectedSessionId === session.id ? 'bg-primary-50 text-primary-900' : 'hover:bg-slate-50 text-slate-700'"
      >
        <CheckCircle2 
          class="w-4 h-4 mt-0.5 shrink-0" 
          :class="selectedSessionId === session.id ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-500'" 
        />
        <div>
          <div class="text-sm font-medium">{{ session.title }}</div>
          <div class="text-xs opacity-70">{{ new Date(session.date).toLocaleDateString() }} • {{ session.type }}</div>
        </div>
      </button>
    </div>
  </div>
</template>
