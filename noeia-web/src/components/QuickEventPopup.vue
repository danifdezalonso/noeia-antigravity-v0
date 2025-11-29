<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X, Clock, Users, AlignLeft, MapPin, Video } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  isOpen: boolean
  position: { top: number, left: number }
  initialData: {
    start: Date
    end: Date
  }
}>()

const emit = defineEmits(['close', 'save', 'more-options'])
const store = useAppStore()
const { clients } = storeToRefs(store)

const title = ref('')
const type = ref('Session') // Session, Task, Appointment, Out of Office
const selectedClient = ref('')
const description = ref('')
const isOnline = ref(false)

// Reset form when opened with new data
watch(() => props.initialData, () => {
  if (props.isOpen) {
    title.value = ''
    type.value = 'Session'
    selectedClient.value = ''
    description.value = ''
    isOnline.value = false
  }
}, { deep: true })

const formattedTimeRange = computed(() => {
  const start = props.initialData.start
  const end = props.initialData.end
  
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  
  return `${start.toLocaleDateString('es-ES', dateOptions)}  ${start.toLocaleTimeString([], timeOptions)} – ${end.toLocaleTimeString([], timeOptions)}`
})

function save() {
  if (!title.value) return
  
  emit('save', {
    title: title.value,
    type: type.value,
    clientId: selectedClient.value,
    description: description.value,
    isOnline: isOnline.value,
    start: props.initialData.start,
    end: props.initialData.end
  })
}

// Focus title input on mount
const titleInput = ref<HTMLInputElement | null>(null)
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    setTimeout(() => titleInput.value?.focus(), 100)
  }
})
</script>

<template>
  <div 
    v-if="isOpen"
    class="fixed z-50 w-[400px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    :style="{ top: `${position.top}px`, left: `${position.left}px` }"
  >
    <!-- Header / Drag Handle -->
    <div class="flex items-center justify-between px-4 py-2 bg-slate-50/50 cursor-move handle">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-slate-300"></div> <!-- Window control mock -->
      </div>
      <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
        <X class="w-4 h-4" />
      </button>
    </div>

    <div class="p-5 space-y-4">
      <!-- Title Input -->
      <div>
        <input 
          ref="titleInput"
          v-model="title"
          type="text" 
          placeholder="Add title" 
          class="w-full text-xl font-medium border-b-2 border-slate-200 focus:border-primary-500 focus:outline-none pb-1 placeholder:text-slate-400"
          @keydown.enter="save"
        >
      </div>

      <!-- Type Selector -->
      <div class="flex gap-2">
        <button 
          v-for="t in ['Session', 'Task', 'Appointment', 'Out of Office']" 
          :key="t"
          @click="type = t"
          class="px-3 py-1.5 text-xs font-medium rounded-full transition-colors border"
          :class="type === t ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'"
        >
          {{ t }}
        </button>
      </div>

      <!-- Details List -->
      <div class="space-y-3">
        <!-- Time -->
        <div class="flex items-start gap-3 text-sm text-slate-600">
          <Clock class="w-4 h-4 mt-0.5 text-slate-400" />
          <div>{{ formattedTimeRange }}</div>
        </div>

        <!-- Client -->
        <div class="flex items-center gap-3">
          <Users class="w-4 h-4 text-slate-400" />
          <select 
            v-model="selectedClient"
            class="flex-1 text-sm border-none bg-transparent focus:ring-0 p-0 text-slate-600 cursor-pointer hover:bg-slate-50 rounded px-1 -ml-1"
          >
            <option value="" disabled selected>Add patient</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
          </select>
        </div>

        <!-- Online/Offline -->
        <div class="flex items-center gap-3">
          <Video v-if="isOnline" class="w-4 h-4 text-slate-400" />
          <MapPin v-else class="w-4 h-4 text-slate-400" />
          <button 
            @click="isOnline = !isOnline"
            class="text-sm text-slate-600 hover:bg-slate-50 rounded px-1 -ml-1 transition-colors text-left"
          >
            {{ isOnline ? 'Google Meet Video Conference' : 'Add location' }}
          </button>
        </div>

        <!-- Description -->
        <div class="flex items-start gap-3">
          <AlignLeft class="w-4 h-4 mt-0.5 text-slate-400" />
          <textarea 
            v-model="description"
            rows="2"
            placeholder="Add description"
            class="flex-1 text-sm border-none bg-transparent focus:ring-0 p-0 text-slate-600 placeholder:text-slate-400 resize-none"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
      <button 
        @click="$emit('more-options')"
        class="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
      >
        More options
      </button>
      <Button @click="save" :disabled="!title">Save</Button>
    </div>
  </div>
</template>
