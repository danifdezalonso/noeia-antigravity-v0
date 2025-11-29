<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { X, Printer, Save, Plus, Trash2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useAppStore, type Invoice } from '@/stores/app'

const props = defineProps<{
  isOpen: boolean
  invoiceId: string | null
}>()

const emit = defineEmits(['close', 'save'])
const store = useAppStore()

const invoice = ref<Invoice | null>(null)
const clientName = ref('')
const professionalName = ref('')

// Initialize local state from store
watch(() => [props.isOpen, props.invoiceId], () => {
  if (props.isOpen && props.invoiceId) {
    const inv = store.getInvoiceById(props.invoiceId)
    if (inv) {
      // Deep copy to avoid mutating store directly
      invoice.value = JSON.parse(JSON.stringify(inv))
      
      const client = store.getClientById(inv.clientId)
      clientName.value = client?.name || 'Unknown Client'
      
      const professional = store.getProfessionalById(inv.professionalId)
      professionalName.value = professional?.name || 'Unknown Professional'
    }
  }
}, { immediate: true })

const subtotal = computed(() => {
  return invoice.value?.items.reduce((sum, item) => sum + item.amount, 0) || 0
})

const tax = computed(() => {
  return subtotal.value * 0.21 // Assuming 21% VAT for example
})

const total = computed(() => {
  return subtotal.value + tax.value
})

function addItem() {
  if (invoice.value) {
    invoice.value.items.push({ description: 'New Item', amount: 0 })
  }
}

function removeItem(index: number) {
  if (invoice.value) {
    invoice.value.items.splice(index, 1)
  }
}

function save() {
  if (invoice.value && props.invoiceId) {
    store.updateInvoice(props.invoiceId, {
      items: invoice.value.items,
      total: total.value, // Update total based on items
      date: invoice.value.date,
      dueDate: invoice.value.dueDate
    })
    emit('save')
    emit('close')
  }
}

function printInvoice() {
  window.print()
}
</script>

<template>
  <div v-if="isOpen && invoice" class="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 print:static print:bg-white">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm print:hidden" @click="$emit('close')"></div>

    <!-- Modal / Paper -->
    <div class="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 print:shadow-none print:w-full print:max-w-none print:animate-none">
      
      <!-- Toolbar (Hidden in Print) -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 print:hidden">
        <h3 class="text-lg font-semibold text-slate-900">Edit Invoice</h3>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="printInvoice">
            <Printer class="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button size="sm" @click="save">
            <Save class="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors ml-2">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Invoice Content (A4-ish aspect ratio) -->
      <div class="p-8 md:p-12 bg-white min-h-[800px] flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-start mb-12">
          <div>
            <h1 class="text-3xl font-bold text-slate-900 mb-2">INVOICE</h1>
            <p class="text-slate-500 font-medium">#{{ invoice.id }}</p>
          </div>
          <div class="text-right">
            <div class="font-bold text-slate-900 text-lg">{{ professionalName }}</div>
            <div class="text-slate-500 text-sm">Psychology Services</div>
            <div class="text-slate-500 text-sm">123 Medical Center Dr.</div>
            <div class="text-slate-500 text-sm">Madrid, Spain</div>
          </div>
        </div>

        <!-- Dates & Client -->
        <div class="flex justify-between items-start mb-12">
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Bill To</div>
            <div class="font-semibold text-slate-900 text-lg">{{ clientName }}</div>
          </div>
          <div class="text-right space-y-2">
            <div>
              <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</div>
              <input 
                v-model="invoice.date"
                type="date" 
                class="text-right font-medium text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-primary-500 focus:outline-none bg-transparent"
              >
            </div>
            <div>
              <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</div>
              <input 
                v-model="invoice.dueDate"
                type="date" 
                class="text-right font-medium text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-primary-500 focus:outline-none bg-transparent"
              >
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div class="mb-8">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-slate-100">
                <th class="text-left py-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-full">Description</th>
                <th class="text-right py-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Amount</th>
                <th class="w-10 print:hidden"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="(item, index) in invoice.items" :key="index" class="group">
                <td class="py-3">
                  <input 
                    v-model="item.description"
                    type="text" 
                    class="w-full font-medium text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-primary-500 focus:outline-none bg-transparent"
                  >
                </td>
                <td class="py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <span>€</span>
                    <input 
                      v-model.number="item.amount"
                      type="number" 
                      class="w-20 text-right font-medium text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-primary-500 focus:outline-none bg-transparent"
                    >
                  </div>
                </td>
                <td class="py-3 text-right print:hidden">
                  <button 
                    @click="removeItem(index)"
                    class="p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <button 
            @click="addItem"
            class="mt-4 flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 print:hidden"
          >
            <Plus class="w-4 h-4 mr-1" />
            Add Item
          </button>
        </div>

        <!-- Totals -->
        <div class="mt-auto border-t-2 border-slate-100 pt-8">
          <div class="flex justify-end">
            <div class="w-64 space-y-3">
              <div class="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>€{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-slate-500">
                <span>VAT (21%)</span>
                <span>€{{ tax.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-slate-100">
                <span>Total</span>
                <span>€{{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer Note -->
        <div class="mt-12 text-center text-sm text-slate-400">
          <p>Thank you for your business. Please process payment within 14 days.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  @page { margin: 0; }
  body { background: white; }
}
</style>
