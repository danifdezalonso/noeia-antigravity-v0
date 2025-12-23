<script setup lang="ts">
import { ref } from 'vue'
import { Mic, RotateCcw, RotateCw, ChevronDown, Paperclip, User, Calendar } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

// Past Sessions State
const showPastSessions = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const pastSessions = ref([
  { id: 1, date: '2024-12-15', title: 'Initial Consultation - Anxiety', selected: false },
  { id: 2, date: '2024-12-08', title: 'Follow-up - Sleep Issues', selected: false },
  { id: 3, date: '2024-12-01', title: 'Medication Review', selected: false },
  { id: 4, date: '2024-11-24', title: 'Therapy Session - CBT', selected: false },
])

// Attached Items State
const attachedSessions = ref<Array<{ id: number; title: string; date: string }>>([])
const attachedFiles = ref<Array<{ id: number; name: string; size: string }>>([])

function attachSelectedSessions() {
  const selected = pastSessions.value.filter(s => s.selected)
  selected.forEach(session => {
    if (!attachedSessions.value.find(a => a.id === session.id)) {
      attachedSessions.value.push({
        id: session.id,
        title: session.title,
        date: session.date
      })
    }
  })
  showPastSessions.value = false
}

function removeAttachedSession(id: number) {
  attachedSessions.value = attachedSessions.value.filter(s => s.id !== id)
  const session = pastSessions.value.find(s => s.id === id)
  if (session) session.selected = false
}

function removeAttachedFile(id: number) {
  attachedFiles.value = attachedFiles.value.filter(f => f.id !== id)
}

function handleFileUpload() {
  fileInput.value?.click()
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    Array.from(files).forEach(file => {
      attachedFiles.value.push({
        id: Date.now() + Math.random(),
        name: file.name,
        size: formatFileSize(file.size)
      })
    })
    // Clear the input so the same file can be selected again
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-8">
     <!-- Text Area Container -->
     <div class="flex-1 flex flex-col relative">
        <textarea 
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            class="w-full flex-1 resize-none outline-none text-base text-slate-800 leading-relaxed placeholder:text-slate-400 bg-transparent"
            placeholder="Add any additional context about the patient or paste files here"
        ></textarea>
        
        <!-- Top Right Actions -->
        <div class="absolute top-0 right-0 flex items-center gap-2">
            <!-- Audio Input -->
             <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm h-9">
                 <Button variant="ghost" size="icon" class="h-7 w-8 text-slate-500 hover:text-slate-900">
                    <Mic class="w-4 h-4" />
                 </Button>
                 <div class="w-px h-4 bg-slate-200 mx-1"></div>
                 <Button variant="ghost" size="icon" class="h-7 w-6 text-slate-400 hover:text-slate-900">
                    <ChevronDown class="w-3.5 h-3.5" />
                 </Button>
             </div>

             <!-- Edit Actions -->
             <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm h-9">
                 <Button variant="ghost" size="icon" class="h-7 w-8 text-slate-400 hover:text-slate-900">
                    <RotateCcw class="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="icon" class="h-7 w-8 text-slate-400 hover:text-slate-900">
                    <RotateCw class="w-4 h-4" />
                 </Button>
                 <div class="w-px h-4 bg-slate-200 mx-1"></div>
                 <button class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-slate-400 hover:text-slate-900 rounded">
                    <span>Copy</span>
                    <ChevronDown class="w-3 h-3" />
                 </button>
             </div>
         </div>
     </div>
     
     <!-- Attached Items Display -->
     <div v-if="attachedSessions.length > 0 || attachedFiles.length > 0" class="mt-4 space-y-2">
        <!-- Attached Sessions -->
        <div v-for="session in attachedSessions" :key="session.id" class="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg group hover:bg-slate-100 transition-colors">
           <div class="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0">
              <User class="w-4 h-4 text-purple-600" />
           </div>
           <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 truncate">{{ session.title }}</p>
              <div class="flex items-center gap-1 text-xs text-slate-500">
                 <Calendar class="w-3 h-3" />
                 <span>{{ session.date }}</span>
              </div>
           </div>
           <button 
              @click="removeAttachedSession(session.id)"
              class="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
           >
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
        </div>
        
        <!-- Attached Files -->
        <div v-for="file in attachedFiles" :key="file.id" class="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg group hover:bg-slate-100 transition-colors">
           <div class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center shrink-0">
              <Paperclip class="w-4 h-4 text-blue-600" />
           </div>
           <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 truncate">{{ file.name }}</p>
              <p class="text-xs text-slate-500">{{ file.size }}</p>
           </div>
           <button 
              @click="removeAttachedFile(file.id)"
              class="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
           >
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
        </div>
     </div>

     <!-- Bottom Left Actions -->
     <div class="mt-4 flex items-center gap-3">
         <!-- Past Sessions Popover -->
         <Popover v-model:open="showPastSessions">
            <PopoverTrigger as-child>
               <Button variant="outline" size="icon" class="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50">
                  <User class="w-5 h-5" />
               </Button>
            </PopoverTrigger>
            <PopoverContent class="w-80 p-4" align="start">
               <div class="space-y-3">
                  <h3 class="text-sm font-semibold text-slate-900">Attach Past Sessions</h3>
                  <p class="text-xs text-slate-500">Select previous sessions to include as context</p>
                  
                  <div class="space-y-2 max-h-64 overflow-y-auto">
                     <div 
                        v-for="session in pastSessions" 
                        :key="session.id"
                        class="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                     >
                        <input 
                           type="checkbox" 
                           v-model="session.selected"
                           class="mt-1 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                        />
                        <div class="flex-1 min-w-0">
                           <p class="text-sm font-medium text-slate-900 truncate">{{ session.title }}</p>
                           <div class="flex items-center gap-1 mt-1 text-xs text-slate-500">
                              <Calendar class="w-3 h-3" />
                              <span>{{ session.date }}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <Button 
                     size="sm" 
                     class="w-full bg-purple-600 hover:bg-purple-700 text-white"
                     @click="attachSelectedSessions"
                  >
                     Attach Selected ({{ pastSessions.filter(s => s.selected).length }})
                  </Button>
               </div>
            </PopoverContent>
         </Popover>
         
         <!-- File Upload -->
         <Button 
            @click="handleFileUpload"
            variant="outline" 
            size="icon" 
            class="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
         >
             <Paperclip class="w-5 h-5" />
         </Button>
         <input 
            ref="fileInput"
            type="file" 
            multiple
            class="hidden"
            @change="onFileSelected"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
         />
     </div>
  </div>
</template>
