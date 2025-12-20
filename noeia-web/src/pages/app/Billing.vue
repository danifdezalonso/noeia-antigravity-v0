<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Search, Download, CheckCircle, Clock, Eye, EyeOff, Plus, MoreHorizontal, Edit, Share2, Info, X, Trash2, Check, Minus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'  
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import DatePicker from '@/components/DatePicker.vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/toast/use-toast'
import InvoiceModal from '@/components/org/InvoiceModal.vue'
import BillingTrendChart from '@/components/org/BillingTrendChart.vue'

const { toast } = useToast()

// ... (Mock Data & Filters - unchanged) ...
// NOTE: I am not replacing the whole file, just the top imports and then appending helper.
// But since this tool is replace_file_content, I must match existing content.
// I will target the imports block specifically.

// ... (skipping to helpers addition at the bottom) ...


// --- Mock Data: Sessions ---
type SessionType = 'Online' | 'In-Person' | 'Group'
type SessionStatus = 'Paid' | 'Pending'
type PaymentMode = 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Insurance' | 'Stripe'

interface Session {
  id: string
  date: string
  patient: string
  patientInitials: string
  type: SessionType
  duration: number // minutes
  amount: number
  status: SessionStatus
  paymentMode?: PaymentMode
}

const sessions = ref<Session[]>([
  // Current Month (Dec 2025)
  { id: 'SES-201', date: '2025-12-02', patient: 'Sarah Johnson', patientInitials: 'SJ', type: 'Online', duration: 60, amount: 80, status: 'Paid', paymentMode: 'Stripe' },
  { id: 'SES-202', date: '2025-12-05', patient: 'Michael Brown', patientInitials: 'MB', type: 'In-Person', duration: 50, amount: 100, status: 'Pending' },
  { id: 'SES-203', date: '2025-12-08', patient: 'Emma Wilson', patientInitials: 'EW', type: 'Online', duration: 60, amount: 80, status: 'Paid', paymentMode: 'Credit Card' },
  { id: 'SES-204', date: '2025-12-10', patient: 'Sarah Johnson', patientInitials: 'SJ', type: 'Group', duration: 90, amount: 40, status: 'Pending' },
  { id: 'SES-205', date: '2025-12-12', patient: 'David Lee', patientInitials: 'DL', type: 'In-Person', duration: 50, amount: 100, status: 'Paid', paymentMode: 'Cash' },
  { id: 'SES-206', date: '2025-12-15', patient: 'Michael Brown', patientInitials: 'MB', type: 'Online', duration: 60, amount: 80, status: 'Pending' },
  
  // Previous Month (Nov 2025) - Should be filtered out by default
  { id: 'SES-101', date: '2025-11-01', patient: 'Sarah Johnson', patientInitials: 'SJ', type: 'Online', duration: 60, amount: 80, status: 'Paid', paymentMode: 'Stripe' },
  { id: 'SES-102', date: '2025-11-03', patient: 'Michael Brown', patientInitials: 'MB', type: 'In-Person', duration: 50, amount: 100, status: 'Pending' },
])

// --- Filters ---
const searchQuery = ref('')
const selectedPatient = ref('all')
const selectedType = ref('all')
const selectedStatus = ref('all') 

// Commission Rate (Mocked from settings/profile)
const commissionRate = ref(0.40)

// Date State
const todayObj = today(getLocalTimeZone())
const firstDayObj = todayObj.set({ day: 1 })

const startDate = ref<DateValue | undefined>(firstDayObj)
const endDate = ref<DateValue | undefined>(todayObj)

const distinctPatients = computed(() => [...new Set(sessions.value.map(s => s.patient))])
const sessionTypes: SessionType[] = ['Online', 'In-Person', 'Group']
const statuses: SessionStatus[] = ['Paid', 'Pending']

const filteredSessions = computed(() => {
  return sessions.value.filter(session => {
    // 1. Search Query
    const matchesSearch = 
      session.patient.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      session.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // 2. Patient Filter
    const matchesPatient = selectedPatient.value === 'all' || session.patient === selectedPatient.value

    // 3. Type Filter
    const matchesType = selectedType.value === 'all' || session.type === selectedType.value

    // 4. Status Filter
    const matchesStatus = selectedStatus.value === 'all' || session.status === selectedStatus.value

    // 5. Date Range Filter
    let matchesDate = true
    if (startDate.value && endDate.value) {
       // Convert session date string (YYYY-MM-DD) to comparable value or compare strings
       // session.date is YYYY-MM-DD. DateValue.toString() is also YYYY-MM-DD for CalendarDate.
       const sDate = session.date
       const startStr = startDate.value.toString()
       const endStr = endDate.value.toString()
       matchesDate = sDate >= startStr && sDate <= endStr
    } else if (startDate.value) {
       const sDate = session.date
       const startStr = startDate.value.toString()
       matchesDate = sDate >= startStr
    }
    
    return matchesSearch && matchesPatient && matchesType && matchesStatus && matchesDate
  })
})

// --- Charts & Stats ---
// Logic copied/adapted from OrganizationBilling
const summary = computed(() => {
  const total = sessions.value.reduce((sum, s) => sum + s.amount, 0)
  const paid = sessions.value.filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.amount, 0)
  const pending = sessions.value.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.amount, 0)
  // Pending effectively acts as overdue if late, keeping simple stats for now
  return { total, paid, pending }
})

const generateTrend = (length: number, min: number, max: number) => {
  return Array.from({ length }, (_, i) => ({ x: i + 1, y: Math.floor(Math.random() * (max - min + 1)) + min }))
}

const trends = ref({
  total: generateTrend(10, 500, 2000),
  paid: generateTrend(10, 300, 1500),
  pending: generateTrend(10, 50, 400),
})

const cardVisibility = reactive<Record<string, boolean>>({
  total: true,
  paid: true,
  pending: true,
})

// --- Multi-Select State ---
const selectedSessionIds = ref<string[]>([])

// Computed: Are ALL currently filtered sessions selected?
const allFilteredSelected = computed(() => {
  const filtered = filteredSessions.value
  if (filtered.length === 0) return false
  // Check if every filtered session ID is in the selected array
  return filtered.every(s => selectedSessionIds.value.includes(s.id))
})

// Computed: Are SOME (but not all) currently filtered sessions selected?
const someFilteredSelected = computed(() => {
  const filtered = filteredSessions.value
  if (filtered.length === 0) return false
  const selectedCountInView = filtered.filter(s => selectedSessionIds.value.includes(s.id)).length
  return selectedCountInView > 0 && selectedCountInView < filtered.length
})


// Handler: Row Selection
// Robust Toggle: If selected -> Remove. Else -> Add.
// --- Selection Logic ---
function handleSelectAll(checked: boolean | 'indeterminate') {
  // Explicit Strategy: Trust the 'checked' value from the checkbox event.
  // If true or indeterminate (some inputs allow this), we want to select all.
  const shouldSelectAll = checked === true || checked === 'indeterminate'

  const filteredIds = filteredSessions.value.map(s => s.id)
  
  if (shouldSelectAll) {
    // Union current selection with all filtered IDs
    const newSet = new Set(selectedSessionIds.value)
    filteredIds.forEach(id => newSet.add(id))
    selectedSessionIds.value = Array.from(newSet)
  } else {
    // Remove all filtered IDs from current selection
    const filteredSet = new Set(filteredIds)
    selectedSessionIds.value = selectedSessionIds.value.filter(id => !filteredSet.has(id))
  }
}

function handleRowSelect(id: string) {
  // Robust Toggle: Check if ID is in the array, avoiding Set for reactivity simplicity
  if (selectedSessionIds.value.includes(id)) {
    selectedSessionIds.value = selectedSessionIds.value.filter(existingId => existingId !== id)
  } else {
    // Always assign a NEW array to force reactivity
    selectedSessionIds.value = [...selectedSessionIds.value, id]
  }
}

// Debug Watcher removed

const summaryCards = computed(() => [
  { 
    key: 'total', 
    title: 'Total Billed (Month)', 
    value: summary.value.total, 
    valueColor: '', 
    trend: trends.value.total, 
    chartColor: '#0ea5e9',
    isVisible: cardVisibility.total 
  },
  { 
    key: 'paid', 
    title: 'Paid', 
    value: summary.value.paid, 
    valueColor: 'text-green-600', 
    trend: trends.value.paid, 
    chartColor: '#16a34a',
    isVisible: cardVisibility.paid
  },
  { 
    key: 'pending', 
    title: 'Pending', 
    value: summary.value.pending, 
    valueColor: 'text-orange-500', 
    trend: trends.value.pending, 
    chartColor: '#f97316',
    isVisible: cardVisibility.pending
  },
])

function toggleCardVisibility(key: string) {
  cardVisibility[key] = !cardVisibility[key]
}

// --- Consolidated Billing Logic ---
const isConsolidatedModalOpen = ref(false)
const consolidatedInvoiceData = ref<any>(null)

function handleCreateConsolidatedBill() {
  if (filteredSessions.value.length === 0) {
    toast({
      title: "No sessions to bill",
      description: "Please adjust your filters to view eligible sessions.",
      variant: "destructive"
    })
    return
  }

  // Group by type
  const groups: Record<string, { count: number, totalAmount: number, description: string, price: number }> = {}
  let totalGross = 0

  filteredSessions.value.forEach(session => {
    const key = `${session.type}-${session.amount}`
    if (!groups[key]) {
      groups[key] = {
        count: 0,
        totalAmount: 0,
        description: `${session.duration}min. session ${session.type.toLowerCase()}`,
        price: session.amount
      }
    }
    groups[key].count++
    groups[key].totalAmount += session.amount
    totalGross += session.amount
  })

  // Create Service Items
  const invoiceItems = Object.values(groups).map((g, index) => ({
    id: `item-${index}`,
    description: `${g.description} (Qty: ${g.count})`,
    qty: g.count,
    rate: g.price,
    amount: g.totalAmount
  }))
  
  // Calculate Commission Deduction
  const commissionAmount = totalGross * commissionRate.value
  
  // Add Commission Line Item
  invoiceItems.push({
    id: 'commission-deduction',
    description: `Clinic Commission (${(commissionRate.value * 100).toFixed(0)}%)`,
    qty: 1,
    rate: -commissionAmount,
    amount: -commissionAmount
  })

  const totalNet = totalGross - commissionAmount

  consolidatedInvoiceData.value = {
    id: `INV-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toISOString().split('T')[0],
    
    patient: selectedPatient.value !== 'all' ? selectedPatient.value : 'Multiple Patients',
    patientInitials: selectedPatient.value !== 'all' ? selectedPatient.value.substring(0,2).toUpperCase() : 'MP',
    
    items: invoiceItems, 
    amount: totalNet,
    status: 'Draft',
    doctor: 'Dr. You', 
    doctorInitials: 'YO',
    taxRate: 0 
  }

  isConsolidatedModalOpen.value = true
}

// --- Actions & Helpers ---
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-700 hover:bg-green-100 border-transparent'
    case 'Pending': return 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-transparent'
    default: return 'bg-slate-100 text-slate-700 hover:bg-slate-100 border-transparent'
  }
}

function handleDownload(session: Session) {
  toast({
    title: "Download Started",
    description: `Downloading bill for session ${session.id}...`,
  })
}

function handleDownloadAll(forceAll = false) {
  // If forceAll is true (from global header menu) OR nothing is selected -> Download All Filtered
  const count = selectedSessionIds.value.length
  if (count > 0 && forceAll !== true && typeof forceAll !== 'object') { 
     // check typeof object because event object might be passed if called without args from template
      toast({
        title: "Bulk Download Started",
        description: `Downloading ${count} selected bills as a ZIP file...`,
      })
  } else {
      // Default behavior if nothing selected OR forced all: download all filtered
       toast({
        title: "Bulk Download Started",
        description: `Downloading all ${filteredSessions.value.length} bills as a ZIP file...`,
      })
  }
}

function handleSaveConsolidated(invoice: any) {
  toast({
    title: "Consolidated Bill Created",
    description: `Invoice ${invoice.id} created for €${invoice.amount}.`,
  })
  isConsolidatedModalOpen.value = false
}

const totalFilteredAmount = computed(() => {
  return filteredSessions.value.reduce((sum, session) => sum + session.amount, 0)
})

// ... (Helpers)


const totalCommission = computed(() => totalFilteredAmount.value * commissionRate.value)
const totalBillable = computed(() => totalFilteredAmount.value - totalCommission.value)

// ...

// Table Columns Update in Template
/*
<TableHead>ID</TableHead>
<TableHead>Date</TableHead>
<TableHead>Patient</TableHead>
<TableHead>Type</TableHead>
<TableHead>Payment Mode</TableHead>
<TableHead class="text-right">Amount</TableHead>
<TableHead class="text-right">Clinic %</TableHead> 
<TableHead class="text-right">Billable</TableHead>
<TableHead>Status</TableHead>
<TableHead class="text-right">Actions</TableHead>
*/

// Table Row Update in Template
/*
<TableCell class="font-medium text-right">€{{ session.amount }}</TableCell>
<TableCell class="text-right text-muted-foreground">€{{ (session.amount * commissionRate).toFixed(2) }}</TableCell>
<TableCell class="font-bold text-right">€{{ (session.amount * (1 - commissionRate)).toFixed(2) }}</TableCell>
*/

// Table Footer Update in Template
/*
<TableRow v-else class="bg-muted/50 font-bold hover:bg-muted/50">
  <TableCell colspan="5" class="text-right py-4">Totals:</TableCell>
  <TableCell class="text-right py-4">€{{ totalFilteredAmount.toLocaleString() }}</TableCell>
  <TableCell class="text-right py-4 text-muted-foreground">€{{ totalCommission.toLocaleString() }}</TableCell>
  <TableCell class="text-right py-4">€{{ totalBillable.toLocaleString() }}</TableCell>
  <TableCell colspan="2"></TableCell>
</TableRow>
*/


</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Billing & Sessions</h2>
        <p class="text-muted-foreground">Manage your sessions and billing for this month.</p>
      </div>
      <div class="flex items-center space-x-2">
         <Button variant="outline" @click="handleDownloadAll">
          <Download class="mr-2 h-4 w-4" />
          Download All
        </Button>
        <Button class="bg-blue-600 hover:bg-blue-700" @click="handleCreateConsolidatedBill">
           <Plus class="mr-2 h-4 w-4" />
           Create Consolidated Bill
        </Button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card v-for="card in summaryCards" :key="card.key">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ card.title }}</CardTitle>
          <div class="flex items-center gap-1">
            <Button variant="ghost" size="icon" class="h-6 w-6 text-muted-foreground hover:text-foreground" @click="toggleCardVisibility(card.key as any)">
              <component :is="card.isVisible ? Eye : EyeOff" class="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
           <div :class="{ 'blur-md select-none': !card.isVisible, 'transition-all duration-300': true }">
            <div class="text-2xl font-bold" :class="card.valueColor">€{{ card.value.toLocaleString() }}</div>
            <BillingTrendChart :data="card.trend" :color="card.chartColor" class="mt-3" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search patient..." 
          class="pl-9 bg-white"
        />
      </div>

      <!-- Filters Row -->
       <Select v-model="selectedPatient">
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="All Patients" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            <SelectItem v-for="p in distinctPatients" :key="p" :value="p">{{ p }}</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedType">
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="All Session Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem v-for="t in sessionTypes" :key="t" :value="t">{{ t }}</SelectItem>
          </SelectContent>
        </Select>
        
         <Select v-model="selectedStatus">
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem v-for="s in statuses" :key="s" :value="s">{{ s }}</SelectItem>
          </SelectContent>
        </Select>
    </div>
    
    <!-- Date Filter -->
    <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <DatePicker v-model="startDate" placeholder="Start date" class="w-[180px]" />
          <span class="text-muted-foreground">-</span>
          <DatePicker v-model="endDate" placeholder="End date" class="w-[180px]" />
        </div>
    </div>

    <!-- Sessions Table -->
    <Card>
      <div class="rounded-md border-none overflow-x-auto relative">
        <Table class="min-w-[1200px]">
          <TableHeader>
            <TableRow class="bg-muted/50 hover:bg-muted/50">
              <TableHead class="w-[40px]">
                <div 
                  @click="handleSelectAll(!allFilteredSelected)" 
                  class="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow flex items-center justify-center transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground': allFilteredSelected || someFilteredSelected,
                    'opacity-50 cursor-not-allowed': false
                  }"
                >
                  <Check v-if="allFilteredSelected && !someFilteredSelected" class="h-3 w-3 text-white" />
                  <Minus v-if="someFilteredSelected" class="h-3 w-3 text-white" />
                </div>
              </TableHead>
              <TableHead class="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead class="text-right">Amount</TableHead>
              <TableHead class="text-right flex items-center justify-end gap-1">
                 Clinic %
                 <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info class="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clinic Commission: {{ (commissionRate * 100).toFixed(0) }}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead class="text-right">Billable</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right sticky right-0 bg-muted/50 z-20 shadow-[-5px_0px_10px_-5px_rgba(0,0,0,0.1)]">
                <div class="flex items-center justify-end gap-2 px-2">
                  <!-- Selection Menu (Visible when items selected) -->
                   <DropdownMenu v-if="selectedSessionIds.length > 0">
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 px-2 hover:bg-transparent text-xs font-medium text-orange-600">
                         {{ selectedSessionIds.length }} selected
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="handleDownloadAll()">
                        <Download class="mr-2 h-4 w-4" />
                        <span>Download {{ selectedSessionIds.length }} Bills</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 class="mr-2 h-4 w-4" />
                        <span>Share {{ selectedSessionIds.length }} Bills</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem class="text-red-600 focus:text-red-600 focus:bg-red-50">
                        <Trash2 class="mr-2 h-4 w-4" />
                        <span>Delete {{ selectedSessionIds.length }} Bills</span>
                      </DropdownMenuItem>
                       <DropdownMenuItem @click="selectedSessionIds = []">
                        <X class="mr-2 h-4 w-4" />
                        <span>Clear Selection</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <!-- Global Actions Menu -->
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 w-8 p-0">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="() => handleDownloadAll(true)">
                        <Download class="mr-2 h-4 w-4" />
                        <span>Download All Bills</span>
                      </DropdownMenuItem>
                      <!-- Add more global actions here in the future -->
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="session in filteredSessions" :key="session.id" class="group">
              <TableCell>
                <div 
                  @click.stop="() => handleRowSelect(session.id)" 
                  class="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow flex items-center justify-center transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground': selectedSessionIds.includes(session.id),
                    'opacity-50 cursor-not-allowed': false
                  }"
                >
                  <Check v-if="selectedSessionIds.includes(session.id)" class="h-3 w-3 text-white" />
                </div>
              </TableCell>
              <TableCell class="font-medium font-mono text-xs">{{ session.id }}</TableCell>
              <TableCell class="text-muted-foreground text-sm">{{ formatDate(session.date) }}</TableCell>
              
              <TableCell>
                <div class="flex items-center gap-2">
                   <Avatar class="h-6 w-6">
                    <AvatarFallback class="bg-primary-50 text-primary-700 text-[10px]">{{ session.patientInitials }}</AvatarFallback>
                  </Avatar>
                  <span class="font-medium text-sm">{{ session.patient }}</span>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge variant="outline" class="font-normal text-xs">{{ session.type }}</Badge>
              </TableCell>

               <TableCell class="text-sm">
                 <span v-if="session.paymentMode" class="text-slate-700">{{ session.paymentMode }}</span>
                 <span v-else class="text-muted-foreground italic">-</span>
              </TableCell>
              
              <TableCell class="font-medium text-right">€{{ session.amount }}</TableCell>
              <TableCell class="text-right text-muted-foreground">€{{ (session.amount * commissionRate).toFixed(2) }}</TableCell>
              <TableCell class="font-bold text-right">€{{ (session.amount * (1 - commissionRate)).toFixed(2) }}</TableCell>
              
              <TableCell>
                 <Badge 
                  variant="outline"
                  class="gap-1 font-normal"
                  :class="getStatusColor(session.status)"
                >
                  <CheckCircle v-if="session.status === 'Paid'" class="w-3 h-3" />
                  <Clock v-if="session.status === 'Pending'" class="w-3 h-3" />
                  {{ session.status }}
                </Badge>
              </TableCell>
              
              <TableCell class="text-right sticky right-0 bg-background group-hover:bg-muted/50 z-10 shadow-[-5px_0px_10px_-5px_rgba(0,0,0,0.1)]">
                <div class="px-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 w-8 p-0">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="handleDownload(session)">
                        <Download class="mr-2 h-4 w-4" />
                        <span>Download Bill</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit class="mr-2 h-4 w-4" />
                        <span>Edit Session</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 class="mr-2 h-4 w-4" />
                        <span>Share</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
            
            <TableRow v-if="filteredSessions.length === 0">
              <TableCell colspan="10" class="h-24 text-center text-muted-foreground">
                No sessions found matching your filters.
              </TableCell>
            </TableRow>
            <TableRow v-else class="bg-muted/50 font-bold hover:bg-muted/50">
              <TableCell colspan="6" class="text-right py-4">Totals:</TableCell>
              <TableCell class="text-right py-4">€{{ totalFilteredAmount.toLocaleString() }}</TableCell>
              <TableCell class="text-right py-4 text-muted-foreground">€{{ totalCommission.toLocaleString() }}</TableCell>
              <TableCell class="text-right py-4">€{{ totalBillable.toLocaleString() }}</TableCell>
              <TableCell colspan="2"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>

    <!-- Consolidated Invoice Modal (using InvoiceModal in 'edit' mode but with new items) -->
    <!-- We might need to enhance InvoiceModal to accept 'initialItems' if it overrides them on 'updated', 
         but based on previous implementation it takes an 'invoice' prop which we are mocking. -->
    <InvoiceModal 
      v-if="isConsolidatedModalOpen"
      :is-open="isConsolidatedModalOpen" 
      :invoice="consolidatedInvoiceData" 
      :doctors="['Dr. You']"
      @close="isConsolidatedModalOpen = false"
      @save="handleSaveConsolidated"
    />

  </div>
</template>
