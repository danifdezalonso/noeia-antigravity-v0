<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Users, Shield, UserCog, CheckCircle2, MoreHorizontal } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const teamMembers = [
  { name: 'Dr. Sarah Chen', role: 'Medical Director', specialty: 'Psychiatrist', status: 'Active', avatar: 'SC', color: 'bg-blue-100 text-blue-600' },
  { name: 'Mark Wilson', role: 'Clinic Manager', specialty: 'Operations', status: 'Active', avatar: 'MW', color: 'bg-purple-100 text-purple-600' },
  { name: 'Dr. Emily Rodriguez', role: 'Therapist', specialty: 'Clinical Psychologist', status: 'Active', avatar: 'ER', color: 'bg-green-100 text-green-600' },
  { name: 'James Thompson', role: 'Therapist', specialty: 'Counselor', status: 'On Leave', avatar: 'JT', color: 'bg-orange-100 text-orange-600' },
]

const permissions = [
  { task: 'Manage billing', admin: true, manager: false, professional: false },
  { task: 'Configure rooms', admin: true, manager: true, professional: false },
  { task: 'Edit schedules', admin: true, manager: true, professional: true },
  { task: 'View all clients', admin: true, manager: true, professional: false },
]
</script>

<template>
  <div class="relative overflow-hidden pb-20 lg:pb-32">
    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12 mb-24">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-medium mb-6">
          <Users class="w-3 h-3" />
          Team Management
        </div>
        <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          Teams, roles, and responsibilities
        </h1>
        <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
          Admins, managers, and therapists share the same platform with appropriate access. Keep everyone in sync without compromising security.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
      
      <!-- Section 1: Roles Overview -->
      <div 
        class="grid md:grid-cols-3 gap-8"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out;"
      >
        <!-- Admin -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
            <Shield class="w-6 h-6 text-slate-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Admin</h3>
          <p class="text-slate-600 text-sm mb-6">Controls the whole workspace, billing, and configuration.</p>
          <ul class="space-y-2 text-sm text-slate-500">
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Full access</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Billing management</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> User provisioning</li>
          </ul>
        </div>

        <!-- Manager -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
            <UserCog class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Manager</h3>
          <p class="text-slate-600 text-sm mb-6">Oversees schedules, rooms, and reporting, without touching billing details.</p>
          <ul class="space-y-2 text-sm text-slate-500">
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Schedule oversight</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Room management</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Performance reports</li>
          </ul>
        </div>

        <!-- Professional -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
            <Users class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Professional</h3>
          <p class="text-slate-600 text-sm mb-6">Focuses on sessions, documentation, and patient follow-up.</p>
          <ul class="space-y-2 text-sm text-slate-500">
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Patient care</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Clinical notes</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-primary-600" /> Calendar management</li>
          </ul>
        </div>
      </div>

      <!-- Section 2: Team Table -->
      <div 
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.2s;"
      >
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">See your whole team at a glance</h2>
          <p class="text-slate-600">List your professionals with specialties, locations, and status.</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th class="px-6 py-4">Name</th>
                <th class="px-6 py-4">Specialty</th>
                <th class="px-6 py-4">Role</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="member in teamMembers" 
                :key="member.name"
                class="hover:bg-slate-50 transition-colors group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" :class="member.color">
                      {{ member.avatar }}
                    </div>
                    <span class="font-medium text-slate-900">{{ member.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-slate-600">{{ member.specialty }}</td>
                <td class="px-6 py-4 text-slate-600">{{ member.role }}</td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
                  >
                    {{ member.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: Permissions Matrix -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-center"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.4s;"
      >
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Permissions that match clinical reality</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            Granular control over who can see and do what. Protect sensitive patient data while giving your team the tools they need.
          </p>
          <Button size="lg" class="rounded-full px-8 bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-600/20 transition-all hover:scale-[1.02]">
            Start managing your team
          </Button>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-slate-500 border-b border-slate-100">
                <th class="text-left py-4 font-medium">Permission</th>
                <th class="text-center py-4 font-medium">Admin</th>
                <th class="text-center py-4 font-medium">Manager</th>
                <th class="text-center py-4 font-medium">Pro</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="perm in permissions" :key="perm.task">
                <td class="py-4 text-slate-900 font-medium">{{ perm.task }}</td>
                <td class="py-4 text-center">
                  <CheckCircle2 v-if="perm.admin" class="w-5 h-5 text-green-500 mx-auto" />
                  <div v-else class="w-1.5 h-1.5 rounded-full bg-slate-200 mx-auto"></div>
                </td>
                <td class="py-4 text-center">
                  <CheckCircle2 v-if="perm.manager" class="w-5 h-5 text-green-500 mx-auto" />
                  <div v-else class="w-1.5 h-1.5 rounded-full bg-slate-200 mx-auto"></div>
                </td>
                <td class="py-4 text-center">
                  <CheckCircle2 v-if="perm.professional" class="w-5 h-5 text-green-500 mx-auto" />
                  <div v-else class="w-1.5 h-1.5 rounded-full bg-slate-200 mx-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
