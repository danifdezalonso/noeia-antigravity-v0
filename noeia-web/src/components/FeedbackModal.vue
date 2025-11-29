<script setup lang="ts">
import { ref } from 'vue'
import { Lightbulb, AlertCircle, X } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const activeTab = ref<'issue' | 'idea'>('issue')
const feedback = ref('')
const email = ref('')

function submit() {
  // Mock submission
  console.log('Submitting feedback:', { type: activeTab.value, feedback: feedback.value, email: email.value })
  feedback.value = ''
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 class="text-lg font-semibold text-slate-900">Share Feedback</h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 space-y-4">
        <!-- Tabs -->
        <div class="flex p-1 bg-slate-100 rounded-lg">
          <button 
            @click="activeTab = 'issue'"
            class="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all"
            :class="activeTab === 'issue' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          >
            <AlertCircle class="w-4 h-4" />
            Report Issue
          </button>
          <button 
            @click="activeTab = 'idea'"
            class="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all"
            :class="activeTab === 'idea' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          >
            <Lightbulb class="w-4 h-4" />
            Share Idea
          </button>
        </div>

        <!-- Form -->
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              {{ activeTab === 'issue' ? 'What went wrong?' : 'What is your idea?' }}
            </label>
            <textarea 
              v-model="feedback"
              rows="4"
              class="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
              :placeholder="activeTab === 'issue' ? 'Describe the bug or issue...' : 'Tell us how we can improve...'"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email (optional)</label>
            <input 
              v-model="email"
              type="email" 
              class="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </div>

      <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
        <Button variant="outline" @click="emit('close')">Cancel</Button>
        <Button @click="submit">Send Feedback</Button>
      </div>
    </div>
  </div>
</template>
