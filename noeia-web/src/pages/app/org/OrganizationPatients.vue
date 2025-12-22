<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { Search, MoreHorizontal, Calendar, User, Clock, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Mock Data
const patients = ref([
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    assignedDoctor: 'Dr. Anna Ruiz', 
    status: 'Active', 
    lastSession: '2023-10-25',
    nextSession: '2023-11-02',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    initials: 'SJ'
  },
  { 
    id: 2, 
    name: 'Michael Brown', 
    assignedDoctor: 'Dr. Marc Vidal', 
    status: 'Active', 
    lastSession: '2023-10-20',
    nextSession: '2023-11-05',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    initials: 'MB'
  },
  { 
    id: 3, 
    name: 'Emma Wilson', 
    assignedDoctor: 'Dr. Júlia Serra', 
    status: 'On Hold', 
    lastSession: '2023-09-15',
    nextSession: '-',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    initials: 'EW'
  },
  { 
    id: 4, 
    name: 'David Lee', 
    assignedDoctor: 'Dr. Omar López', 
    status: 'Active', 
    lastSession: '2023-10-28',
    nextSession: '2023-11-04',
    avatar: 'https://i.pravatar.cc/150?u=david',
    initials: 'DL'
  },
  { 
    id: 5, 
    name: 'Laura P.', 
    assignedDoctor: 'Dr. Anna Ruiz', 
    status: 'Active', 
    lastSession: '2023-10-22',
    nextSession: '2023-10-30',
    avatar: 'https://i.pravatar.cc/150?u=laura',
    initials: 'LP'
  },
  { 
    id: 6, 
    name: 'Hugo G.', 
    assignedDoctor: 'Dr. Marc Vidal', 
    status: 'Inactive', 
    lastSession: '2023-08-10',
    nextSession: '-',
    avatar: 'https://i.pravatar.cc/150?u=hugo',
    initials: 'HG'
  },
])

// Filters
const searchQuery = ref('')
const selectedDoctor = ref('all')
const selectedStatus = ref('all')

const doctors = ['Dr. Anna Ruiz', 'Dr. Marc Vidal', 'Dr. Júlia Serra', 'Dr. Omar López']
const statuses = ['Active', 'On Hold', 'Inactive']

const filteredPatients = computed(() => {
  return patients.value.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDoctor = selectedDoctor.value === 'all' || patient.assignedDoctor === selectedDoctor.value
    const matchesStatus = selectedStatus.value === 'all' || patient.status === selectedStatus.value
    
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
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      initials: 'NP'
    }
    patients.value.push(newPatient)
  })
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Patients</h1>
        <p class="text-muted-foreground">View and manage patient records across the organization.</p>
      </div>
      <Button @click="openAddModal">
        <Plus class="w-4 h-4 mr-2" />
        Add Patient
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search patients..." 
          class="pl-9"
        />
      </div>
      <div class="flex gap-4">
        <Select v-model="selectedDoctor">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="All Doctors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            <SelectItem v-for="doc in doctors" :key="doc" :value="doc">{{ doc }}</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="selectedStatus">
          <SelectTrigger class="w-[150px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem v-for="status in statuses" :key="status" :value="status">{{ status }}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- List -->
    <div class="rounded-md border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Assigned Doctor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Session</TableHead>
            <TableHead>Next Session</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="patient in filteredPatients" :key="patient.id" class="cursor-pointer hover:bg-accent/50">
            <TableCell>
              <div class="flex items-center gap-3">
                <Avatar>
                  <AvatarImage :src="patient.avatar" :alt="patient.name" />
                  <AvatarFallback>{{ patient.initials }}</AvatarFallback>
                </Avatar>
                <span class="font-medium">{{ patient.name }}</span>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-2 text-muted-foreground">
                <User class="w-3 h-3" />
                {{ patient.assignedDoctor }}
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                :variant="patient.status === 'Active' ? 'default' : patient.status === 'On Hold' ? 'secondary' : 'outline'"
                :class="{
                  'bg-green-100 text-green-700 hover:bg-green-100': patient.status === 'Active',
                  'bg-orange-100 text-orange-700 hover:bg-orange-100': patient.status === 'On Hold',
                  'text-muted-foreground': patient.status === 'Inactive'
                }"
              >
                {{ patient.status }}
              </Badge>
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-2 text-muted-foreground">
                <Clock class="w-3 h-3" />
                {{ formatDate(patient.lastSession) }}
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-2 text-muted-foreground">
                <Calendar class="w-3 h-3" />
                {{ formatDate(patient.nextSession) }}
              </div>
            </TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                  <DropdownMenuItem class="text-red-600">Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow v-if="filteredPatients.length === 0">
            <TableCell colspan="6" class="h-24 text-center text-muted-foreground">
              No patients found matching your filters.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
