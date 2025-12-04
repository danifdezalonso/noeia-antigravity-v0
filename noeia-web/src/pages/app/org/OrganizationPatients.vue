<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { Search, MoreHorizontal, Calendar, User, Clock, Plus } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Mock Data
const patients = ref([
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    assignedDoctor: 'Dr. Anna Ruiz', 
    status: 'Active', 
    lastSession: '2023-10-25',
    nextSession: '2023-11-02',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  { 
    id: 2, 
    name: 'Michael Brown', 
    assignedDoctor: 'Dr. Marc Vidal', 
    status: 'Active', 
    lastSession: '2023-10-20',
    nextSession: '2023-11-05',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  { 
    id: 3, 
    name: 'Emma Wilson', 
    assignedDoctor: 'Dr. Júlia Serra', 
    status: 'On Hold', 
    lastSession: '2023-09-15',
    nextSession: '-',
    avatar: 'https://i.pravatar.cc/150?u=emma'
  },
  { 
    id: 4, 
    name: 'David Lee', 
    assignedDoctor: 'Dr. Omar López', 
    status: 'Active', 
    lastSession: '2023-10-28',
    nextSession: '2023-11-04',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  { 
    id: 5, 
    name: 'Laura P.', 
    assignedDoctor: 'Dr. Anna Ruiz', 
    status: 'Active', 
    lastSession: '2023-10-22',
    nextSession: '2023-10-30',
    avatar: 'https://i.pravatar.cc/150?u=laura'
  },
  { 
    id: 6, 
    name: 'Hugo G.', 
    assignedDoctor: 'Dr. Marc Vidal', 
    status: 'Inactive', 
    lastSession: '2023-08-10',
    nextSession: '-',
    avatar: 'https://i.pravatar.cc/150?u=hugo'
  },
])

// Filters
const searchQuery = ref('')
const selectedDoctor = ref('')
const selectedStatus = ref('')

const doctors = ['Dr. Anna Ruiz', 'Dr. Marc Vidal', 'Dr. Júlia Serra', 'Dr. Omar López']
const statuses = ['Active', 'On Hold', 'Inactive']

const filteredPatients = computed(() => {
  return patients.value.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDoctor = !selectedDoctor.value || patient.assignedDoctor === selectedDoctor.value
    const matchesStatus = !selectedStatus.value || patient.status === selectedStatus.value
    
    return matchesSearch && matchesDoctor && matchesStatus
  })
})

function formatDate(dateStr: string) {
  if (dateStr === '-') return '-'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const openAddPatientModal = inject('openAddPatientModal') as (callback?: (id: string) => void) => void

function openAddModal() {
  openAddPatientModal((newPatientId) => {
    console.log('Patient created with ID:', newPatientId)
    // Mock adding to list
    const newPatient = {
      id: patients.value.length + 1,
      name: 'New Patient',
      assignedDoctor: 'Unassigned',
      status: 'Onboarding',
      lastSession: '-',
      nextSession: '-',
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    }
    patients.value.push(newPatient)
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Patients</h1>
        <p class="text-slate-500">View and manage patient records across the organization.</p>
      </div>
      <Button @click="openAddModal">
        <Plus class="w-4 h-4 mr-2" />
        Add Patient
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search patients..." 
          class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex gap-4">
        <select 
          v-model="selectedDoctor"
          class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Doctors</option>
          <option v-for="doc in doctors" :key="doc" :value="doc">{{ doc }}</option>
        </select>
        <select 
          v-model="selectedStatus"
          class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- List -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-4 font-semibold text-slate-700">Patient</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Assigned Doctor</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Last Session</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Next Session</th>
              <th class="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="patient in filteredPatients" :key="patient.id" class="hover:bg-slate-50 transition-colors cursor-pointer">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="patient.avatar" :alt="patient.name" class="w-8 h-8 rounded-full object-cover border border-slate-200" />
                  <span class="font-medium text-slate-900">{{ patient.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-slate-600">
                  <User class="w-3 h-3 text-slate-400" />
                  {{ patient.assignedDoctor }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': patient.status === 'Active',
                    'bg-orange-100 text-orange-700': patient.status === 'On Hold',
                    'bg-slate-100 text-slate-600': patient.status === 'Inactive'
                  }"
                >
                  {{ patient.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-slate-600">
                <div class="flex items-center gap-2">
                  <Clock class="w-3 h-3 text-slate-400" />
                  {{ formatDate(patient.lastSession) }}
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600">
                <div class="flex items-center gap-2">
                  <Calendar class="w-3 h-3 text-slate-400" />
                  {{ formatDate(patient.nextSession) }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-slate-400 hover:text-primary-600 transition-colors">
                  <MoreHorizontal class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredPatients.length === 0" class="p-8 text-center text-slate-500">
        No patients found matching your filters.
      </div>
    </div>
  </div>
</template>
