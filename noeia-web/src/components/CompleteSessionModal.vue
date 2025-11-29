<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X, CheckCircle, Sparkles, FileText, List, Upload, CreditCard, History, FileCheck, Receipt, Download, Share2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  isOpen: boolean
  session: any
}>()

const emit = defineEmits(['close', 'complete'])

const store = useAppStore()
const { enrichedSessions } = storeToRefs(store)

// --- State ---
const activeTab = ref('info') // info, ia, history, sessions, proof, bill

// Tab 1: Information
const sessionStatus = ref('Confirmed')
const paymentStatus = ref('Pending')
const sessionType = ref('Online')
const location = ref('')
const sessionFormat = ref('Individual')
const duration = ref(50)
const fee = ref(100)
const paymentMethod = ref('Pending')
const isPaid = ref(false)

// Tab 2: IA Topics
const notes = ref('')
const uploadedFile = ref<any>(null)
const isAnalyzing = ref(false)
const aiResult = ref<any>(null)
const fileInput = ref<HTMLInputElement | null>(null)

// Tab 6: Bill Preview
const generateBill = ref(true)

// Next Session
const bookNext = ref(false)
const nextDate = ref(new Date())

// --- Watchers ---
watch(() => props.session, (newSession) => {
  if (newSession) {
    // Initialize defaults from session if available
    duration.value = 50 // Default
    fee.value = newSession.fee || 100
    // Reset other fields
    sessionStatus.value = newSession.status || 'Confirmed'
    paymentStatus.value = newSession.paymentStatus || 'Pending'
    sessionType.value = 'Online'
    location.value = ''
    sessionFormat.value = 'Individual'
    paymentMethod.value = 'Pending'
    isPaid.value = false
    notes.value = newSession.notes || ''
    activeTab.value = 'info'
  }
}, { immediate: true })

// --- Computed ---
const clientSessions = computed(() => {
  if (!props.session) return []
  return enrichedSessions.value
    .filter(s => s.clientId === props.session.clientId && s.status === 'Completed')
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
})

const invoicePreview = computed(() => {
  if (!props.session) return null
  return {
    id: `INV_${props.session.clientName.replace(/\s+/g, '')}_${new Date().toISOString().split('T')[0]}`,
    client: props.session.clientName,
    date: new Date().toLocaleDateString(),
    items: [
      { description: `${sessionFormat.value} ${sessionType.value} Session`, amount: fee.value }
    ],
    total: fee.value
  }
})

// --- Methods ---

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadedFile.value = target.files[0]
    // Simulate upload / processing
    setTimeout(() => {
      notes.value += `\n[Attached Recording: ${uploadedFile.value?.name}]`
    }, 500)
  }
}

function analyzeSession() {
  if (!notes.value) return
  isAnalyzing.value = true
  
  setTimeout(() => {
    aiResult.value = {
      summary: "Patient expressed anxiety about upcoming career changes. Discussed coping mechanisms and identified triggers related to performance pressure.",
      highlights: [
        "High anxiety regarding promotion",
        "Sleep disruption reported",
        "Positive response to breathing exercises"
      ],
      exercises: [
        "Daily 5-min mindfulness",
        "Journaling triggers before bed",
        "Progressive muscle relaxation"
      ],
      roadmap: "Focus on building confidence and stress management techniques over the next 3 sessions."
    }
    isAnalyzing.value = false
  }, 2000)
}

function submit() {
  emit('complete', {
    sessionId: props.session.id,
    notes: notes.value + (aiResult.value ? `\n\n[AI Summary]: ${aiResult.value.summary}` : ''),
    finalFee: fee.value,
    generateBill: generateBill.value,
    bookNext: bookNext.value,
    nextDate: nextDate.value,
    // New fields
    status: sessionStatus.value,
    paymentStatus: paymentStatus.value,
    sessionType: sessionType.value,
    location: location.value,
    sessionFormat: sessionFormat.value,
    paymentMethod: paymentMethod.value,
    isPaid: isPaid.value
  })
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col h-[90vh]">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div class="flex items-center gap-4">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Complete Session</h3>
            <p class="text-sm text-slate-500" v-if="session">
              {{ session.clientName }} • {{ new Date(session.start).toLocaleDateString() }}
            </p>
          </div>
          
          <!-- Status Dropdowns -->
          <div class="flex items-center gap-2 ml-4">
             <select 
              v-model="sessionStatus" 
              class="text-xs font-medium rounded-full px-3 py-1 border-0 ring-1 ring-inset ring-slate-200 bg-white focus:ring-2 focus:ring-primary-500"
              :class="{
                'text-blue-700 bg-blue-50 ring-blue-200': sessionStatus === 'Confirmed',
                'text-amber-700 bg-amber-50 ring-amber-200': sessionStatus === 'Pending',
                'text-green-700 bg-green-50 ring-green-200': sessionStatus === 'Completed',
                'text-slate-700 bg-slate-50 ring-slate-200': sessionStatus === 'Scheduled' || sessionStatus === 'Waiting confirmation'
              }"
            >
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>Scheduled</option>
              <option>Waiting confirmation</option>
            </select>

            <select 
              v-model="paymentStatus" 
              class="text-xs font-medium rounded-full px-3 py-1 border-0 ring-1 ring-inset ring-slate-200 bg-white focus:ring-2 focus:ring-primary-500"
              :class="{
                'text-green-700 bg-green-50 ring-green-200': paymentStatus === 'Paid',
                'text-amber-700 bg-amber-50 ring-amber-200': paymentStatus === 'Pending' || paymentStatus === 'Awaiting payment',
                'text-red-700 bg-red-50 ring-red-200': paymentStatus === 'Failed' || paymentStatus === 'Disputed',
                'text-slate-700 bg-slate-50 ring-slate-200': paymentStatus === 'Not required' || paymentStatus === 'Refunded'
              }"
            >
              <option>Pending</option>
              <option>Awaiting payment</option>
              <option>Not required</option>
              <option>Paid</option>
              <option>Failed</option>
              <option>Refunded</option>
              <option>Disputed</option>
            </select>
          </div>
        </div>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="px-6 pt-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div class="flex space-x-1 overflow-x-auto no-scrollbar pb-1">
          <button 
            v-for="tab in [
              { id: 'info', label: 'Information', icon: FileText },
              { id: 'ia', label: 'Session Notes', icon: Sparkles },
              { id: 'history', label: 'Historial', icon: History },
              { id: 'sessions', label: 'Sessions', icon: List },
              { id: 'proof', label: 'Proof', icon: FileCheck },
              { id: 'bill', label: 'Bill Preview', icon: Receipt }
            ]" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap"
            :class="activeTab === tab.id ? 'border-primary-600 text-primary-700 bg-primary-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6 bg-slate-50/30">
        
        <!-- Tab 1: Information -->
        <div v-if="activeTab === 'info'" class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 class="font-semibold text-slate-900 flex items-center gap-2">
              <FileText class="w-4 h-4 text-primary-500" /> Session Details
            </h4>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-500 mb-1">Type</label>
                <select v-model="sessionType" class="w-full rounded-lg border-slate-200 text-sm focus:ring-primary-500 focus:border-primary-500">
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>
              <div v-if="sessionType === 'Offline'">
                <label class="block text-xs font-medium text-slate-500 mb-1">Location (Despacho)</label>
                <input v-model="location" type="text" placeholder="e.g. Room 3B" class="w-full rounded-lg border-slate-200 text-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-slate-500 mb-1">Format</label>
                <div class="grid grid-cols-4 gap-2">
                  <button 
                    v-for="fmt in ['Individual', 'Group', 'Couple', 'Family']" 
                    :key="fmt"
                    @click="sessionFormat = fmt"
                    class="px-2 py-1.5 text-xs font-medium rounded-md border text-center transition-colors"
                    :class="sessionFormat === fmt ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
                  >
                    {{ fmt }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 class="font-semibold text-slate-900 flex items-center gap-2">
              <CreditCard class="w-4 h-4 text-primary-500" /> Payment
            </h4>
            
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-xs font-medium text-slate-500 mb-1">Price (€)</label>
                  <input v-model="fee" type="number" class="w-full rounded-lg border-slate-200 text-sm focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div class="flex-1">
                  <label class="block text-xs font-medium text-slate-500 mb-1">Status</label>
                  <div class="flex items-center h-[38px]">
                    <label class="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" v-model="isPaid" class="rounded text-primary-600 focus:ring-primary-500 border-slate-300" />
                      <span class="text-sm text-slate-700">Mark as Paid</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-500 mb-1">Payment Method</label>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="method in ['Cash', 'Bizum', 'Card', 'ITPV', 'Pending']" 
                    :key="method"
                    @click="paymentMethod = method"
                    class="px-2 py-2 text-xs font-medium rounded-md border text-center transition-colors"
                    :class="paymentMethod === method ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
                  >
                    {{ method }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: IA Topics -->
        <div v-else-if="activeTab === 'ia'" class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div class="lg:col-span-2 flex flex-col h-full space-y-4">
            <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-slate-700">Session Notes</label>
                <div class="flex gap-2">
                  <button class="text-xs text-primary-600 hover:text-primary-700 font-medium">Summarize</button>
                  <button class="text-xs text-primary-600 hover:text-primary-700 font-medium">Highlight</button>
                </div>
              </div>
              <textarea 
                v-model="notes" 
                class="flex-1 w-full rounded-lg border-slate-200 text-sm focus:ring-primary-500 focus:border-primary-500 resize-none p-3"
                placeholder="Type notes here..."
              ></textarea>
            </div>
          </div>

          <div class="space-y-4">
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h4 class="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Upload class="w-4 h-4 text-slate-500" /> Uploads
              </h4>
              
              <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                accept="image/*,.pdf,.doc,.docx,audio/*"
                @change="handleFileUpload"
              >
              
              <div 
                class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-colors cursor-pointer mb-4"
                @click="fileInput?.click()"
              >
                <div class="flex flex-col items-center justify-center text-slate-500">
                  <Upload class="w-6 h-6 mb-2" />
                  <p class="text-xs font-medium">Click to upload</p>
                  <p class="text-[10px] text-slate-400">Audio, PDF, Images</p>
                </div>
              </div>

              <div v-if="uploadedFile" class="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <FileText class="w-4 h-4 text-slate-400" />
                <span class="text-xs text-slate-700 truncate flex-1">{{ uploadedFile.name }}</span>
                <button @click="uploadedFile = null" class="text-slate-400 hover:text-red-500"><X class="w-3 h-3" /></button>
              </div>
            </div>

            <div class="bg-primary-50 rounded-xl border border-primary-100 p-4">
              <h4 class="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                <Sparkles class="w-4 h-4" /> AI Analysis
              </h4>
              <p class="text-xs text-primary-700 mb-3">
                Generate insights, summaries, and action items from your notes and recordings.
              </p>
              <Button 
                variant="primary" 
                class="w-full justify-center" 
                :disabled="isAnalyzing || !notes"
                @click="analyzeSession"
              >
                <Sparkles class="w-4 h-4 mr-2" />
                {{ isAnalyzing ? 'Analyzing...' : 'Run Analysis' }}
              </Button>
            </div>
          </div>
        </div>

        <!-- Tab 3: Historial -->
        <div v-else-if="activeTab === 'history'" class="max-w-3xl mx-auto space-y-4">
          <div v-for="i in 3" :key="i" class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-purple-500" />
                <span class="text-sm font-semibold text-slate-900">AI Summary</span>
              </div>
              <span class="text-xs text-slate-500">Oct {{ 20 - i }}, 2023</span>
            </div>
            <p class="text-sm text-slate-600 line-clamp-2">
              Patient showed significant progress in cognitive restructuring exercises. Reported reduced anxiety levels during work presentations.
            </p>
          </div>
        </div>

        <!-- Tab 4: Sessions -->
        <div v-else-if="activeTab === 'sessions'" class="max-w-3xl mx-auto space-y-3">
          <div 
            v-for="s in clientSessions" 
            :key="s.id"
            class="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary-300 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                {{ new Date(s.start).getDate() }}
              </div>
              <div>
                <h4 class="font-medium text-slate-900">{{ s.title }}</h4>
                <p class="text-xs text-slate-500">{{ new Date(s.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} • {{ s.professionalName }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">Completed</span>
              <span class="text-sm font-semibold text-slate-700">€{{ s.fee }}</span>
            </div>
          </div>
          <div v-if="clientSessions.length === 0" class="text-center py-10 text-slate-500">
            No past sessions found.
          </div>
        </div>

        <!-- Tab 5: Proof -->
        <div v-else-if="activeTab === 'proof'" class="max-w-2xl mx-auto text-center py-10">
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm inline-block w-full">
            <FileCheck class="w-16 h-16 text-primary-200 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Proof of Attendance</h3>
            <p class="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Generate an official certificate of attendance for this session. Includes patient details, date, time, and professional signature.
            </p>
            <div class="flex justify-center gap-4">
              <Button variant="outline">
                <Share2 class="w-4 h-4 mr-2" /> Share
              </Button>
              <Button>
                <Download class="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>
          </div>
        </div>

        <!-- Tab 6: Bill Preview -->
        <div v-else-if="activeTab === 'bill'" class="max-w-2xl mx-auto">
          <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex justify-between items-start mb-8">
              <div>
                <h2 class="text-2xl font-bold text-slate-900">INVOICE</h2>
                <p class="text-sm text-slate-500">{{ invoicePreview?.id }}</p>
              </div>
              <div class="text-right">
                <div class="font-semibold text-slate-900">Noeia Clinic</div>
                <div class="text-xs text-slate-500">123 Therapy St.<br>Madrid, Spain</div>
              </div>
            </div>

            <div class="mb-8">
              <div class="text-xs font-bold text-slate-400 uppercase mb-1">Bill To</div>
              <div class="font-medium text-slate-900">{{ invoicePreview?.client }}</div>
              <div class="text-sm text-slate-500">{{ new Date().toLocaleDateString() }}</div>
            </div>

            <table class="w-full mb-8">
              <thead>
                <tr class="border-b border-slate-200 text-left text-xs font-medium text-slate-500 uppercase">
                  <th class="py-2">Description</th>
                  <th class="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in invoicePreview?.items" :key="i" class="border-b border-slate-100">
                  <td class="py-3 text-sm text-slate-700">{{ item.description }}</td>
                  <td class="py-3 text-sm text-slate-900 text-right">€{{ item.amount.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>

            <div class="flex justify-end">
              <div class="text-right">
                <div class="text-xs text-slate-500 mb-1">Total Amount</div>
                <div class="text-2xl font-bold text-primary-600">€{{ invoicePreview?.total.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" v-model="bookNext" class="rounded text-primary-600 focus:ring-primary-500 border-slate-300" />
            <span class="text-sm font-medium text-slate-700">Book Next Session</span>
          </label>
          <input 
            v-if="bookNext"
            v-model="nextDate" 
            type="datetime-local" 
            class="rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div class="flex gap-3">
          <Button variant="ghost" @click="emit('close')">Cancel</Button>
          <Button @click="submit">
            <CheckCircle class="w-4 h-4 mr-2" />
            Complete & Invoice
          </Button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for tabs */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
