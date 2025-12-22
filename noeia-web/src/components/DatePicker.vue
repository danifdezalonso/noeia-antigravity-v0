<script setup lang="ts">
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps<{
  placeholder?: string
  class?: string
}>()

const value = defineModel<any>()

const formatter = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

function formatDate(date: any) { 
  if (!date || typeof date.toDate !== 'function') return ''
  return formatter.format(date.toDate(getLocalTimeZone()))
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[240px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
          props.class,
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? formatDate(value) : (placeholder || "Pick a date") }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
