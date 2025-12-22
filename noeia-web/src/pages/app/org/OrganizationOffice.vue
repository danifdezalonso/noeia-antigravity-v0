<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Plus, MapPin, Users, Edit2, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

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

function toggleDoctorSelection(id: number) {
  const index = form.value.assignedDoctorIds.indexOf(id)
  if (index === -1) {
    form.value.assignedDoctorIds.push(id)
  } else {
    form.value.assignedDoctorIds.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Office Management</h1>
        <p class="text-muted-foreground">Manage office rooms and assignments.</p>
      </div>
      <Button @click="openCreateModal">
        <Plus class="w-4 h-4 mr-2" />
        Add Room
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-card p-4 rounded-xl border shadow-sm">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search rooms..." 
          class="pl-9"
        />
      </div>
    </div>

    <!-- List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="room in filteredRooms" :key="room.id" class="hover:shadow-md transition-shadow">
        <CardHeader class="pb-3">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <CardTitle class="text-base">{{ room.number }}</CardTitle>
                <p class="text-sm text-muted-foreground">{{ room.name || 'Unnamed Room' }}</p>
              </div>
            </div>
            <div class="flex gap-1">
              <Button variant="ghost" size="icon" class="h-8 w-8" @click="openEditModal(room)">
                <Edit2 class="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" class="h-8 w-8 hover:text-destructive" @click="deleteRoom(room.id)">
                <Trash2 class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
            <Users class="w-4 h-4" />
            <span class="font-medium text-foreground">Assigned to:</span>
            <span class="truncate">{{ getAssignedText(room) }}</span>
          </div>
          
          <div class="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
            <Badge variant="outline" class="h-5 w-5 flex items-center justify-center p-0 text-[10px]">
              {{ room.seats }}
            </Badge>
            <span class="font-medium text-foreground">Seats:</span>
            <span>{{ room.seats }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Modal -->
    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ editingRoom ? 'Edit Room' : 'Add New Room' }}</DialogTitle>
          <DialogDescription>
            Configure room details and assignments.
          </DialogDescription>
        </DialogHeader>
        
        <div class="grid gap-4 py-4">
          <div class="grid gap-2">
            <Label for="number">Room Number <span class="text-destructive">*</span></Label>
            <Input id="number" v-model="form.number" placeholder="e.g. 101" />
          </div>
          
          <div class="grid gap-2">
            <Label for="name">Room Name (Optional)</Label>
            <Input id="name" v-model="form.name" placeholder="e.g. Consultation A" />
          </div>

          <div class="grid gap-2">
            <Label for="seats">Available Seats (1-6)</Label>
            <Input 
              id="seats" 
              v-model.number="form.seats" 
              type="number" 
              min="1"
              max="6"
            />
          </div>

          <div class="grid gap-2">
            <Label>Assignment</Label>
            <RadioGroup v-model="form.assignedTo" class="flex flex-col space-y-1">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="all" value="all" />
                <Label for="all" class="font-normal cursor-pointer">All Doctors</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="specific" value="specific" />
                <Label for="specific" class="font-normal cursor-pointer">Specific Doctors</Label>
              </div>
            </RadioGroup>
          </div>

          <div v-if="form.assignedTo === 'specific'" class="grid gap-2 border rounded-lg p-3 max-h-40 overflow-y-auto">
            <div v-for="doc in doctors" :key="doc.id" class="flex items-center space-x-2">
              <Checkbox 
                :id="`doc-${doc.id}`" 
                :checked="form.assignedDoctorIds.includes(doc.id)"
                @update:checked="toggleDoctorSelection(doc.id)"
              />
              <Label :for="`doc-${doc.id}`" class="text-sm font-normal cursor-pointer">{{ doc.name }}</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="isModalOpen = false">Cancel</Button>
          <Button @click="saveRoom">Save Room</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
