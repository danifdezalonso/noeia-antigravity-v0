<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Shield, 
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  MapPin,
  Lock,
  Calendar
} from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const activeTab = ref('summary')

// Mock data
const sessionData = {
  date: '2024-12-23',
  duration: '50 min',
  type: 'Initial Consultation',
  clinician: 'Dr. Sarah Johnson',
  location: 'Room 3A',
  patient: 'John Doe'
}

const completionChecklist = [
  { id: 1, label: 'Clinical notes completed', completed: true },
  { id: 2, label: 'Payment processed', completed: false },
  { id: 3, label: 'Documentation signed', completed: true },
]

const clinicalNotes = ref('Patient reports experiencing mild headaches since last Tuesday. Pain is localized to the frontal region.')
const isNotesLocked = ref(false)

const communications = [
  { id: 1, type: 'WhatsApp', message: 'Session confirmation', status: 'Delivered', time: '10:30 AM' },
  { id: 2, type: 'Email', message: 'Invoice sent', status: 'Opened', time: '11:45 AM' },
]

const auditLog = [
  { id: 1, event: 'Session started', user: 'Dr. Sarah Johnson', time: '2024-12-23 10:00:00' },
  { id: 2, event: 'Clinical notes added', user: 'Dr. Sarah Johnson', time: '2024-12-23 10:45:00' },
  { id: 3, event: 'Payment confirmed', user: 'Admin', time: '2024-12-23 11:30:00' },
]

function confirmSession() {
  // Lock clinical notes
  isNotesLocked.value = true
  emit('close')
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="(val) => !val && emit('close')">
    <DialogContent class="max-w-4xl max-h-[90vh] p-0 gap-0">
      <DialogHeader class="px-6 pt-6 pb-4">
        <DialogTitle class="text-2xl font-bold">Finish Session</DialogTitle>
        <p class="text-sm text-muted-foreground mt-1">
          Review and complete session details for {{ sessionData.patient }}
        </p>
      </DialogHeader>

      <Separator />

      <Tabs v-model="activeTab" class="flex-1 flex flex-col">
        <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0 px-6">
          <TabsTrigger value="summary" class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <FileText class="w-4 h-4 mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="clinical" class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <FileText class="w-4 h-4 mr-2" />
            Clinical Record
            <Lock v-if="isNotesLocked" class="w-3 h-3 ml-2 text-muted-foreground" />
          </TabsTrigger>
          <TabsTrigger value="billing" class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <CreditCard class="w-4 h-4 mr-2" />
            Billing
            <Badge variant="destructive" class="ml-2 h-5 px-1.5 text-xs">!</Badge>
          </TabsTrigger>
          <TabsTrigger value="communications" class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <MessageSquare class="w-4 h-4 mr-2" />
            Communications
          </TabsTrigger>
          <TabsTrigger value="audit" class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <Shield class="w-4 h-4 mr-2" />
            Audit
          </TabsTrigger>
        </TabsList>

        <div class="flex-1 overflow-y-auto">
          <!-- Summary Tab -->
          <TabsContent value="summary" class="p-6 space-y-6 mt-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Session Overview</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                  <Calendar class="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p class="text-sm font-medium">Date</p>
                    <p class="text-sm text-muted-foreground">{{ sessionData.date }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Clock class="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p class="text-sm font-medium">Duration</p>
                    <p class="text-sm text-muted-foreground">{{ sessionData.duration }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <User class="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p class="text-sm font-medium">Clinician</p>
                    <p class="text-sm text-muted-foreground">{{ sessionData.clinician }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <MapPin class="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p class="text-sm font-medium">Location</p>
                    <p class="text-sm text-muted-foreground">{{ sessionData.location }}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Completion Checklist</h3>
              <div class="space-y-3">
                <div v-for="item in completionChecklist" :key="item.id" class="flex items-center gap-3">
                  <CheckCircle2 v-if="item.completed" class="w-5 h-5 text-green-600" />
                  <AlertCircle v-else class="w-5 h-5 text-amber-500" />
                  <span class="text-sm" :class="item.completed ? 'text-muted-foreground' : 'font-medium'">
                    {{ item.label }}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Payment Status</h3>
              <div class="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle class="w-5 h-5 text-amber-600" />
                <div>
                  <p class="text-sm font-medium text-amber-900">Payment Pending</p>
                  <p class="text-xs text-amber-700">Invoice sent, awaiting payment confirmation</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- Clinical Record Tab -->
          <TabsContent value="clinical" class="p-6 space-y-6 mt-0">
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
          <TabsContent value="billing" class="p-6 space-y-6 mt-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Price Breakdown</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Session Fee</span>
                  <span class="font-medium">€120.00</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Additional Services</span>
                  <span class="font-medium">€30.00</span>
                </div>
                <Separator />
                <div class="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€150.00</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Payment Method</h3>
              <div class="flex items-center gap-3 p-4 border rounded-lg">
                <CreditCard class="w-5 h-5 text-muted-foreground" />
                <div>
                  <p class="text-sm font-medium">Credit Card</p>
                  <p class="text-xs text-muted-foreground">•••• 4242</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Invoice Status</h3>
              <Badge variant="outline" class="gap-2">
                <div class="w-2 h-2 rounded-full bg-amber-500" />
                Sent - Awaiting Payment
              </Badge>
            </div>
          </TabsContent>

          <!-- Communications Tab -->
          <TabsContent value="communications" class="p-6 space-y-6 mt-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Notification Log</h3>
              <div class="space-y-3">
                <div v-for="comm in communications" :key="comm.id" class="flex items-center justify-between p-3 border rounded-lg">
                  <div class="flex items-center gap-3">
                    <MessageSquare class="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p class="text-sm font-medium">{{ comm.message }}</p>
                      <p class="text-xs text-muted-foreground">{{ comm.type }} • {{ comm.time }}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{{ comm.status }}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 class="text-lg font-semibold mb-4">Manual Actions</h3>
              <div class="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Send Attendance Certificate</Button>
                <Button variant="outline" size="sm">Send Follow-up Message</Button>
                <Button variant="outline" size="sm">Send Invoice Reminder</Button>
              </div>
            </div>
          </TabsContent>

          <!-- Audit Tab -->
          <TabsContent value="audit" class="p-6 space-y-6 mt-0">
            <div>
              <h3 class="text-lg font-semibold mb-4">Session Lifecycle Events</h3>
              <div class="space-y-3">
                <div v-for="log in auditLog" :key="log.id" class="flex items-start gap-3 p-3 border rounded-lg">
                  <Shield class="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div class="flex-1">
                    <p class="text-sm font-medium">{{ log.event }}</p>
                    <p class="text-xs text-muted-foreground">{{ log.user }} • {{ log.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <Separator />

      <div class="px-6 py-4 flex items-center justify-between bg-muted/50">
        <Button variant="ghost" @click="emit('close')">
          Cancel
        </Button>
        <Button @click="confirmSession">
          <CheckCircle2 class="w-4 h-4 mr-2" />
          Confirm Session Complete
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
