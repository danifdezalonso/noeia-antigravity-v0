<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { Send, Search, MoreVertical, Phone, Video, Image, Paperclip, Smile } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Mock Data
const currentUser = {
  id: 'client',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
}

const conversations = ref([
  {
    id: 1,
    professional: {
      id: 'pro1',
      name: 'Dr. Sarah Connor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'Clinical Psychologist',
      status: 'online'
    },
    lastMessage: 'See you at the next session.',
    lastMessageTime: '10:30 AM',
    unread: 0,
    messages: [
      {
        id: 1,
        senderId: 'pro1',
        text: 'Hi John, how have you been feeling since our last session?',
        time: 'Yesterday, 2:00 PM'
      },
      {
        id: 2,
        senderId: 'client',
        text: 'Hi Dr. Connor. I\'ve been doing better, thanks for asking. The exercises really helped.',
        time: 'Yesterday, 2:15 PM'
      },
      {
        id: 3,
        senderId: 'pro1',
        text: 'That\'s great to hear! Remember to keep tracking your mood daily.',
        time: 'Yesterday, 2:20 PM'
      },
      {
        id: 4,
        senderId: 'client',
        text: 'Will do. I have a question about the medication though.',
        time: '10:00 AM'
      },
      {
        id: 5,
        senderId: 'pro1',
        text: 'Sure, what would you like to know?',
        time: '10:05 AM'
      },
      {
        id: 6,
        senderId: 'pro1',
        text: 'See you at the next session.',
        time: '10:30 AM'
      }
    ]
  }
])

const activeConversationId = ref(1)
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const activeConversation = computed(() => {
  return conversations.value.find(c => c.id === activeConversationId.value)
})

const activeMessages = computed(() => {
  return activeConversation.value?.messages || []
})

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function sendMessage() {
  if (!newMessage.value.trim() || !activeConversation.value) return

  // Add message
  activeConversation.value.messages.push({
    id: Date.now(),
    senderId: currentUser.id,
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  // Update last message preview
  activeConversation.value.lastMessage = newMessage.value
  activeConversation.value.lastMessageTime = 'Just now'

  newMessage.value = ''
  scrollToBottom()

  // Mock reply
  setTimeout(() => {
    activeConversation.value?.messages.push({
      id: Date.now() + 1,
      senderId: activeConversation.value.professional.id,
      text: 'Thanks for the update. We can discuss this further in our next meeting.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  }, 2000)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="flex h-[calc(100vh-8rem)] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
    <!-- Sidebar (Conversations) -->
    <div class="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
      <!-- Header -->
      <div class="p-4 border-b border-slate-200 flex items-center justify-between">
        <h2 class="font-semibold text-slate-900">Messages</h2>
        <button class="p-2 hover:bg-slate-200 rounded-full text-slate-500">
          <MoreVertical class="w-4 h-4" />
        </button>
      </div>

      <!-- Search -->
      <div class="p-4">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            class="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
        </div>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="conv in conversations" 
          :key="conv.id"
          @click="activeConversationId = conv.id"
          class="p-4 flex gap-3 cursor-pointer hover:bg-slate-100 transition-colors border-l-4"
          :class="activeConversationId === conv.id ? 'bg-white border-primary-500' : 'border-transparent'"
        >
          <div class="relative">
            <img :src="conv.professional.avatar" class="w-10 h-10 rounded-full object-cover bg-slate-200" />
            <span v-if="conv.professional.status === 'online'" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-medium text-slate-900 truncate">{{ conv.professional.name }}</h3>
              <span class="text-xs text-slate-400">{{ conv.lastMessageTime }}</span>
            </div>
            <p class="text-xs text-slate-500 truncate">{{ conv.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col bg-white">
      <!-- Chat Header -->
      <div v-if="activeConversation" class="h-16 px-6 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="activeConversation.professional.avatar" class="w-10 h-10 rounded-full object-cover bg-slate-200" />
          <div>
            <h3 class="text-sm font-semibold text-slate-900">{{ activeConversation.professional.name }}</h3>
            <p class="text-xs text-green-600 flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
            <Phone class="w-5 h-5" />
          </button>
          <button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
            <Video class="w-5 h-5" />
          </button>
          <button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
            <MoreVertical class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        <div 
          v-for="msg in activeMessages" 
          :key="msg.id" 
          class="flex"
          :class="msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm"
            :class="msg.senderId === currentUser.id 
              ? 'bg-primary-600 text-white rounded-br-none' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'"
          >
            <p>{{ msg.text }}</p>
            <p 
              class="text-[10px] mt-1 text-right opacity-70"
              :class="msg.senderId === currentUser.id ? 'text-primary-100' : 'text-slate-400'"
            >
              {{ msg.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-slate-200 bg-white">
        <div class="flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-100 transition-all">
          <button class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50">
            <Paperclip class="w-5 h-5" />
          </button>
          <textarea 
            v-model="newMessage"
            @keydown.enter.prevent="sendMessage"
            placeholder="Type a message..." 
            rows="1"
            class="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-900 placeholder:text-slate-400 resize-none py-2 max-h-32"
            style="min-height: 40px;"
          ></textarea>
          <button class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50">
            <Smile class="w-5 h-5" />
          </button>
          <Button 
            @click="sendMessage" 
            :disabled="!newMessage.trim()"
            size="sm" 
            class="mb-0.5"
          >
            <Send class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
