<script setup lang="ts">
import { ref } from 'vue'
import { Search, Clock, AlertCircle, Sparkles, Mic, Upload } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Mock Data
const pendingSessions = [
  { id: '1', clientName: 'Sarah Mitchell', date: '2024-01-15T10:00:00', status: 'Pending', notes: '' },
  { id: '2', clientName: 'James Chen', date: '2024-01-14T14:30:00', status: 'Draft', notes: 'Initial thoughts...' },
]

const selectedSessionId = ref(pendingSessions[0]?.id)
const notes = ref(pendingSessions[0]?.notes || '')
const isGeneratingSummary = ref(false)

function handleGenerateSummary() {
  isGeneratingSummary.value = true
  setTimeout(() => {
    isGeneratingSummary.value = false
    // Mock summary generation
    console.log('Summary generated')
  }, 1500)
}

function handleAddAudio() {
  console.log('Add Audio clicked')
}

function handleUploadFile() {
  console.log('Upload File clicked')
}
</script>

<template>
  <div class="h-full flex">
    <!-- List -->
    <div class="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <!-- Search & Header -->
      <div class="p-4 border-b border-slate-100">
        <h2 class="font-semibold text-slate-900">Pending Sessions</h2>
        <div class="mt-3 relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search..." class="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>
      
      <!-- Items -->
      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        <button
          v-for="session in pendingSessions"
          :key="session.id"
          @click="selectedSessionId = session.id"
          class="w-full text-left p-3 rounded-lg border transition-all"
          :class="selectedSessionId === session.id ? 'bg-primary-50 border-primary-200 ring-1 ring-primary-200' : 'bg-white border-slate-100 hover:border-slate-300'"
        >
          <div class="flex justify-between items-start mb-1">
            <span class="font-medium text-slate-900">{{ session.clientName }}</span>
            <span class="text-xs text-slate-400">{{ new Date(session.date).toLocaleDateString() }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <Clock class="w-3 h-3" />
            {{ new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
          </div>
        </button>
      </div>
    </div>

    <!-- Editor -->
    <div class="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full min-h-[600px]">
          <!-- Toolbar -->
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
            <div>
              <h3 class="font-semibold text-slate-900">Session Notes</h3>
              <p class="text-xs text-slate-500">Sarah Mitchell - Jan 15, 2024</p>
            </div>
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="handleAddAudio">
                <Mic class="w-4 h-4 mr-2" />
                Add Audio
              </Button>
              <Button variant="outline" size="sm" @click="handleUploadFile">
                <Upload class="w-4 h-4 mr-2" />
                Upload File
              </Button>
              <Button variant="ghost" size="sm" @click="handleGenerateSummary" :disabled="isGeneratingSummary">
                <Sparkles class="w-4 h-4 mr-2" :class="{ 'animate-spin': isGeneratingSummary }" />
                Preview AI Summary
              </Button>
            </div>
          </div>
          
          <!-- ... (rest of template) ... -->
          
          <!-- Text Area -->
          <div class="flex-1 p-6">
            <textarea
              v-model="notes"
              class="w-full h-full resize-none focus:outline-none text-slate-700 leading-relaxed"
              placeholder="Start typing your session notes here..."
            ></textarea>
          </div>
          
          <!-- Footer -->
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between items-center shrink-0">
            <div class="flex items-center gap-2 text-xs text-amber-600">
              <AlertCircle class="w-4 h-4" />
              <span>Subjective section is missing</span>
            </div>
            <div class="flex gap-3">
              <Button variant="ghost">Save Draft</Button>
              <Button>Finalize Session</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
