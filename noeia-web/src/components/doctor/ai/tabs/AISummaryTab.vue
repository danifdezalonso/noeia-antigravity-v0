<script setup lang="ts">
import { ref } from 'vue'
import { RefreshCw, AlertTriangle } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const lastRegenerated = ref(new Date())
const isRegenerating = ref(false)

function regenerate() {
  isRegenerating.value = true
  setTimeout(() => {
    lastRegenerated.value = new Date()
    isRegenerating.value = false
  }, 2000)
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="text-xs text-slate-500">
        Last regenerated: {{ lastRegenerated.toLocaleString() }}
      </div>
      <Button variant="outline" size="sm" @click="regenerate" :disabled="isRegenerating">
        <RefreshCw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isRegenerating }" />
        Regenerate Summary
      </Button>
    </div>

    <!-- Risk Indicators -->
    <div class="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <h3 class="text-sm font-medium text-amber-900">Risk Indicators Detected</h3>
        <p class="text-sm text-amber-700 mt-1">Patient mentioned increased sleep disturbance. Monitor for potential depressive episode recurrence.</p>
      </div>
    </div>

    <!-- Summary Content -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
      <div class="prose prose-slate max-w-none">
        <h3>Session Overview</h3>
        <p>The patient reported feeling "overwhelmed" by work responsibilities but noted improvement in managing social anxiety. Discussed recent conflicts with colleagues and explored coping mechanisms.</p>
        
        <h3>Key Themes</h3>
        <ul>
          <li>Workplace stress and boundaries</li>
          <li>Social anxiety triggers</li>
          <li>Sleep hygiene</li>
        </ul>

        <h3>Interventions Used</h3>
        <ul>
          <li>Cognitive Restructuring (CBT)</li>
          <li>Mindfulness-based stress reduction</li>
          <li>Role-playing difficult conversations</li>
        </ul>

        <h3>Plan</h3>
        <p>Continue monitoring sleep patterns. Patient to practice "pause and breathe" technique daily. Next session to focus on family dynamics.</p>
      </div>
    </div>
  </div>
</template>
