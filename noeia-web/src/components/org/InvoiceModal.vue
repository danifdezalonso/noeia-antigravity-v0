<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Printer, Download, Share2, Plus, Trash2, Save, X, Calendar as CalendarIcon, FileText } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const props = defineProps<{
  isOpen: boolean
  invoice?: any
  doctors?: string[] 
  isCreate?: boolean
}>()

const emit = defineEmits(['close', 'save', 'download', 'print', 'share'])

interface LineItem {
  id: string
  description: string
  qty: number
  rate: number
}

const form = ref({
  id: '',
  date: new Date(),
  fromName: 'Noeia Clinic',
  fromAddress: '123 Health St.\nMadrid, Spain',
  toName: '',
  toAddress: 'Client Address\nCity, Country',
  items: [] as LineItem[],
  taxRate: 21,
  notes: 'Payment is due within 15 days.',
  selectedDoctor: ''
})

// Mock Patient List for Create Mode
const patients = ['Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee', 'Laura Pérez', 'Hugo García']
// Mock Doctors if not provided
const doctorList = computed(() => props.doctors || ['Dr. Ana Ruiz', 'Dr. Marc Vidal', 'Dr. Júlia Serra'])

const subtotal = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.qty * item.rate), 0)
})

const taxAmount = computed(() => {
  return subtotal.value * (form.value.taxRate / 100)
})

const total = computed(() => {
  return subtotal.value + taxAmount.value
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.isCreate) {
      // Initialize empty for create mode
      form.value.id = 'INV-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      form.value.date = new Date()
      form.value.toName = ''
      form.value.toAddress = ''
      form.value.items = [{ id: '1', description: 'Consultation', qty: 1, rate: 0 }]
      form.value.selectedDoctor = doctorList.value[0] || ''
    } else if (props.invoice) {
        // Initialize from prop
        form.value.id = props.invoice.id
        form.value.date = new Date(props.invoice.date)
        form.value.toName = props.invoice.patient || 'Client Name'
        
        // Mock items based on amount
        const mockAmount = props.invoice.amount || 0
        form.value.items = [
           { id: '1', description: 'Professional Service', qty: 1, rate: Number((mockAmount / 1.21).toFixed(2)) }
        ]
    }
  }
})

// Sync sidebar selections to PDF view
watch(() => form.value.selectedDoctor, (val) => {
    if (val) form.value.fromName = 'Noeia Clinic - ' + val
})

function onPatientSelect(name: any) {
    form.value.toName = name as string
    form.value.toAddress = '123 Fake St, Madrid' 
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDateShort(date: Date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
}

function addItem() {
  form.value.items.push({
    id: Math.random().toString(36).substr(2, 9),
    description: 'New Item',
    qty: 1,
    rate: 50
  })
}

function removeItem(index: number) {
  form.value.items.splice(index, 1)
}

function save() {
  emit('save', {
    ...props.invoice,
    id: form.value.id,
    amount: Number(total.value.toFixed(2)),
    date: form.value.date.toISOString().split('T')[0],
    patient: form.value.toName,
    doctor: form.value.selectedDoctor
  })
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="h-[90vh] flex flex-col p-0 gap-0 sm:rounded-xl overflow-hidden bg-slate-50/50 backdrop-blur-sm" :class="isCreate ? 'max-w-6xl' : 'max-w-4xl'">
      
      <!-- Toolbar -->
      <div class="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-20">
        <div class="flex items-center gap-2">
           <DialogTitle class="text-lg font-semibold text-slate-800">{{ isCreate ? 'New Invoice' : 'Invoice Editor' }}</DialogTitle>
           <span class="text-slate-300">|</span>
           <span class="text-sm text-slate-500 font-mono">{{ form.id }}</span>
        </div>
        <div class="flex items-center gap-2">
            <template v-if="!isCreate">
                <Button variant="ghost" size="sm" @click="$emit('print', form)">
                    <Printer class="w-4 h-4 mr-2" /> Print
                </Button>
                <Button variant="ghost" size="sm" @click="$emit('download', form)">
                    <Download class="w-4 h-4 mr-2" /> PDF
                </Button>
                <Button variant="ghost" size="sm" @click="$emit('share', form)">
                    <Share2 class="w-4 h-4 mr-2" /> Share
                </Button>
                <Separator orientation="vertical" class="h-6 mx-2" />
            </template>
            <Button variant="default" size="sm" @click="save">
                <Save class="w-4 h-4 mr-2" /> {{ isCreate ? 'Create Invoice' : 'Save Changes' }}
            </Button>
            <DialogClose as-child>
                 <Button variant="ghost" size="icon" class="ml-2">
                    <X class="w-5 h-5 text-slate-500" />
                 </Button>
            </DialogClose>
        </div>
      </div>

      <div class="flex-1 flex overflow-hidden">
        <!-- SIDEBAR (Only in Create Mode) -->
        <div v-if="isCreate" class="w-80 bg-white border-r flex-shrink-0 flex flex-col p-6 gap-6 overflow-y-auto z-10 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.1)]">
            <div>
                <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <div class="p-1.5 bg-blue-50 rounded-md"><FileText class="w-4 h-4 text-blue-600" /></div>
                    Invoice Details
                </h3>
                <div class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-500 uppercase">Provider / Doctor</label>
                        <Select v-model="form.selectedDoctor">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="doc in doctorList" :key="doc" :value="doc">{{ doc }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-slate-500 uppercase">Patient / Client</label>
                        <Select :model-value="form.toName" @update:model-value="onPatientSelect">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Patient" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="p in patients" :key="p" :value="p">{{ p }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="space-y-1.5">
                         <label class="text-xs font-semibold text-slate-500 uppercase">Invoice Date</label>
                         <Popover>
                            <PopoverTrigger as-child>
                              <Button variant="outline" class="w-full justify-start text-left font-normal" :class="!form.date && 'text-muted-foreground'">
                                <CalendarIcon class="mr-2 h-4 w-4" />
                                {{ form.date ? formatDate(form.date) : "Pick a date" }}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <!-- Temporary simple date picker or use v-calendar if installed, defaulting to basic input for simplicity if calendar type is tricky -->
                                <div class="p-2">
                                    <Input type="date" :value="form.date.toISOString().split('T')[0]" @input="(e: any) => form.date = new Date(e.target.value)" />
                                </div>
                            </PopoverContent>
                          </Popover>
                    </div>
                </div>
            </div>

            <Separator />
            
            <div class="text-xs text-slate-500">
                <p>Fill in the details here to populate the invoice preview on the right.</p>
                <p class="mt-2">Line items can be edited directly on the document.</p>
            </div>
        </div>

        <!-- Scrollable Document Area -->
        <div class="flex-1 overflow-y-auto p-8 bg-slate-100/50 flex justify-center relative">
            <!-- Paper -->
            <div class="w-full max-w-[800px] bg-white shadow-lg min-h-[1000px] p-12 rounded-sm text-slate-800 relative transition-all duration-300" :class="{'scale-95': isCreate}">
                
                <!-- Header -->
                <div class="flex justify-between items-start mb-12">
                    <div class="border-2 border-dashed border-blue-200 rounded-lg p-2 px-4 text-blue-600 font-bold text-xl uppercase tracking-wider bg-blue-50/50">
                        Your Logo
                    </div>
                    <div class="text-right">
                        <h1 class="text-4xl font-light text-slate-900 mb-2">INVOICE</h1>
                        <div class="text-slate-500">#{{ form.id }}</div>
                    </div>
                </div>

                <!-- Addresses -->
                <div class="grid grid-cols-2 gap-12 mb-12">
                    <!-- From -->
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">From</label>
                        <Input v-model="form.fromName" class="font-bold text-lg border-transparent px-0 h-auto py-0 hover:border-slate-200 focus:border-blue-500 rounded-none bg-transparent transition-colors" />
                        <Textarea v-model="form.fromAddress" class="resize-none border-transparent px-0 py-0 min-h-[80px] hover:border-slate-200 focus:border-blue-500 rounded-none bg-transparent text-slate-600 leading-normal" />
                    </div>

                    <!-- To -->
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bill To</label>
                        <Input v-model="form.toName" placeholder="Client Name" class="font-bold text-lg border-transparent px-0 h-auto py-0 hover:border-slate-200 focus:border-blue-500 rounded-none bg-transparent transition-colors" />
                        <Textarea v-model="form.toAddress" placeholder="Client Address" class="resize-none border-transparent px-0 py-0 min-h-[80px] hover:border-slate-200 focus:border-blue-500 rounded-none bg-transparent text-slate-600 leading-normal" />
                    </div>
                </div>

                <!-- Meta -->
                <div class="flex gap-12 mb-12">
                    <div>
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</label>
                        <div class="font-medium text-slate-900 py-0.5">{{ form.date ? formatDateShort(form.date) : 'Select Date' }}</div>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Due Date</label>
                        <div class="font-medium text-slate-900 py-0.5">Upon Receipt</div>
                    </div>
                </div>

                <!-- Items Table -->
                <div class="mb-12">
                    <div class="grid grid-cols-12 gap-4 border-b-2 border-slate-100 pb-2 mb-4">
                        <div class="col-span-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Item Description</div>
                        <div class="col-span-2 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Qty</div>
                        <div class="col-span-2 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Rate</div>
                        <div class="col-span-2 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</div>
                    </div>

                    <div class="space-y-2">
                        <div v-for="(item, index) in form.items" :key="item.id" class="grid grid-cols-12 gap-4 items-start group relative">
                            <div class="col-span-6">
                                <Input v-model="item.description" class="border-transparent px-2 h-8 py-1 hover:bg-slate-50 focus:bg-white focus:border-blue-500 rounded-sm bg-transparent w-full" />
                            </div>
                            <div class="col-span-2">
                                <Input type="number" v-model="item.qty" class="text-right border-transparent px-2 h-8 py-1 hover:bg-slate-50 focus:bg-white focus:border-blue-500 rounded-sm bg-transparent w-full" />
                            </div>
                            <div class="col-span-2">
                                <div class="relative">
                                    <Input type="number" v-model="item.rate" class="text-right border-transparent pl-2 pr-2 h-8 py-1 hover:bg-slate-50 focus:bg-white focus:border-blue-500 rounded-sm bg-transparent w-full" />
                                </div>
                            </div>
                            <div class="col-span-2 text-right py-1 font-mono text-slate-700">
                                €{{ (item.qty * item.rate).toFixed(2) }}
                            </div>

                            <!-- Row Actions -->
                            <button 
                                @click="removeItem(index)"
                                class="absolute -left-8 top-1.5 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                title="Remove Item"
                            >
                                <Trash2 class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" class="mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 pl-2" @click="addItem">
                        <Plus class="w-4 h-4 mr-2" /> Add Item
                    </Button>
                </div>

                <!-- Totals -->
                <div class="flex justify-end mb-12">
                    <div class="w-64 space-y-3">
                        <div class="flex justify-between text-slate-600">
                            <span>Subtotal</span>
                            <span class="font-mono">€{{ subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-slate-600 items-center">
                            <span class="text-sm">Tax ({{ form.taxRate }}%)</span>
                            <div class="font-mono">€{{ taxAmount.toFixed(2) }}</div>
                        </div>
                        <Separator />
                        <div class="flex justify-between text-slate-900 font-bold text-lg pt-1">
                            <span>Total</span>
                            <span>€{{ total.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                <div>
                    <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Notes</label>
                    <Textarea v-model="form.notes" class="border-transparent px-0 py-0 min-h-[60px] hover:border-slate-200 focus:border-blue-500 rounded-none bg-transparent text-slate-600 leading-normal resize-none w-full" />
                </div>

                <!-- Footer Graphic -->
                <div class="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-sm"></div>
            </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
