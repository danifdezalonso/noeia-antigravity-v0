<script setup lang="ts">
import { ref, computed } from 'vue'
import { MoreVertical, Plus, ChevronDown, Search, Filter, CheckCircle, FileText } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import CompleteSessionModal from '@/components/CompleteSessionModal.vue'
import CreateEventModal from '@/components/CreateEventModal.vue'
import SessionNotesModal from '@/components/SessionNotesModal.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { enrichedSessions } = storeToRefs(store)

const filter = ref('All')
const searchQuery = ref('')
const isCompleteModalOpen = ref(false)
const isCreateModalOpen = ref(false)
const isNotesModalOpen = ref(false)
const selectedSession = ref<any>(null)

const filteredSessions = computed(() => {
  return enrichedSessions.value.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          session.clientName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filter.value === 'All' || session.status === filter.value
    return matchesSearch && matchesStatus
  })
})

function openCompleteModal(session: any) {
  selectedSession.value = session
  isCompleteModalOpen.value = true
}

function openNotesModal(session: any) {
  selectedSession.value = session
  isNotesModalOpen.value = true
}

function handleCompleteSession(data: any) {
  store.completeSession(data.sessionId, data.notes, data.finalFee)
  // Optionally show a toast notification here
}

function handleSaveSession(eventData: any) {
  store.addSession({
    title: eventData.title,
    clientId: eventData.clientId,
    professionalId: eventData.professionalId,
    start: `${eventData.date}T${eventData.time}`,
    end: `${eventData.date}T${eventData.time}`, // Should calc duration
    status: 'Confirmed',
    fee: 100,
    type: eventData.type,
    notes: eventData.notes
  } as any)
}

function handleSaveNotes(data: any) {
  store.updateSessionNotes(data.sessionId, data.notes)
}

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Sessions</h1>
        <p class="text-slate-500">Manage your schedule and appointments.</p>
      </div>
      <Button @click="isCreateModalOpen = true">
        <Plus class="w-4 h-4 mr-2" />
        Schedule Session
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search sessions..." 
          class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex items-center gap-2">
        <Filter class="w-4 h-4 text-slate-400" />
        <select 
          v-model="filter"
          class="text-sm border-none bg-transparent focus:ring-0 text-slate-600 font-medium cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>

    <!-- Sessions Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Title
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Patient
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Start
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  End
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Status
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Notes
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Fee
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="session in filteredSessions" :key="session.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-medium text-slate-900">
                {{ session.title }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="session.clientAvatar" :alt="session.clientName" class="w-6 h-6 rounded-full bg-slate-100" />
                  <span class="font-medium text-slate-900">{{ session.clientName }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600">
                {{ formatDate(session.start) }} • {{ formatTime(session.start) }}
              </td>
              <td class="px-6 py-4 text-slate-600">
                {{ formatTime(session.end) }}
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': session.status === 'Confirmed',
                    'bg-amber-100 text-amber-700': session.status === 'Pending',
                    'bg-red-100 text-red-700': session.status === 'Cancelled',
                    'bg-blue-100 text-blue-700': session.status === 'Completed'
                  }"
                >
                  {{ session.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button 
                  @click="openNotesModal(session)"
                  class="flex items-center gap-1.5 text-sm font-medium transition-colors"
                  :class="session.notes ? 'text-primary-600 hover:text-primary-700' : 'text-slate-400 hover:text-slate-600'"
                >
                  <FileText class="w-4 h-4" />
                  {{ session.notes ? 'View Notes' : 'Add Note' }}
                </button>
              </td>
              <td class="px-6 py-4 font-medium text-slate-900">
                €{{ session.fee.toFixed(2) }}
              </td>
              <td class="px-6 py-4 text-right flex items-center justify-end gap-2">
                <Button 
                  v-if="session.status === 'Confirmed'" 
                  size="sm" 
                  variant="outline"
                  class="h-8 text-xs"
                  @click="openCompleteModal(session)"
                >
                  <CheckCircle class="w-3 h-3 mr-1" />
                  Complete
                </Button>
                <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                  <MoreVertical class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredSessions.length === 0" class="p-12 text-center">
        <h3 class="text-lg font-medium text-slate-900 mb-1">No sessions found</h3>
      </div>
    </div>

    <CompleteSessionModal 
      :is-open="isCompleteModalOpen"
      :session="selectedSession"
      @close="isCompleteModalOpen = false"
      @complete="handleCompleteSession"
    />

    <CreateEventModal 
      :is-open="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @save="handleSaveSession"
    />

    <SessionNotesModal 
      :is-open="isNotesModalOpen"
      :session="selectedSession"
      @close="isNotesModalOpen = false"
      @save="handleSaveNotes"
    />
  </div>
</template>
