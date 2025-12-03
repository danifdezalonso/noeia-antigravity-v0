<script setup lang="ts">
import { ref } from 'vue'
import ManualNotesTab from './tabs/ManualNotesTab.vue'
import AISummaryTab from './tabs/AISummaryTab.vue'
import HistoryTab from './tabs/HistoryTab.vue'
import RoadmapTab from './tabs/RoadmapTab.vue'
import SessionSidebar from './sidebar/SessionSidebar.vue'
import { Download, History } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const activeTab = ref<'manual' | 'ai' | 'history' | 'roadmap'>('manual')

const tabs = [
  { id: 'manual', label: 'Manual Notes' },
  { id: 'ai', label: 'AI Summary' },
  { id: 'history', label: 'History' },
  { id: 'roadmap', label: 'Roadmap' },
] as const
</script>

<template>
  <div class="h-full flex">
    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 bg-white">
      <!-- Header & Tabs -->
      <div class="border-b border-slate-200 px-6 pt-6 shrink-0">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Session: Anxiety Management</h1>
            <p class="text-slate-500">Sarah Mitchell • Jan 10, 2024 • Individual Therapy</p>
          </div>
          <div class="flex gap-2">
            <Button variant="ghost" size="sm">
              <History class="w-4 h-4 mr-2" />
              Versions
            </Button>
            <Button variant="ghost" size="sm">
              <Download class="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div class="flex gap-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="pb-3 text-sm font-medium border-b-2 transition-colors"
            :class="activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="flex-1 overflow-y-auto p-6 bg-slate-50">
        <ManualNotesTab v-if="activeTab === 'manual'" />
        <AISummaryTab v-if="activeTab === 'ai'" />
        <HistoryTab v-if="activeTab === 'history'" />
        <RoadmapTab v-if="activeTab === 'roadmap'" />
      </div>
    </div>

    <!-- Sidebar -->
    <SessionSidebar />
  </div>
</template>
