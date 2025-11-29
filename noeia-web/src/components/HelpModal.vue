<script setup lang="ts">
import { X, BookOpen, PlayCircle, MessageCircle } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const resources = [
  { 
    title: 'Getting Started Guide', 
    description: 'Learn the basics of navigating Noeia and setting up your workspace.',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    title: 'Video Tutorials', 
    description: 'Watch step-by-step videos on key features like billing and scheduling.',
    icon: PlayCircle,
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    title: 'Community Forum', 
    description: 'Connect with other professionals and share tips.',
    icon: MessageCircle,
    color: 'bg-green-100 text-green-600'
  },
]
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 class="text-lg font-semibold text-slate-900">Help & Resources</h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6">
        <div class="grid gap-4">
          <button 
            v-for="item in resources" 
            :key="item.title"
            class="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-primary-200 hover:bg-primary-50/30 transition-all text-left group"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" :class="item.color">
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="font-semibold text-slate-900 group-hover:text-primary-700">{{ item.title }}</h4>
              <p class="text-sm text-slate-500 mt-1">{{ item.description }}</p>
            </div>
          </button>
        </div>
      </div>

      <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
        <p class="text-sm text-slate-500">
          Need more help? <a href="#" class="text-primary-600 font-medium hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  </div>
</template>
