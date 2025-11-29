<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MoreVertical,
  Plus
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useAppStore()
const { sessions } = storeToRefs(store)

const activeTab = ref('overview')
const clientId = route.params.id as string

const client = computed(() => {
  return store.getClientById(clientId) || {
    id: '',
    name: 'Unknown Client',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    status: 'Active',
    tags: []
  }
})

const history = computed(() => {
  return sessions.value
    .filter(s => s.clientId === clientId)
    .map(s => ({
      id: s.id,
      date: new Date(s.start).toLocaleDateString(),
      type: s.title,
      duration: '50 min', // Should calc
      status: s.status
    }))
})

const notes = [
  { id: 1, date: 'Oct 10, 2025', title: 'Session 3 Notes', preview: 'Patient reported improved sleep patterns...' },
  { id: 2, date: 'Oct 03, 2025', title: 'Session 2 Notes', preview: 'Discussed workplace stressors...' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <RouterLink to="/app/clients" class="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
        <ArrowLeft class="w-5 h-5" />
      </RouterLink>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-slate-900">{{ client.name }}</h1>
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <span class="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">{{ client.status }}</span>
          <span>•</span>
          <span>Client since Sep 2025</span>
        </div>
      </div>
      <Button variant="outline">Edit Profile</Button>
      <Button>
        <Plus class="w-4 h-4 mr-2" />
        New Session
      </Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sidebar Info -->
      <div class="space-y-6">
        <Card>
          <div class="flex flex-col items-center text-center mb-6">
            <img :src="client.avatar" :alt="client.name" class="w-24 h-24 rounded-full bg-slate-100 mb-4" />
            <h2 class="text-lg font-semibold text-slate-900">{{ client.name }}</h2>
            <!-- <p class="text-sm text-slate-500">Next Session: {{ client.nextSession }}</p> -->
          </div>
          
          <div class="space-y-4 border-t border-slate-100 pt-4">
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <Mail class="w-4 h-4 text-slate-400" />
              {{ client.email }}
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <Phone class="w-4 h-4 text-slate-400" />
              {{ client.phone }}
            </div>
            <!-- Address not in store yet
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <MapPin class="w-4 h-4 text-slate-400" />
              {{ client.address }}
            </div>
            -->
          </div>

          <!-- Tags not in store yet
          <div class="mt-6 pt-4 border-t border-slate-100">
            <h3 class="text-sm font-medium text-slate-900 mb-2">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in client.tags" 
                :key="tag"
                class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          -->
        </Card>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Tabs -->
        <div class="border-b border-slate-200">
          <nav class="flex gap-6">
            <button 
              @click="activeTab = 'overview'"
              class="pb-4 text-sm font-medium border-b-2 transition-colors"
              :class="activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
            >
              Overview
            </button>
            <button 
              @click="activeTab = 'notes'"
              class="pb-4 text-sm font-medium border-b-2 transition-colors"
              :class="activeTab === 'notes' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
            >
              Clinical Notes
            </button>
            <button 
              @click="activeTab = 'files'"
              class="pb-4 text-sm font-medium border-b-2 transition-colors"
              :class="activeTab === 'files' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
            >
              Files
            </button>
          </nav>
        </div>

        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <Card title="Recent History">
            <div class="space-y-4">
              <div 
                v-for="session in history" 
                :key="session.id"
                class="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div class="flex items-center gap-4">
                  <div class="p-2 bg-white rounded-lg border border-slate-200 text-primary-600">
                    <Calendar class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="font-medium text-slate-900">{{ session.type }}</h4>
                    <p class="text-sm text-slate-500">{{ session.date }} • {{ session.duration }}</p>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  {{ session.status }}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-slate-900">Session Notes</h3>
            <Button size="sm" variant="outline">Add Note</Button>
          </div>
          <div class="space-y-4">
            <Card v-for="note in notes" :key="note.id">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="font-medium text-slate-900">{{ note.title }}</h4>
                  <p class="text-xs text-slate-500">{{ note.date }}</p>
                </div>
                <button class="text-slate-400 hover:text-slate-600">
                  <MoreVertical class="w-4 h-4" />
                </button>
              </div>
              <p class="text-sm text-slate-600">{{ note.preview }}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
