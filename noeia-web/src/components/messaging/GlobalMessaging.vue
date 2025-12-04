<script setup lang="ts">
import { ref } from 'vue'
import MessagingList from './MessagingList.vue'
import ChatWindow from './ChatWindow.vue'

// Mock Data
const conversations = [
  {
    id: '1',
    user: { name: 'Wassim ALI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wassim', status: 'online' as const },
    lastMessage: 'Dani, explora oportunidades relevantes con GOIKO',
    timestamp: new Date(),
    unreadCount: 1
  },
  {
    id: '2',
    user: { name: 'Sarah Mitchell', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', status: 'busy' as const },
    lastMessage: 'Thanks for the session notes!',
    timestamp: new Date(Date.now() - 86400000),
    unreadCount: 0
  },
  {
    id: '3',
    user: { name: 'James Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', status: 'offline' as const },
    lastMessage: 'Can we reschedule?',
    timestamp: new Date(Date.now() - 172800000),
    unreadCount: 0
  }
]

const messages = {
  '1': [
    { id: '1', text: 'Hola Dani!', sender: 'them', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', text: 'Dani, explora oportunidades relevantes con GOIKO', sender: 'them', timestamp: new Date() }
  ],
  '2': [
    { id: '1', text: 'Hi Sarah, how are you doing?', sender: 'me', timestamp: new Date(Date.now() - 90000000) },
    { id: '2', text: 'Thanks for the session notes!', sender: 'them', timestamp: new Date(Date.now() - 86400000) }
  ],
  '3': [
    { id: '1', text: 'Can we reschedule?', sender: 'them', timestamp: new Date(Date.now() - 172800000) }
  ]
} as Record<string, any[]>

// State
const isListOpen = ref(false)
const openChats = ref<Array<{ id: string, isMinimized: boolean }>>([])

// Actions
function toggleList() {
  isListOpen.value = !isListOpen.value
}

function openChat(id: string) {
  const existing = openChats.value.find(c => c.id === id)
  if (existing) {
    existing.isMinimized = false
  } else {
    // Limit to 3 open chats
    if (openChats.value.length >= 3) {
      openChats.value.shift()
    }
    openChats.value.push({ id, isMinimized: false })
  }
}

function closeChat(id: string) {
  const index = openChats.value.findIndex(c => c.id === id)
  if (index !== -1) {
    openChats.value.splice(index, 1)
  }
}

function toggleChatMinimize(id: string) {
  const chat = openChats.value.find(c => c.id === id)
  if (chat) {
    chat.isMinimized = !chat.isMinimized
  }
}

function handleSend(chatId: string, text: string) {
  if (!messages[chatId]) messages[chatId] = []
  messages[chatId].push({
    id: Date.now().toString(),
    text,
    sender: 'me',
    timestamp: new Date()
  })
}

function getChatData(id: string) {
  const conv = conversations.find(c => c.id === id)
  if (!conv) return null
  return {
    ...conv,
    messages: messages[id] || []
  }
}
</script>

<template>
  <div class="fixed bottom-0 right-0 z-[100] flex items-end gap-4 px-4 pointer-events-none">
    <div class="flex items-end gap-4 pointer-events-auto">
      <template v-for="chat in openChats" :key="chat.id">
        <ChatWindow
          v-if="getChatData(chat.id)"
          :chat="getChatData(chat.id)!"
          :is-minimized="chat.isMinimized"
          @close="closeChat(chat.id)"
          @minimize="toggleChatMinimize(chat.id)"
          @maximize="toggleChatMinimize(chat.id)"
          @send="handleSend"
        />
      </template>
    </div>

    <!-- Main List -->
    <div class="pointer-events-auto">
      <MessagingList
        :is-open="isListOpen"
        :conversations="conversations"
        @toggle="toggleList"
        @open-chat="openChat"
      />
    </div>
  </div>
</template>
