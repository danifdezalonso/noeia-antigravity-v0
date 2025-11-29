<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import { Users, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, Clock } from 'lucide-vue-next'
import CompleteSessionModal from '@/components/CompleteSessionModal.vue'

import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { enrichedSessions, clients, enrichedInvoices } = storeToRefs(store)

const isCompleteModalOpen = ref(false)
const selectedSession = ref<any>(null)

const stats = computed(() => [
  { title: 'Total Clients', value: clients.value.length.toString(), trend: '+12%', trendUp: true, icon: Users },
  { title: 'Upcoming Sessions', value: upcomingSessions.value.length.toString(), trend: 'Today', trendUp: true, icon: Calendar },
  { title: 'Monthly Revenue', value: `€${enrichedInvoices.value.reduce((acc, inv) => acc + inv.total, 0)}`, trend: '+8%', trendUp: true, icon: TrendingUp },
])

const upcomingSessions = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return enrichedSessions.value
    .filter(s => new Date(s.start).toDateString() === today.toDateString() && s.status !== 'Completed')
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .map(s => ({
      id: s.id,
      clientName: s.clientName,
      start: s.start,
      type: s.type,
      status: s.status
    }))
})

const pendingSessions = computed(() => {
  return enrichedSessions.value
    .filter(s => s.status === 'Completed' && !s.invoiceId)
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()) // Most recent first
    .map(s => ({
      id: s.id,
      clientName: s.clientName,
      start: s.start,
      type: s.type,
      status: s.status,
      clientId: s.clientId,
      professionalId: s.professionalId,
      fee: s.fee,
      title: s.title
    }))
})

const notes = ref([
  { id: 1, text: 'Remember to send intake forms to Michael', date: 'Today' },
  { id: 2, text: 'Update session notes for Sarah', date: 'Yesterday' },
])

const newNote = ref('')

function addNote() {
  if (!newNote.value.trim()) return
  notes.value.unshift({
    id: Date.now(),
    text: newNote.value,
    date: 'Just now'
  })
  newNote.value = ''
}

function openCompleteModal(session: any) {
  selectedSession.value = session
  isCompleteModalOpen.value = true
}

async function handleCompleteSession(data: any) {
  if (selectedSession.value) {
    await store.completeSession(selectedSession.value.id, data.notes, data.fee)
    // Handle next session booking if requested (will implement in store or here)
    if (data.bookNext && data.nextDate) {
       await store.addSession({
        title: selectedSession.value.title,
        clientId: selectedSession.value.clientId,
        professionalId: selectedSession.value.professionalId,
        start: data.nextDate.toISOString(),
        end: new Date(data.nextDate.getTime() + 60 * 60 * 1000).toISOString(), // Default 1h
        status: 'Confirmed',
        fee: selectedSession.value.fee,
        type: 'Session'
      } as any)
    }
    isCompleteModalOpen.value = false
    selectedSession.value = null
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p class="text-slate-500">Welcome back, here's what's happening today.</p>
      </div>
      <Button>
        <Plus class="w-4 h-4 mr-2" />
        New Session
      </Button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-slate-50 rounded-lg">
            <component :is="stat.icon" class="w-5 h-5 text-slate-600" />
          </div>
          <span 
            class="flex items-center text-xs font-medium px-2 py-1 rounded-full"
            :class="stat.trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
          >
            <component :is="stat.trendUp ? ArrowUpRight : ArrowDownRight" class="w-3 h-3 mr-1" />
            {{ stat.trend }}
          </span>
        </div>
        <h3 class="text-slate-500 text-sm font-medium">{{ stat.title }}</h3>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Pending Sessions -->
      <div class="lg:col-span-2">
        <Card title="Sessions to Finalize" :description="`${pendingSessions.length} pending`">
          <div v-if="pendingSessions.length === 0" class="text-center py-8 text-slate-500 text-sm">
            All caught up! No pending sessions.
          </div>
          <div v-else class="space-y-4">
            <div v-for="session in pendingSessions" :key="session.id" class="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                  {{ session.clientName.split(' ').map((n: string) => n[0]).join('') }}
                </div>
                <div>
                  <h4 class="text-sm font-medium text-slate-900">{{ session.clientName }}</h4>
                  <div class="flex items-center text-xs text-slate-500 mt-0.5">
                    <Calendar class="w-3 h-3 mr-1" />
                    {{ new Date(session.start).toLocaleDateString() }}
                    <span class="mx-1">•</span>
                    <Clock class="w-3 h-3 mr-1" />
                    {{ new Date(session.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                  </div>
                </div>
              </div>
              <button 
                @click="openCompleteModal(session)"
                class="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              >
                Finalize
              </button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Quick Notes -->
      <div>
        <Card title="Quick Notes" description="Scratchpad for your thoughts">
          <div class="space-y-4">
            <div class="flex gap-2">
              <input 
                v-model="newNote"
                @keyup.enter="addNote"
                type="text" 
                placeholder="Add a note..." 
                class="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
              <Button size="sm" @click="addNote">Add</Button>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="note in notes" 
                :key="note.id"
                class="p-3 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-900"
              >
                <p>{{ note.text }}</p>
                <p class="text-xs text-yellow-700 mt-2 text-right">{{ note.date }}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <CompleteSessionModal
      :is-open="isCompleteModalOpen"
      :session="selectedSession"
      @close="isCompleteModalOpen = false"
      @complete="handleCompleteSession"
    />
  </div>
</template>
