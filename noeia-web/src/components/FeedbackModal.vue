<script setup lang="ts">
import { ref } from 'vue'
import { Lightbulb, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'update:isOpen'])

// We use a computed or watcher to sync isOpen with internal state if needed,
// but Dialog works best with v-model:open or binding :open.
// Since the parent uses :is-open, we should handle update:open event usually.
// But here the parent just passes :is-open and listens to @close.
// We can wrap it.

function handleOpenChange(value: boolean) {
  if (!value) emit('close')
}

const activeTab = ref<'issue' | 'idea'>('issue')
const feedback = ref('')
const email = ref('')

function submit() {
  console.log('Submitting feedback:', { type: activeTab.value, feedback: feedback.value, email: email.value })
  feedback.value = ''
  emit('close')
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Share Feedback</DialogTitle>
        <DialogDescription>
          Help us improve the product.
        </DialogDescription>
      </DialogHeader>
      
      <Tabs default-value="issue" v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="issue" class="flex items-center gap-2">
            <AlertCircle class="w-4 h-4" />
            Report Issue
          </TabsTrigger>
          <TabsTrigger value="idea" class="flex items-center gap-2">
            <Lightbulb class="w-4 h-4" />
            Share Idea
          </TabsTrigger>
        </TabsList>
        
        <div class="py-4 space-y-4">
          <div class="space-y-2">
            <Label for="feedback">
              {{ activeTab === 'issue' ? 'What went wrong?' : 'What is your idea?' }}
            </Label>
            <Textarea 
              id="feedback"
              v-model="feedback" 
              :placeholder="activeTab === 'issue' ? 'Describe the bug or issue...' : 'Tell us how we can improve...'"
              rows="4"
            />
          </div>

          <div class="space-y-2">
            <Label for="email">Email (optional)</Label>
            <Input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="you@example.com"
            />
          </div>
        </div>
      </Tabs>

      <DialogFooter>
        <Button variant="outline" @click="emit('close')">Cancel</Button>
        <Button @click="submit">Send Feedback</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
