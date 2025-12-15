<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Search, Download, CheckCircle, AlertCircle, Clock, MoreHorizontal, FileText, Share2, Printer, Eye, EyeOff, Maximize2, Plus } from 'lucide-vue-next'
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
} from '@/components/ui/table'
import { useToast } from '@/components/ui/toast/use-toast'
import InvoiceModal from '@/components/org/InvoiceModal.vue'
import BillingTrendChart from '@/components/org/BillingTrendChart.vue'
import BillingDetailChart from '@/components/org/BillingDetailChart.vue'
import CalendarEventModal from '@/components/org/CalendarEventModal.vue'
import { User, Bell } from 'lucide-vue-next'

const { toast } = useToast()

const isCreateInvoiceModalOpen = ref(false)
const isEventModalOpen = ref(false)

// Mock Data
const invoices = ref([
  { id: 'INV-001', patient: 'Sarah Johnson', patientInitials: 'SJ', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Paid', date: '2023-10-25' },
  { id: 'INV-002', patient: 'Michael Brown', patientInitials: 'MB', doctor: 'Dr. Marc Vidal', doctorInitials: 'MV', amount: 90, status: 'Pending', date: '2023-10-24' },
  { id: 'INV-003', patient: 'Emma Wilson', patientInitials: 'EW', doctor: 'Dr. Júlia Serra', doctorInitials: 'JS', amount: 150, status: 'Paid', date: '2023-10-23' },
  { id: 'INV-004', patient: 'David Lee', patientInitials: 'DL', doctor: 'Dr. Omar López', doctorInitials: 'OL', amount: 110, status: 'Overdue', date: '2023-10-15' },
  { id: 'INV-005', patient: 'Laura Pérez', patientInitials: 'LP', doctor: 'Dr. Ana Ruiz', doctorInitials: 'AR', amount: 120, status: 'Paid', date: '2023-10-22' },
  { id: 'INV-006', patient: 'Hugo García', patientInitials: 'HG', doctor: 'Dr. Marc Vidal', doctorInitials: 'MV', amount: 90, status: 'Pending', date: '2023-10-21' },
])

// Filters
const searchQuery = ref('')
const selectedDoctor = ref('all')
const selectedStatus = ref('all')

const doctors = ['Dr. Ana Ruiz', 'Dr. Marc Vidal', 'Dr. Júlia Serra', 'Dr. Omar López']
const statuses = ['Paid', 'Pending', 'Overdue']

const filteredInvoices = computed(() => {
  return invoices.value.filter(inv => {
    const matchesSearch = inv.patient.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          inv.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDoctor = selectedDoctor.value === 'all' || inv.doctor === selectedDoctor.value
    const matchesStatus = selectedStatus.value === 'all' || inv.status === selectedStatus.value
    
    return matchesSearch && matchesDoctor && matchesStatus
  })
})

const pendingInvoicesList = computed(() => {
  return invoices.value.filter(inv => inv.status === 'Pending')
})

function sendReminder(invoice: any) {
  toast({
    title: "Reminder Sent",
    description: `Payment reminder sent to ${invoice.patient} via email.`,
    duration: 3000,
  })
}

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

    <!-- Filters -->
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
      <div class="flex gap-4">
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
      </div>
    </div>

    <!-- List -->
    <div class="rounded-md border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Invoice ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead class="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in filteredInvoices" :key="invoice.id">
            <TableCell class="font-medium font-mono text-xs">{{ invoice.id }}</TableCell>
            
            <TableCell>
              <div class="flex items-center gap-3">
                <Avatar class="h-8 w-8">
                  <AvatarFallback class="bg-primary-50 text-primary-700 text-xs">{{ invoice.patientInitials }}</AvatarFallback>
                </Avatar>
                <div class="font-medium text-sm">{{ invoice.patient }}</div>
              </div>
            </TableCell>
            
            <TableCell>
              <div class="flex items-center gap-2">
                <Avatar class="h-6 w-6">
                  <AvatarFallback class="bg-slate-100 text-slate-600 text-[10px]">{{ invoice.doctorInitials }}</AvatarFallback>
                </Avatar>
                <span class="text-sm text-muted-foreground">{{ invoice.doctor }}</span>
              </div>
            </TableCell>
            
            <TableCell class="text-muted-foreground text-sm">{{ formatDate(invoice.date) }}</TableCell>
            <TableCell class="font-medium text-right">€{{ invoice.amount }}</TableCell>
            
            <TableCell>
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
            </TableCell>
            
            <TableCell class="text-right">
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
            </TableCell>
          </TableRow>
          
          <TableRow v-if="filteredInvoices.length === 0">
            <TableCell colspan="7" class="h-24 text-center text-muted-foreground">
              No invoices found matching your filters.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Invoice Modal (Edit Mode) -->
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
