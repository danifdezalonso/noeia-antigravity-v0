<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Filter, Download, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Mock Data for Client Billing
const invoices = ref([
  { id: 101, date: '2023-10-15', amount: 120.00, status: 'Paid', description: 'Therapy Session' },
  { id: 102, date: '2023-10-22', amount: 120.00, status: 'Pending', description: 'Therapy Session' },
  { id: 103, date: '2023-10-29', amount: 120.00, status: 'Pending', description: 'Therapy Session' },
  { id: 104, date: '2023-10-01', amount: 120.00, status: 'Paid', description: 'Initial Consultation' },
])

// Summary Metrics
const pendingAmount = computed(() => {
  return invoices.value
    .filter(i => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.amount, 0)
})

// Filters
const searchQuery = ref('')
const statusFilter = ref('All')

const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => {
    const matchesSearch = invoice.id.toString().includes(searchQuery.value) || 
                          invoice.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || invoice.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

function getStatusColor(status: string) {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-700'
    case 'Pending': return 'bg-yellow-100 text-yellow-700'
    case 'Overdue': return 'bg-red-100 text-red-700'
    default: return 'bg-slate-100 text-slate-700'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Billing & Invoices</h1>
      <p class="text-slate-500">View your payment history and pending invoices.</p>
    </div>

    <!-- Summary Card -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
          <Clock class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Pending Payments</p>
          <h3 class="text-2xl font-bold text-slate-900">${{ pendingAmount.toFixed(2) }}</h3>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search invoices..." 
          class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex gap-2">
        <select 
          v-model="statusFilter"
          class="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </div>

    <!-- Invoices List -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table class="w-full text-left text-sm">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-6 py-4 font-semibold text-slate-700">Invoice ID</th>
            <th class="px-6 py-4 font-semibold text-slate-700">Date</th>
            <th class="px-6 py-4 font-semibold text-slate-700">Description</th>
            <th class="px-6 py-4 font-semibold text-slate-700">Amount</th>
            <th class="px-6 py-4 font-semibold text-slate-700">Status</th>
            <th class="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="invoice in filteredInvoices" :key="invoice.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 font-medium text-slate-900">#INV-{{ invoice.id }}</td>
            <td class="px-6 py-4 text-slate-600">{{ invoice.date }}</td>
            <td class="px-6 py-4 text-slate-600">{{ invoice.description }}</td>
            <td class="px-6 py-4 font-medium text-slate-900">${{ invoice.amount.toFixed(2) }}</td>
            <td class="px-6 py-4">
              <span :class="['px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusColor(invoice.status)]">
                {{ invoice.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-slate-400 hover:text-primary-600 transition-colors">
                <Download class="w-4 h-4" />
              </button>
            </td>
          </tr>
          <tr v-if="filteredInvoices.length === 0">
            <td colspan="6" class="px-6 py-8 text-center text-slate-500">
              No invoices found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
