<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Filter, MoreVertical, Plus, ChevronDown } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import CreateClientModal from '@/components/CreateClientModal.vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useAppStore()
const { clients } = storeToRefs(store)

const searchQuery = ref('')
const statusFilter = ref('All')
const isModalOpen = ref(false)

onMounted(() => {
  store.fetchClients()
})

const filteredClients = computed(() => {
  return clients.value.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || client.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

async function handleSaveClient(clientData: any) {
  try {
    await store.addClient({
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      dob: '1990-01-01', // Default or add to form
      status: 'Active',
      related: clientData.relatedPatient ? `${clientData.relatedPatient} (${clientData.relationType})` : 'None'
    })
  } catch (error) {
    console.error('Failed to add client:', error)
  }
}

function navigateToDetail(id: string) {
  router.push(`/app/clients/${id}`)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Patients</h1>
        <p class="text-slate-500">Manage your patient records.</p>
      </div>
      <Button @click="isModalOpen = true">
        <Plus class="w-4 h-4 mr-2" />
        New Patient
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name or email..." 
          class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex items-center gap-2">
        <Filter class="w-4 h-4 text-slate-400" />
        <select 
          v-model="statusFilter"
          class="text-sm border-none bg-transparent focus:ring-0 text-slate-600 font-medium cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>

    <!-- Patients Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Name
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Email
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Phone
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Date of birth
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 cursor-pointer hover:text-slate-700">
                <div class="flex items-center gap-1">
                  Related
                  <ChevronDown class="w-3 h-3" />
                </div>
              </th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="client in filteredClients" 
              :key="client.id" 
              class="hover:bg-slate-50 transition-colors cursor-pointer"
              @click="navigateToDetail(client.id)"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="client.avatar" :alt="client.name" class="w-8 h-8 rounded-full bg-slate-100" />
                  <div>
                    <div class="font-medium text-slate-900">{{ client.name }}</div>
                    <div class="text-xs text-slate-500 sm:hidden">{{ client.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600 hidden sm:table-cell">
                {{ client.email }}
              </td>
              <td class="px-6 py-4 text-slate-600 hidden md:table-cell">
                {{ client.phone }}
              </td>
              <td class="px-6 py-4 text-slate-600 hidden lg:table-cell">
                {{ client.dob }}
              </td>
              <td class="px-6 py-4 text-slate-600 hidden xl:table-cell">
                {{ client.related }}
              </td>
              <td class="px-6 py-4 text-right">
                <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors" @click.stop>
                  <MoreVertical class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredClients.length === 0" class="p-12 text-center">
        <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search class="w-6 h-6 text-slate-400" />
        </div>
        <h3 class="text-lg font-medium text-slate-900 mb-1">No patients found</h3>
        <p class="text-slate-500">Start by adding your first patient.</p>
        <Button class="mt-4" @click="isModalOpen = true">
          <Plus class="w-4 h-4 mr-2" />
          New Patient
        </Button>
      </div>
    </div>

    <CreateClientModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false"
      @save="handleSaveClient"
    />
  </div>
</template>
