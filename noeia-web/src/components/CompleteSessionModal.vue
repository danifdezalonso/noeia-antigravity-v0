<script setup lang="ts">
import { ref } from 'vue'
import { X, CheckCircle, Sparkles, FileText, List, Map, Upload, Mic } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  isOpen: boolean
  session: any
}>()

const emit = defineEmits(['close', 'complete'])

const notes = ref('')
const duration = ref(50)
const fee = ref(120)
const type = ref('Therapy Session')
const generateBill = ref(true)
const isAnalyzing = ref(false)
const aiResult = ref<any>(null)

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

function submit() {
  emit('complete', {
    sessionId: props.session.id,
    notes: notes.value + (aiResult.value ? `\n\n[AI Summary]: ${aiResult.value.summary}` : ''),
    finalFee: fee.value,
    generateBill: generateBill.value
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
          <h3 class="text-lg font-semibold text-slate-900">Complete Session</h3>
          <p class="text-sm text-slate-500" v-if="session">
            {{ session.clientName }} • {{ new Date(session.start).toLocaleDateString() }}
          </p>
        </div>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Column: Session Details & Notes -->
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select v-model="type" class="w-full rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500">
                <option>Therapy Session</option>
                <option>Initial Consultation</option>
                <option>Follow-up</option>
                <option>Emergency</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Duration (min)</label>
              <input v-model="duration" type="number" class="w-full rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Price (€)</label>
              <input v-model="fee" type="number" class="w-full rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-slate-700">Session Notes</label>
              <div class="flex gap-2">
                <button class="text-xs flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors">
                  <Upload class="w-3 h-3" /> Upload Recording
                </button>
                <button class="text-xs flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors">
                  <Mic class="w-3 h-3" /> Record
                </button>
              </div>
            </div>
            <textarea 
              v-model="notes"
              rows="8"
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

          <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <input type="checkbox" v-model="generateBill" id="bill" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            <label for="bill" class="text-sm font-medium text-slate-700">Generate Invoice automatically</label>
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
        <Button @click="submit" class="bg-green-600 hover:bg-green-700 text-white">
          <CheckCircle class="w-4 h-4 mr-2" />
          Complete Session
        </Button>
      </div>
    </div>
  </div>
</template>
