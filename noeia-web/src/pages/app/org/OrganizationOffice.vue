<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Plus, MapPin, Users, Edit2, Trash2, X } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Mock Data
const rooms = ref([
  { id: 1, number: '101', name: 'Consultation A', seats: 2, assignedTo: 'all', assignedDoctorIds: [] },
  { id: 2, number: '102', name: 'Consultation B', seats: 3, assignedTo: 'specific', assignedDoctorIds: [1, 2] },
  { id: 3, number: '201', name: 'Group Therapy Room', seats: 6, assignedTo: 'all', assignedDoctorIds: [] },
])

const doctors = [
  { id: 1, name: 'Dr. Anna Ruiz' },
  { id: 2, name: 'Dr. Marc Vidal' },
  { id: 3, name: 'Dr. Júlia Serra' },
  { id: 4, name: 'Dr. Omar López' },
]

// Filters
const searchQuery = ref('')

const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesSearch
  })
})

// Modal Logic
const isModalOpen = ref(false)
const editingRoom = ref<any>(null)
const form = ref({
  number: '',
  name: '',
  seats: 1,
  assignedTo: 'all', // 'all' | 'specific'
  assignedDoctorIds: [] as number[]
})

function openCreateModal() {
  editingRoom.value = null
  form.value = {
    number: '',
    name: '',
    seats: 1,
    assignedTo: 'all',
    assignedDoctorIds: []
  }
  isModalOpen.value = true
}

function openEditModal(room: any) {
  editingRoom.value = room
  form.value = {
    number: room.number,
    name: room.name,
    seats: room.seats || 1,
    assignedTo: room.assignedTo,
    assignedDoctorIds: [...room.assignedDoctorIds]
  }
  isModalOpen.value = true
}

function saveRoom() {
  if (!form.value.number) return // Basic validation

  if (editingRoom.value) {
    // Edit
    const index = rooms.value.findIndex(r => r.id === editingRoom.value.id)
    if (index !== -1) {
      rooms.value[index] = {
        ...editingRoom.value,
        ...form.value
      }
    }
  } else {
    // Create
    rooms.value.push({
      id: Date.now(),
      ...form.value
    })
  }
  isModalOpen.value = false
}

function deleteRoom(id: number) {
  if (confirm('Are you sure you want to delete this room?')) {
    rooms.value = rooms.value.filter(r => r.id !== id)
  }
}

function getAssignedText(room: any) {
  if (room.assignedTo === 'all') return 'All Doctors'
  if (room.assignedDoctorIds.length === 0) return 'None'
  
  const assignedNames = room.assignedDoctorIds
    .map((id: number) => doctors.find(d => d.id === id)?.name)
    .filter(Boolean)
  
  if (assignedNames.length <= 2) return assignedNames.join(', ')
  return `${assignedNames.length} Doctors`
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Office Management</h1>
        <p class="text-slate-500">Manage office rooms and assignments.</p>
      </div>
      <Button @click="openCreateModal">
        <Plus class="w-4 h-4 mr-2" />
        Add Room
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search rooms..." 
          class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
    </div>

    <!-- List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="room in filteredRooms" :key="room.id" class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div class="p-5">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">{{ room.number }}</h3>
                <p class="text-sm text-slate-500">{{ room.name || 'Unnamed Room' }}</p>
              </div>
            </div>
            <div class="flex gap-1">
              <button @click="openEditModal(room)" class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                <Edit2 class="w-4 h-4" />
              </button>
              <button @click="deleteRoom(room.id)" class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
          
            <div class="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg mb-2">
              <Users class="w-4 h-4 text-slate-400" />
              <span class="font-medium">Assigned to:</span>
              <span class="truncate">{{ getAssignedText(room) }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
              <div class="w-4 h-4 flex items-center justify-center text-slate-400 font-bold text-[10px] border border-slate-400 rounded-sm">
                {{ room.seats }}
              </div>
              <span class="font-medium">Seats:</span>
              <span>{{ room.seats }}</span>
            </div>
          </div>
        </div>
      </div>


    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-semibold text-lg text-slate-900">
            {{ editingRoom ? 'Edit Room' : 'Add New Room' }}
          </h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Room Number <span class="text-red-500">*</span></label>
            <input 
              v-model="form.number" 
              type="text" 
              placeholder="e.g. 101"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
          
          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Room Name (Optional)</label>
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="e.g. Consultation A"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Available Seats (1-6)</label>
            <input 
              v-model.number="form.seats" 
              type="number" 
              min="1"
              max="6"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-500 mb-1 uppercase">Assignment</label>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="form.assignedTo" value="all" class="text-primary-600 focus:ring-primary-500">
                <span class="text-sm text-slate-700">All Doctors</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="form.assignedTo" value="specific" class="text-primary-600 focus:ring-primary-500">
                <span class="text-sm text-slate-700">Specific Doctors</span>
              </label>
            </div>
          </div>

          <div v-if="form.assignedTo === 'specific'" class="space-y-2 border border-slate-200 rounded-lg p-3 max-h-40 overflow-y-auto">
            <label v-for="doc in doctors" :key="doc.id" class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
              <input 
                type="checkbox" 
                :value="doc.id" 
                v-model="form.assignedDoctorIds"
                class="rounded text-primary-600 focus:ring-primary-500"
              >
              <span class="text-sm text-slate-700">{{ doc.name }}</span>
            </label>
          </div>
        </div>

        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button @click="isModalOpen = false" class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Cancel</button>
          <Button @click="saveRoom">Save Room</Button>
        </div>
      </div>
    </div>
  </div>
</template>
