<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Calendar, Users, FileText, UserPlus, CalendarPlus } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

const router = useRouter()
const store = useAppStore()
const { clients, enrichedSessions, invoices } = storeToRefs(store)

const isOpen = ref(false)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// --- Data Transformation needed for Search ---
// Command component filters internally based on text value passed to CommandItem
// But we can also pre-filter or just pass all and let Command handle it.
// Given 5 items limit in original, we passed limited items. 
// Command component is better if we feed it data and let it filter, or we filter.

const allItems = computed(() => {
  const items: any[] = []

  // Create Client Action
  items.push({
    id: 'create-client',
    type: 'Action',
    label: 'Create new Client',
    icon: UserPlus,
    keywords: ['create', 'client', 'new', 'add'] 
  })
    
  items.push({
      id: 'schedule-session',
      type: 'Action',
      label: 'Schedule Session',
      icon: CalendarPlus,
      keywords: ['schedule', 'session', 'new', 'add', 'appointment']
  })

  clients.value.forEach(c => {
    items.push({
      id: c.id,
      type: 'Client',
      label: c.name,
      keywords: [c.email],
      icon: Users,
      data: c
    })
  })

  enrichedSessions.value.forEach(s => {
    items.push({
      id: s.id,
      type: 'Session',
      label: s.title,
      keywords: [s.clientName, new Date(s.start).toLocaleDateString()],
      icon: Calendar,
      data: s
    })
  })

  invoices.value.forEach(i => {
    items.push({
      id: i.id,
      type: 'Invoice',
      label: i.displayId || 'Invoice',
      keywords: [`€${i.total}`],
      icon: FileText,
      data: i
    })
  })
  
  return items
})

function handleSelect(item: any) {
  isOpen.value = false
  
  if (item.type === 'Client') {
    router.push(`/app/doctor/patients/${item.id}`)
  } else if (item.type === 'Session') {
    const date = new Date(item.data.start)
    router.push({ path: '/app/doctor/calendar', query: { date: date.toISOString() } })
  } else if (item.type === 'Invoice') {
    router.push('/app/doctor/billing')
  } else if (item.id === 'create-client') {
    router.push(`/app/doctor/patients?action=create`)
  } else if (item.id === 'schedule-session') {
    router.push('/app/doctor/calendar?action=create')
  }
}
</script>

<template>
  <div>
    <Button
      variant="outline"
      class="w-64 justify-between text-muted-foreground h-9"
      @click="isOpen = true"
    >
      <div class="flex items-center gap-2">
        <Search class="h-4 w-4" />
        <span>Search...</span>
      </div>
      <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span class="text-xs">⌘</span>K
      </kbd>
    </Button>

    <CommandDialog :open="isOpen" @update:open="isOpen = $event">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Actions">
             <CommandItem 
               v-for="item in allItems.filter(i => i.type === 'Action')" 
               :key="item.id" 
               :value="item.label"
               @select="() => handleSelect(item)"
             >
              <component :is="item.icon" class="mr-2 h-4 w-4" />
              <span>{{ item.label }}</span>
            </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Clients">
          <CommandItem 
               v-for="item in allItems.filter(i => i.type === 'Client')" 
               :key="item.id" 
               :value="item.label"
               @select="() => handleSelect(item)"
             >
            <Users class="mr-2 h-4 w-4" />
            <span>{{ item.label }}</span>
             <CommandShortcut v-if="item.keywords?.[0]">{{ item.keywords[0] }}</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="Sessions">
           <CommandItem 
               v-for="item in allItems.filter(i => i.type === 'Session')" 
               :key="item.id" 
               :value="item.label"
               @select="() => handleSelect(item)"
             >
            <Calendar class="mr-2 h-4 w-4" />
            <span>{{ item.label }}</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Invoices">
           <CommandItem 
               v-for="item in allItems.filter(i => i.type === 'Invoice')" 
               :key="item.id" 
               :value="item.label"
               @select="() => handleSelect(item)"
             >
            <FileText class="mr-2 h-4 w-4" />
            <span>{{ item.label }}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
