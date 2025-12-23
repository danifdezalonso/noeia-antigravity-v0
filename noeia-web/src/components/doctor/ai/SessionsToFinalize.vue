<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { User, Trash2, Clock, ChevronDown, Mic, Calendar, LayoutList, PenLine, Ear, MoveUp as Upload, Check, Command as CommandIcon, ArrowUp, Zap, Languages, Plus, Pencil, X } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import SessionContextTab from './tabs/SessionContextTab.vue'
import SessionNotesTab from './tabs/SessionNotesTab.vue'
import ProTrialModal from '@/components/doctor/modals/ProTrialModal.vue'

// --- Mock Data Generation ---
// Helper to get dates relative to today
const getRelativeDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

// Scheduled Sessions (Future)
const scheduledSessions = ref([
  { 
    id: 's1', 
    clientName: 'Maddy Test', 
    date: getRelativeDate(0), // Today
    status: 'Scheduled',
    time: '4:25pm'
  },
  { 
    id: 's2', 
    clientName: 'Maddy Test', 
    date: getRelativeDate(1), // Tomorrow
    status: 'Scheduled',
    time: '2:00pm'
  },
  { 
    id: 's3', 
    clientName: 'John Doe', 
    date: getRelativeDate(3), 
    status: 'Scheduled',
    time: '10:00am'
  }
])

// Past Sessions (History)
const pastSessions = ref([
  { 
    id: 'p1', 
    clientName: 'Maddy Test', 
    date: getRelativeDate(-2), 
    status: 'Completed',
    time: '1:44pm' 
  },
  { 
    id: 'p2', 
    clientName: 'Maddy Test', 
    date: getRelativeDate(-2), 
    status: 'Completed',
    time: '1:24pm'
  },
  { 
    id: 'p3', 
    clientName: 'Sarah Smith', 
    date: getRelativeDate(-5), 
    status: 'Draft',
    time: '11:00am'
  }
])

// --- State ---
const sidebarTab = ref<'Schedule' | 'Past'>('Schedule')
const selectedSessionId = ref<string | null>(scheduledSessions.value[0]?.id || null)
const activeMainTab = ref<string>('Context')

// Get current date in format like "Dec 23"
const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const tabs = ref<{id: string, label: string, icon: any, editable?: boolean}[]>([
    { id: 'Context', label: 'Context', icon: LayoutList, editable: false },
    { id: 'Notes', label: `Session ${currentDate}`, icon: PenLine, editable: false }
])
const isDeleteDialogOpen = ref(false)
const inputLanguage = ref('English')
const outputLanguage = ref('English')
const isLanguageOpen = ref(false)
const isDateOpen = ref(false)
const isPatientSearchOpen = ref(false)
const isProTrialModalOpen = ref(false)
const isTranscribing = ref(false)
const sessionContextText = ref('')

// AI Interaction State
const aiQuery = ref('')
const aiResponse = ref('')
const isAiResponding = ref(false)
const showAiResponse = ref(false)

// Tasks Panel State
const showTasks = ref(false)
const tasks = ref([
    { id: 1, text: 'Generate summary of hospital stay and tests for patient', completed: false, type: 'document' },
    { id: 2, text: 'Schedule follow-up appointment in 2 weeks', completed: false, type: 'calendar' },
    { id: 3, text: 'Order blood work: CBC, CMP, lipid panel', completed: false, type: 'lab' },
    { id: 4, text: 'Send prescription for ibuprofen 400mg to pharmacy', completed: false, type: 'prescription' },
])

// Title Editing State
const isEditingTitle = ref(false)
const editingTitleValue = ref('')
const titleInput = ref<HTMLInputElement | null>(null)

// Tab Editing State
const editingTabId = ref<string | null>(null)
const editingTabValue = ref('')
const tabInput = ref<HTMLInputElement | null>(null)

// Finish Session Modal State
const isFinishSessionModalOpen = ref(false)

// --- Actions ---

function startTranscription() {
    if (isTranscribing.value) return
    isTranscribing.value = true
    showTasks.value = true // Show tasks panel
    
    // Simulate API delay
    setTimeout(() => {
        const text = "Patient reports experiencing mild headaches since last Tuesday. Pain is localized to the frontal region and is described as throbbing. Severity is 4/10."
        sessionContextText.value = sessionContextText.value ? sessionContextText.value + "\n\n" + text : text
        isTranscribing.value = false
    }, 2000)
}

function addNewTab() {
    const newId = `note-${Date.now()}`
    const newDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    tabs.value.push({
        id: newId,
        label: `New Note ${newDate}`,
        icon: PenLine,
        editable: true
    })
    activeMainTab.value = newId
}

function startEditingTab(tabId: string) {
    const tab = tabs.value.find(t => t.id === tabId)
    if (tab && tab.editable) {
        editingTabId.value = tabId
        editingTabValue.value = tab.label
        setTimeout(() => {
            tabInput.value?.focus()
            tabInput.value?.select() // Select all text
        }, 0)
    }
}

function saveTabName() {
    if (editingTabId.value && editingTabValue.value.trim()) {
        const tab = tabs.value.find(t => t.id === editingTabId.value)
        if (tab) {
            tab.label = editingTabValue.value.trim()
        }
    }
    editingTabId.value = null
    editingTabValue.value = ''
}

function cancelTabEdit() {
    editingTabId.value = null
    editingTabValue.value = ''
}

function closeTab(tabId: string) {
    const tabIndex = tabs.value.findIndex(t => t.id === tabId)
    if (tabIndex === -1) return
    
    // Don't allow closing Context or Notes tabs
    const tab = tabs.value[tabIndex]
    if (!tab || tab.id === 'Context' || tab.id === 'Notes') return
    
    // If closing the active tab, switch to another tab
    if (activeMainTab.value === tabId) {
        // Switch to the previous tab, or the next one if it's the first
        const newIndex = tabIndex > 0 ? tabIndex - 1 : Math.min(tabIndex + 1, tabs.value.length - 2)
        const newTab = tabs.value[newIndex]
        if (newTab) {
            activeMainTab.value = newTab.id
        }
    }
    
    // Remove the tab
    tabs.value.splice(tabIndex, 1)
}

function handleAiQuery() {
    if (!aiQuery.value.trim() || isAiResponding.value) return
    
    isAiResponding.value = true
    showAiResponse.value = true
    aiResponse.value = ''
    
    // Mock AI response with realistic medical content
    const mockResponse = `## Clinical Assessment Summary

Based on the patient's reported symptoms and medical history, here is a comprehensive analysis:

### Primary Findings

The patient presents with recurrent frontal headaches characterized by throbbing pain with a severity rating of 4/10. The temporal pattern suggests a possible tension-type headache, though further evaluation is warranted.

**Key Observations:**
- Pain localization: Frontal region (bilateral)
- Duration: Ongoing since last Tuesday (approximately 5 days)
- Character: Throbbing, consistent with vascular component
- Severity: Moderate (4/10 on pain scale)
- No reported aura or visual disturbances

### Differential Diagnosis

1. **Tension-Type Headache (Primary consideration)**
   - Most common headache type
   - Consistent with bilateral frontal presentation
   - Typically responds well to NSAIDs and stress management

2. **Migraine without Aura (Secondary consideration)**
   - Throbbing quality suggests possible vascular component
   - Would benefit from migraine-specific prophylaxis if recurrent

3. **Medication Overuse Headache (Rule out)**
   - Important to assess current analgesic use
   - Can perpetuate chronic headache patterns

### Recommended Management Plan

**Immediate interventions:**
- Trial of NSAIDs (ibuprofen 400mg PRN, max 1200mg/day)
- Encourage adequate hydration (2-3L daily)
- Sleep hygiene optimization (7-9 hours nightly)
- Stress reduction techniques

**Follow-up considerations:**
- Headache diary for 2 weeks to identify triggers
- Re-evaluate in 14 days if symptoms persist
- Consider neuroimaging if red flags develop

### Patient Education Points

It's important to discuss with the patient the benign nature of tension-type headaches while emphasizing the importance of lifestyle modifications. Reassure them that serious pathology is unlikely given the presentation, but maintain vigilance for warning signs.

*Note: This assessment is based on limited information. A comprehensive physical examination and detailed history would provide additional diagnostic clarity.*`
    
    // Simulate typing effect
    let index = 0
    const typingInterval = setInterval(() => {
        if (index < mockResponse.length) {
            aiResponse.value += mockResponse[index]
            index++
        } else {
            clearInterval(typingInterval)
            isAiResponding.value = false
        }
    }, 10) // Fast typing for demo
    
    // Clear the input
    aiQuery.value = ''
}

function formatMarkdown(text: string): string {
    if (!text) return ''
    
    return text
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
        // Line breaks
        .replace(/\n/g, '<br/>')
}

function getSelectedSession() {
    const all = [...scheduledSessions.value, ...pastSessions.value]
    return all.find(s => s.id === selectedSessionId.value)
}

function startEditingTitle() {
    const session = getSelectedSession()
    if (!session) return
    editingTitleValue.value = session.clientName
    isEditingTitle.value = true
    nextTick(() => {
        titleInput.value?.focus()
    })
}

function saveTitle() {
    const session = getSelectedSession()
    if (session && editingTitleValue.value.trim()) {
        session.clientName = editingTitleValue.value.trim()
    }
    isEditingTitle.value = false
}

function handleTitleBlur() {
    setTimeout(() => { 
        if(!isPatientSearchOpen.value) saveTitle() 
    }, 200)
}

function handleDeleteClick() {
    isDeleteDialogOpen.value = true
}

function confirmDelete() {
    const id = selectedSessionId.value
    // Remove from list
    scheduledSessions.value = scheduledSessions.value.filter(s => s.id !== id)
    pastSessions.value = pastSessions.value.filter(s => s.id !== id)
    
    // Select next or null
    const allRemaining = [...scheduledSessions.value, ...pastSessions.value]
    if (allRemaining.length > 0) {
        selectedSessionId.value = allRemaining[0]?.id || null
    } else {
            selectedSessionId.value = null
    }
    isDeleteDialogOpen.value = false
}

// --- computed ---

// Combine date + time for display
const formatDateTime = (date: Date, time: string) => {
    // Basic format: DD/MM/YYYY Time
    return `${date.toLocaleDateString('en-GB')} ${time}`
}

// Group sessions by date header
const groupedSessions = computed(() => {
    const list = sidebarTab.value === 'Schedule' ? scheduledSessions.value : pastSessions.value
    const groups: Record<string, typeof list> = {}

    list.forEach(session => {
        const d = new Date(session.date)
        const today = new Date()
        let key = ''
        
        // Simple check for "Today"
        if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
            key = 'Today'
        } else {
             // DD/MM/YYYY
            key = d.toLocaleDateString('en-GB')
        }

        if (!groups[key]) {
            groups[key] = []
        }
        groups[key]!.push(session)
    })

    return groups
})
</script>

<template>
  <div class="h-full flex">
    <!-- Sidebar -->
    <div class="w-[203px] bg-white border-r border-slate-200 flex flex-col shrink-0 font-sans">


      <!-- Sidebar Tabs (Underline Style) -->
      <div class="flex w-full border-b border-slate-200">
        <button 
            @click="sidebarTab = 'Schedule'"
            class="flex-1 pb-2 pt-3 text-[12px] font-semibold transition-colors border-b-2 text-center"
            :class="sidebarTab === 'Schedule' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'"
        >
            Schedule
        </button>
        <button 
            @click="sidebarTab = 'Past'"
            class="flex-1 pb-2 pt-3 text-[12px] font-semibold transition-colors border-b-2 text-center"
            :class="sidebarTab === 'Past' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'"
        >
            Past
        </button>
      </div>
      
      <!-- Session List (Grouped) -->
      <div class="flex-1 overflow-y-auto p-4 space-y-6">
        <div v-for="(sessions, dateGroup) in groupedSessions" :key="dateGroup">
            <!-- Date Header -->
            <h3 class="text-xs font-semibold text-slate-500 mb-2 sticky top-0 bg-white py-1 z-10">{{ dateGroup }}</h3>
                         <!-- Items in Group -->
            <div class="space-y-1">
                 <button
                    v-for="session in sessions"
                    :key="session.id"
                    @click="selectedSessionId = session.id"
                    class="w-full text-left p-2 rounded-lg transition-all group flex items-start gap-3 border border-transparent"
                    :class="selectedSessionId === session.id ? 'bg-[#EAEFF8] border-[#EAEFF8]' : 'hover:bg-slate-50'"
                >
                    <!-- Icon -->
                    <div class="mt-0.5 shrink-0">
                         <div 
                            class="w-4 h-4 rounded-full border flex items-center justify-center"
                            :class="selectedSessionId === session.id ? 'border-[#211217] text-[#211217]' : 'border-[#755760] text-[#755760]'"
                         >
                            <User class="w-2.5 h-2.5" />
                         </div>
                    </div>
                    
                    <!-- Text -->
                    <div>
                        <div 
                            class="text-[12px] leading-[16.5px] font-medium transition-colors"
                            :class="selectedSessionId === session.id ? 'text-[#211217]' : 'text-[#755760]'"
                        >
                            {{ session.clientName || 'Untitled session' }}
                        </div>
                        <div 
                            class="text-[10px] leading-[13.8px] mt-0.5 transition-colors"
                            :class="selectedSessionId === session.id ? 'text-[#211217]' : 'text-[#9A858B]'"
                        >
                            {{ session.time }}
                            <span v-if="!session.clientName" class="block">
                                {{ formatDateTime(session.date, '') }}
                            </span>
                        </div>
                    </div>
                </button>
            </div>
        </div>
      </div>


    </div>

    <!-- Main Panel -->
    <div class="flex-1 flex flex-col bg-slate-50 items-center">
        <div class="w-full h-full flex flex-col">
          <div class="sticky top-0 bg-slate-50 pt-4 px-4 z-50">
            <!-- New Header -->
            <div class="bg-transparent flex justify-between items-start shrink-0">
                <!-- Left Column: Title + Meta -->
                <div class="flex flex-col gap-1.5">
                    <!-- Title Row -->
                    <div class="flex items-center gap-3">
                        
                        <!-- Inline Editing Title / Patient Search -->
                        <div v-if="isEditingTitle" class="flex items-center relative">
                             <Popover v-model:open="isPatientSearchOpen">
                                <PopoverTrigger as-child>
                                    <div class="relative w-[300px]">
                                         <input 
                                            ref="titleInput"
                                            v-model="editingTitleValue"
                                            @blur="handleTitleBlur"
                                            @keyup.enter="saveTitle"
                                            @focus="isPatientSearchOpen = true"
                                            class="w-full text-[20px] font-bold text-slate-900 border-b border-primary-500 outline-none bg-transparent py-1"
                                            placeholder="Search patients..."
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent class="w-[300px] p-0" align="start" :side-offset="8">
                                    <Command>
                                        <CommandList>
                                            <CommandItem value="new" @select="saveTitle" class="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-slate-50 border-b border-slate-100">
                                                <div class="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0">
                                                    <span class="text-xs text-slate-600">+</span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <span class="text-sm font-medium text-slate-700">Create new patient '{{ editingTitleValue }}'</span>
                                                </div>
                                            </CommandItem>
                                            
                                            <CommandGroup heading="Suggested">
                                                <div class="px-4 py-2 text-sm text-slate-500 italic">No suggested patients found</div>
                                            </CommandGroup>
                                            
                                            <CommandSeparator />

                                            <CommandGroup heading="All patients">
                                                 <CommandItem value="p1" class="px-4 py-2 text-sm cursor-pointer" @select="editingTitleValue = 'Maddy Test'; saveTitle()">
                                                    Maddy Test
                                                 </CommandItem>
                                                  <CommandItem value="p2" class="px-4 py-2 text-sm cursor-pointer" @select="editingTitleValue = 'John Doe'; saveTitle()">
                                                    John Doe
                                                 </CommandItem>
                                                  <CommandItem value="p3" class="px-4 py-2 text-sm cursor-pointer" @select="editingTitleValue = 'Sarah Smith'; saveTitle()">
                                                    Sarah Smith
                                                 </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <h2 
                            v-else 
                            class="text-[20px] font-bold text-slate-900 cursor-pointer hover:underline decoration-slate-300 underline-offset-4"
                            @click="startEditingTitle"
                        >
                            {{ editingTitleValue || 'Add patient details' }}
                        </h2>
                        
                        <button class="text-slate-400 hover:text-red-600 transition-colors ml-2" @click="handleDeleteClick">
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Meta Row -->
                    <div class="flex items-center gap-4 text-sm">
                        <!-- Date Popover -->
                        <Popover v-model:open="isDateOpen">
                            <PopoverTrigger as-child>
                                <button 
                                    class="flex items-center gap-2 text-slate-600 px-2 py-1 rounded-md transition-colors"
                                    :class="isDateOpen ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-100'"
                                >
                                    <Calendar class="w-4 h-4 text-slate-400" :class="{'text-indigo-500': isDateOpen}" />
                                    <span>Today 01:54AM</span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-4" align="start">
                                <div class="flex flex-col gap-4">
                                    <div>
                                        <h3 class="text-sm font-semibold text-slate-900 mb-2">Session start time</h3>
                                        <div class="relative">
                                            <input type="time" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" value="01:54" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-semibold text-slate-900 mb-2">Session date</h3>
                                        <CalendarComponent class="rounded-md border shadow-sm" />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <!-- Language Popover -->
                        <Popover v-model:open="isLanguageOpen">
                            <PopoverTrigger as-child>
                                <button 
                                    class="flex items-center gap-2 text-slate-600 px-2 py-1 rounded-md transition-colors"
                                    :class="isLanguageOpen ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-100'"
                                >
                                    <Languages class="w-4 h-4 text-slate-400" :class="{'text-indigo-500': isLanguageOpen}" />
                                    <span>{{ inputLanguage }}</span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent class="w-[320px] p-5" align="start">
                                <h3 class="font-bold text-base mb-4 text-slate-900">Language settings</h3>
                                
                                <div class="space-y-4">
                                    <div class="space-y-2">
                                        <label class="text-sm font-bold text-slate-900 block">Input language</label>
                                        <div class="text-xs text-slate-500 mb-2">Used for transcripts, dictations and uploaded recordings.</div>
                                        <Select v-model="inputLanguage">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="English">English</SelectItem>
                                                <SelectItem value="Spanish">Spanish</SelectItem>
                                                <SelectItem value="French">French</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div class="space-y-2">
                                        <label class="text-sm font-bold text-slate-900 block">Output language</label>
                                        <div class="text-xs text-slate-500 mb-2">Used for notes and documents.</div>
                                        <Select v-model="outputLanguage">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="English">English</SelectItem>
                                                <SelectItem value="Spanish">Spanish</SelectItem>
                                                <SelectItem value="French">French</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        
                        <!-- Custom Gradient Badge -->
                        <button 
                            @click="isProTrialModalOpen = true"
                            class="px-3 py-0.5 rounded-md bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm ml-2 hover:bg-indigo-600 transition-colors"
                        >
                            <Zap class="w-3 h-3 fill-current" />
                            14 days
                        </button>
                    </div>
                </div>

                <!-- Right Side: Action Buttons (Horizontal) -->
                <div class="flex items-center gap-3">
                    <!-- Transcribe Button (Secondary with Dropdown) -->
                    <ButtonGroup variant="outline">
                        <Button 
                            @click="startTranscription"
                            :disabled="isTranscribing"
                            variant="outline"
                        >
                            <div v-if="isTranscribing" class="animate-spin w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full mr-2"></div>
                            <Ear v-else class="w-4 h-4 mr-2" />
                            <span>{{ isTranscribing ? 'Listening...' : 'Transcribe' }}</span>
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="outline">
                                   <ChevronDown class="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                 <DropdownMenuItem class="flex items-center justify-between cursor-pointer" @click="startTranscription">
                                    Transcribe
                                    <Check class="w-4 h-4 text-green-600" />
                                 </DropdownMenuItem>
                                 <DropdownMenuItem class="cursor-pointer">
                                    Dictate
                                 </DropdownMenuItem>
                                 <DropdownMenuItem class="cursor-pointer">
                                    Telehealth
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem class="justify-between cursor-pointer">
                                    Upload session audio
                                    <Upload class="w-3.5 h-3.5 text-slate-400" />
                                 </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ButtonGroup>
                    
                    <!-- Finish Session Button (Primary) -->
                    <Button 
                        @click="isFinishSessionModalOpen = true"
                        class="shadow-sm"
                    >
                        <Check class="w-4 h-4 mr-2" />
                        <span>Finish Session</span>
                    </Button>
                </div>
            </div>


            <!-- Browser Tabs -->
            <div class="flex items-end gap-2 px-2 mt-6">
                 <div
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="relative group"
                 >
                    <!-- Editable Tab (when editing) -->
                    <div
                       v-if="editingTabId === tab.id"
                       class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl border-t border-x border-b-0 relative top-[1px] z-10 bg-white border-slate-200"
                    >
                       <input
                          ref="tabInput"
                          v-model="editingTabValue"
                          @blur="saveTabName"
                          @keyup.enter="saveTabName"
                          @keyup.esc="cancelTabEdit"
                          class="bg-transparent border-none outline-none text-slate-900 min-w-[100px]"
                       />
                    </div>
                    
                    <!-- Normal Tab (when not editing) -->
                    <button
                       v-else
                       @click="activeMainTab = tab.id"
                       class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl transition-all border-t border-x border-b-0 relative top-[1px] z-10 min-w-fit"
                       :class="activeMainTab === tab.id ? 'bg-white border-slate-200 text-slate-900 border-b-white' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'"
                    >
                        <!-- Show icon only for non-editable tabs -->
                        <component v-if="!tab.editable" :is="tab.icon" class="w-4 h-4" :class="tab.id === 'Context' ? 'text-rose-500' : 'text-slate-500'" />
                        
                        <span>{{ tab.label }}</span>
                        
                        <!-- Pencil icon for editable tabs -->
                        <button
                           v-if="tab.editable"
                           @click.stop="startEditingTab(tab.id)"
                           class="p-0.5 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                           title="Edit tab name"
                        >
                           <Pencil class="w-3 h-3 text-slate-400" />
                        </button>
                        
                        <!-- X button for editable tabs -->
                        <button
                           v-if="tab.editable"
                           @click.stop="closeTab(tab.id)"
                           class="ml-1 p-0.5 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                           title="Close tab"
                        >
                           <X class="w-3 h-3 text-slate-500" />
                        </button>
                    </button>
                 </div>
                
                <button 
                    @click="addNewTab"
                    class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-200 text-slate-700 transition-colors mb-1"
                >
                    <Plus class="w-4 h-4" />
                </button>
            </div>
          </div>

          <!-- Tab Content Area (White Card) -->
          <div class="flex-1 min-h-0 overflow-hidden pb-4 px-4 flex gap-4">
             <div 
                 class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-0"
                 :class="[
                    {'rounded-tl-none': activeMainTab === tabs[0]?.id},
                    showTasks ? 'flex-1' : 'w-full h-full'
                 ]"
             >
                  <SessionContextTab v-if="activeMainTab === 'Context'" v-model="sessionContextText" />
                  <SessionNotesTab v-else :key="activeMainTab" />
             </div>
             
             <!-- Tasks Panel (Side by Side) -->
             <div v-if="showTasks" class="w-96 bg-white rounded-xl shadow-lg border border-slate-200 shrink-0 flex flex-col">
                <div class="p-4 border-b border-slate-200 flex items-center justify-between shrink-0">
                   <div class="flex items-center gap-2">
                      <h3 class="text-sm font-semibold text-slate-900">Tasks</h3>
                      <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">Beta</span>
                   </div>
                   <button @click="showTasks = false" class="text-slate-400 hover:text-slate-600 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                   </button>
                </div>
                
                <div class="p-4 space-y-3 overflow-y-auto flex-1">
                   <div v-for="task in tasks" :key="task.id" class="flex items-start gap-3 group">
                      <input 
                         type="checkbox" 
                         v-model="task.completed"
                         class="mt-1 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <div class="flex-1">
                         <p class="text-sm text-slate-700" :class="{'line-through text-slate-400': task.completed}">
                            {{ task.text }}
                         </p>
                         <div class="flex items-center gap-2 mt-1">
                            <span v-if="task.type === 'document'" class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                               <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                               </svg>
                               Document
                            </span>
                            <span v-if="task.type === 'calendar'" class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                               <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                               </svg>
                               Calendar
                            </span>
                            <span v-if="task.type === 'lab'" class="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded">
                               <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
                               </svg>
                               Lab
                            </span>
                            <span v-if="task.type === 'prescription'" class="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded">
                               <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                               </svg>
                               Prescription
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      New task
                   </button>
                </div>
             </div>
          </div>
          
          <ProTrialModal v-model:open="isProTrialModalOpen" />
          
          <!-- Global Footer (Ask Noe + Warning + Tutorials) -->
          <div class="sticky bottom-0 shrink-0 pb-4 flex flex-col gap-3 px-4 z-50 bg-slate-50">
             <!-- AI Response Section -->
             <div v-if="showAiResponse" class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-h-96 overflow-y-auto">
                <div class="prose prose-sm max-w-none">
                   <div v-if="isAiResponding && !aiResponse" class="flex items-center gap-2 text-slate-500">
                      <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span class="text-sm">Noe is thinking...</span>
                   </div>
                   <div v-else class="text-slate-700 whitespace-pre-wrap" v-html="formatMarkdown(aiResponse)"></div>
                </div>
             </div>
             
             <!-- Ask Noe Bar -->
             <!-- Ask Noe Bar (Global) -->
             <div class="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
                <div class="w-8 h-8 rounded-full border border-slate-500 flex items-center justify-center shrink-0">
                   <CommandIcon class="w-4 h-4 text-slate-700" />
                </div>
                <input 
                    v-model="aiQuery"
                    @keyup.enter="handleAiQuery"
                    type="text" 
                    placeholder="Ask Noe to do anything..." 
                    class="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-500 text-sm font-medium"
                />
                <Button variant="ghost" size="icon" class="text-slate-400 hover:text-slate-600">
                    <Mic class="w-4 h-4" />
                </Button>
                <Button 
                    @click="handleAiQuery"
                    :disabled="!aiQuery.trim() || isAiResponding"
                    size="icon" 
                    class="h-8 w-8 rounded-lg transition-colors"
                    :class="aiQuery.trim() && !isAiResponding ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-slate-300 text-white cursor-not-allowed'"
                >
                    <ArrowUp class="w-4 h-4" />
                </Button>
             </div>
          </div>
        </div>
    </div>
  <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent class="sm:max-w-[425px] p-6">
        <DialogHeader class="mb-4">
          <DialogTitle class="text-xl font-bold text-slate-900">Are you sure you want to delete this session?</DialogTitle>
          <DialogDescription class="text-slate-600">
            This will permanently delete all transcripts, notes and documents associated with this session.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="flex gap-3 sm:justify-end">
           <Button variant="secondary" @click="isDeleteDialogOpen = false">Cancel</Button>
           <Button variant="destructive" @click="confirmDelete">Delete session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    <!-- Finish Session Modal -->
    <Dialog v-model:open="isFinishSessionModalOpen">
      <DialogContent class="sm:max-w-[600px] p-6">
        <DialogHeader class="mb-4">
          <DialogTitle class="text-xl font-bold text-slate-900">Finish Session</DialogTitle>
          <DialogDescription class="text-slate-600">
            Review and complete the session details before finalizing.
          </DialogDescription>
        </DialogHeader>
        
        <div class="space-y-4">
          <p class="text-sm text-slate-600">
            Session completion features will be added here. This includes:
          </p>
          <ul class="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
            <li>Session summary review</li>
            <li>Billing information</li>
            <li>Follow-up tasks</li>
            <li>Documentation completion</li>
          </ul>
        </div>
        
        <DialogFooter class="flex gap-3 sm:justify-end mt-6">
          <Button variant="secondary" @click="isFinishSessionModalOpen = false">Cancel</Button>
          <Button class="bg-blue-500 hover:bg-blue-600" @click="isFinishSessionModalOpen = false">Complete Session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
