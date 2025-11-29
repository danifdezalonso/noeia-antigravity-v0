<script setup lang="ts">
import { ref } from 'vue'
import StatCard from '@/components/ui/StatCard.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import { Users, Calendar, TrendingUp, MoreVertical, Plus } from 'lucide-vue-next'

const stats = [
  { title: 'Total Clients', value: '24', trend: '+12%', trendUp: true, icon: Users },
  { title: 'Upcoming Sessions', value: '8', trend: 'This Week', trendUp: true, icon: Calendar },
  { title: 'Monthly Revenue', value: '$3,240', trend: '+8%', trendUp: true, icon: TrendingUp },
]

const upcomingSessions = [
  { id: 1, client: 'Sarah Johnson', time: '10:00 AM', type: 'Therapy Session', status: 'Confirmed' },
  { id: 2, client: 'Michael Chen', time: '2:00 PM', type: 'Initial Consultation', status: 'Pending' },
  { id: 3, client: 'Emma Davis', time: '4:30 PM', type: 'Follow-up', status: 'Confirmed' },
]

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
      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        v-bind="stat"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Upcoming Sessions -->
      <div class="lg:col-span-2">
        <Card title="Upcoming Sessions" description="Your schedule for today">
          <div class="space-y-4">
            <div 
              v-for="session in upcomingSessions" 
              :key="session.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-primary-200 transition-colors group"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-600">
                  <span class="text-xs font-medium uppercase">{{ session.time.split(' ')[1] }}</span>
                  <span class="text-lg font-bold">{{ session.time.split(':')[0] }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-slate-900">{{ session.client }}</h4>
                  <p class="text-sm text-slate-500">{{ session.type }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span 
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="session.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
                >
                  {{ session.status }}
                </span>
                <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors">
                  <MoreVertical class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <template #footer>
            <Button variant="ghost" class="w-full text-sm">View Full Calendar</Button>
          </template>
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
  </div>
</template>
