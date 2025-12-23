<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { User, Trash2, Clock, ChevronDown, Mic, Calendar, LayoutList, PenLine, Ear, MoveUp as Upload, Check, RotateCw, Command as CommandIcon, ArrowUp, Zap, Languages } from 'lucide-vue-next'
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
import Button from '@/components/ui/Button.vue'
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
const tabs = ref<{id: string, label: string, icon: any}[]>([
    { id: 'Context', label: 'Context', icon: LayoutList },
    { id: 'Notes', label: 'Audit C', icon: PenLine }
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

// Title Editing State
const isEditingTitle = ref(false)
const editingTitleValue = ref('')
const titleInput = ref<HTMLInputElement | null>(null)

// --- Actions ---

function startTranscription() {
    if (isTranscribing.value) return
    isTranscribing.value = true
    
    // Simulate API delay
    setTimeout(() => {
        const text = "Patient reports experiencing mild headaches since last Tuesday. Pain is localized to the frontal region and is described as throbbing. Severity is 4/10."
        sessionContextText.value = sessionContextText.value ? sessionContextText.value + "\n\n" + text : text
        isTranscribing.value = false
    }, 2000)
}

function addNewTab() {
    // For demo purposes, we will just add a generic "New Note" tab
    const newId = `note-${tabs.value.length + 1}`
    tabs.value.push({
        id: newId,
        label: 'New Note',
        icon: PenLine
    })
    activeMainTab.value = newId
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
                        <div class="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 bg-white">
                             <RotateCw class="w-4 h-4" />
                        </div>
                        
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
                    <div class="flex items-center gap-4 text-sm pl-11">
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

                <!-- Right Side: Split Button + Timer (Vertical Stack) -->
                <div class="flex flex-col items-end gap-1.5 pt-0.5">
                        <!-- Primary Split Action -->
                    <div class="flex items-center shadow-sm rounded-lg overflow-hidden">
                        <button 
                            @click="startTranscription"
                            :disabled="isTranscribing"
                            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            <div v-if="isTranscribing" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <Ear v-else class="w-4 h-4" />
                            <span>{{ isTranscribing ? 'Listening...' : 'Transcribe' }}</span>
                        </button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <button class="bg-green-600 hover:bg-green-700 text-white px-2 py-2 border-l border-green-700 transition-colors h-full flex items-center justify-center">
                                   <ChevronDown class="w-4 h-4" />
                                </button>
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
                    </div>

                    <!-- Timer Row (Small) -->
                    <div class="flex items-center gap-3 text-slate-500 mt-1">
                            <!-- Timer -->
                        <div class="flex items-center gap-1.5">
                            <Clock class="w-3.5 h-3.5" />
                            <span class="text-xs font-medium font-mono">00:00</span>
                        </div>
                        
                            <!-- Visualizer -->
                        <div class="flex items-center gap-1">
                                <Mic class="w-3.5 h-3.5" />
                                <div class="flex gap-0.5 h-2.5 items-center px-1">
                                <div class="w-1 bg-green-500 h-1 rounded-full"></div>
                                <div class="w-1 bg-green-500 h-2 rounded-full"></div>
                                <div class="w-1 bg-green-500 h-1.5 rounded-full"></div>
                                <div class="w-1 bg-green-500 h-2.5 rounded-full"></div>
                                <div class="w-1 bg-green-500 h-1 rounded-full"></div>
                            </div>
                                <ChevronDown class="w-3 h-3 text-slate-300" />
                        </div>
                    </div>
                </div>
            </div>


            <!-- Browser Tabs -->
            <div class="flex items-end gap-2 px-2 mt-6">
                 <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeMainTab = tab.id"
                    class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl transition-all border-t border-x border-b-0 relative top-[1px] z-10"
                    :class="activeMainTab === tab.id ? 'bg-white border-slate-200 text-slate-900 border-b-white' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'"
                >
                    <component :is="tab.icon" class="w-4 h-4" :class="tab.id === 'Context' ? 'text-rose-500' : 'text-slate-500'" />
                    {{ tab.label }}
                </button>
                
                <button 
                    @click="addNewTab"
                    class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-200 text-slate-700 transition-colors mb-1"
                >
                    <Plus class="w-4 h-4" />
                </button>
            </div>
          </div>

          <!-- Tab Content Area (White Card) -->
          <div class="flex-1 min-h-0 overflow-hidden pb-4 px-4">
             <!-- Added rounded-tl-none if first tab is active to look connected? 
                  Actually standard browser tabs style usually has the content box fully rounded except where the tab connects.
                  For simplicity, `border rounded-xl rounded-tl-none` (if first tab active) is complex. 
                  Just `rounded-xl` but `rounded-tl-none` is a nice touch if consistent. 
                  Let's stick to `rounded-xl` but maybe `rounded-tl-none` if the first one is active.
             -->
            <div 
                class="w-full h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-0"
                :class="{'rounded-tl-none': activeMainTab === tabs[0]?.id}"
            >
                 <SessionContextTab v-if="activeMainTab === 'Context'" v-model="sessionContextText" />
                 <SessionNotesTab v-else :key="activeMainTab" />
            </div>
          </div>
          
          <ProTrialModal v-model:open="isProTrialModalOpen" />

          <!-- Global Footer (Ask Noe + Warning + Tutorials) -->
          <div class="sticky bottom-0 shrink-0 pb-4 flex flex-col gap-3 px-4 z-50 bg-slate-50">
             <!-- Ask Noe Bar -->
             <!-- Ask Noe Bar (Global) -->
             <div class="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
                <div class="w-8 h-8 rounded-full border border-slate-500 flex items-center justify-center shrink-0">
                   <CommandIcon class="w-4 h-4 text-slate-700" />
                </div>
                <input 
                    type="text" 
                    placeholder="Ask Noe to do anything..." 
                    class="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-500 text-sm font-medium"
                />
                <Button variant="ghost" size="icon" class="text-slate-400 hover:text-slate-600">
                    <Mic class="w-4 h-4" />
                </Button>
                <Button size="icon" class="bg-slate-300 text-white h-8 w-8 hover:bg-slate-400 rounded-lg">
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
           <Button variant="danger" @click="confirmDelete">Delete session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
