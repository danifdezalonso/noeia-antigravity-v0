<script setup lang="ts">
import { CreditCard, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Billing Status</h3>
      <button class="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
        Details <ExternalLink class="w-3 h-3" />
      </button>
    </div>
    <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
        <CreditCard class="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <div class="text-sm font-medium text-emerald-900">Paid</div>
        <div class="text-xs text-emerald-600">Invoice #INV-2024-001</div>
      </div>
    </div>
  </div>
</template>
