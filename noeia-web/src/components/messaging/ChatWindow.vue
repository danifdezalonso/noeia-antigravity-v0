<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { X, Minus, Send, Image, Paperclip, MoreHorizontal } from 'lucide-vue-next'

const props = defineProps<{
  chat: {
    id: string
    user: {
      name: string
      avatar: string
      status: 'online' | 'offline' | 'busy'
    }
    messages: Array<{
      id: string
      text: string
      sender: 'me' | 'them'
      timestamp: Date
    }>
  }
  isMinimized: boolean
}>()

const emit = defineEmits(['close', 'minimize', 'maximize', 'send'])

const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => props.chat.messages.length, scrollToBottom)
watch(() => props.isMinimized, (minimized) => {
  if (!minimized) scrollToBottom()
})

function handleSend() {
  if (!newMessage.value.trim()) return
  emit('send', props.chat.id, newMessage.value)
  newMessage.value = ''
}
</script>

<template>
  <div 
    class="bg-white rounded-t-lg shadow-xl border border-slate-200 flex flex-col transition-all duration-200"
    :class="isMinimized ? 'w-48 h-12' : 'w-80 h-96'"
  >
    <!-- Header -->
    <div 
      class="flex items-center justify-between px-3 py-2 border-b border-slate-100 cursor-pointer hover:bg-slate-50 rounded-t-lg"
      @click="isMinimized ? emit('maximize') : emit('minimize')"
    >
      <div class="flex items-center gap-2 overflow-hidden">
        <div class="relative shrink-0">
          <img :src="props.chat.user.avatar" class="w-8 h-8 rounded-full object-cover" alt="User avatar" />
          <div 
            class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
            :class="{
              'bg-emerald-500': props.chat.user.status === 'online',
              'bg-slate-400': props.chat.user.status === 'offline',
              'bg-amber-500': props.chat.user.status === 'busy'
            }"
          ></div>
        </div>
        <div class="font-medium text-sm text-slate-900 truncate">
          {{ props.chat.user.name }}
        </div>
      </div>
      
      <div class="flex items-center gap-1" @click.stop>
        <button 
          @click="emit('minimize')" 
          class="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100"
          v-if="!isMinimized"
        >
          <Minus class="w-4 h-4" />
        </button>
        <button 
          @click="emit('close')" 
          class="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Content (Hidden when minimized) -->
    <div v-if="!isMinimized" class="flex-1 flex flex-col min-h-0">
      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
        <div 
          v-for="msg in props.chat.messages" 
          :key="msg.id"
          class="flex flex-col"
          :class="msg.sender === 'me' ? 'items-end' : 'items-start'"
        >
          <div 
            class="max-w-[85%] px-3 py-2 rounded-lg text-sm"
            :class="msg.sender === 'me' 
              ? 'bg-primary-600 text-white rounded-br-none' 
              : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'"
          >
            {{ msg.text }}
          </div>
          <span class="text-[10px] text-slate-400 mt-1 px-1">
            {{ msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </span>
        </div>
      </div>

      <!-- Input -->
      <div class="p-3 bg-white border-t border-slate-100">
        <div class="relative">
          <input 
            v-model="newMessage"
            @keydown.enter="handleSend"
            type="text" 
            placeholder="Write a message..." 
            class="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
          >
          <button 
            @click="handleSend"
            class="absolute right-1.5 top-1.5 p-1 text-primary-600 hover:text-primary-700 rounded-full hover:bg-primary-50 transition-colors"
            :disabled="!newMessage.trim()"
          >
            <Send class="w-4 h-4" />
          </button>
        </div>
        <div class="flex items-center gap-2 mt-2 px-1">
          <button class="text-slate-400 hover:text-slate-600 transition-colors">
            <Image class="w-4 h-4" />
          </button>
          <button class="text-slate-400 hover:text-slate-600 transition-colors">
            <Paperclip class="w-4 h-4" />
          </button>
          <div class="flex-1"></div>
          <button class="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
