```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Filter, Download, MoreVertical, Plus, FileText, Pencil } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import InvoiceEditor from '@/components/InvoiceEditor.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { enrichedInvoices } = storeToRefs(store)

const searchQuery = ref('')
const statusFilter = ref('All')
const isEditorOpen = ref(false)
const selectedInvoiceId = ref<string | null>(null)

const filteredInvoices = computed(() => {
  return enrichedInvoices.value.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          invoice.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || invoice.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

function openEditor(invoiceId: string | null = null) {
  selectedInvoiceId.value = invoiceId
  isEditorOpen.value = true
}

function handleSaveInvoice() {
  // Store updates are handled inside the component, just refresh if needed or show toast
  console.log('Invoice saved')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Billing</h1>
        <p class="text-slate-500">Manage invoices and payments.</p>
      </div>
      <Button @click="openEditor()">
        <Plus class="w-4 h-4 mr-2" />
        Create Invoice
      </Button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm font-medium text-slate-500 mb-2">Total Revenue (This Month)</div>
        <div class="text-3xl font-bold text-slate-900">€3,240.00</div>
        <div class="text-sm text-green-600 mt-2 flex items-center">
          <span class="bg-green-100 px-1.5 py-0.5 rounded text-xs font-medium mr-2">+12%</span>
          vs last month
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm font-medium text-slate-500 mb-2">Pending Payments</div>
        <div class="text-3xl font-bold text-slate-900">€850.00</div>
        <div class="text-sm text-slate-500 mt-2">5 invoices pending</div>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm font-medium text-slate-500 mb-2">Overdue</div>
        <div class="text-3xl font-bold text-slate-900">€120.00</div>
        <div class="text-sm text-red-600 mt-2">1 invoice overdue</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search invoices..." 
          class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex items-center gap-2">
        <Filter class="w-4 h-4 text-slate-400" />
        <select 
          v-model="statusFilter"
          class="text-sm border-none bg-transparent focus:ring-0 text-slate-600 font-medium cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th class="px-6 py-3">Invoice ID</th>
              <th class="px-6 py-3">Client</th>
              <th class="px-6 py-3">Date</th>
              <th class="px-6 py-3">Amount</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="invoice in filteredInvoices" :key="invoice.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-medium text-slate-900">
                <div class="flex items-center gap-2">
                  <FileText class="w-4 h-4 text-slate-400" />
                  {{ invoice.id }}
                </div>
              </td>
              <td class="px-6 py-4 text-slate-900">
                {{ invoice.clientName }}
              </td>
              <td class="px-6 py-4 text-slate-600">
                {{ new Date(invoice.date).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 font-medium text-slate-900">
                €{{ invoice.total.toFixed(2) }}
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': invoice.status === 'Paid',
                    'bg-amber-100 text-amber-700': invoice.status === 'Pending',
                    'bg-red-100 text-red-700': invoice.status === 'Overdue',
                    'bg-slate-100 text-slate-700': invoice.status === 'Draft'
                  }"
                >
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right flex items-center justify-end gap-2">
                <button 
                  @click="openEditor(invoice.id)"
                  class="p-2 text-slate-400 hover:text-primary-600 rounded-full hover:bg-primary-50 transition-colors"
                  title="Edit Invoice"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors" title="Download PDF">
                  <Download class="w-4 h-4" />
                </button>
                <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                  <MoreVertical class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredInvoices.length === 0" class="p-12 text-center">
        <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search class="w-6 h-6 text-slate-400" />
        </div>
        <h3 class="text-lg font-medium text-slate-900 mb-1">No invoices found</h3>
        <p class="text-slate-500">Try adjusting your search or filters.</p>
      </div>
    </div>

    <InvoiceEditor 
      :is-open="isEditorOpen"
      :invoice-id="selectedInvoiceId"
      @close="isEditorOpen = false"
      @save="handleSaveInvoice"
    />
  </div>
</template>
