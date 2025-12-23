<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  CheckCircle2,
  Download,
  Share2,
  Plus,
  Clock,
  User,
  MapPin,
  Lock,
  Calendar
} from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

// Mock data
const sessionData = {
  date: '2024-12-23',
  duration: '50 min',
  type: 'Initial Consultation',
  clinician: 'Dr. Sarah Johnson',
  location: 'Room 3A',
  patient: 'John Doe'
}

const clinicalNotes = ref('Patient reports experiencing mild headaches since last Tuesday. Pain is localized to the frontal region.')
const isNotesLocked = ref(false)

// Payment state
const isPaid = ref(false)
const paymentMethod = ref('cash')

// Session details
const sessionDate = ref('2024-12-23')
const sessionDuration = ref('50')
const sessionPrice = ref(150.00)
const selectedClinician = ref('dr-johnson')
const sessionType = ref('individual')
const selectedLocation = ref('room-3a')

// Next session
const nextSessionDate = ref('')
const nextSessionTime = ref('')

// Auto-update payment status when isPaid changes
import { watch } from 'vue'
watch(isPaid, (newValue) => {
  if (!newValue) {
    // Reset payment method when marked as unpaid
    paymentMethod.value = 'cash'
  }
})

// Communication reminders
const whatsappReminder = ref(false)
const emailReminder = ref(false)

function confirmSession() {
  isNotesLocked.value = true
  emit('close')
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="(val) => !val && emit('close')">
    <DialogContent class="max-w-4xl h-[90vh] p-0 flex flex-col">
      <DialogHeader class="px-6 pt-6 pb-4 shrink-0">
        <DialogTitle class="text-2xl font-bold">Session #01 with {{ sessionData.patient }}</DialogTitle>
        
        <!-- Payment Status Section (Vertical) -->
        <div class="flex items-center gap-4 mt-3 text-sm">
          <!-- Price -->
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground">Price:</span>
            <span class="font-bold">€150.00</span>
          </div>
          
          <!-- Paid/Unpaid Switch -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium" :class="isPaid ? 'text-green-700' : 'text-muted-foreground'">
              {{ isPaid ? 'Paid' : 'Not Paid' }}
            </span>
            <Switch 
              :checked="isPaid" 
              @click="isPaid = !isPaid"
            />
          </div>
          
          <!-- Payment Method Dropdown (only when paid) -->
          <Select v-if="isPaid" v-model="paymentMethod">
            <SelectTrigger class="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Efectivo</SelectItem>
              <SelectItem value="bizum">Bizum</SelectItem>
              <SelectItem value="bank-transfer">Transferencia</SelectItem>
              <SelectItem value="card-tpv">Tarjeta (TPV)</SelectItem>
              <SelectItem value="paypal">Paypal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DialogHeader>

      <Separator class="shrink-0" />

      <Tabs default-value="summary" class="flex-1 flex flex-col min-h-0">
        <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0 px-6 h-auto shrink-0">
          <TabsTrigger 
            value="summary" 
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <FileText class="w-4 h-4 mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger 
            value="clinical" 
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <FileText class="w-4 h-4 mr-2" />
            Clinical Record
            <Lock v-if="isNotesLocked" class="w-3 h-3 ml-2 text-muted-foreground" />
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <CreditCard class="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger 
            value="communications" 
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <MessageSquare class="w-4 h-4 mr-2" />
            Communications
          </TabsTrigger>
          <TabsTrigger 
            value="attendance" 
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <FileText class="w-4 h-4 mr-2" />
            Proof of Attendance
          </TabsTrigger>
          <TabsTrigger 
            value="timeline" 
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Clock class="w-4 h-4 mr-2" />
            Timeline
          </TabsTrigger>
        </TabsList>

        <div class="flex-1 overflow-y-auto min-h-0">
          <!-- Summary Tab -->
          <TabsContent value="summary" class="p-6 space-y-6 m-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Session Overview</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                  <Calendar class="w-4 h-4 text-muted-foreground" />
                  <div class="flex-1">
                    <p class="text-sm font-medium mb-1">Date</p>
                    <input 
                      type="date" 
                      v-model="sessionDate"
                      class="w-full h-8 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Clock class="w-4 h-4 text-muted-foreground" />
                  <div class="flex-1">
                    <p class="text-sm font-medium mb-1">Duration</p>
                    <Select v-model="sessionDuration">
                      <SelectTrigger class="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                        <SelectItem value="50">50 min</SelectItem>
                        <SelectItem value="60">60 min</SelectItem>
                        <SelectItem value="90">90 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <User class="w-4 h-4 text-muted-foreground" />
                  <div class="flex-1">
                    <p class="text-sm font-medium mb-1">Clinician</p>
                    <Select v-model="selectedClinician">
                      <SelectTrigger class="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="dr-smith">Dr. John Smith</SelectItem>
                        <SelectItem value="dr-garcia">Dr. Maria Garcia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <FileText class="w-4 h-4 text-muted-foreground" />
                  <div class="flex-1">
                    <p class="text-sm font-medium mb-1">Session Type</p>
                    <Select v-model="sessionType">
                      <SelectTrigger class="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <MapPin class="w-4 h-4 text-muted-foreground" />
                  <div class="flex-1">
                    <p class="text-sm font-medium mb-1">Location</p>
                    <Select v-model="selectedLocation">
                      <SelectTrigger class="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="room-3a">Room 3A</SelectItem>
                        <SelectItem value="room-3b">Room 3B</SelectItem>
                        <SelectItem value="room-4a">Room 4A</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <CreditCard class="w-4 h-4 text-muted-foreground" />
                  <div class="flex-1">
                    <p class="text-sm font-medium mb-1">Price</p>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                      <input 
                        type="number" 
                        v-model="sessionPrice"
                        step="0.01"
                        class="w-full h-8 pl-7 pr-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Pending To-Dos</h3>
              <div class="space-y-2">
                <div class="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-300" />
                  <span class="text-sm flex-1">Complete clinical notes</span>
                </div>
                <div class="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-300" />
                  <span class="text-sm flex-1">Send session summary to patient</span>
                </div>
                <div class="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-300" />
                  <span class="text-sm flex-1">Schedule follow-up appointment</span>
                </div>
                <Button variant="ghost" size="sm" class="w-full mt-2">
                  <Plus class="w-4 h-4 mr-2" />
                  Add To-Do
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Next Session</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium mb-2 block">Date</label>
                  <input 
                    type="date" 
                    v-model="nextSessionDate"
                    class="w-full h-9 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label class="text-sm font-medium mb-2 block">Time</label>
                  <input 
                    type="time" 
                    v-model="nextSessionTime"
                    class="w-full h-9 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <p class="text-xs text-muted-foreground mt-2">Schedule the next appointment for this patient</p>
            </div>
          </TabsContent>

          <!-- Clinical Record Tab -->
          <TabsContent value="clinical" class="p-6 space-y-6 m-0">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Clinical Notes</h3>
                <Badge v-if="isNotesLocked" variant="secondary" class="gap-1">
                  <Lock class="w-3 h-3" />
                  Locked
                </Badge>
              </div>
              <textarea 
                v-model="clinicalNotes"
                :disabled="isNotesLocked"
                class="w-full min-h-[200px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:cursor-not-allowed"
                placeholder="Enter clinical notes..."
              />
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Diagnosis & Tags</h3>
              <div class="flex flex-wrap gap-2">
                <Badge variant="outline">Anxiety</Badge>
                <Badge variant="outline">Sleep Issues</Badge>
                <Button variant="ghost" size="sm" class="h-6 px-2">+ Add Tag</Button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Attachments</h3>
              <Button variant="outline" size="sm">
                <FileText class="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </TabsContent>

          <!-- Billing Tab -->
          <TabsContent value="billing" class="p-6 space-y-6 m-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Price Breakdown</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Session Fee</span>
                  <span class="font-medium">€{{ sessionPrice }}</span>
                </div>
                <Separator />
                <div class="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>€{{ sessionPrice }}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Actions</h3>
              <div class="flex gap-3">
                <Button variant="outline" class="flex-1">
                  <Download class="w-4 h-4 mr-2" />
                  Download Bill
                </Button>
                <Button variant="outline" class="flex-1">
                  <Share2 class="w-4 h-4 mr-2" />
                  Share Bill
                </Button>
              </div>
            </div>
          </TabsContent>

          <!-- Communications Tab -->
          <TabsContent value="communications" class="p-6 space-y-6 m-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Future Notifications</h3>
              <p class="text-sm text-muted-foreground mb-4">Schedule automatic reminders for the next session</p>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-3">
                    <MessageSquare class="w-5 h-5 text-blue-600" />
                    <div>
                      <p class="text-sm font-medium">WhatsApp Reminder</p>
                      <p class="text-xs text-muted-foreground">Send 1 day before next session</p>
                    </div>
                  </div>
                  <Switch v-model:checked="whatsappReminder" />
                </div>
                
                <div class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-3">
                    <MessageSquare class="w-5 h-5 text-green-600" />
                    <div>
                      <p class="text-sm font-medium">Email Reminder</p>
                      <p class="text-xs text-muted-foreground">Send 1 day before next session</p>
                    </div>
                  </div>
                  <Switch v-model:checked="emailReminder" />
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- Proof of Attendance Tab -->
          <TabsContent value="attendance" class="p-6 m-0">
            <div class="max-w-2xl mx-auto">
              <div class="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-bold mb-2">JUSTIFICANT D'ASSISTÈNCIA</h2>
                </div>
                
                <div class="space-y-4 text-sm">
                  <p>
                    Per la present se certifica que, <span class="font-bold">{{ sessionData.patient }}</span>, 
                    ha acudit el dia <span class="font-bold">{{ sessionDate }}</span> en l'horari següent: 
                    de <span class="font-bold">16:00:00</span> a <span class="font-bold">17:00:00</span> al 
                    centre <span class="font-bold">CreixeMent Espai Psicològic</span>.
                  </p>
                  
                  <div class="mt-8 pt-8 border-t space-y-1 text-xs text-muted-foreground">
                    <p class="font-semibold text-foreground">CreixeMent Espai Psicològic</p>
                    <p>c/ Barcelona 11, c/Major 30 Parets del Vallès, 08150</p>
                    <p>661 45 29 54</p>
                    <p>secretaria@creixement@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-3 mt-6">
                <Button variant="outline" class="flex-1">
                  <Download class="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
                <Button class="flex-1">
                  <Share2 class="w-4 h-4 mr-2" />
                  Send to Patient
                </Button>
              </div>
            </div>
          </TabsContent>

          <!-- Timeline Tab -->
          <TabsContent value="timeline" class="p-6 m-0">
            <h3 class="text-lg font-semibold mb-6">Session Timeline</h3>
            
            <div class="relative">
              <!-- Timeline line -->
              <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <!-- Timeline items -->
              <div class="space-y-8">
                <!-- Session Created -->
                <div class="relative flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center z-10">
                      <CheckCircle2 class="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div class="flex-1 pb-8">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold">Session Created</h4>
                      <span class="text-xs text-muted-foreground">2024-12-20 09:00</span>
                    </div>
                    <p class="text-sm text-muted-foreground mb-2">Initial consultation scheduled</p>
                    <div class="flex items-center gap-2">
                      <div class="h-1.5 bg-blue-600 rounded-full" style="width: 100%"></div>
                      <span class="text-xs font-medium text-blue-600">100%</span>
                    </div>
                  </div>
                </div>

                <!-- Session Started -->
                <div class="relative flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-green-100 border-4 border-white flex items-center justify-center z-10">
                      <CheckCircle2 class="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div class="flex-1 pb-8">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold">Session Started</h4>
                      <span class="text-xs text-muted-foreground">2024-12-23 16:00</span>
                    </div>
                    <p class="text-sm text-muted-foreground mb-2">Patient arrived and session began</p>
                    <div class="flex items-center gap-2">
                      <div class="h-1.5 bg-green-600 rounded-full" style="width: 100%"></div>
                      <span class="text-xs font-medium text-green-600">100%</span>
                    </div>
                  </div>
                </div>

                <!-- Clinical Notes Added -->
                <div class="relative flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-purple-100 border-4 border-white flex items-center justify-center z-10">
                      <FileText class="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div class="flex-1 pb-8">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold">Clinical Notes Added</h4>
                      <span class="text-xs text-muted-foreground">2024-12-23 16:45</span>
                    </div>
                    <p class="text-sm text-muted-foreground mb-2">Dr. Sarah Johnson documented session notes</p>
                    <div class="flex items-center gap-2">
                      <div class="h-1.5 bg-purple-600 rounded-full" style="width: 85%"></div>
                      <span class="text-xs font-medium text-purple-600">85%</span>
                    </div>
                  </div>
                </div>

                <!-- Payment Processing -->
                <div class="relative flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-amber-100 border-4 border-white flex items-center justify-center z-10">
                      <CreditCard class="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                  <div class="flex-1 pb-8">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold">Payment Processing</h4>
                      <span class="text-xs text-muted-foreground">In Progress</span>
                    </div>
                    <p class="text-sm text-muted-foreground mb-2">Awaiting payment confirmation</p>
                    <div class="flex items-center gap-2">
                      <div class="h-1.5 bg-amber-600 rounded-full" style="width: 50%"></div>
                      <span class="text-xs font-medium text-amber-600">50%</span>
                    </div>
                  </div>
                </div>

                <!-- Session Completion -->
                <div class="relative flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center z-10">
                      <Shield class="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold text-muted-foreground">Session Completion</h4>
                      <span class="text-xs text-muted-foreground">Pending</span>
                    </div>
                    <p class="text-sm text-muted-foreground mb-2">Final review and confirmation needed</p>
                    <div class="flex items-center gap-2">
                      <div class="h-1.5 bg-gray-300 rounded-full" style="width: 15%"></div>
                      <span class="text-xs font-medium text-gray-400">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <Separator class="shrink-0" />

      <DialogFooter class="px-6 py-4 shrink-0">
        <Button variant="ghost" @click="emit('close')">
          Cancel
        </Button>
        <Button @click="confirmSession">
          <CheckCircle2 class="w-4 h-4 mr-2" />
          Confirm Session Complete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
