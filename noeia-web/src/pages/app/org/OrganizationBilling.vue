<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Filter, Download, CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-vue-next'

// Mock Data
const invoices = ref([
  { id: 'INV-001', patient: 'Sarah Johnson', doctor: 'Dr. Anna Ruiz', amount: 120, status: 'Paid', date: '2023-10-25' },
  { id: 'INV-002', patient: 'Michael Brown', doctor: 'Dr. Marc Vidal', amount: 90, status: 'Pending', date: '2023-10-24' },
  { id: 'INV-003', patient: 'Emma Wilson', doctor: 'Dr. Júlia Serra', amount: 150, status: 'Paid', date: '2023-10-23' },
  { id: 'INV-004', patient: 'David Lee', doctor: 'Dr. Omar López', amount: 110, status: 'Overdue', date: '2023-10-15' },
  { id: 'INV-005', patient: 'Laura P.', doctor: 'Dr. Anna Ruiz', amount: 120, status: 'Paid', date: '2023-10-22' },
  { id: 'INV-006', patient: 'Hugo G.', doctor: 'Dr. Marc Vidal', amount: 90, status: 'Pending', date: '2023-10-21' },
])

// Filters
const searchQuery = ref('')
const selectedDoctor = ref('')
const selectedStatus = ref('')

const doctors = ['Dr. Anna Ruiz', 'Dr. Marc Vidal', 'Dr. Júlia Serra', 'Dr. Omar López']
const statuses = ['Paid', 'Pending', 'Overdue']

const filteredInvoices = computed(() => {
  return invoices.value.filter(inv => {
    const matchesSearch = inv.patient.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          inv.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDoctor = !selectedDoctor.value || inv.doctor === selectedDoctor.value
    const matchesStatus = !selectedStatus.value || inv.status === selectedStatus.value
    
    return matchesSearch && matchesDoctor && matchesStatus
  })
})

const summary = computed(() => {
  const total = filteredInvoices.value.reduce((sum, inv) => sum + inv.amount, 0)
  const paid = filteredInvoices.value.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pending = filteredInvoices.value.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0)
  const overdue = filteredInvoices.value.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0)
  return { total, paid, pending, overdue }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-700'
    case 'Pending': return 'bg-orange-100 text-orange-700'
    case 'Overdue': return 'bg-red-100 text-red-700'
    default: return 'bg-slate-100 text-slate-700'
  }
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
      <button class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
        <Download class="w-4 h-4" />
        Export Report
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm text-slate-500 mb-1">Total Billed</div>
        <div class="text-2xl font-bold text-slate-900">€{{ summary.total.toLocaleString() }}</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm text-slate-500 mb-1">Paid</div>
        <div class="text-2xl font-bold text-green-600">€{{ summary.paid.toLocaleString() }}</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm text-slate-500 mb-1">Pending</div>
        <div class="text-2xl font-bold text-orange-500">€{{ summary.pending.toLocaleString() }}</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-sm text-slate-500 mb-1">Overdue</div>
        <div class="text-2xl font-bold text-red-600">€{{ summary.overdue.toLocaleString() }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search invoice or patient..." 
          class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
      <div class="flex gap-4">
        <select 
          v-model="selectedDoctor"
          class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Doctors</option>
          <option v-for="doc in doctors" :key="doc" :value="doc">{{ doc }}</option>
        </select>
        <select 
          v-model="selectedStatus"
          class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- List -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-4 font-semibold text-slate-700">Invoice ID</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Patient</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Doctor</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Date</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Amount</th>
              <th class="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th class="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="invoice in filteredInvoices" :key="invoice.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-medium text-slate-900">{{ invoice.id }}</td>
              <td class="px-6 py-4 text-slate-600">{{ invoice.patient }}</td>
              <td class="px-6 py-4 text-slate-600">{{ invoice.doctor }}</td>
              <td class="px-6 py-4 text-slate-600">{{ formatDate(invoice.date) }}</td>
              <td class="px-6 py-4 font-medium text-slate-900">€{{ invoice.amount }}</td>
              <td class="px-6 py-4">
                <span 
                  class="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"
                  :class="getStatusColor(invoice.status)"
                >
                  <CheckCircle v-if="invoice.status === 'Paid'" class="w-3 h-3" />
                  <Clock v-if="invoice.status === 'Pending'" class="w-3 h-3" />
                  <AlertCircle v-if="invoice.status === 'Overdue'" class="w-3 h-3" />
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-primary-600 hover:text-primary-700 font-medium text-xs">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredInvoices.length === 0" class="p-8 text-center text-slate-500">
        No invoices found matching your filters.
      </div>
    </div>
  </div>
</template>
