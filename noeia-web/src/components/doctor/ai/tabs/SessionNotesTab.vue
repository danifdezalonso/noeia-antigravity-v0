<script setup lang="ts">
import { ref } from 'vue'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Button from '@/components/ui/Button.vue'
import { 
  Mic, 
  RotateCcw, 
  RotateCw, 
  ChevronDown, 
  Sparkles, 
  ArrowUp,
  MoreHorizontal,
  PenTool,
  LayoutTemplate,
  User,
  Paperclip
} from 'lucide-vue-next'

const notes = ref('')
const isRecording = ref(false)
const selectedTemplate = ref('Standard GP Consultation Note')
const hasStarted = ref(true) // Toggle between empty state and editor

// Custom Settings State
const showCustomPanel = ref(false)
const scribeMode = ref('Standard') // 'Standard' or 'Extended'
const voiceOption = ref('Custom')
const detailLevel = ref(75) // 0-100
const useBulletPoints = ref(true)
const useQuotes = ref(false)
const useAbbreviations = ref(true)

function toggleRecording() {
  isRecording.value = !isRecording.value
  if(isRecording.value) {
      hasStarted.value = true
  }
}
</script>

<template>
  <div class="h-full flex flex-col relative bg-white">
    <!-- Toolbar -->
    <div class="px-6 py-3 border-b border-slate-100 flex items-center gap-3 shrink-0">
      <!-- AI Style / Template Selector -->
      <div class="w-72">
        <Select v-model="selectedTemplate">
          <SelectTrigger class="w-full bg-white border-slate-200">
             <div class="flex items-center gap-2 text-slate-700">
                <LayoutTemplate class="w-4 h-4 text-slate-500" />
                <SelectValue placeholder="Select template" />
             </div>
             <!-- Purple bolt badge inside select -->
             <div class="ml-auto bg-purple-100 text-purple-600 rounded p-0.5">
                 <Sparkles class="w-3 h-3 fill-current" />
             </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Standard GP Consultation Note">Standard GP Consultation Note</SelectItem>
            <SelectItem value="Psychiatric Evaluation">Psychiatric Evaluation</SelectItem>
            <SelectItem value="SOAP Note">SOAP Note</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Custom Button with Popover -->
      <Popover v-model:open="showCustomPanel">
         <PopoverTrigger as-child>
            <Button 
               variant="outline" 
               class="gap-2 h-10 text-slate-700 border-slate-200 hover:bg-slate-50"
               :class="{'bg-slate-100': showCustomPanel}"
            >
               <PenTool class="w-4 h-4" />
               Custom
            </Button>
         </PopoverTrigger>
         <PopoverContent class="w-96 p-6" align="start">
            <!-- Scribe Section -->
            <div class="mb-6">
               <div class="flex items-center gap-2 mb-3">
                  <h3 class="text-sm font-semibold text-slate-900">Scribe</h3>
                  <button class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 text-xs">
                     ?
                  </button>
               </div>
               
               <div class="grid grid-cols-2 gap-3">
                  <!-- Standard Option -->
                  <button 
                     @click="scribeMode = 'Standard'"
                     class="p-3 rounded-lg border-2 text-left transition-all"
                     :class="scribeMode === 'Standard' ? 'border-slate-900 bg-white' : 'border-slate-200 bg-white hover:border-slate-300'"
                  >
                     <div class="flex items-center gap-2 mb-1">
                        <PenTool class="w-3.5 h-3.5 text-slate-700" />
                        <span class="font-semibold text-xs">Standard</span>
                     </div>
                     <p class="text-[10px] text-slate-500 leading-tight">A simple writer - good for most sessions.</p>
                  </button>
                  
                  <!-- Extended Option -->
                  <button 
                     @click="scribeMode = 'Extended'"
                     class="p-3 rounded-lg border-2 text-left transition-all"
                     :class="scribeMode === 'Extended' ? 'border-slate-900 bg-white' : 'border-slate-200 bg-white hover:border-slate-300'"
                  >
                     <div class="flex items-center gap-2 mb-1">
                        <PenTool class="w-3.5 h-3.5 text-slate-700" />
                        <span class="font-semibold text-xs">Extended</span>
                        <Sparkles class="w-3 h-3 text-purple-600 fill-current" />
                     </div>
                     <p class="text-[10px] text-slate-500 leading-tight">Thoughtful with precise recall. Good for complex sessions.</p>
                  </button>
               </div>
            </div>
            
            <!-- Voice Section -->
            <div class="mb-6">
               <h3 class="text-sm font-semibold text-slate-900 mb-3">Voice</h3>
               <select 
                  v-model="voiceOption"
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
               >
                  <option value="Custom">Custom</option>
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
               </select>
            </div>
            
            <!-- Detail Slider -->
            <div class="mb-6">
               <h3 class="text-sm font-semibold text-slate-900 mb-3">Detail</h3>
               <div class="space-y-2">
                  <input 
                     v-model="detailLevel"
                     type="range" 
                     min="0" 
                     max="100" 
                     class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                  <div class="flex justify-between text-xs text-slate-500">
                     <span>Low</span>
                     <span>Medium</span>
                     <span>High</span>
                  </div>
               </div>
            </div>
            
            <!-- Toggles -->
            <div class="space-y-3">
               <!-- Bullet Points -->
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-900">Bullet points</span>
                  <button 
                     @click="useBulletPoints = !useBulletPoints"
                     class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                     :class="useBulletPoints ? 'bg-slate-900' : 'bg-slate-200'"
                  >
                     <span 
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                        :class="useBulletPoints ? 'translate-x-6' : 'translate-x-1'"
                     ></span>
                  </button>
               </div>
               
               <!-- Quotes -->
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-900">Quotes</span>
                  <button 
                     @click="useQuotes = !useQuotes"
                     class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                     :class="useQuotes ? 'bg-slate-900' : 'bg-slate-200'"
                  >
                     <span 
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                        :class="useQuotes ? 'translate-x-6' : 'translate-x-1'"
                     ></span>
                  </button>
               </div>
               
               <!-- Abbreviations -->
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-900">Abbreviations</span>
                  <button 
                     @click="useAbbreviations = !useAbbreviations"
                     class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                     :class="useAbbreviations ? 'bg-slate-900' : 'bg-slate-200'"
                  >
                     <span 
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                        :class="useAbbreviations ? 'translate-x-6' : 'translate-x-1'"
                     ></span>
                  </button>
               </div>
            </div>
         </PopoverContent>
      </Popover>

      <!-- More Actions -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon" class="h-10 w-10 text-slate-500 border-slate-200 hover:bg-slate-50">
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="w-56">
                <DropdownMenuItem class="cursor-pointer">
                    Copy all text
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    Send as email
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    Print
                </DropdownMenuItem>
                
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger class="cursor-pointer">Export as</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem class="cursor-pointer">PDF</DropdownMenuItem>
                            <DropdownMenuItem class="cursor-pointer">Word (.docx)</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem class="cursor-pointer">
                    Set as default template
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    Save as new template
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    View / edit template
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem class="cursor-pointer justify-between">
                    Regenerate output
                    <DropdownMenuShortcut>⌘ O</DropdownMenuShortcut>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem class="cursor-pointer">
                    Copy session ID
                </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Divider -->
      <div class="w-px h-6 bg-slate-200 mx-1"></div>

      <!-- Editor Actions Group -->
      <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1">
         <Button variant="ghost" size="icon" class="h-8 w-8 text-slate-500 hover:bg-slate-100 hover:text-slate-900" @click="toggleRecording" :class="{'text-red-500 bg-red-50 hover:bg-red-100': isRecording}">
            <Mic class="w-4 h-4" />
         </Button>
         <Button variant="ghost" size="icon" class="h-8 w-8 text-slate-400 hover:bg-slate-100 hover:text-slate-900">
            <RotateCcw class="w-4 h-4" />
         </Button>
         <Button variant="ghost" size="icon" class="h-8 w-8 text-slate-400 hover:bg-slate-100 hover:text-slate-900">
            <RotateCw class="w-4 h-4" />
         </Button>
         
         <div class="w-px h-4 bg-slate-200 mx-1"></div>
         
         <DropdownMenu>
            <DropdownMenuTrigger as-child>
                 <button class="flex items-center gap-1 px-2 py-1 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded outline-none">
                    <span>Copy</span>
                    <ChevronDown class="w-3 h-3" />
                 </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
                <DropdownMenuItem class="cursor-pointer">
                    Copy all text
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    Send as email
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    Print
                </DropdownMenuItem>
                
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger class="cursor-pointer">Export as</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem class="cursor-pointer">PDF</DropdownMenuItem>
                            <DropdownMenuItem class="cursor-pointer">Word (.docx)</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem class="cursor-pointer">
                    Save as new template
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                    View / edit template
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem class="cursor-pointer justify-between">
                    Regenerate output
                    <DropdownMenuShortcut>⌘ O</DropdownMenuShortcut>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem class="cursor-pointer">
                    Copy session ID
                </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>

    </div>

    <!-- Main Content Area -->
    <div class="flex-1 overflow-y-auto relative">
        <!-- Empty State (Start Session) -->
        <div v-if="!hasStarted" class="h-full flex flex-col items-center justify-center p-8 text-center pb-4">
             <!-- Arrow SVG (Stylized) -->
             <div class="absolute top-20 right-32 hidden xl:block opacity-40">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" class="text-slate-400 -rotate-12">
                     <path d="M20,80 Q50,20 80,10" stroke-width="2" marker-end="url(#arrowhead)" />
                     <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" />
                        </marker>
                     </defs>
                </svg>
             </div>

             <h3 class="text-xl font-bold text-slate-900 mb-2">Start this session using the header</h3>
             <p class="text-slate-500 mb-8">Your note will appear here once your session is complete</p>

            <!-- Card Visual -->
             <div class="bg-slate-50 border border-slate-100 rounded-xl p-6 w-full max-w-sm shadow-sm select-none pointer-events-none opacity-80 backdrop-blur-sm">
                <div class="bg-green-600 text-white rounded-lg py-2 px-4 text-sm font-semibold flex justify-between items-center mb-4">
                    <span>Start transcribing</span>
                    <ChevronDown class="w-4 h-4" />
                </div>
                <div class="space-y-3 pl-2">
                    <div class="flex justify-between items-center text-sm font-medium text-slate-800">
                        <span>Transcribing</span>
                        <div class="w-2 h-2 rounded-full bg-slate-900"></div>
                    </div>
                     <div class="flex justify-between items-center text-sm text-slate-500">
                        <span>Dictating</span>
                    </div>
                     <div class="flex justify-between items-center text-sm text-slate-500">
                        <span>Upload session audio</span>
                        <div class="border border-slate-300 rounded p-0.5">
                            <ArrowUp class="w-3 h-3" />
                        </div>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-6 text-center">Select your visit mode in the dropdown</p>
             </div>
        </div>

        <!-- Editor (When Started) -->
        <div v-else class="p-8 h-full">
             <textarea 
                v-model="notes"
                class="w-full h-full resize-none outline-none text-base leading-relaxed text-slate-800 placeholder:text-slate-400 bg-transparent"
                placeholder="Start typing your notes here..."
             ></textarea>
        </div>
    </div>

    <!-- Bottom Buttons (Absolute) -->
    <div class="absolute bottom-6 left-6 z-10">
         <div class="flex items-center gap-3">
             <Button variant="outline" size="icon" class="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 bg-white shadow-sm">
                <User class="w-5 h-5" />
             </Button>
             <Button variant="outline" size="icon" class="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 bg-white shadow-sm">
                 <Paperclip class="w-5 h-5" />
             </Button>
         </div>
    </div>
  </div>
</template>
