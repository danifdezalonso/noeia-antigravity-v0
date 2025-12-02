<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { BarChart3, DollarSign, Download, ArrowUpRight, ArrowDownRight, Users } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const billingData = [
  { date: 'Oct 24', patient: 'Alex M.', doctor: 'Dr. Chen', amount: '$150.00', status: 'Paid' },
  { date: 'Oct 24', patient: 'Sarah K.', doctor: 'Mark W.', amount: '$120.00', status: 'Pending' },
  { date: 'Oct 23', patient: 'James L.', doctor: 'Dr. Rodriguez', amount: '$180.00', status: 'Paid' },
  { date: 'Oct 23', patient: 'Emma R.', doctor: 'Dr. Chen', amount: '$150.00', status: 'Paid' },
]
</script>

<template>
  <div class="relative overflow-hidden pb-20 lg:pb-32">
    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12 mb-24">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-medium mb-6">
          <DollarSign class="w-3 h-3" />
          Financial Insights
        </div>
        <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          Billing and reporting by doctor and clinic
        </h1>
        <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
          Track revenue, payouts, and outstanding balances. Get the clarity you need to run a profitable practice.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
      
      <!-- Section 1: Billing per doctor -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-center"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out;"
      >
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Revenue attribution made easy</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            Stop manually calculating payouts. Noeia tracks every session and assigns revenue to the correct professional automatically.
          </p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5"></div>
              <span class="text-slate-700">Filter revenue by doctor and date range.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5"></div>
              <span class="text-slate-700">See completed vs pending payments instantly.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5"></div>
              <span class="text-slate-700">Track insurance claims and private pay separately.</span>
            </li>
          </ul>
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
            <strong>Note:</strong> Noeia doesn’t replace your accounting software; it gives you clean, organized data to feed into it.
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div class="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
            <select class="rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500">
              <option>All Doctors</option>
              <option>Dr. Chen</option>
              <option>Mark Wilson</option>
            </select>
            <select class="rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500">
              <option>Last 30 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <table class="w-full text-left text-sm">
            <thead class="bg-white text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th class="px-6 py-3">Date</th>
                <th class="px-6 py-3">Patient</th>
                <th class="px-6 py-3">Doctor</th>
                <th class="px-6 py-3">Amount</th>
                <th class="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(item, i) in billingData" :key="i" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-3 text-slate-600">{{ item.date }}</td>
                <td class="px-6 py-3 font-medium text-slate-900">{{ item.patient }}</td>
                <td class="px-6 py-3 text-slate-600">{{ item.doctor }}</td>
                <td class="px-6 py-3 font-medium text-slate-900">{{ item.amount }}</td>
                <td class="px-6 py-3">
                  <span 
                    class="px-2 py-0.5 rounded-full text-xs font-medium"
                    :class="item.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 2: Clinic snapshot -->
      <div 
        class="space-y-8"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.2s;"
      >
        <h2 class="text-3xl font-bold text-slate-900">Know how your clinic is doing this week</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="text-slate-500 text-sm font-medium">Sessions completed</div>
              <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Users class="w-4 h-4" />
              </div>
            </div>
            <div class="flex items-end gap-2">
              <div class="text-3xl font-bold text-slate-900">124</div>
              <div class="flex items-center text-green-600 text-sm font-medium mb-1">
                <ArrowUpRight class="w-4 h-4" /> 12%
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="text-slate-500 text-sm font-medium">Revenue this week</div>
              <div class="p-2 bg-green-50 rounded-lg text-green-600">
                <DollarSign class="w-4 h-4" />
              </div>
            </div>
            <div class="flex items-end gap-2">
              <div class="text-3xl font-bold text-slate-900">$12.4k</div>
              <div class="flex items-center text-green-600 text-sm font-medium mb-1">
                <ArrowUpRight class="w-4 h-4" /> 8%
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="text-slate-500 text-sm font-medium">No-show rate</div>
              <div class="p-2 bg-orange-50 rounded-lg text-orange-600">
                <BarChart3 class="w-4 h-4" />
              </div>
            </div>
            <div class="flex items-end gap-2">
              <div class="text-3xl font-bold text-slate-900">4.2%</div>
              <div class="flex items-center text-green-600 text-sm font-medium mb-1">
                <ArrowDownRight class="w-4 h-4" /> 1.5%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Exports -->
      <div 
        class="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.4s;"
      >
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 class="text-3xl font-bold mb-4">Export data, not spreadsheets</h2>
            <p class="text-slate-300 text-lg max-w-xl">
              Need to run deeper analysis? Export your billing and session data to CSV or integrate with your preferred tools later.
            </p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 min-w-[280px]">
            <div class="text-sm font-medium text-slate-300 mb-4 uppercase tracking-wider">Export Options</div>
            <div class="space-y-3">
              <button class="w-full flex items-center justify-between bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                <span>Export CSV</span>
                <Download class="w-4 h-4" />
              </button>
              <button class="w-full flex items-center justify-between bg-white/5 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
                <span>Export PDF</span>
                <Download class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Background decoration -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </div>

    </div>
  </div>
</template>
