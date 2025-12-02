<script setup lang="ts">
import { ref } from 'vue'
import { Users, Calendar, CreditCard, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, Clock } from 'lucide-vue-next'

// Mock Data
const metrics = [
  { label: 'Active Doctors', value: '12', change: '+2', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Patients', value: '148', change: '+12%', trend: 'up', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Sessions this Week', value: '86', change: '-5%', trend: 'down', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Revenue (Month)', value: '€12.4k', change: '+8%', trend: 'up', icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-50' },
]

const todaySchedule = [
  { id: 1, time: '09:00 - 10:00', patient: 'Sarah Johnson', doctor: 'Dr. Anna Ruiz', type: 'Initial Consultation', status: 'upcoming' },
  { id: 2, time: '10:30 - 11:30', patient: 'Michael Brown', doctor: 'Dr. Marc Vidal', type: 'Therapy Session', status: 'upcoming' },
  { id: 3, time: '13:00 - 14:00', patient: 'Emma Wilson', doctor: 'Dr. Júlia Serra', type: 'Follow-up', status: 'upcoming' },
  { id: 4, time: '15:30 - 16:30', patient: 'David Lee', doctor: 'Dr. Omar López', type: 'CBT Session', status: 'upcoming' },
]

const doctorsOverview = [
  { id: 1, name: 'Dr. Anna Ruiz', specialty: 'Clinical Psychologist', role: 'Manager', sessions: 24, avatar: 'https://i.pravatar.cc/150?u=anna' },
  { id: 2, name: 'Dr. Marc Vidal', specialty: 'Child Psychologist', role: 'Doctor', sessions: 18, avatar: 'https://i.pravatar.cc/150?u=marc' },
  { id: 3, name: 'Dr. Júlia Serra', specialty: 'Couples Therapist', role: 'Doctor', sessions: 20, avatar: 'https://i.pravatar.cc/150?u=julia' },
  { id: 4, name: 'Dr. Omar López', specialty: 'CBT Specialist', role: 'Doctor', sessions: 22, avatar: 'https://i.pravatar.cc/150?u=omar' },
]

const billingSnapshot = {
  paid: 8500,
  unpaid: 3900,
  total: 12400
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p class="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
          Download Report
        </button>
        <button class="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
          Add Doctor
        </button>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="metric in metrics" :key="metric.label" class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div :class="[metric.bg, 'p-2 rounded-lg']">
            <component :is="metric.icon" :class="[metric.color, 'w-5 h-5']" />
          </div>
          <span :class="[metric.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50', 'text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1']">
            <component :is="metric.trend === 'up' ? ArrowUpRight : ArrowDownRight" class="w-3 h-3" />
            {{ metric.change }}
          </span>
        </div>
        <h3 class="text-2xl font-bold text-slate-900">{{ metric.value }}</h3>
        <p class="text-sm text-slate-500">{{ metric.label }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Today's Schedule -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 class="font-semibold text-slate-900">Today's Schedule</h2>
          <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">View Calendar</button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="session in todaySchedule" :key="session.id" class="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-primary-100 hover:bg-primary-50/30 transition-colors group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-xs">
                  {{ session.time.split(' - ')[0] }}
                </div>
                <div>
                  <h4 class="font-medium text-slate-900">{{ session.patient }}</h4>
                  <p class="text-sm text-slate-500 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                    {{ session.type }} with {{ session.doctor }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm text-slate-500">{{ session.time }}</span>
                <button class="p-2 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Doctors Overview -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 class="font-semibold text-slate-900">Doctors Overview</h2>
            <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <div v-for="doctor in doctorsOverview" :key="doctor.id" class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <img :src="doctor.avatar" :alt="doctor.name" class="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-slate-900 truncate">{{ doctor.name }}</h4>
                  <p class="text-xs text-slate-500 truncate">{{ doctor.specialty }}</p>
                </div>
                <div class="text-right">
                  <span class="text-xs font-medium text-slate-900 block">{{ doctor.sessions }}</span>
                  <span class="text-[10px] text-slate-400 uppercase">Sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Snapshot -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-slate-900">Billing Snapshot</h2>
            <span class="text-xs text-slate-500">This Month</span>
          </div>
          
          <div class="flex items-end gap-2 mb-6">
            <span class="text-3xl font-bold text-slate-900">€{{ (billingSnapshot.total / 1000).toFixed(1) }}k</span>
            <span class="text-sm text-green-600 font-medium mb-1">+8% vs last month</span>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-600">Paid</span>
                <span class="font-medium text-slate-900">€{{ billingSnapshot.paid.toLocaleString() }}</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 rounded-full" :style="{ width: `${(billingSnapshot.paid / billingSnapshot.total) * 100}%` }"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-600">Unpaid</span>
                <span class="font-medium text-slate-900">€{{ billingSnapshot.unpaid.toLocaleString() }}</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-orange-400 rounded-full" :style="{ width: `${(billingSnapshot.unpaid / billingSnapshot.total) * 100}%` }"></div>
              </div>
            </div>
          </div>
          
          <button class="w-full mt-6 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            View Billing Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
