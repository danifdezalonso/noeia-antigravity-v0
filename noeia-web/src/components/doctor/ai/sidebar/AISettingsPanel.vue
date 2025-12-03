<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const isOpen = ref(false)
const depth = ref('standard')
const tone = ref('clinical')
const focus = ref(['symptoms', 'interventions'])
</script>

<template>
  <div>
    <button 
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between mb-3 group"
    >
      <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">AI Settings</h3>
      <component :is="isOpen ? ChevronUp : ChevronDown" class="w-3 h-3 text-slate-400" />
    </button>
    
    <div v-if="isOpen" class="space-y-4 animate-in slide-in-from-top-2 duration-200">
      <!-- Depth -->
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1.5">Summary Depth</label>
        <div class="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
          <button 
            v-for="opt in ['concise', 'standard', 'detailed']" 
            :key="opt"
            @click="depth = opt"
            class="text-xs py-1 rounded-md capitalize transition-all"
            :class="depth === opt ? 'bg-white text-slate-900 shadow-sm font-medium' : 'text-slate-500 hover:text-slate-700'"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <!-- Tone -->
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1.5">Tone</label>
        <select v-model="tone" class="w-full text-sm border-slate-200 rounded-md focus:ring-primary-500 focus:border-primary-500">
          <option value="clinical">Clinical</option>
          <option value="plain">Plain Language</option>
          <option value="empathetic">Empathetic</option>
        </select>
      </div>

      <!-- Focus -->
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1.5">Focus Areas</label>
        <div class="space-y-1.5">
          <label class="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" value="symptoms" v-model="focus" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500">
            Symptoms
          </label>
          <label class="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" value="interventions" v-model="focus" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500">
            Interventions
          </label>
          <label class="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" value="homework" v-model="focus" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500">
            Homework
          </label>
        </div>
      </div>

      <Button size="sm" class="w-full">Save Settings</Button>
    </div>
  </div>
</template>
