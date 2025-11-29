<script setup lang="ts">
import { ref, watch } from 'vue'
import { 
  X, 
  CheckCircle, 
  Sparkles, 
  AlertTriangle,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  isOpen: boolean
  initialNotes?: string
}>()

const emit = defineEmits(['close', 'save'])

// Local state
const notes = ref('')

// --- Configuration State ---

// 1. Processing Goal
const processingGoal = ref('summary')
const processingGoals = [
  { id: 'summary', label: 'Session Summary', desc: 'Universal use — lowest risk' },
  { id: 'evolution', label: 'Case Evolution Summary', desc: 'Multi-session patterns' },
  { id: 'action', label: 'Next Session Action Plan', desc: 'Actionable steps' },
  { id: 'insights', label: 'Themes & Insights', desc: 'Psychological extraction' },
  { id: 'admin', label: 'Administrative Notes', desc: 'SOAP / DAP / PIE' },
]

// 2. Tone & Depth
const tone = ref('neutral')
const toneOptions = [
  { value: 'neutral', label: 'Neutral clinical (objective)' },
  { value: 'therapist', label: 'Therapist-friendly (less formal)' },
  { value: 'client', label: 'Client-friendly (plain language)' },
  { value: 'formal', label: 'Insurance/Admin (formulaic)' },
]

const depth = ref(2) // 1-3

// 3. Highlight Focus
const highlights = ref({
  emotions: false,
  coping: true,
  stressors: true,
  relations: false,
  progress: true,
  regressions: false,
  patterns: false
})

// 4. Clinical Framework
const framework = ref('none')
const frameworkOptions = [
  { value: 'none', label: 'None / Generic' },
  { value: 'cbt', label: 'CBT lens' },
  { value: 'act', label: 'ACT lens' },
  { value: 'psychodynamic', label: 'Psychodynamic lens' },
  { value: 'humanistic', label: 'Humanistic' },
  { value: 'integrative', label: 'Integrative' },
]

// 5. Safety Scan
const safetyScanEnabled = ref(true)
const safetySeverity = ref('moderate')
const severityOptions = [
  { value: 'low', label: 'Low (rare)' },
  { value: 'moderate', label: 'Moderate (contextual)' },
  { value: 'max', label: 'Max (aggressive)' },
]

// 6. Interpretation Level
const interpretationLevel = ref('neutral') // neutral, insight, recs

// 7. Auto Format
const autoFormat = ref('none')
const formatOptions = [
  { value: 'none', label: 'None (raw AI output)' },
  { value: 'soap', label: 'SOAP' },
  { value: 'dap', label: 'DAP' },
  { value: 'pie', label: 'PIE' },
]

// Export Options
const exportAudience = ref('therapist')
const exportOptions = [
  { value: 'therapist', label: 'Therapist view (clinical detail)' },
  { value: 'client', label: 'Client-friendly summary' },
  { value: 'admin', label: 'Administrative / Insurance view' },
]

// Sync props
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    notes.value = props.initialNotes || ''
  }
})

function handleSave() {
  emit('save', {
    notes: notes.value,
    config: {
      processingGoal: processingGoal.value,
      tone: tone.value,
      depth: depth.value,
      highlights: highlights.value,
      framework: framework.value,
      safety: { enabled: safetyScanEnabled.value, severity: safetySeverity.value },
      interpretation: interpretationLevel.value,
      format: autoFormat.value,
      export: exportAudience.value
    }
  })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                <Sparkles class="w-5 h-5 text-primary-600" />
            </div>
            <div>
                <h3 class="text-lg font-bold text-slate-900">IA NOTES</h3>
                <p class="text-xs text-slate-500 font-medium">Configuration Panel</p>
            </div>
        </div>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Main Content: Split View -->
      <div class="flex-1 flex overflow-hidden">
          
          <!-- LEFT: Notes Input -->
          <div class="flex-1 flex flex-col border-r border-slate-200 bg-slate-50/30">
              <div class="p-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                  <h4 class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-primary-500"></span>
                      Session Transcript / Notes
                  </h4>
              </div>
              <div class="flex-1 p-6">
                <textarea 
                    v-model="notes"
                    class="w-full h-full p-6 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 resize-none font-mono leading-relaxed shadow-sm transition-all placeholder:text-slate-300"
                    placeholder="Paste your session transcript or raw notes here..."
                ></textarea>
              </div>
          </div>

          <!-- RIGHT: Configuration Panel -->
          <div class="w-[480px] flex flex-col bg-white overflow-y-auto custom-scrollbar">
              <div class="p-6 space-y-8">
                  
                  <!-- 1. Processing Goal -->
                  <section>
                      <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                          1. Processing Goal
                          <span class="text-xs font-normal text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Required</span>
                      </h4>
                      <div class="space-y-2">
                          <label 
                            v-for="goal in processingGoals" 
                            :key="goal.id"
                            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50"
                            :class="processingGoal === goal.id ? 'border-primary-500 bg-primary-50/30 ring-1 ring-primary-500/20' : 'border-slate-200'"
                          >
                              <input type="radio" v-model="processingGoal" :value="goal.id" class="mt-1 text-primary-600 focus:ring-primary-500" />
                              <div>
                                  <span class="block text-sm font-medium text-slate-900">{{ goal.label }}</span>
                                  <span class="block text-xs text-slate-500">{{ goal.desc }}</span>
                              </div>
                          </label>
                      </div>
                  </section>

                  <hr class="border-slate-100" />

                  <!-- 2. Tone & Depth -->
                  <section class="space-y-6">
                      <div>
                          <h4 class="text-sm font-bold text-slate-900 mb-3">2. Tone & Depth</h4>
                          <div class="grid grid-cols-1 gap-4">
                              <div>
                                  <label class="block text-xs font-medium text-slate-500 mb-1.5">A. Tone</label>
                                  <select v-model="tone" class="w-full text-sm border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                                      <option v-for="opt in toneOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                                  </select>
                              </div>
                              <div>
                                  <div class="flex justify-between mb-1.5">
                                      <label class="block text-xs font-medium text-slate-500">B. Depth ({{ depth }})</label>
                                      <span class="text-xs text-primary-600 font-medium">
                                          {{ depth === 1 ? 'Concise' : depth === 2 ? 'Moderate' : 'Deep' }}
                                      </span>
                                  </div>
                                  <input 
                                    type="range" 
                                    v-model.number="depth" 
                                    min="1" 
                                    max="3" 
                                    step="1"
                                    class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                  />
                                  <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                                      <span>Bullets</span>
                                      <span>Summary</span>
                                      <span>Structured</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>

                  <hr class="border-slate-100" />

                  <!-- 3. Highlight Focus -->
                  <section>
                      <h4 class="text-sm font-bold text-slate-900 mb-3">3. Highlight Focus (Insights)</h4>
                      <div class="grid grid-cols-2 gap-3">
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.emotions" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Emotions
                          </label>
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.coping" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Coping strategies
                          </label>
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.stressors" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Stressors
                          </label>
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.relations" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Relations
                          </label>
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.progress" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Progress
                          </label>
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.regressions" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Regressions
                          </label>
                          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="checkbox" v-model="highlights.patterns" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                              Patterns
                          </label>
                      </div>
                  </section>

                  <hr class="border-slate-100" />

                  <!-- 4. Clinical Framework -->
                  <section>
                      <h4 class="text-sm font-bold text-slate-900 mb-3">4. Clinical Framework</h4>
                      <select v-model="framework" class="w-full text-sm border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 mb-2">
                          <option v-for="opt in frameworkOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                      </select>
                      <div class="flex items-start gap-2 p-2 bg-amber-50 text-amber-700 rounded-md text-xs">
                          <AlertTriangle class="w-4 h-4 shrink-0 mt-0.5" />
                          <p>Uses terminology patterns only. Does NOT diagnose or assess clinical conditions.</p>
                      </div>
                  </section>

                  <hr class="border-slate-100" />

                  <!-- 5. Safety Scan -->
                  <section>
                      <div class="flex items-center justify-between mb-3">
                          <h4 class="text-sm font-bold text-slate-900">5. Safety Scan</h4>
                          <div class="flex items-center gap-2">
                              <span class="text-xs text-slate-500">{{ safetyScanEnabled ? 'ON' : 'OFF' }}</span>
                              <button 
                                @click="safetyScanEnabled = !safetyScanEnabled"
                                class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                :class="safetyScanEnabled ? 'bg-primary-600' : 'bg-slate-200'"
                              >
                                  <span 
                                    class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                                    :class="safetyScanEnabled ? 'translate-x-5' : 'translate-x-1'"
                                  />
                              </button>
                          </div>
                      </div>
                      
                      <div v-if="safetyScanEnabled" class="animate-in fade-in slide-in-from-top-1">
                          <label class="block text-xs font-medium text-slate-500 mb-1.5">Severity Level</label>
                          <select v-model="safetySeverity" class="w-full text-sm border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                              <option v-for="opt in severityOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                          </select>
                          <p class="text-xs text-slate-400 mt-2">
                              Detects: Self-harm, Suicide ideation, Abuse, Minors in risk, Substance abuse.
                          </p>
                      </div>
                  </section>

                  <hr class="border-slate-100" />

                  <!-- 6. Interpretation Level -->
                  <section>
                      <h4 class="text-sm font-bold text-slate-900 mb-3">6. Interpretation Level</h4>
                      <div class="bg-slate-100 p-1 rounded-lg flex text-xs font-medium">
                          <button 
                            @click="interpretationLevel = 'neutral'"
                            class="flex-1 py-1.5 rounded-md transition-all text-center"
                            :class="interpretationLevel === 'neutral' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                          >
                              Neutral
                          </button>
                          <button 
                            @click="interpretationLevel = 'insight'"
                            class="flex-1 py-1.5 rounded-md transition-all text-center"
                            :class="interpretationLevel === 'insight' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                          >
                              Insight
                          </button>
                          <button 
                            @click="interpretationLevel = 'recs'"
                            class="flex-1 py-1.5 rounded-md transition-all text-center"
                            :class="interpretationLevel === 'recs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                          >
                              Recs
                          </button>
                      </div>
                      <p class="text-xs text-slate-500 mt-2 text-center">
                          {{ interpretationLevel === 'neutral' ? 'Quotes, facts, timestamps only.' : interpretationLevel === 'insight' ? 'Patterns, relationships, tendencies.' : 'Homework, psychoeducation, goals.' }}
                      </p>
                  </section>

                  <hr class="border-slate-100" />

                  <!-- 7. Automatic Clinical Format -->
                  <section>
                      <h4 class="text-sm font-bold text-slate-900 mb-3">7. Automatic Clinical Format</h4>
                      <select v-model="autoFormat" class="w-full text-sm border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                          <option v-for="opt in formatOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                      </select>
                  </section>

                  <!-- Export Options -->
                   <div class="bg-slate-50 -mx-6 -mb-6 p-6 border-t border-slate-200 mt-4">
                      <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Export Options</h4>
                      <select v-model="exportAudience" class="w-full text-sm border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                          <option v-for="opt in exportOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                      </select>
                   </div>

              </div>
          </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
        <Button variant="outline" @click="$emit('close')">Cancel</Button>
        <Button @click="handleSave" class="px-8">
          <CheckCircle class="w-4 h-4 mr-2" />
          Save & Analyze
        </Button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>
