<script setup lang="ts">
import SessionNavigation from './SessionNavigation.vue'
import SessionSelector from './SessionSelector.vue'
import BillingStatusCard from './BillingStatusCard.vue'
import AISettingsPanel from './AISettingsPanel.vue'
import AttachmentsList from './AttachmentsList.vue'
</script>

<template>
  <div class="w-80 bg-white border-l border-slate-200 flex flex-col overflow-y-auto shrink-0">
    <div class="p-4 space-y-6">
      <SessionNavigation />
      <hr class="border-slate-100" />
      <SessionSelector />
      <hr class="border-slate-100" />
      <BillingStatusCard />
      <hr class="border-slate-100" />
      <AISettingsPanel />
      <hr class="border-slate-100" />
      <AttachmentsList />
    </div>
  </div>
</template>
