<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles, Send, Bot } from 'lucide-vue-next'

const isOpen = ref(false)
const query = ref('')

function askAI() {
  if (!query.value) return
  // Mock AI interaction
  console.log('Asking AI:', query.value)
  query.value = ''
}
</script>

<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all relative group"
    >
      <Sparkles class="w-5 h-5" />
      <span class="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
    </button>

    <div v-if="isOpen" class="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden flex flex-col">
      <div class="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-primary-50 to-white flex items-center gap-2">
        <Bot class="w-5 h-5 text-primary-600" />
        <span class="font-semibold text-slate-900">Noeia AI Assistant</span>
      </div>
      
      <div class="p-4 h-64 bg-slate-50 overflow-y-auto flex flex-col gap-3">
        <div class="flex gap-2">
          <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <Bot class="w-4 h-4 text-primary-600" />
          </div>
          <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600">
            Hello! I can help you find information, generate reports, or answer questions about your practice. How can I assist you today?
          </div>
        </div>
      </div>

      <div class="p-3 border-t border-slate-100 bg-white">
        <div class="relative">
          <input 
            v-model="query"
            type="text" 
            placeholder="Ask anything..." 
            class="w-full pl-4 pr-10 py-2 rounded-full border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
            @keydown.enter="askAI"
          />
          <button 
            @click="askAI"
            class="absolute right-1 top-1 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            <Send class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-40"></div>
  </div>
</template>
