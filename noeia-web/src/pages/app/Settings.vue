<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Card from '@/components/ui/Card.vue'

const auth = useAuthStore()

const profile = ref({
  name: auth.user?.user_metadata?.full_name || '',
  email: auth.user?.email || '',
  title: 'Clinical Psychologist',
  bio: 'Specializing in CBT and mindfulness-based therapies.'
})

const notifications = ref({
  email: true,
  sms: false,
  reminders: true
})

const activeTab = ref('profile')

const invoices = [
  { id: 'INV-001', date: 'Oct 01, 2025', amount: '$29.00', status: 'Paid' },
  { id: 'INV-002', date: 'Sep 01, 2025', amount: '$29.00', status: 'Paid' },
  { id: 'INV-003', date: 'Aug 01, 2025', amount: '$29.00', status: 'Paid' },
]

function saveProfile() {
  // Mock save
  alert('Profile saved!')
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Settings</h1>
        <p class="text-slate-500">Manage your account and preferences.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Sidebar Nav -->
      <div class="space-y-1">
        <button 
          @click="activeTab = 'profile'"
          class="w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          :class="activeTab === 'profile' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'"
        >
          Profile
        </button>
        <button 
          @click="activeTab = 'billing'"
          class="w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          :class="activeTab === 'billing' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'"
        >
          Billing
        </button>
        <button 
          @click="activeTab = 'notifications'"
          class="w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          :class="activeTab === 'notifications' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'"
        >
          Notifications
        </button>
      </div>

      <!-- Content -->
      <div class="md:col-span-2 space-y-6">
        <!-- Profile Section -->
        <div v-if="activeTab === 'profile'">
          <Card title="Profile Information" description="Update your public profile details.">
            <div class="space-y-4">
              <div class="flex items-center gap-4 mb-6">
                <img 
                  v-if="auth.user?.user_metadata?.avatar_url" 
                  :src="auth.user.user_metadata.avatar_url" 
                  alt="Avatar" 
                  class="w-16 h-16 rounded-full bg-slate-100"
                />
                <div v-else class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold">
                  {{ auth.user?.email?.charAt(0).toUpperCase() }}
                </div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id="name" v-model="profile.name" label="Full Name" />
                <Input id="title" v-model="profile.title" label="Professional Title" />
              </div>
              
              <Input id="email" v-model="profile.email" label="Email Address" disabled />
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea 
                  v-model="profile.bio"
                  rows="4"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-end">
                <Button @click="saveProfile">Save Changes</Button>
              </div>
            </template>
          </Card>
        </div>

        <!-- Billing Section -->
        <div v-if="activeTab === 'billing'">
          <Card title="Subscription Plan" description="Manage your billing and subscription.">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="font-semibold text-slate-900">Professional Plan</h3>
                <p class="text-sm text-slate-500">$29.00 / month</p>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-600">Next billing date</span>
                <span class="font-medium text-slate-900">Nov 01, 2025</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-600">Payment method</span>
                <span class="font-medium text-slate-900">Visa ending in 4242</span>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-end gap-3">
                <Button variant="outline">Cancel Subscription</Button>
                <Button>Update Payment Method</Button>
              </div>
            </template>
          </Card>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-slate-900 mb-4">Invoice History</h3>
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table class="w-full text-sm text-left">
                <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th class="px-6 py-3">Invoice</th>
                    <th class="px-6 py-3">Date</th>
                    <th class="px-6 py-3">Amount</th>
                    <th class="px-6 py-3">Status</th>
                    <th class="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-slate-50">
                    <td class="px-6 py-4 font-medium text-slate-900">{{ invoice.id }}</td>
                    <td class="px-6 py-4 text-slate-600">{{ invoice.date }}</td>
                    <td class="px-6 py-4 text-slate-600">{{ invoice.amount }}</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">{{ invoice.status }}</span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button class="text-primary-600 hover:text-primary-700 font-medium">Download</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Notifications Section -->
        <div v-if="activeTab === 'notifications'">
          <Card title="Notifications" description="Choose how you want to be notified.">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-slate-900">Email Notifications</h4>
                  <p class="text-xs text-slate-500">Receive daily summaries and alerts.</p>
                </div>
                <input type="checkbox" v-model="notifications.email" class="rounded text-primary-600 focus:ring-primary-500">
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-slate-900">SMS Reminders</h4>
                  <p class="text-xs text-slate-500">Get text messages for upcoming sessions.</p>
                </div>
                <input type="checkbox" v-model="notifications.sms" class="rounded text-primary-600 focus:ring-primary-500">
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
