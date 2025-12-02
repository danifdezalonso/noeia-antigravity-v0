<script setup lang="ts">
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { Calendar, Users, Building, GitMerge, BarChart3 } from 'lucide-vue-next'

const features = [
  {
    icon: Calendar,
    title: 'Clinic-wide calendar',
    description: 'View everyone at once. Filter by professional, room, or modality. Adjust capacity in seconds.'
  },
  {
    icon: Users,
    title: 'Doctors & roles',
    description: 'Managers, supervisors, external collaborators. Assign permissions without relabeling accounts or duplicating profiles.'
  },
  {
    icon: Building,
    title: 'Office & room management',
    description: 'Define rooms by number or name. Make them available to everyone or dedicate them to specific doctors. Block time windows to protect availability.'
  },
  {
    icon: GitMerge,
    title: 'Client routing done right',
    description: 'Assign each patient to a doctor. Inside billing and patient tables, the professional column stays visible across every workflow.'
  },
  {
    icon: BarChart3,
    title: 'Revenue clarity',
    description: 'Billing filters by doctor. Compare occupancy, payouts, and volume. Export data without spreadsheets or late-night admin sessions.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <PublicNavbar />
    
    <main class="flex-grow pt-24 pb-16">
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-text mb-6 tracking-tight">
            For clinics that run on coordination, not chaos
          </h1>
          <p class="text-xl text-text-muted leading-relaxed">
            One system for your professionals, rooms, schedules, and billing—without hiring extra admins.
          </p>
        </div>

        <!-- Visuals Section -->
        <div class="grid md:grid-cols-2 gap-8 mb-24 items-start">
          <!-- Left: Doctors Table Visual -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden h-96 relative flex flex-col">
            <div class="absolute top-0 left-0 right-0 h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 justify-between">
               <div class="text-xs font-medium text-slate-500">Team Management</div>
               <div class="flex gap-2">
                 <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                 <div class="w-2 h-2 rounded-full bg-slate-200"></div>
               </div>
            </div>
            <div class="mt-10 flex-1 overflow-hidden">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="text-slate-400 border-b border-slate-100">
                    <th class="pb-3 font-medium">Professional</th>
                    <th class="pb-3 font-medium">Specialty</th>
                    <th class="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr>
                    <td class="py-3 font-medium text-slate-700">Dr. Sarah Chen</td>
                    <td class="py-3 text-slate-500">Clinical Psych</td>
                    <td class="py-3"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Active</span></td>
                  </tr>
                  <tr>
                    <td class="py-3 font-medium text-slate-700">Marc Davis</td>
                    <td class="py-3 text-slate-500">Family Therapy</td>
                    <td class="py-3"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Active</span></td>
                  </tr>
                  <tr>
                    <td class="py-3 font-medium text-slate-700">Elena Rodriguez</td>
                    <td class="py-3 text-slate-500">Child Psych</td>
                    <td class="py-3"><span class="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">On Leave</span></td>
                  </tr>
                  <tr>
                    <td class="py-3 font-medium text-slate-700">Dr. James Wilson</td>
                    <td class="py-3 text-slate-500">Psychiatry</td>
                    <td class="py-3"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Active</span></td>
                  </tr>
                   <tr>
                    <td class="py-3 font-medium text-slate-700">Anna Kim</td>
                    <td class="py-3 text-slate-500">Counseling</td>
                    <td class="py-3"><span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">Inactive</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right: Clinic Calendar Visual -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-96 relative overflow-hidden">
             <div class="absolute top-0 left-0 right-0 h-12 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-4">
               <div class="text-xs font-medium text-slate-500">Clinic Schedule • Week View</div>
               <div class="flex -space-x-2">
                  <div class="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] text-blue-600 font-bold">SC</div>
                  <div class="w-6 h-6 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-[10px] text-purple-600 font-bold">MD</div>
                  <div class="w-6 h-6 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] text-orange-600 font-bold">ER</div>
               </div>
            </div>
            <div class="mt-10 grid grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-lg overflow-hidden">
              <!-- Headers -->
              <div class="bg-slate-50 p-2 text-xs font-medium text-slate-500 text-center">Room 1</div>
              <div class="bg-slate-50 p-2 text-xs font-medium text-slate-500 text-center">Room 2</div>
              <div class="bg-slate-50 p-2 text-xs font-medium text-slate-500 text-center">Room 3</div>
              <div class="bg-slate-50 p-2 text-xs font-medium text-slate-500 text-center">Online</div>

              <!-- Row 1 -->
              <div class="bg-white h-20 p-1">
                <div class="bg-blue-50 border-l-2 border-blue-500 h-full rounded p-1 text-[10px] text-blue-900">
                  <span class="font-bold">Dr. Chen</span><br>Session
                </div>
              </div>
              <div class="bg-white h-20 p-1"></div>
              <div class="bg-white h-20 p-1">
                 <div class="bg-orange-50 border-l-2 border-orange-500 h-full rounded p-1 text-[10px] text-orange-900">
                  <span class="font-bold">Elena R.</span><br>Child Th.
                </div>
              </div>
              <div class="bg-white h-20 p-1">
                 <div class="bg-purple-50 border-l-2 border-purple-500 h-full rounded p-1 text-[10px] text-purple-900">
                  <span class="font-bold">Marc D.</span><br>Family
                </div>
              </div>

               <!-- Row 2 -->
              <div class="bg-white h-20 p-1"></div>
              <div class="bg-white h-20 p-1">
                 <div class="bg-blue-50 border-l-2 border-blue-500 h-full rounded p-1 text-[10px] text-blue-900">
                  <span class="font-bold">Dr. Chen</span><br>Follow-up
                </div>
              </div>
              <div class="bg-white h-20 p-1"></div>
               <div class="bg-white h-20 p-1">
                 <div class="bg-purple-50 border-l-2 border-purple-500 h-full rounded p-1 text-[10px] text-purple-900">
                  <span class="font-bold">Marc D.</span><br>Intake
                </div>
              </div>
              
               <!-- Row 3 -->
              <div class="bg-white h-20 p-1">
                 <div class="bg-orange-50 border-l-2 border-orange-500 h-full rounded p-1 text-[10px] text-orange-900">
                  <span class="font-bold">Elena R.</span><br>Play Th.
                </div>
              </div>
              <div class="bg-white h-20 p-1"></div>
              <div class="bg-white h-20 p-1"></div>
              <div class="bg-white h-20 p-1"></div>
            </div>
          </div>
        </div>

        <!-- Content Blocks -->
        <div class="max-w-4xl mx-auto">
          <div class="space-y-12">
            <div v-for="(feature, index) in features" :key="index" class="flex gap-6 items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <component :is="feature.icon" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-text mb-2">{{ feature.title }}</h3>
                <p class="text-text-muted leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>

    <PublicFooter />
  </div>
</template>
