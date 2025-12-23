<script setup lang="ts">
import { Mic, RotateCcw, RotateCw, ChevronDown, Paperclip, User } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineProps<{ modelValue: string }>()
defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div class="h-full flex flex-col p-8">
     <!-- Text Area Container -->
     <div class="flex-1 flex flex-col relative">
        <textarea 
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            class="w-full flex-1 resize-none outline-none text-base text-slate-800 leading-relaxed placeholder:text-slate-400 bg-transparent"
            placeholder="Add any additional context about the patient or paste files here"
        ></textarea>
        
        <!-- Top Right Actions -->
        <div class="absolute top-0 right-0 flex items-center gap-2">
            <!-- Audio Input -->
             <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm h-9">
                 <Button variant="ghost" size="icon" class="h-7 w-8 text-slate-500 hover:text-slate-900">
                    <Mic class="w-4 h-4" />
                 </Button>
                 <div class="w-px h-4 bg-slate-200 mx-1"></div>
                 <Button variant="ghost" size="icon" class="h-7 w-6 text-slate-400 hover:text-slate-900">
                    <ChevronDown class="w-3.5 h-3.5" />
                 </Button>
             </div>

             <!-- Edit Actions -->
             <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm h-9">
                 <Button variant="ghost" size="icon" class="h-7 w-8 text-slate-400 hover:text-slate-900">
                    <RotateCcw class="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="icon" class="h-7 w-8 text-slate-400 hover:text-slate-900">
                    <RotateCw class="w-4 h-4" />
                 </Button>
                 <div class="w-px h-4 bg-slate-200 mx-1"></div>
                 <button class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-slate-400 hover:text-slate-900 rounded">
                    <span>Copy</span>
                    <ChevronDown class="w-3 h-3" />
                 </button>
             </div>
        </div>
     </div>

     <!-- Bottom Left Actions -->
     <div class="mt-4 flex items-center gap-3">
         <Button variant="outline" size="icon" class="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50">
            <User class="w-5 h-5" />
         </Button>
         <Button variant="outline" size="icon" class="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50">
             <Paperclip class="w-5 h-5" />
         </Button>
     </div>
  </div>
</template>
