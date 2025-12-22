<script setup lang="ts">
import { ref } from 'vue'
import { ChevronsUpDown, Check, Building2, PlusCircle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const organizations = [
  { id: 1, name: "danifdezalonso's Org", plan: 'Free', value: 'danifdezalonso-org' },
  { id: 2, name: "Acme Corp", plan: 'Pro', value: 'acme-corp' },
]

const selectedOrg = ref(organizations[0]!)
const isOpen = ref(false)

function selectOrg(org: typeof organizations[0]) {
  selectedOrg.value = org
  isOpen.value = false
}
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="isOpen"
        class="w-[200px] justify-between h-9"
      >
        <div class="flex items-center gap-2 truncate">
          <div class="w-5 h-5 rounded bg-muted flex items-center justify-center border">
            <Building2 class="w-3 h-3 text-muted-foreground" />
          </div>
          <span class="truncate">{{ selectedOrg.name }}</span>
          <span class="text-xs text-muted-foreground border rounded px-1">{{ selectedOrg.plan }}</span>
        </div>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search organization..." />
        <CommandList>
          <CommandEmpty>No organization found.</CommandEmpty>
          <CommandGroup heading="Organizations">
            <CommandItem
              v-for="org in organizations"
              :key="org.id"
              :value="org.value"
              @select="() => selectOrg(org)"
            >
              <div class="flex items-center gap-2 w-full">
                <div class="w-6 h-6 rounded bg-muted flex items-center justify-center border">
                  <span class="font-bold text-xs text-muted-foreground">{{ org.name[0] }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ org.name }}</span>
                  <span class="text-[10px] text-muted-foreground">{{ org.plan }}</span>
                </div>
              </div>
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  selectedOrg.id === org.id ? 'opacity-100' : 'opacity-0'
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandSeparator />
        <CommandList>
          <CommandGroup>
            <CommandItem value="create-org">
              <PlusCircle class="mr-2 h-4 w-4" />
              Create Organization
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
