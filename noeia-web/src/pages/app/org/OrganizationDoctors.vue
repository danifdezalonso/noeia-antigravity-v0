<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Plus, MoreHorizontal, Mail, Phone, X, User } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

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
    description: 'Cognitive Behavioral Therapy specialist.'
  },
])

// Filters
const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedType = ref('')

const specialties = ['Clinical Psychologist', 'Child Psychologist', 'Couples Therapist', 'CBT Specialist']
const types = ['Manager', 'Doctor']

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          doctor.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSpecialty = !selectedSpecialty.value || doctor.specialty === selectedSpecialty.value
    const matchesType = !selectedType.value || doctor.type === selectedType.value
    
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

function openAddModal() {
  isEditing.value = false
  currentDoctor.value = {
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
  }
  isModalOpen.value = true
}

function openEditModal(doctor: any) {
  isEditing.value = true
  currentDoctor.value = { ...doctor }
  isModalOpen.value = true
}

function saveDoctor() {
  if (isEditing.value) {
    const index = doctors.value.findIndex(d => d.id === currentDoctor.value.id)
    if (index !== -1) {
      doctors.value[index] = { ...currentDoctor.value }
    }
  } else {
    doctors.value.push({
      ...currentDoctor.value,
      id: doctors.value.length + 1,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    })
  }
  isModalOpen.value = false
}

function toggleStatus(doctor: any) {
  doctor.status = doctor.status === 'Active' ? 'Inactive' : 'Active'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Doctors</h1>
        <p class="text-slate-500">Manage your organization's professionals.</p>
      </div>
      <Button @click="openAddModal">
        <Plus class="w-4 h-4 mr-2" />
        Add Doctor
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name or email..." 
          class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex gap-4">
        <select 
          v-model="selectedSpecialty"
          class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Specialties</option>
          <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
        </select>
        <select 
          v-model="selectedType"
          class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Types</option>
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
    </div>

    <!-- List -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-4 font-semibold text-slate-700">Professional</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Specialty</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Contact</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th class="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="doctor in filteredDoctors" :key="doctor.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="doctor.avatar" :alt="doctor.name" class="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <div class="font-medium text-slate-900">{{ doctor.name }}</div>
                    <div class="text-xs text-slate-500">{{ doctor.category }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600">{{ doctor.specialty }}</td>
              <td class="px-6 py-4">
                <span 
                  class="px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="doctor.type === 'Manager' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                >
                  {{ doctor.type }}
                </span>
              </td>
              <td class="px-6 py-4 text-slate-600">
                <div class="flex flex-col gap-1 text-xs">
                  <div class="flex items-center gap-1"><Mail class="w-3 h-3" /> {{ doctor.email }}</div>
                  <div class="flex items-center gap-1"><Phone class="w-3 h-3" /> {{ doctor.phone }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <button 
                  @click="toggleStatus(doctor)"
                  class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
                  :class="doctor.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                >
                  {{ doctor.status }}
                </button>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openEditModal(doctor)" class="text-slate-400 hover:text-primary-600 transition-colors">
                  <MoreHorizontal class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredDoctors.length === 0" class="p-8 text-center text-slate-500">
        No doctors found matching your filters.
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-semibold text-lg text-slate-900">{{ isEditing ? 'Edit Doctor' : 'Add New Doctor' }}</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <User class="w-8 h-8" />
            </div>
            <button class="text-sm text-primary-600 font-medium hover:text-primary-700">Upload Photo</button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input v-model="currentDoctor.name" type="text" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
            
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input v-model="currentDoctor.email" type="email" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input v-model="currentDoctor.phone" type="tel" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select v-model="currentDoctor.category" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                <option value="Psychologist">Psychologist</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </select>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Specialty</label>
              <select v-model="currentDoctor.specialty" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                <option value="" disabled>Select Specialty</option>
                <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
              </select>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="currentDoctor.type" value="Doctor" class="text-primary-600 focus:ring-primary-500">
                  <span class="text-sm text-slate-700">Doctor</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="currentDoctor.type" value="Manager" class="text-primary-600 focus:ring-primary-500">
                  <span class="text-sm text-slate-700">Manager</span>
                </label>
              </div>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea v-model="currentDoctor.description" rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button @click="isModalOpen = false" class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Cancel</button>
          <Button @click="saveDoctor">Save Doctor</Button>
        </div>
      </div>
    </div>
  </div>
</template>
