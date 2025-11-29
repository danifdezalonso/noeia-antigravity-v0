<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Search, 
  Calendar, 
  Clock, 
  Sparkles, 
  Upload, 
  Clipboard,
  FileText,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { enrichedSessions } = storeToRefs(store)

// --- Left Column: Session List ---
const searchQuery = ref('')
const selectedSessionId = ref<string | null>(null)

const pendingSessions = computed(() => {
  const now = new Date()
  let sessions = enrichedSessions.value
    .filter(s => new Date(s.end) < now && s.status !== 'Completed' && s.status !== 'Cancelled')
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    sessions = sessions.filter(s => 
      s.clientName.toLowerCase().includes(query) || 
      s.title.toLowerCase().includes(query)
    )
  }
  return sessions
})

const selectedSession = computed(() => {
  return pendingSessions.value.find(s => s.id === selectedSessionId.value) || null
})

function selectSession(id: string) {
  selectedSessionId.value = id
}

// --- Right Column: Workspace (Reused Logic) ---

// Tab 2: IA Topics
const notes = ref('')
const uploadedFile = ref<any>(null)
const isAnalyzing = ref(false)
const aiResult = ref<any>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const isNotesModalOpen = ref(false)

// Watch for selection change
watch(selectedSession, (newSession) => {
  if (newSession) {
    // Initialize defaults
    notes.value = newSession.notes || ''
    aiResult.value = null
    uploadedFile.value = null
    isNotesModalOpen.value = false
  }
})



// Methods
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadedFile.value = target.files[0]
    setTimeout(() => {
      notes.value += `\n[Attached Recording: ${uploadedFile.value?.name}]`
    }, 500)
  }
}

function analyzeSession() {
  if (!notes.value) return
  isAnalyzing.value = true
  setTimeout(() => {
    isAnalyzing.value = false
    aiResult.value = {
      summary: 'The client discussed feelings of anxiety regarding their upcoming job transition. Key themes included fear of failure and imposter syndrome.',
      topics: ['Job Transition', 'Anxiety', 'Imposter Syndrome', 'Coping Mechanisms'],
      sentiment: 'Anxious but hopeful',
      interventions: ['CBT restructuring', 'Mindfulness exercises'],
      plan: 'Focus on building confidence and specific coping strategies for the new role.'
    }
  }, 1500)
}

import SessionNotesModal from '@/components/ai/SessionNotesModal.vue'

// ... (existing code)

function handleSaveNotes(data: any) {
  notes.value = data.notes
  isNotesModalOpen.value = false
  // Here we could also store the config if needed
  console.log('AI Config:', data.config)
}

function triggerFileInput() {
  fileInput.value?.click()
}
</script>

<template>
  <div class="h-[calc(100vh-3.5rem)] flex overflow-hidden bg-slate-50">
    
    <!-- Left Column: Session List -->
    <div class="w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div class="p-4 border-b border-slate-100">
        <h2 class="text-lg font-semibold text-slate-900 mb-1">Sessions to Finalize</h2>
        <p class="text-xs text-slate-500">{{ pendingSessions.length }} pending sessions</p>
      </div>

      <div class="p-3 border-b border-slate-100">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search..." 
            class="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
          >
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-3 space-y-2">
        <div v-if="pendingSessions.length === 0" class="text-center py-8 text-slate-500 text-sm">
          No pending sessions found.
        </div>
        
        <button 
          v-for="session in pendingSessions" 
          :key="session.id"
          @click="selectSession(session.id)"
          class="w-full text-left p-3 rounded-xl border transition-all hover:shadow-sm"
          :class="selectedSessionId === session.id ? 'bg-primary-50 border-primary-200 ring-1 ring-primary-200' : 'bg-white border-slate-100 hover:border-slate-300'"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-slate-900">{{ session.clientName }}</span>
            <span class="text-xs text-slate-400">{{ new Date(session.start).toLocaleDateString() }}</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <div class="flex items-center gap-1">
              <Clock class="w-3 h-3" />
              {{ new Date(session.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
            </div>
            <div class="flex items-center gap-1">
              <div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              Pending
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Right Column: Workspace -->
    <div class="flex-1 flex flex-col min-w-0">
      <div v-if="!selectedSession" class="flex-1 flex flex-col items-center justify-center text-slate-400">
        <Sparkles class="w-12 h-12 mb-4 text-slate-200" />
        <p>Select a session to start finalizing</p>
      </div>

      <div v-else class="flex-1 flex flex-col h-full">
        <!-- Header -->
        <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 class="text-xl font-bold text-slate-900">{{ selectedSession.clientName }}</h1>
            <div class="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Calendar class="w-4 h-4" />
              {{ new Date(selectedSession.start).toLocaleDateString() }} at {{ new Date(selectedSession.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
            </div>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-4xl mx-auto space-y-6">
            
            <!-- Session Notes (IA) -->
            <div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

                <div class="flex gap-6 min-h-[500px]">
                    <!-- Left Side: Actions & Input -->
                    <div class="flex-1 flex flex-col gap-4">
                        
                        <!-- 3-Column Action Grid -->
                        <div class="grid grid-cols-3 gap-4 h-40 shrink-0">
                            <!-- Upload Recording -->
                            <div 
                                @click="triggerFileInput"
                                class="group relative flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-500 hover:bg-primary-50/50 transition-all cursor-pointer"
                            >
                                <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Upload class="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 text-center">Upload Recording</h3>
                                <p class="text-xs text-slate-500 mt-1 text-center">Audio/Video</p>
                                <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="audio/*,video/*" />
                            </div>

                            <!-- Upload Document -->
                            <div 
                                class="group relative flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-500 hover:bg-primary-50/50 transition-all cursor-pointer"
                            >
                                <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <FileText class="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 text-center">Upload Document</h3>
                                <p class="text-xs text-slate-500 mt-1 text-center">PDF/Word</p>
                                <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx,.txt" @change="handleFileUpload" />
                            </div>

                            <!-- Copy Paste Notes -->
                            <div 
                                @click="isNotesModalOpen = true"
                                class="group flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Clipboard class="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 text-center">Paste Notes</h3>
                                <p class="text-xs text-slate-500 mt-1 text-center">Open Editor</p>
                            </div>
                        </div>

                        <!-- Empty State / Placeholder -->
                        <div class="flex-1 flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-slate-100 p-8 text-center min-h-[300px] overflow-hidden">
                             <div v-if="notes" class="w-full h-full text-left overflow-y-auto pr-2">
                                 <p class="text-sm text-slate-600 whitespace-pre-wrap">{{ notes }}</p>
                             </div>
                             <div v-else class="flex flex-col items-center justify-center h-full">
                             </div>
                        </div>

                        <div class="flex justify-end">
                            <Button @click="analyzeSession" :disabled="isAnalyzing || !notes">
                                <Sparkles class="w-4 h-4 mr-2" :class="{ 'animate-spin': isAnalyzing }" />
                                {{ isAnalyzing ? 'Analyzing...' : 'Analyze with AI' }}
                            </Button>
                        </div>
                    </div>

                    <!-- AI Analysis Result -->
                    <div v-if="aiResult" class="w-80 bg-white border border-slate-200 rounded-xl p-4 overflow-y-auto shadow-sm shrink-0">
                        <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Sparkles class="w-4 h-4 text-primary-500" />
                            AI Analysis
                        </h3>
                        
                        <div class="space-y-4 text-sm">
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</span>
                                <p class="mt-1 text-slate-700">{{ aiResult.summary }}</p>
                            </div>
                            
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Topics</span>
                                <div class="flex flex-wrap gap-1 mt-1">
                                    <span v-for="topic in aiResult.topics" :key="topic" class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                                        {{ topic }}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Sentiment</span>
                                <div class="mt-1 flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                                    <span class="text-slate-700">{{ aiResult.sentiment }}</span>
                                </div>
                            </div>

                             <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Plan</span>
                                <p class="mt-1 text-slate-700">{{ aiResult.plan }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notes Modal -->
            <SessionNotesModal 
              :is-open="isNotesModalOpen"
              :initial-notes="notes"
              @close="isNotesModalOpen = false"
              @save="handleSaveNotes"
            />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
