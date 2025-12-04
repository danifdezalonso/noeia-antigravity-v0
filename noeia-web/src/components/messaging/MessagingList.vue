<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronUp, ChevronDown, Search, MoreHorizontal, Edit } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  conversations: Array<{
    id: string
    user: {
      name: string
      avatar: string
      status: 'online' | 'offline' | 'busy'
    }
    lastMessage: string
    timestamp: Date
    unreadCount: number
  }>
}>()

const emit = defineEmits(['toggle', 'openChat'])

const searchQuery = ref('')

const filteredConversations = computed(() => {
  if (!searchQuery.value) return props.conversations
  const query = searchQuery.value.toLowerCase()
  return props.conversations.filter(c => c.user.name.toLowerCase().includes(query))
})
</script>

<template>
  <div 
    class="bg-white rounded-t-lg shadow-xl border border-slate-200 flex flex-col transition-all duration-200 w-72"
    :class="isOpen ? 'h-[500px]' : 'h-12'"
  >
    <!-- Header -->
    <div 
      class="flex items-center justify-between px-3 py-2 border-b border-slate-100 cursor-pointer hover:bg-slate-50 rounded-t-lg bg-white z-10"
      @click="emit('toggle')"
    >
      <div class="flex items-center gap-2">
        <div class="relative">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="w-8 h-8 rounded-full bg-slate-100" />
          <div class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-emerald-500"></div>
        </div>
        <span class="font-semibold text-slate-900">Messaging</span>
      </div>
      <div class="flex items-center gap-1">
        <button class="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100" @click.stop>
          <MoreHorizontal class="w-4 h-4" />
        </button>
        <button class="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100" @click.stop>
          <Edit class="w-4 h-4" />
        </button>
        <component :is="isOpen ? ChevronDown : ChevronUp" class="w-4 h-4 text-slate-500 ml-1" />
      </div>
    </div>

    <!-- Content -->
    <div v-if="isOpen" class="flex-1 flex flex-col min-h-0 bg-white">
      <!-- Search -->
      <div class="p-2 border-b border-slate-100">
        <div class="relative">
          <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search messages" 
            class="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
          >
        </div>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto">
        <button
          v-for="conv in filteredConversations"
          :key="conv.id"
          @click="emit('openChat', conv.id)"
          class="w-full flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-slate-50 transition-colors text-left group"
        >
          <div class="relative shrink-0">
            <img :src="conv.user.avatar" class="w-10 h-10 rounded-full object-cover" />
            <div 
              class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
              :class="{
                'bg-emerald-500': conv.user.status === 'online',
                'bg-slate-400': conv.user.status === 'offline',
                'bg-amber-500': conv.user.status === 'busy'
              }"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-0.5">
              <span class="font-medium text-sm text-slate-900 truncate">{{ conv.user.name }}</span>
              <span class="text-[10px] text-slate-400 shrink-0">{{ conv.timestamp.toLocaleDateString() }}</span>
            </div>
            <p class="text-xs text-slate-500 truncate group-hover:text-slate-700 transition-colors">
              <span v-if="conv.unreadCount > 0" class="font-semibold text-slate-900">{{ conv.lastMessage }}</span>
              <span v-else>{{ conv.lastMessage }}</span>
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
