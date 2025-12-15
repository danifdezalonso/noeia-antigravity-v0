<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { Search, Plus, MoreHorizontal, Mail, Phone, User } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import posthog from 'posthog-js'
import { useAuthStore } from '@/stores/auth'

// Mock Data
const doctors = ref([
  { 
    id: 1, 
    name: 'Dr. Anna Ruiz', 
    email: 'anna.ruiz@noeia.com', 
    phone: '+34 600 111 222',
    specialty: 'Clinical Psychologist', 
    category: 'Psychologist',
    type: 'Manager', 
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=anna',
    initials: 'AR',
    description: 'Specialized in anxiety and depression disorders with 10 years of experience.'
  },
  { 
    id: 2, 
    name: 'Dr. Marc Vidal', 
    email: 'marc.vidal@noeia.com', 
    phone: '+34 600 333 444',
    specialty: 'Child Psychologist', 
    category: 'Psychologist',
    type: 'Doctor', 
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=marc',
    initials: 'MV',
    description: 'Expert in child development and behavioral issues.'
  },
  { 
    id: 3, 
    name: 'Dr. Júlia Serra', 
    email: 'julia.serra@noeia.com', 
    phone: '+34 600 555 666',
    specialty: 'Couples Therapist', 
    category: 'Psychologist',
    type: 'Doctor', 
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=julia',
    initials: 'JS',
    description: 'Helping couples navigate relationship challenges.'
  },
  { 
    id: 4, 
    name: 'Dr. Omar López', 
    email: 'omar.lopez@noeia.com', 
    phone: '+34 600 777 888',
    specialty: 'CBT Specialist', 
    category: 'Psychologist',
    type: 'Doctor', 
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=omar',
    initials: 'OL',
    description: 'Cognitive Behavioral Therapy specialist.'
  },
])

// Filters
const searchQuery = ref('')
const selectedSpecialty = ref('all')
const selectedType = ref('all')

const specialties = ['Clinical Psychologist', 'Child Psychologist', 'Couples Therapist', 'CBT Specialist']
const types = ['Manager', 'Doctor']

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          doctor.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSpecialty = selectedSpecialty.value === 'all' || doctor.specialty === selectedSpecialty.value
    const matchesType = selectedType.value === 'all' || doctor.type === selectedType.value
    
    return matchesSearch && matchesSpecialty && matchesType
  })
})

// Modal
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentDoctor = ref({
  id: 0,
  name: '',
  email: '',
  phone: '',
  specialty: '',
  category: 'Psychologist',
  type: 'Doctor',
  status: 'Active',
  description: '',
  avatar: ''
})

const openAddDoctorModal = inject('openAddDoctorModal') as (callback?: (id: string) => void) => void

function openAddModal() {
  openAddDoctorModal((newDoctorId) => {
    console.log('Doctor created with ID:', newDoctorId)
    // Mock adding to list
    const newDoctor = {
      id: doctors.value.length + 1,
      name: 'New Doctor', // In a real app, we'd fetch the new doctor details
      email: 'doctor@example.com',
      phone: '',
      specialty: 'Psychologist',
      category: 'Psychologist',
      type: 'Doctor',
      status: 'Pending',
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      initials: 'ND',
      description: ''
    }
    doctors.value.push(newDoctor)
  })
}

function openEditModal(doctor: any) {
  isEditing.value = true
  currentDoctor.value = { ...doctor }
  isModalOpen.value = true
}

function saveDoctor() {
  const authStore = useAuthStore()
  
  if (isEditing.value) {
    const index = doctors.value.findIndex(d => d.id === currentDoctor.value.id)
    if (index !== -1) {
      doctors.value[index] = { 
        ...currentDoctor.value,
        initials: currentDoctor.value.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
      }
    }
  } else {
    // This path is technically handled by openAddModal now, but keeping for fallback
    const newDoctor = {
      ...currentDoctor.value,
      id: doctors.value.length + 1,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      initials: currentDoctor.value.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    }
    doctors.value.push(newDoctor)

    // Track Event
    console.log('About to capture doctor_added event')
    posthog.capture('doctor_added', {
      organization_id: authStore.user?.id, // Assuming current user is the org
      doctor_id: newDoctor.id,
      added_by: authStore.user?.id,
      user_type: 'organization'
    })
    console.log('Event captured: doctor_added')
  }
  isModalOpen.value = false
}

function toggleStatus(doctor: any) {
  doctor.status = doctor.status === 'Active' ? 'Inactive' : 'Active'
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Doctors</h1>
        <p class="text-muted-foreground">Manage your organization's professionals.</p>
      </div>
      <Button @click="openAddModal">
        <Plus class="w-4 h-4 mr-2" />
        Add Doctor
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name or email..." 
          class="pl-9"
        />
      </div>
      <div class="flex gap-4">
        <Select v-model="selectedSpecialty">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="selectedType">
          <SelectTrigger class="w-[150px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem v-for="type in types" :key="type" :value="type">{{ type }}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- List -->
    <div class="rounded-md border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Professional</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="doctor in filteredDoctors" :key="doctor.id">
            <TableCell>
              <div class="flex items-center gap-3">
                <Avatar>
                  <AvatarImage :src="doctor.avatar" :alt="doctor.name" />
                  <AvatarFallback>{{ doctor.initials }}</AvatarFallback>
                </Avatar>
                <div>
                  <div class="font-medium">{{ doctor.name }}</div>
                  <div class="text-xs text-muted-foreground">{{ doctor.category }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{{ doctor.specialty }}</TableCell>
            <TableCell>
              <Badge :variant="doctor.type === 'Manager' ? 'default' : 'secondary'">
                {{ doctor.type }}
              </Badge>
            </TableCell>
            <TableCell>
              <div class="flex flex-col gap-1 text-xs text-muted-foreground">
                <div class="flex items-center gap-1"><Mail class="w-3 h-3" /> {{ doctor.email }}</div>
                <div class="flex items-center gap-1"><Phone class="w-3 h-3" /> {{ doctor.phone }}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant="outline" 
                class="cursor-pointer hover:bg-accent"
                :class="doctor.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 'text-slate-500'"
                @click="toggleStatus(doctor)"
              >
                {{ doctor.status }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditModal(doctor)">Edit Details</DropdownMenuItem>
                  <DropdownMenuItem @click="toggleStatus(doctor)">
                    {{ doctor.status === 'Active' ? 'Deactivate' : 'Activate' }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow v-if="filteredDoctors.length === 0">
            <TableCell colspan="6" class="h-24 text-center text-muted-foreground">
              No doctors found matching your filters.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Edit Modal -->
    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Doctor' : 'Add New Doctor' }}</DialogTitle>
          <DialogDescription>
            Make changes to the doctor's profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div class="grid gap-4 py-4">
          <div class="flex items-center gap-4 mb-2">
            <Avatar class="h-16 w-16">
              <AvatarImage :src="currentDoctor.avatar" />
              <AvatarFallback><User class="h-8 w-8 text-muted-foreground" /></AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Upload Photo</Button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 space-y-2">
              <Label for="name">Full Name</Label>
              <Input id="name" v-model="currentDoctor.name" />
            </div>
            
            <div class="col-span-2 space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" v-model="currentDoctor.email" />
            </div>

            <div class="space-y-2">
              <Label for="phone">Phone</Label>
              <Input id="phone" type="tel" v-model="currentDoctor.phone" />
            </div>

            <div class="space-y-2">
              <Label for="category">Category</Label>
              <Select v-model="currentDoctor.category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Psychologist">Psychologist</SelectItem>
                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                  <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="col-span-2 space-y-2">
              <Label for="specialty">Specialty</Label>
              <Select v-model="currentDoctor.specialty">
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="col-span-2 space-y-2">
              <Label>Type</Label>
              <RadioGroup v-model="currentDoctor.type" class="flex gap-4">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="type-doctor" value="Doctor" />
                  <Label for="type-doctor" class="font-normal cursor-pointer">Doctor</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="type-manager" value="Manager" />
                  <Label for="type-manager" class="font-normal cursor-pointer">Manager</Label>
                </div>
              </RadioGroup>
            </div>

            <div class="col-span-2 space-y-2">
              <Label for="description">Description</Label>
              <Textarea id="description" v-model="currentDoctor.description" rows="3" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="isModalOpen = false">Cancel</Button>
          <Button @click="saveDoctor">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
