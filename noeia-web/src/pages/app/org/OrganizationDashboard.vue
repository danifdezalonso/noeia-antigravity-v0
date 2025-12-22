<script setup lang="ts">
import { Users, Calendar, CreditCard, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

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
  { id: 1, name: 'Dr. Anna Ruiz', specialty: 'Clinical Psychologist', role: 'Manager', sessions: 24, avatar: 'https://i.pravatar.cc/150?u=anna', initials: 'AR' },
  { id: 2, name: 'Dr. Marc Vidal', specialty: 'Child Psychologist', role: 'Doctor', sessions: 18, avatar: 'https://i.pravatar.cc/150?u=marc', initials: 'MV' },
  { id: 3, name: 'Dr. Júlia Serra', specialty: 'Couples Therapist', role: 'Doctor', sessions: 20, avatar: 'https://i.pravatar.cc/150?u=julia', initials: 'JS' },
  { id: 4, name: 'Dr. Omar López', specialty: 'CBT Specialist', role: 'Doctor', sessions: 22, avatar: 'https://i.pravatar.cc/150?u=omar', initials: 'OL' },
]

const billingSnapshot = {
  paid: 8500,
  unpaid: 3900,
  total: 12400
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p class="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>
      <div class="flex gap-3">
        <Button variant="outline">
          Download Report
        </Button>
        <Button>
          Add Doctor
        </Button>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="metric in metrics" :key="metric.label">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ metric.label }}
          </CardTitle>
          <component :is="metric.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
          <p class="text-xs text-muted-foreground flex items-center mt-1">
            <span :class="[metric.trend === 'up' ? 'text-green-600' : 'text-red-600', 'flex items-center mr-1']">
              <component :is="metric.trend === 'up' ? ArrowUpRight : ArrowDownRight" class="w-3 h-3 mr-0.5" />
              {{ metric.change }}
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Today's Schedule -->
      <Card class="lg:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between">
          <div class="space-y-1">
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>You have {{ todaySchedule.length }} sessions scheduled for today.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" class="text-primary">View Calendar</Button>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="session in todaySchedule" :key="session.id" class="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {{ session.time.split(' - ')[0] }}
                </div>
                <div>
                  <h4 class="font-medium text-foreground">{{ session.patient }}</h4>
                  <p class="text-sm text-muted-foreground flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {{ session.type }} with {{ session.doctor }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm text-muted-foreground">{{ session.time }}</span>
                <Button variant="ghost" size="icon" class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Doctors Overview -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-lg">Doctors Overview</CardTitle>
            <Button variant="ghost" size="sm" class="text-primary">View All</Button>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-for="doctor in doctorsOverview" :key="doctor.id" class="flex items-center gap-3 p-2 hover:bg-accent/50 rounded-lg transition-colors cursor-pointer">
                <Avatar>
                  <AvatarImage :src="doctor.avatar" :alt="doctor.name" />
                  <AvatarFallback>{{ doctor.initials }}</AvatarFallback>
                </Avatar>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-foreground truncate">{{ doctor.name }}</h4>
                  <p class="text-xs text-muted-foreground truncate">{{ doctor.specialty }}</p>
                </div>
                <div class="text-right">
                  <span class="text-xs font-medium text-foreground block">{{ doctor.sessions }}</span>
                  <span class="text-[10px] text-muted-foreground uppercase">Sessions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Billing Snapshot -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-lg">Billing Snapshot</CardTitle>
              <Badge variant="outline">This Month</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div class="flex items-end gap-2 mb-6">
              <span class="text-3xl font-bold text-foreground">€{{ (billingSnapshot.total / 1000).toFixed(1) }}k</span>
              <span class="text-sm text-green-600 font-medium mb-1">+8% vs last month</span>
            </div>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-muted-foreground">Paid</span>
                  <span class="font-medium text-foreground">€{{ billingSnapshot.paid.toLocaleString() }}</span>
                </div>
                <Progress :model-value="(billingSnapshot.paid / billingSnapshot.total) * 100" class="h-2 bg-secondary" indicator-class="bg-green-500" />
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-muted-foreground">Unpaid</span>
                  <span class="font-medium text-foreground">€{{ billingSnapshot.unpaid.toLocaleString() }}</span>
                </div>
                <Progress :model-value="(billingSnapshot.unpaid / billingSnapshot.total) * 100" class="h-2 bg-secondary" indicator-class="bg-orange-400" />
              </div>
            </div>
            
            <Button variant="outline" class="w-full mt-6">
              View Billing Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
