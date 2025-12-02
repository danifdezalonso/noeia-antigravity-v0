<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Command, Calendar, Users, FileText, ArrowRight, UserPlus, CalendarPlus } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useAppStore()
const { clients, enrichedSessions, invoices } = storeToRefs(store)

const isOpen = ref(false)
const searchQuery = ref('')
const activeTab = ref('All')

const tabs = ['All', 'Sessions', 'Clients', 'Invoices']

// --- Search Logic ---

const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return []

  const results: any[] = []

  // 1. Clients
  if (activeTab.value === 'All' || activeTab.value === 'Clients') {
    const matchedClients = clients.value.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.email.toLowerCase().includes(query)
    ).slice(0, 5) // Limit to 5

    matchedClients.forEach(c => {
      results.push({
        id: c.id,
        type: 'Client',
        title: c.name,
        subtitle: c.email,
        icon: Users,
        data: c
      })
    })
  }

  // 2. Sessions
  if (activeTab.value === 'All' || activeTab.value === 'Sessions') {
    const matchedSessions = enrichedSessions.value.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.clientName.toLowerCase().includes(query)
    ).slice(0, 5)

    matchedSessions.forEach(s => {
      results.push({
        id: s.id,
        type: 'Session',
        title: s.title,
        subtitle: `${new Date(s.start).toLocaleDateString()} • ${s.clientName}`,
        icon: Calendar,
        data: s
      })
    })
  }

  // 3. Invoices
  if (activeTab.value === 'All' || activeTab.value === 'Invoices') {
    const matchedInvoices = invoices.value.filter(i => 
      (i.displayId && i.displayId.toLowerCase().includes(query)) ||
      i.id.toLowerCase().includes(query)
    ).slice(0, 5)

    matchedInvoices.forEach(i => {
      results.push({
        id: i.id,
        type: 'Invoice',
        title: i.displayId || 'Invoice',
        subtitle: `${new Date(i.date).toLocaleDateString()} • €${i.total}`,
        icon: FileText,
        data: i
      })
    })
  }

  return results
})

// --- Navigation ---

function handleSelect(result: any) {
  isOpen.value = false
  searchQuery.value = ''
  
  if (result.type === 'Client') {
    router.push(`/app/doctor/patients/${result.id}`)
  } else if (result.type === 'Session') {
    // Navigate to calendar and focus date (simplified for now to just go to calendar)
    // Ideally we'd pass a query param ?date=...
    const date = new Date(result.data.start)
    router.push({ path: '/app/doctor/calendar', query: { date: date.toISOString() } })
  } else if (result.type === 'Invoice') {
    router.push('/app/doctor/billing')
  }
}

function handleCreate(type: 'Client' | 'Session') {
  isOpen.value = false
  if (type === 'Client') {
    router.push(`/app/doctor/patients?action=create`)
  } else if (type === 'Session') {
    router.push('/app/doctor/calendar?action=create')
  }
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
    // Focus input on open
    if (isOpen.value) {
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement
        if (input) input.focus()
      }, 100)
    }
  }
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div>
    <!-- Trigger -->
    <button 
      @click="isOpen = true"
      class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md text-sm text-slate-500 transition-all w-64 group"
    >
      <Search class="w-4 h-4 group-hover:text-slate-700 transition-colors" />
      <span class="group-hover:text-slate-900 transition-colors">Search...</span>
      <div class="ml-auto flex items-center gap-1 text-xs text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
        <Command class="w-3 h-3" />
        <span>K</span>
      </div>
    </button>

    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="isOpen = false"></div>

      <!-- Content -->
      <div class="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh] animate-in fade-in zoom-in-95 duration-200">
        <!-- Search Input -->
        <div class="flex items-center px-4 py-3 border-b border-slate-100 gap-3">
          <Search class="w-5 h-5 text-slate-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search for sessions, clients, invoices..." 
            class="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          <button @click="isOpen = false" class="px-2 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded hover:bg-slate-200">
            ESC
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex items-center px-2 py-2 border-b border-slate-100 gap-1 overflow-x-auto">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="activeTab = tab"
            class="px-3 py-1 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
            :class="activeTab === tab ? 'bg-primary-50 text-primary-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Results -->
        <div class="flex-1 overflow-y-auto p-2">
          <div v-if="searchQuery" class="space-y-1">
            <div v-if="filteredResults.length > 0">
              <div class="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Results</div>
              <button 
                v-for="result in filteredResults" 
                :key="result.id"
                @click="handleSelect(result)"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors text-left"
              >
                <div class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-primary-200 group-hover:text-primary-600 transition-colors">
                  <component :is="result.icon" class="w-4 h-4 text-slate-500 group-hover:text-primary-600" />
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium text-slate-900 group-hover:text-primary-700">{{ result.title }}</div>
                  <div class="text-xs text-slate-500">{{ result.subtitle }}</div>
                </div>
                <ArrowRight class="w-4 h-4 text-slate-300 group-hover:text-primary-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
            
            <!-- Create Actions (Always visible when searching) -->
            <div class="pt-2 mt-2 border-t border-slate-100">
               <div class="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Quick Actions</div>
               <button @click="handleCreate('Client')" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors text-left">
                  <div class="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shadow-sm">
                    <UserPlus class="w-4 h-4 text-primary-600" />
                  </div>
                  <span class="text-sm font-medium text-slate-700 group-hover:text-primary-700">Create new Client "{{ searchQuery }}"</span>
               </button>
               <button @click="handleCreate('Session')" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors text-left">
                  <div class="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shadow-sm">
                    <CalendarPlus class="w-4 h-4 text-primary-600" />
                  </div>
                  <span class="text-sm font-medium text-slate-700 group-hover:text-primary-700">Schedule Session for "{{ searchQuery }}"</span>
               </button>
            </div>

            <div v-if="filteredResults.length === 0" class="py-8 text-center text-slate-400">
              <p class="text-sm">No results found for "{{ searchQuery }}"</p>
            </div>
          </div>

          <div v-else class="py-12 text-center text-slate-400">
            <Search class="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p class="text-sm">Type to search across your workspace</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <div class="flex gap-4">
            <span><kbd class="font-sans bg-white border border-slate-200 rounded px-1">↑</kbd> <kbd class="font-sans bg-white border border-slate-200 rounded px-1">↓</kbd> to navigate</span>
            <span><kbd class="font-sans bg-white border border-slate-200 rounded px-1">↵</kbd> to select</span>
          </div>
          <div>
            Search powered by Noeia
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
