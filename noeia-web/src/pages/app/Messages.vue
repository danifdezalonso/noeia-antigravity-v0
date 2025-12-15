<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

// Mock Data based on Role
const role = computed(() => user.value?.app_metadata?.role || 'doctor')

const currentUser = computed(() => ({
  id: user.value?.id || 'current-user',
  name: user.value?.user_metadata?.full_name || 'Me',
  avatar: user.value?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.value?.email || 'User'}`
}))

// Mock Conversations
const conversations = computed(() => {
  if (role.value === 'client') {
    return [
      {
        id: 1,
        professional: {
          id: 'pro1',
          name: 'Dr. Sarah Connor',
          initials: 'SC',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          role: 'Clinical Psychologist',
          status: 'online'
        },
        lastMessage: 'See you at the next session.',
        lastMessageTime: '10:30 AM',
        unread: 0,
        messages: [
          { id: 1, senderId: 'pro1', text: 'Hi John, how have you been feeling since our last session?', time: 'Yesterday, 2:00 PM' },
          { id: 2, senderId: currentUser.value.id, text: 'Hi Dr. Connor. I\'ve been doing better, thanks for asking. The exercises really helped.', time: 'Yesterday, 2:15 PM' },
          { id: 3, senderId: 'pro1', text: 'That\'s great to hear! Remember to keep tracking your mood daily.', time: 'Yesterday, 2:20 PM' },
          { id: 4, senderId: currentUser.value.id, text: 'Will do. I have a question about the medication though.', time: '10:00 AM' },
          { id: 5, senderId: 'pro1', text: 'Sure, what would you like to know?', time: '10:05 AM' },
          { id: 6, senderId: 'pro1', text: 'See you at the next session.', time: '10:30 AM' }
        ]
      }
    ]
  } else {
    // Doctor / Organization View
    return [
      {
        id: 1,
        professional: {
          id: 'patient1',
          name: 'Sarah Johnson',
          initials: 'SJ',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
          role: 'Patient',
          status: 'online'
        },
        lastMessage: 'I have a question about my appointment.',
        lastMessageTime: '10:30 AM',
        unread: 2,
        messages: [
          { id: 1, senderId: 'patient1', text: 'Hi Dr., I need to reschedule our next session.', time: 'Yesterday, 2:00 PM' },
          { id: 2, senderId: currentUser.value.id, text: 'Hello Sarah, no problem. What time works for you?', time: 'Yesterday, 2:15 PM' },
          { id: 3, senderId: 'patient1', text: 'Is next Tuesday at 3 PM available?', time: 'Yesterday, 2:20 PM' },
          { id: 4, senderId: currentUser.value.id, text: 'Yes, that works. I have updated the calendar.', time: '10:00 AM' },
          { id: 5, senderId: 'patient1', text: 'Great, thank you!', time: '10:05 AM' },
          { id: 6, senderId: 'patient1', text: 'I have a question about my appointment.', time: '10:30 AM' }
        ]
      },
      {
        id: 2,
        professional: {
          id: 'patient2',
          name: 'Michael Brown',
          initials: 'MB',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          role: 'Patient',
          status: 'offline'
        },
        lastMessage: 'Thanks for the resources.',
        lastMessageTime: 'Yesterday',
        unread: 0,
        messages: [
          { id: 1, senderId: currentUser.value.id, text: 'Hi Michael, here are the resources we discussed.', time: 'Yesterday, 9:00 AM' },
          { id: 2, senderId: 'patient2', text: 'Thanks for the resources.', time: 'Yesterday, 10:00 AM' }
        ]
      }
    ]
  }
})

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
    senderId: currentUser.value.id,
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
  <div class="flex h-[calc(100vh-8rem)] bg-card border rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-500">
    <!-- Sidebar (Conversations) -->
    <div class="w-80 border-r flex flex-col bg-muted/20">
      <!-- Header -->
      <div class="p-4 border-b flex items-center justify-between">
        <h2 class="font-semibold text-foreground">Messages</h2>
        <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground rounded-full">
          <MoreVertical class="w-4 h-4" />
        </Button>
      </div>

      <!-- Search -->
      <div class="p-4">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search messages..." 
            class="pl-9 bg-background"
          />
        </div>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="conv in conversations" 
          :key="conv.id"
          @click="activeConversationId = conv.id"
          class="p-4 flex gap-3 cursor-pointer hover:bg-accent/50 transition-colors border-l-4"
          :class="activeConversationId === conv.id ? 'bg-background border-primary shadow-sm' : 'border-transparent'"
        >
          <div class="relative">
            <Avatar class="h-10 w-10 border border-slate-200">
              <AvatarImage :src="conv.professional.avatar" />
              <AvatarFallback>{{ conv.professional.initials }}</AvatarFallback>
            </Avatar>
            <span v-if="conv.professional.status === 'online'" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-medium text-foreground truncate">{{ conv.professional.name }}</h3>
              <span class="text-xs text-muted-foreground">{{ conv.lastMessageTime }}</span>
            </div>
            <p class="text-xs text-muted-foreground truncate">{{ conv.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col bg-background">
      <!-- Chat Header -->
      <div v-if="activeConversation" class="h-16 px-6 border-b flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Avatar class="h-10 w-10 border border-slate-200">
              <AvatarImage :src="activeConversation.professional.avatar" />
              <AvatarFallback>{{ activeConversation.professional.initials }}</AvatarFallback>
            </Avatar>
          <div>
            <h3 class="text-sm font-semibold text-foreground">{{ activeConversation.professional.name }}</h3>
            <p class="text-xs text-green-600 flex items-center gap-1 font-medium">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <Button variant="ghost" size="icon" class="h-9 w-9 text-muted-foreground rounded-full">
            <Phone class="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" class="h-9 w-9 text-muted-foreground rounded-full">
            <Video class="w-5 h-5" />
          </Button>
          <Separator orientation="vertical" class="h-6 mx-2" />
          <Button variant="ghost" size="icon" class="h-9 w-9 text-muted-foreground rounded-full">
            <MoreVertical class="w-5 h-5" />
          </Button>
        </div>
      </div>

      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
        <div 
          v-for="msg in activeMessages" 
          :key="msg.id" 
          class="flex"
          :class="msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm"
            :class="msg.senderId === currentUser.id 
              ? 'bg-primary text-primary-foreground rounded-br-none' 
              : 'bg-card text-card-foreground border rounded-bl-none'"
          >
            <p>{{ msg.text }}</p>
            <p 
              class="text-[10px] mt-1 text-right opacity-70"
              :class="msg.senderId === currentUser.id ? 'text-primary-foreground/80' : 'text-muted-foreground'"
            >
              {{ msg.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t bg-background">
        <div class="flex items-end gap-2 bg-muted/30 p-2 rounded-xl border focus-within:ring-1 focus-within:ring-primary transition-all">
          <Button variant="ghost" size="icon" class="h-9 w-9 text-muted-foreground rounded-lg">
            <Paperclip class="w-5 h-5" />
          </Button>
          
          <Textarea 
            v-model="newMessage"
            @keydown.enter.prevent="sendMessage"
            placeholder="Type a message..." 
            rows="1"
            class="flex-1 min-h-[40px] max-h-32 py-2 resize-none border-0 focus-visible:ring-0 bg-transparent shadow-none"
          />
          
          <Button variant="ghost" size="icon" class="h-9 w-9 text-muted-foreground rounded-lg">
            <Smile class="w-5 h-5" />
          </Button>
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
