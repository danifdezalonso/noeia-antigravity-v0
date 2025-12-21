<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { 
  Search, Download, CheckCircle, AlertCircle, Clock, MoreHorizontal, 
  FileText, Share2, Printer, Eye, EyeOff, Maximize2, Plus, 
  Settings2, GripVertical, User, Bell, ChevronRight, ChevronDown, ExternalLink
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useToast } from '@/components/ui/toast/use-toast'
import InvoiceModal from '@/components/org/InvoiceModal.vue'
import BillingTrendChart from '@/components/org/BillingTrendChart.vue'
import BillingDetailChart from '@/components/org/BillingDetailChart.vue'
import CalendarEventModal from '@/components/org/CalendarEventModal.vue'
import draggable from 'vuedraggable'
import DatePicker from '@/components/DatePicker.vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'

const { toast } = useToast()
const isCreateInvoiceModalOpen = ref(false)
const isEventModalOpen = ref(false)
const expandedDoctorIds = ref<Set<string>>(new Set())

function toggleDoctorExpansion(docId: string) {
  if (expandedDoctorIds.value.has(docId)) {
    expandedDoctorIds.value.delete(docId)
  } else {
    expandedDoctorIds.value.add(docId)
  }
}

// Table Columns Customization
const defaultColumns = [
  { id: 'id', label: 'Invoice ID', visible: true, order: 0 },
  { id: 'patient', label: 'Patient', visible: true, order: 1 },
  { id: 'doctor', label: 'Doctor', visible: true, order: 2 },
  { id: 'date', label: 'Date', visible: true, order: 3 },
  { id: 'amount', label: 'Amount', visible: true, order: 4 },
  { id: 'status', label: 'Status', visible: true, order: 5 },
  { id: 'actions', label: 'Actions', visible: true, order: 6 }
]

const columns = ref([...defaultColumns.map(c => ({...c}))])

const visibleColumns = computed(() => {
  return columns.value.filter(c => c.visible)
  // No need to sort if we rely on array order from draggable
})

function toggleColumn(id: string) {
  const col = columns.value.find(c => c.id === id)
  if (col) col.visible = !col.visible
}


// Removed moveColumn in favor of draggable

function resetColumns() {
  columns.value = defaultColumns.map(c => ({...c}))
}

// Mock Data
const invoices = ref([
  // Dec 2025 (Current Month)
  { id: 'INV-2501', patient: 'Sarah Johnson', patientInitials: 'SJ', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Paid', date: '2025-12-20' },
  { id: 'INV-2502', patient: 'Michael Brown', patientInitials: 'MB', doctor: 'Dr. Marc Vidal', doctorInitials: 'MV', amount: 90, status: 'Pending', date: '2025-12-19' },
  { id: 'INV-2503', patient: 'Emma Wilson', patientInitials: 'EW', doctor: 'Dr. Júlia Serra', doctorInitials: 'JS', amount: 150, status: 'Paid', date: '2025-12-18' },
  { id: 'INV-2504', patient: 'David Lee', patientInitials: 'DL', doctor: 'Dr. Omar López', doctorInitials: 'OL', amount: 110, status: 'Overdue', date: '2025-12-05' },
  { id: 'INV-2505', patient: 'Laura Pérez', patientInitials: 'LP', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Paid', date: '2025-12-15' },
  { id: 'INV-2506', patient: 'Hugo García', patientInitials: 'HG', doctor: 'Dr. Marc Vidal', doctorInitials: 'MV', amount: 90, status: 'Pending', date: '2025-12-14' },
  { id: 'INV-2507', patient: 'Sofia Martinez', patientInitials: 'SM', doctor: 'Dr. Júlia Serra', doctorInitials: 'JS', amount: 135, status: 'Paid', date: '2025-12-12' },
  { id: 'INV-2508', patient: 'James Chen', patientInitials: 'JC', doctor: 'Dr. Omar López', doctorInitials: 'OL', amount: 200, status: 'Pending', date: '2025-12-10' },
  { id: 'INV-2509', patient: 'Emily Davis', patientInitials: 'ED', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Overdue', date: '2025-12-01' },
  { id: 'INV-2510', patient: 'Daniel Kim', patientInitials: 'DK', doctor: 'Dr. Marc Vidal', doctorInitials: 'MV', amount: 95, status: 'Paid', date: '2025-12-08' },
  
  // Nov 2025 (Previous Month)
  { id: 'INV-2490', patient: 'Sarah Johnson', patientInitials: 'SJ', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Paid', date: '2025-11-28' },
  { id: 'INV-2491', patient: 'Lucas Silva', patientInitials: 'LS', doctor: 'Dr. Omar López', doctorInitials: 'OL', amount: 150, status: 'Paid', date: '2025-11-25' },
  { id: 'INV-2492', patient: 'Maria Garcia', patientInitials: 'MG', doctor: 'Dr. Júlia Serra', doctorInitials: 'JS', amount: 110, status: 'Overdue', date: '2025-11-15' },
  
  // Future / Pending
  { id: 'INV-2511', patient: 'Thomas Anderson', patientInitials: 'TA', doctor: 'Dr. Marc Vidal', doctorInitials: 'MV', amount: 90, status: 'Pending', date: '2025-12-22' },
  { id: 'INV-2512', patient: 'Olivia Wilson', patientInitials: 'OW', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Pending', date: '2025-12-24' },
])

// Filters
const searchQuery = ref('')
const selectedDoctor = ref('all')
const selectedStatus = ref('all')

// Date State
const todayObj = today(getLocalTimeZone())
const firstDayObj = todayObj.set({ day: 1 })

const startDate = ref<DateValue | undefined>(firstDayObj)
const endDate = ref<DateValue | undefined>(todayObj)

const doctors = ['Dr. Ana Ruiz', 'Dr. Marc Vidal', 'Dr. Júlia Serra', 'Dr. Omar López']
const statuses = ['Paid', 'Pending', 'Overdue']

const filteredInvoices = computed(() => {
  return invoices.value.filter(inv => {
    const matchesSearch = inv.patient.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          inv.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDoctor = selectedDoctor.value === 'all' || inv.doctor === selectedDoctor.value
    const matchesStatus = selectedStatus.value === 'all' || inv.status === selectedStatus.value
    
    // Date Range Filter
    let matchesDate = true
    if (startDate.value && endDate.value) {
       const invDate = inv.date
       const startStr = startDate.value.toString()
       const endStr = endDate.value.toString()
       matchesDate = invDate >= startStr && invDate <= endStr
    } else if (startDate.value) {
       const invDate = inv.date
       const startStr = startDate.value.toString()
       matchesDate = invDate >= startStr
    }

    return matchesSearch && matchesDoctor && matchesStatus && matchesDate
  })
})

const pendingInvoicesList = computed(() => {
  return invoices.value.filter(inv => inv.status === 'Pending')
})

// --- DOCTOR VIEW LOGIC ---
const doctorsData = computed(() => {
  // Aggregate invoices by doctor
  const map = new Map()
  
  invoices.value.forEach(inv => {
    if (!map.has(inv.doctor)) {
      map.set(inv.doctor, {
        id: inv.doctor.replace(/\s+/g, '-').toLowerCase(),
        name: inv.doctor,
        initials: inv.doctorInitials,
        totalVolume: 0, 
        commissionDue: 0,
        status: 'Unbilled', // Mock status: Unbilled, Billed, Paid
        sessions: []
      })
    }
    
    const doc = map.get(inv.doctor)
    doc.totalVolume += inv.amount
    
    // Commission is 30% of session fee
    const commission = inv.amount * 0.30
    doc.commissionDue += commission
    
    doc.sessions.push({
        ...inv,
        commission
    })
  })
  
  // Convert to array and add mock status logic
  return Array.from(map.values()).map((doc: any) => {
    // Mock logic initial:
    // Dr. Ana -> 'Billed' (Using 'Pending' color)
    // Dr. Marc -> 'Paid' (Green)
    // Others -> 'Unbilled' (Gray/Blue)
    let initialStatus = 'Unbilled'
    if (doc.name.includes('Ana')) initialStatus = 'Billed'
    else if (doc.name.includes('Marc')) initialStatus = 'Paid'
    
    // Apply override if exists, otherwise initial
    doc.status = doctorsStatusOverrides.value[doc.id] || initialStatus
    
    return doc
  })
})

const totalCommission = computed(() => doctorsData.value.reduce((sum: number, d: any) => sum + d.commissionDue, 0))
const pendingCommission = computed(() => doctorsData.value.filter((d: any) => d.status === 'Billed').reduce((sum: number, d: any) => sum + d.commissionDue, 0))

function handleShareDoctorBill(doc: any) {
    toast({
        title: "Bill Shared",
        description: `Commission invoice sent to ${doc.name} via email.`,
        duration: 3000
    })
}

// Doctor Invoice Modal Actions
const selectedDoctorInvoice = ref<any>(null)
const isDoctorInvoiceModalOpen = ref(false)

function openDoctorInvoiceModal(doc: any) {
    // Map doctor sessions to invoice items
    const items = doc.sessions.map((sess: any) => ({
        id: sess.id,
        description: `Session with ${sess.patient} (${formatDate(sess.date)})`,
        qty: 1,
        rate: sess.commission // Rate is the commission amount
    }))

    selectedDoctorInvoice.value = {
        id: `COM-${new Date().getFullYear()}-${doc.id.split('-')[1] || '001'}`, // Mock ID
        date: new Date().toISOString().split('T')[0],
        patient: doc.name, // "Bill To" in modal
        items: items,
        amount: doc.commissionDue,
        status: doc.status
    }
    isDoctorInvoiceModalOpen.value = true
}

function handleSaveDoctorInvoice(updatedInvoice: any) {
    // Mock save
    toast({
        title: "Commission Details Updated",
        description: `Invoice for ${updatedInvoice.patient} updated.`,
    })
    isDoctorInvoiceModalOpen.value = false
}



// Status Management
function updateDoctorStatus(doc: any, newStatus: string) {
    if (doc.status === newStatus) return
    
    // In a real app we would update the store/backend here
    // For mock, we'll try to update the computed source if possible, 
    // but since it's computed from invoices, we might need a workaround or just show toast.
    // Actually, doctorsData is computed, so we can't mutate it directly permanently without changing invoices.
    // However, for the UI demo, we can just update the local reactive object if possible or force a re-calc.
    // A better approach for the mock is to maintain a separate map of overrides.
    
    // Since doctorsData is re-computed on every render/dependency change, directly mutating the 'doc' object 
    // returned by the computed property might work temporarily until re-evaluation, or might warn.
    // Let's use a simpler approach: `doctorsStatusOverrides` map.
    
    doctorsStatusOverrides.value[doc.id] = newStatus
    
    toast({
        title: "Status Updated",
        description: `Doctor ${doc.name} marked as ${newStatus}.`,
    })
}

const doctorsStatusOverrides = ref<Record<string, string>>({})

function sendReminder(invoice: any) {
  toast({
    title: "Reminder Sent",
    description: `Payment reminder sent to ${invoice.patient} via email.`,
    duration: 3000,
  })
}

const totalFilteredAmount = computed(() => {
  return filteredInvoices.value.reduce((sum, inv) => sum + inv.amount, 0)
})

// Summary computed from ALL invoices, not filtered ones, to align with static top-level cards
const summary = computed(() => {
  const total = invoices.value.reduce((sum, inv) => sum + inv.amount, 0)
  const paid = invoices.value.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pending = invoices.value.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0)
  const overdue = invoices.value.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0)
  return { total, paid, pending, overdue }
})

// Mock Trend Data generator
const generateTrend = (length: number, min: number, max: number) => {
  return Array.from({ length }, (_, i) => ({ x: i + 1, y: Math.floor(Math.random() * (max - min + 1)) + min }))
}

const trends = ref({
  total: generateTrend(10, 1000, 5000),
  paid: generateTrend(10, 800, 4000),
  pending: generateTrend(10, 200, 1000),
  overdue: generateTrend(10, 0, 500)
})

// Cards Logic
type CardKey = 'total' | 'paid' | 'pending' | 'overdue'

const cardVisibility = reactive<Record<CardKey, boolean>>({
  total: true,
  paid: true,
  pending: true,
  overdue: true
})

const activeDetailCard = ref<any>(null)

// Detail Chart Logic
const timeRanges = ['1M', '3M', '6M', '1Y', '5Y']
const selectedRange = ref('1M')
const detailChartData = ref({ current: [] as any[], previous: [] as any[] })

function updateDetailChartData() {
  if (!activeDetailCard.value) return
  
  // Simulate range changes logic
  let points = 30
  if (selectedRange.value === '3M') points = 90
  if (selectedRange.value === '6M') points = 180
  if (selectedRange.value === '1Y') points = 365
  if (selectedRange.value === '5Y') points = 1825 // simplified
  
  // Reduce points for visualization if too many (e.g., aggregate by weeks/months)
  // For now simple mock
  const displayPoints = Math.min(points, 20) // Use points to cap comparisons if logic was real
  
  const min = activeDetailCard.value.value * 0.5
  const max = activeDetailCard.value.value * 1.5
  
  // Generate comparison data
  // Current period trending up
  detailChartData.value.current = Array.from({ length: displayPoints }, (_, i) => ({ 
      x: i + 1, 
      y: Math.floor(min + ((max-min)/displayPoints)*i + (Math.random() * 500 - 250)) 
  }))
  
  // Previous period relatively flat
  detailChartData.value.previous = Array.from({ length: displayPoints }, (_, i) => ({ 
      x: i + 1, 
      y: Math.floor((min + max)/2 + (Math.random() * 300 - 150)) 
  }))
}

function setDetailRange(range: string) {
  selectedRange.value = range
  updateDetailChartData()
}

// Watch for card opening to init data
// We can use a watcher or just call it in openCardDetail
function openCardDetail(card: any) {
  activeDetailCard.value = card
  selectedRange.value = '1M'
  updateDetailChartData()
}

const summaryCards = computed(() => [
  { 
    key: 'total' as CardKey, 
    title: 'Total Billed', 
    value: summary.value.total, 
    valueColor: '', 
    trend: trends.value.total, 
    chartColor: '#0ea5e9',
    isVisible: cardVisibility.total 
  },
  { 
    key: 'paid' as CardKey, 
    title: 'Paid', 
    value: summary.value.paid, 
    valueColor: 'text-green-600', 
    trend: trends.value.paid, 
    chartColor: '#16a34a',
    isVisible: cardVisibility.paid
  },
  { 
    key: 'pending' as CardKey, 
    title: 'Pending', 
    value: summary.value.pending, 
    valueColor: 'text-orange-500', 
    trend: trends.value.pending, 
    chartColor: '#f97316',
    isVisible: cardVisibility.pending
  },
  { 
    key: 'overdue' as CardKey, 
    title: 'Overdue', 
    value: summary.value.overdue, 
    valueColor: 'text-red-600', 
    trend: trends.value.overdue, 
    chartColor: '#dc2626',
    isVisible: cardVisibility.overdue
  },
])

function toggleCardVisibility(key: CardKey) {
  cardVisibility[key] = !cardVisibility[key]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-700 hover:bg-green-100 border-transparent'
    case 'Pending': return 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-transparent'
    case 'Overdue': return 'bg-red-100 text-red-700 hover:bg-red-100 border-transparent'
    default: return 'bg-slate-100 text-slate-700 hover:bg-slate-100 border-transparent'
  }
}

// Actions
const selectedInvoice = ref<any>(null)
const isInvoiceModalOpen = ref(false)

function openInvoiceModal(invoice: any) {
  selectedInvoice.value = { ...invoice }
  isInvoiceModalOpen.value = true
}

function handleSaveInvoice(updatedInvoice: any) {
  const index = invoices.value.findIndex(inv => inv.id === updatedInvoice.id)
  if (index !== -1) {
    invoices.value[index] = { ...updatedInvoice }
    toast({
      title: "Invoice Updated",
      description: `Invoice ${updatedInvoice.id} has been successfully updated.`,
    })
  }
  isInvoiceModalOpen.value = false
}

function handleDownload(invoice: any) {
  toast({
    title: "Download Started",
    description: `Downloading PDF for ${invoice.id}...`,
  })
}

function handlePrint(invoice: any) {
  console.log('Printing invoice', invoice.id)
  window.print()
}

function handleShare(invoice: any) {
  navigator.clipboard.writeText(`https://noeia.com/invoices/${invoice.id}`)
  toast({
    title: "Link Copied",
    description: `Shareable link for ${invoice.id} copied to clipboard.`,
  })
}
function handleCreateInvoice(newInvoice: any) {
  // Mock creation logic
  invoices.value.unshift({
    id: newInvoice.id,
    patient: newInvoice.patient || 'Unknown',
    patientInitials: newInvoice.patient?.substring(0,2).toUpperCase() || 'UN',
    doctor: newInvoice.doctor || 'Unknown',
    doctorInitials: newInvoice.doctor?.split(' ').map((n:any)=>n[0]).join('') || 'DR',
    amount: newInvoice.amount,
    status: 'Pending',
    date: (new Date().toISOString().split('T')[0]) as string
  })
  isCreateInvoiceModalOpen.value = false
  toast({
    title: "Invoice Created",
    description: `Invoice ${newInvoice.id} has been created successfully.`,
    duration: 3000,
  })
}

function handleSaveEvent() {
  isEventModalOpen.value = false
  toast({
    title: "Session Scheduled",
    description: "New session has been added to the calendar.",
    duration: 3000,
  })
}
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Billing & Invoices</h2>
      <div class="flex items-center space-x-2">
        <Button variant="outline">
          <Download class="mr-2 h-4 w-4" />
          Export
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
             <Button class="bg-blue-600 hover:bg-blue-700">
               <Plus class="mr-2 h-4 w-4" />
               Add
             </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="isEventModalOpen = true">
               Create Session
            </DropdownMenuItem>
             <DropdownMenuItem @click="isCreateInvoiceModalOpen = true">
               Create Bill
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <!-- Tabs Control -->
    <Tabs default-value="doctors" class="space-y-4">
      <TabsList>
        <TabsTrigger value="doctors">
          Doctors
        </TabsTrigger>
        <TabsTrigger value="patients">
          Patients
        </TabsTrigger>
      </TabsList>

      <!-- DOCTORS VIEW -->
      <TabsContent value="doctors" class="space-y-4">
        <!-- Doctors Summary Cards -->
         <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
               <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle class="text-sm font-medium">Total Commission (YTD)</CardTitle>
               </CardHeader>
               <CardContent>
                 <div class="text-2xl font-bold">€{{ totalCommission.toLocaleString(undefined, {maximumFractionDigits: 0}) }}</div>
                 <p class="text-xs text-muted-foreground">+5.4% from last month</p>
               </CardContent>
            </Card>
            <Card>
               <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle class="text-sm font-medium">Pending Bills</CardTitle>
                 <Clock class="h-4 w-4 text-orange-500" />
               </CardHeader>
               <CardContent>
                 <div class="text-2xl font-bold text-orange-600">€{{ pendingCommission.toLocaleString() }}</div>
                 <p class="text-xs text-muted-foreground">Owed by 1 doctor</p>
               </CardContent>
            </Card>
             <Card>
               <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle class="text-sm font-medium">Session Volume</CardTitle>
               </CardHeader>
               <CardContent>
                 <div class="text-2xl font-bold text-blue-600">€{{ (totalCommission / 0.3).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</div>
                 <p class="text-xs text-muted-foreground">Total value of services</p>
               </CardContent>
            </Card>
         </div>

         <!-- Doctors Table -->
         <div class="rounded-md border bg-card shadow-sm overflow-hidden">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead class="w-[50px]"></TableHead>
                     <TableHead>Doctor</TableHead>
                     <TableHead class="text-right">Total Volume</TableHead>
                     <TableHead class="text-right font-bold text-primary">Commission (30%)</TableHead>
                     <TableHead>Bill Status</TableHead>
                     <TableHead class="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <template v-for="doc in doctorsData" :key="doc.id">
                      <!-- Main Doctor Row -->
                      <TableRow 
                        class="cursor-pointer hover:bg-muted/50 transition-colors"
                        @click="toggleDoctorExpansion(doc.id)"
                        :class="expandedDoctorIds.has(doc.id) ? 'bg-muted/30' : ''"
                      >
                         <TableCell>
                             <Button variant="ghost" size="icon" class="h-6 w-6 p-0 text-muted-foreground">
                                 <ChevronDown v-if="expandedDoctorIds.has(doc.id)" class="h-4 w-4" />
                                 <ChevronRight v-else class="h-4 w-4" />
                             </Button>
                         </TableCell>
                         <TableCell>
                            <div class="flex items-center gap-3">
                               <Avatar class="h-8 w-8">
                                  <AvatarFallback class="bg-blue-100 text-blue-700 font-medium text-xs">{{ doc.initials }}</AvatarFallback>
                               </Avatar>
                               <div>
                                  <div class="font-medium text-sm">{{ doc.name }}</div>
                                  <div class="text-xs text-muted-foreground">{{ doc.sessions.length }} sessions</div>
                               </div>
                            </div>
                         </TableCell>
                         <TableCell class="text-right text-muted-foreground">€{{ doc.totalVolume.toLocaleString() }}</TableCell>
                         <TableCell class="text-right font-bold text-lg">€{{ doc.commissionDue.toFixed(2) }}</TableCell>
                         <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                     <Button variant="ghost" class="h-auto p-0 hover:bg-transparent">
                                        <Badge :class="{
                                            'bg-green-100 text-green-700 hover:bg-green-100': doc.status === 'Paid',
                                            'bg-orange-100 text-orange-700 hover:bg-orange-100': doc.status === 'Billed',
                                            'bg-slate-100 text-slate-700 hover:bg-slate-100': doc.status === 'Unbilled',
                                        }" variant="outline" class="cursor-pointer gap-1">
                                           {{ doc.status }}
                                           <ChevronDown class="w-3 h-3 opacity-50" />
                                        </Badge>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem @click="updateDoctorStatus(doc, 'Unbilled')">
                                        <div class="h-2 w-2 rounded-full bg-slate-400 mr-2"></div> Unbilled
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="updateDoctorStatus(doc, 'Billed')">
                                         <div class="h-2 w-2 rounded-full bg-orange-500 mr-2"></div> Billed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="updateDoctorStatus(doc, 'Paid')">
                                         <div class="h-2 w-2 rounded-full bg-green-500 mr-2"></div> Paid
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                         </TableCell>
                         <TableCell class="text-right">
                             <div @click.stop>
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button variant="ghost" class="h-8 w-8 p-0">
                                            <span class="sr-only">Open menu</span>
                                            <MoreHorizontal class="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem @click="openDoctorInvoiceModal(doc)">
                                            <Eye class="mr-2 h-4 w-4" /> View details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="handleDownload(doc)">
                                            <Download class="mr-2 h-4 w-4" /> Download PDF
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="handlePrint(doc)">
                                            <Printer class="mr-2 h-4 w-4" /> Print
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem @click="handleShareDoctorBill(doc)">
                                            <Share2 class="mr-2 h-4 w-4" /> Share
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                             </div>
                         </TableCell>
                      </TableRow>
                      
                      <!-- Expanded Detail Row -->
                      <TableRow v-if="expandedDoctorIds.has(doc.id)">
                          <TableCell :colspan="6" class="p-0 bg-muted/20 inset-shadow">
                              <div class="p-4 pl-14">
                                  <div class="rounded-md border bg-white overflow-hidden">
                                      <Table>
                                          <TableHeader class="bg-muted/50">
                                              <TableRow>
                                                  <TableHead class="h-8 text-xs">Date</TableHead>
                                                  <TableHead class="h-8 text-xs">Patient</TableHead>
                                                  <TableHead class="h-8 text-xs text-right">Session Fee</TableHead>
                                                  <TableHead class="h-8 text-xs text-right">Commission (30%)</TableHead>
                                                  <TableHead class="h-8 text-xs text-center">Invoice</TableHead>
                                              </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                              <TableRow v-for="sess in doc.sessions" :key="sess.id" class="hover:bg-transparent">
                                                  <TableCell class="py-2 text-xs text-muted-foreground">{{ formatDate(sess.date) }}</TableCell>
                                                  <TableCell class="py-2 text-xs font-medium">{{ sess.patient }}</TableCell>
                                                  <TableCell class="py-2 text-xs text-right text-muted-foreground">€{{ sess.amount }}</TableCell>
                                                  <TableCell class="py-2 text-xs text-right font-medium">€{{ sess.commission.toFixed(2) }}</TableCell>
                                                  <TableCell class="py-2 text-xs text-center">
                                                      <a href="#" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline">
                                                          Preview <ExternalLink class="ml-1 h-3 w-3" />
                                                      </a>
                                                  </TableCell>
                                              </TableRow>
                                          </TableBody>
                                      </Table>
                                  </div>
                              </div>
                          </TableCell>
                      </TableRow>
                  </template>
               </TableBody>
            </Table>
         </div>
      </TabsContent>

      <!-- PATIENTS VIEW (Original Content) -->
      <TabsContent value="patients" class="space-y-4">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="card in summaryCards" :key="card.key">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ card.title }}</CardTitle>
          <div class="flex items-center gap-1">
            <Button variant="ghost" size="icon" class="h-6 w-6 text-muted-foreground hover:text-foreground" @click="toggleCardVisibility(card.key)">
              <component :is="card.isVisible ? Eye : EyeOff" class="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" class="h-6 w-6 text-muted-foreground hover:text-foreground" @click="openCardDetail(card)">
              <Maximize2 class="h-3.5 w-3.5" />
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

    <!-- Card Detail Modal -->
    <Dialog :open="!!activeDetailCard" @update:open="activeDetailCard = null">
      <DialogContent class="sm:max-w-[700px]">
        <DialogHeader>
          <div class="flex items-center justify-between">
             <div>
                <DialogTitle>{{ activeDetailCard?.title }} Details</DialogTitle>
                <DialogDescription>
                    Comparing vs previous period
                </DialogDescription>
             </div>
             <!-- Time Range Selectors -->
             <div class="flex items-center gap-1 bg-muted p-1 rounded-lg">
                <button 
                    v-for="range in timeRanges" 
                    :key="range"
                    @click="setDetailRange(range)"
                    class="px-3 py-1 text-xs font-medium rounded-md transition-all"
                    :class="selectedRange === range ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
                >
                    {{ range }}
                </button>
             </div>
          </div>
        </DialogHeader>
        
        <div v-if="activeDetailCard" class="py-4 space-y-6">
           <div class="flex items-center gap-4">
              <div>
                  <div class="text-sm text-muted-foreground">Current Value</div>
                  <div class="text-4xl font-bold" :class="activeDetailCard.valueColor">€{{ activeDetailCard.value.toLocaleString() }}</div>
              </div>
              <div class="h-10 w-[1px] bg-border"></div>
              <div>
                  <div class="text-sm text-muted-foreground">Previous Period</div>
                  <div class="text-2xl font-semibold text-muted-foreground">€{{ (activeDetailCard.value * 0.85).toFixed(0) }}</div>
              </div>
           </div>

           <div class="h-[300px] w-full border rounded-lg p-4 bg-slate-50/50 relative">
              <BillingDetailChart 
                :current-data="detailChartData.current" 
                :previous-data="detailChartData.previous" 
                :color="activeDetailCard.chartColor" 
                class="h-full w-full" 
              />
              
              <!-- Legend -->
              <div class="absolute top-4 right-4 flex gap-4 text-xs">
                 <div class="flex items-center gap-1.5">
                    <div class="w-3 h-1 rounded-full" :style="{ backgroundColor: activeDetailCard.chartColor }"></div>
                    <span class="font-medium text-slate-700">Current</span>
                 </div>
                 <div class="flex items-center gap-1.5">
                    <div class="w-3 h-1 rounded-full bg-slate-300 border border-slate-400 border-dashed"></div>
                    <span class="font-medium text-slate-500">Previous</span>
                 </div>
              </div>
           </div>

           <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-semibold text-muted-foreground">
                    {{ activeDetailCard.key === 'pending' ? 'Pending Invoices' : 'Recent Transactions' }}
                </h4>
              </div>
              
              <!-- Pending Invoices List -->
              <div v-if="activeDetailCard.key === 'pending'" class="space-y-2">
                  <div v-for="invoice in pendingInvoicesList" :key="invoice.id" class="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                      <div class="flex items-center gap-3">
                          <Avatar class="h-9 w-9 border">
                              <AvatarFallback>{{ invoice.patientInitials }}</AvatarFallback>
                          </Avatar>
                          <div class="space-y-0.5">
                              <div class="font-medium text-sm">{{ invoice.patient }}</div>
                              <div class="text-xs text-muted-foreground">Due: {{ invoice.date }}</div>
                          </div>
                      </div>
                      <div class="flex items-center gap-3">
                          <div class="font-bold text-orange-600">€{{ invoice.amount }}</div>
                          <Button size="sm" variant="outline" class="h-8 gap-1.5 text-xs" @click="sendReminder(invoice)">
                              <Bell class="w-3.5 h-3.5" /> 
                              Remind
                          </Button>
                      </div>
                  </div>
                  <div v-if="pendingInvoicesList.length === 0" class="text-sm text-muted-foreground text-center py-4">
                      No pending invoices found.
                  </div>
              </div>

              <!-- Generic Mock Transactions (for other cards) -->
              <div v-else class="space-y-2">
                  <div v-for="i in 3" :key="i" class="flex items-center justify-between p-3 bg-muted/30 rounded-md text-sm">
                      <div class="flex items-center gap-3">
                          <div class="h-8 w-8 rounded-full flex items-center justify-center bg-white border shadow-sm">
                              <component :is="i === 1 ? FileText : i === 2 ? User : CheckCircle" class="w-4 h-4 text-slate-500" />
                          </div>
                          <div class="space-y-1">
                              <div class="font-medium">Transaction #{{ 2390 + i }}</div>
                              <div class="text-xs text-muted-foreground">{{ new Date().toLocaleDateString() }}</div>
                          </div>
                      </div>
                      <div class="font-medium">€{{ (activeDetailCard.value / (10 + i)).toFixed(2) }}</div>
                  </div>
              </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Filters & Table Settings -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          v-model="searchQuery"
          type="text" 
          placeholder="Filter invoices..." 
          class="pl-9 bg-white"
        />
      </div>
      <div class="flex gap-4 items-center">
        <Select v-model="selectedDoctor">
          <SelectTrigger class="w-[180px] bg-white">
            <SelectValue placeholder="All Doctors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            <SelectItem v-for="doc in doctors" :key="doc" :value="doc">{{ doc }}</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="selectedStatus">
          <SelectTrigger class="w-[150px] bg-white">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem v-for="status in statuses" :key="status" :value="status">{{ status }}</SelectItem>
          </SelectContent>
        </Select>

        <!-- Date Filter -->
        <div class="flex items-center gap-2">
            <DatePicker v-model="startDate" placeholder="Start date" class="w-[140px]" />
            <span class="text-muted-foreground">-</span>
            <DatePicker v-model="endDate" placeholder="End date" class="w-[140px]" />
        </div>

        <!-- Column Settings Popover -->
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="ml-auto">
              <Settings2 class="mr-2 h-4 w-4" />
              Columns
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[280px]" align="end">
             <div class="space-y-4">
                <div class="flex items-center justify-between mb-2">
                   <div class="text-sm font-medium leading-none">Customize Columns</div>
                   <Button variant="ghost" size="sm" class="h-6 w-auto text-xs text-muted-foreground hover:text-foreground p-0" @click="resetColumns">
                      Reset
                   </Button>
                </div>
                
                <draggable 
                  v-model="columns" 
                  item-key="id"
                  handle=".handle"
                  class="space-y-2"
                  :animation="200"
                >
                  <template #item="{ element }">
                    <div class="flex items-center justify-between p-2 bg-muted/40 rounded-md group hover:bg-muted/60 transition-colors">
                       <div class="flex items-center gap-3">
                          <GripVertical class="handle h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
                          <span class="text-sm font-medium select-none">{{ element.label }}</span>
                       </div>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         class="h-6 w-6" 
                         :class="element.visible ? 'text-blue-600' : 'text-muted-foreground'"
                         @click="toggleColumn(element.id)"
                       >
                          <Eye v-if="element.visible" class="h-4 w-4" />
                          <EyeOff v-else class="h-4 w-4" />
                       </Button>
                    </div>
                  </template>
                </draggable>
             </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <!-- List -->
    <div class="rounded-md border bg-card shadow-sm overflow-hidden">
      <!-- Fixed: Added overflow-x-auto to container inside component in previous task, but table itself handles it. -->
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
               v-for="col in visibleColumns" 
               :key="col.id" 
               :class="[
                  col.id === 'amount' || col.id === 'actions' ? 'text-right' : '',
                  col.id === 'id' ? 'w-[100px]' : ''
               ]"
            >
               {{ col.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in filteredInvoices" :key="invoice.id">
             <!-- Dynamic Cells -->
             <TableCell 
               v-for="col in visibleColumns" 
               :key="col.id"
               :class="col.id === 'amount' || col.id === 'actions' ? 'text-right' : ''"
             >
                <!-- ID -->
                <template v-if="col.id === 'id'">
                   <span class="font-medium font-mono text-xs">{{ invoice.id }}</span>
                </template>

                <!-- Patient -->
                <template v-else-if="col.id === 'patient'">
                   <div class="flex items-center gap-3">
                      <Avatar class="h-8 w-8">
                         <AvatarFallback class="bg-primary-50 text-primary-700 text-xs">{{ invoice.patientInitials }}</AvatarFallback>
                      </Avatar>
                      <div class="font-medium text-sm">{{ invoice.patient }}</div>
                   </div>
                </template>

                <!-- Doctor -->
                <template v-else-if="col.id === 'doctor'">
                   <div class="flex items-center gap-2">
                      <Avatar class="h-6 w-6">
                         <AvatarFallback class="bg-slate-100 text-slate-600 text-[10px]">{{ invoice.doctorInitials }}</AvatarFallback>
                      </Avatar>
                      <span class="text-sm text-muted-foreground">{{ invoice.doctor }}</span>
                   </div>
                </template>

                <!-- Date -->
                <template v-else-if="col.id === 'date'">
                   <span class="text-muted-foreground text-sm">{{ formatDate(invoice.date) }}</span>
                </template>

                <!-- Amount -->
                <template v-else-if="col.id === 'amount'">
                   <span class="font-medium text-right">€{{ invoice.amount }}</span>
                </template>

                <!-- Status -->
                <template v-else-if="col.id === 'status'">
                   <Badge 
                      variant="outline"
                      class="gap-1 font-normal"
                      :class="getStatusColor(invoice.status)"
                   >
                      <CheckCircle v-if="invoice.status === 'Paid'" class="w-3 h-3" />
                      <Clock v-if="invoice.status === 'Pending'" class="w-3 h-3" />
                      <AlertCircle v-if="invoice.status === 'Overdue'" class="w-3 h-3" />
                      {{ invoice.status }}
                   </Badge>
                </template>

                <!-- Actions -->
                <template v-else-if="col.id === 'actions'">
                   <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                         <Button variant="ghost" class="h-8 w-8 p-0">
                            <span class="sr-only">Open menu</span>
                            <MoreHorizontal class="h-4 w-4" />
                         </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                         <DropdownMenuItem @click="openInvoiceModal(invoice)">
                            <FileText class="mr-2 h-4 w-4" /> View details
                         </DropdownMenuItem>
                         <DropdownMenuItem @click="handleDownload(invoice)">
                            <Download class="mr-2 h-4 w-4" /> Download PDF
                         </DropdownMenuItem>
                         <DropdownMenuItem @click="handlePrint(invoice)">
                            <Printer class="mr-2 h-4 w-4" /> Print
                         </DropdownMenuItem>
                         <DropdownMenuSeparator />
                         <DropdownMenuItem @click="handleShare(invoice)">
                            <Share2 class="mr-2 h-4 w-4" /> Share invoice
                         </DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </template>
             </TableCell>
          </TableRow>
          
          <TableRow v-if="filteredInvoices.length === 0">
            <TableCell :colspan="visibleColumns.length" class="h-24 text-center text-muted-foreground">
              No invoices found matching your filters.
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow class="bg-muted/50 font-bold hover:bg-muted/50">
             <TableCell 
               v-for="(col, index) in visibleColumns" 
               :key="col.id"
               :class="col.id === 'amount' || col.id === 'actions' ? 'text-right' : ''"
             >
                <span v-if="index === 0">Total</span>
                <span v-else-if="col.id === 'amount'">€{{ totalFilteredAmount.toLocaleString() }}</span>
             </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    </TabsContent>
    </Tabs>

    <!-- Invoice Modal (Edit Mode - Patients) -->
    <InvoiceModal 
      :is-open="isInvoiceModalOpen" 
      :invoice="selectedInvoice" 
      :doctors="doctors"
      @close="isInvoiceModalOpen = false"
      @save="handleSaveInvoice"
      @print="handlePrint"
      @download="handleDownload"
      @share="handleShare"
    />

    <!-- Invoice Modal (Edit Mode - Doctors) -->
    <InvoiceModal 
      :is-open="isDoctorInvoiceModalOpen" 
      :invoice="selectedDoctorInvoice" 
      :doctors="doctors"
      @close="isDoctorInvoiceModalOpen = false"
      @save="handleSaveDoctorInvoice"
      @print="handlePrint"
      @download="handleDownload"
      @share="handleShare"
    />

    <!-- Create Invoice Modal (Create Mode) -->
    <InvoiceModal 
      :is-open="isCreateInvoiceModalOpen" 
      :doctors="doctors"
      :is-create="true"
      @close="isCreateInvoiceModalOpen = false"
      @save="handleCreateInvoice"
    />

    <!-- New Session Modal -->
    <CalendarEventModal
      :is-open="isEventModalOpen"
      :doctors="doctors"
      :patients="['Sarah Johnson', 'Michael Brown']"
      :rooms="['Room 1', 'Room 2']"
      @close="isEventModalOpen = false"
      @save="handleSaveEvent"
    />
  </div>
</template>
