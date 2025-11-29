<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, Command, Calendar, Users, FileText, ArrowRight } from 'lucide-vue-next'

const isOpen = ref(false)
const searchQuery = ref('')
const activeTab = ref('All')

const tabs = ['All', 'Sessions', 'Clients', 'Invoices']

const mockResults = [
  { id: 1, type: 'Session', title: 'Therapy Session', subtitle: 'with Sarah Connor', icon: Calendar },
  { id: 2, type: 'Client', title: 'John Doe', subtitle: 'john@example.com', icon: Users },
  { id: 3, type: 'Invoice', title: 'INV-001', subtitle: '$150.00 - Pending', icon: FileText },
]

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
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
            <div class="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Top Results</div>
            <button 
              v-for="result in mockResults" 
              :key="result.id"
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
