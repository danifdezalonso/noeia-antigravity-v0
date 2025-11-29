<script setup lang="ts">
import { ref } from 'vue'
import { ChevronsUpDown, Check, Building2 } from 'lucide-vue-next'

const organizations = [
  { id: 1, name: "danifdezalonso's Org", plan: 'Free' },
  { id: 2, name: "Acme Corp", plan: 'Pro' },
]

const selectedOrg = ref(organizations[0]!)
const isOpen = ref(false)

function selectOrg(org: typeof organizations[0]) {
  selectedOrg.value = org
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 rounded-md transition-colors text-sm text-slate-700 hover:text-slate-900 border border-transparent hover:border-slate-200"
    >
      <div class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
        <Building2 class="w-3 h-3 text-slate-500" />
      </div>
      <span class="font-medium truncate max-w-[120px]">{{ selectedOrg.name }}</span>
      <span class="text-xs text-slate-500 border border-slate-200 rounded px-1.5 py-0.5">{{ selectedOrg.plan }}</span>
      <ChevronsUpDown class="w-4 h-4 text-slate-400" />
    </button>

    <div v-if="isOpen" class="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1">
      <div class="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Organizations</div>
      <button
        v-for="org in organizations"
        :key="org.id"
        @click="selectOrg(org)"
        class="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors group"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-slate-300">
            <span class="font-bold text-slate-600">{{ org.name[0] }}</span>
          </div>
          <div>
            <div class="text-sm font-medium text-slate-900">{{ org.name }}</div>
            <div class="text-xs text-slate-500">{{ org.plan }}</div>
          </div>
        </div>
        <Check v-if="selectedOrg.id === org.id" class="w-4 h-4 text-primary-600" />
      </button>
      <div class="border-t border-slate-100 mt-1 pt-1">
        <button class="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
          Create Organization
        </button>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-40"></div>
  </div>
</template>
