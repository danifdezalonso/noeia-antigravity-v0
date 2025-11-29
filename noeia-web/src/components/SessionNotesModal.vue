<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Save, Sparkles, FileText, List, Map, Upload, Mic } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  isOpen: boolean
  session: any
}>()

const emit = defineEmits(['close', 'save'])

const notes = ref('')
const isAnalyzing = ref(false)
const aiResult = ref<any>(null)
const uploadedFile = ref<any>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadedFile.value = target.files[0]
  }
}

watch(() => props.session, (newSession) => {
  if (newSession) {
    notes.value = newSession.notes || ''
    aiResult.value = null // Reset AI result on new session
  }
}, { immediate: true })

// Mock AI Analysis
function analyzeSession() {
  if (!notes.value) return
  isAnalyzing.value = true
  
  setTimeout(() => {
    aiResult.value = {
      summary: "Patient expressed anxiety about upcoming career changes. Discussed coping mechanisms and identified triggers related to performance pressure.",
      highlights: [
        "High anxiety regarding promotion",
        "Sleep disruption reported",
        "Positive response to breathing exercises"
      ],
      exercises: [
        "Daily 5-min mindfulness",
        "Journaling triggers before bed",
        "Progressive muscle relaxation"
      ],
      roadmap: "Focus on building confidence and stress management techniques over the next 3 sessions."
    }
    isAnalyzing.value = false
  }, 2000)
}

function save() {
  const finalNotes = notes.value + (aiResult.value ? `\n\n[AI Summary]: ${aiResult.value.summary}` : '')
  emit('save', {
    sessionId: props.session.id,
    notes: finalNotes
  })
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">Session Notes</h3>
          <p class="text-sm text-slate-500" v-if="session">
            {{ session.clientName }} • {{ new Date(session.start).toLocaleDateString() }}
          </p>
        </div>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Column: Notes Input -->
        <div class="space-y-6">
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-slate-700">Notes & Recording</label>
              <div class="flex gap-2">
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="hidden" 
                  accept="audio/*"
                  @change="handleFileUpload"
                >
                <button 
                  @click="fileInput?.click()"
                  class="text-xs flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors"
                >
                  <Upload class="w-3 h-3" /> {{ uploadedFile ? uploadedFile.name : 'Upload Recording' }}
                </button>
                <button class="text-xs flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors">
                  <Mic class="w-3 h-3" /> Record
                </button>
              </div>
            </div>
            <textarea 
              v-model="notes"
              rows="12"
              class="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm p-3"
              placeholder="Type your notes here or upload a recording..."
            ></textarea>
            
            <div class="mt-3 flex justify-end">
              <button 
                @click="analyzeSession"
                :disabled="!notes || isAnalyzing"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles class="w-4 h-4" :class="{ 'animate-spin': isAnalyzing }" />
                {{ isAnalyzing ? 'Analyzing...' : 'Analyze with Gemini AI' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: AI Insights -->
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col h-full">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <Sparkles class="w-4 h-4" />
            </div>
            <h4 class="font-semibold text-slate-900">AI Insights</h4>
          </div>

          <div v-if="!aiResult && !isAnalyzing" class="flex-1 flex flex-col items-center justify-center text-center text-slate-400 p-8">
            <Sparkles class="w-12 h-12 mb-3 opacity-20" />
            <p class="text-sm">Enter notes and click Analyze to generate insights, summaries, and roadmaps.</p>
          </div>

          <div v-else-if="isAnalyzing" class="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div class="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-3"></div>
            <p class="text-sm text-purple-600 font-medium">Gemini is analyzing your notes...</p>
          </div>

          <div v-else class="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <!-- Summary -->
            <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2 text-indigo-600 font-medium text-sm">
                <FileText class="w-4 h-4" /> Summary
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">{{ aiResult.summary }}</p>
            </div>

            <!-- Highlights -->
            <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2 text-amber-600 font-medium text-sm">
                <List class="w-4 h-4" /> Key Highlights
              </div>
              <ul class="space-y-1">
                <li v-for="(item, i) in aiResult.highlights" :key="i" class="text-sm text-slate-600 flex items-start gap-2">
                  <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Roadmap -->
            <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2 text-emerald-600 font-medium text-sm">
                <Map class="w-4 h-4" /> Roadmap
              </div>
              <p class="text-sm text-slate-600">{{ aiResult.roadmap }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-3">
        <Button variant="outline" @click="emit('close')">Cancel</Button>
        <Button @click="save">
          <Save class="w-4 h-4 mr-2" />
          Save Notes
        </Button>
      </div>
    </div>
  </div>
</template>
