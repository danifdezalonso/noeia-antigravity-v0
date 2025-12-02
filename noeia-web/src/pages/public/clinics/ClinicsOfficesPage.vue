<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Building, Users, Calendar, CheckCircle2, ArrowRight } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const rooms = [
  { name: 'Room 1', type: 'Shared', status: 'Active', assignee: 'All staff' },
  { name: 'Room 2 (Child)', type: 'Dedicated', status: 'Active', assignee: 'Dr. Sarah Chen' },
  { name: 'Room 3 (Couples)', type: 'Shared', status: 'Active', assignee: 'All staff' },
  { name: 'Room 4', type: 'Maintenance', status: 'Inactive', assignee: '-' },
]
</script>

<template>
  <div class="relative overflow-hidden pb-20 lg:pb-32">
    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12 mb-24">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium mb-6">
          <Building class="w-3 h-3" />
          Space Management
        </div>
        <h1 class="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          Offices and rooms under control
        </h1>
        <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
          No more sticky-note room schedules. Everything is in your calendar, preventing conflicts and maximizing utilization.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
      
      <!-- Section 1: Define Rooms -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-center"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out;"
      >
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Define your physical space</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            Create a digital twin of your clinic. Manage multiple locations, floors, and specific rooms with ease.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Create rooms with number and name (e.g. 'Room 2', 'Child therapy room').</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Mark rooms active/inactive instead of deleting them.</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Set capacity and equipment details.</span>
            </li>
          </ul>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div class="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <span class="font-bold text-slate-900">Room List</span>
            <Button size="sm" variant="outline">Add Room</Button>
          </div>
          <div class="divide-y divide-slate-100">
            <div v-for="room in rooms" :key="room.name" class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <div class="font-medium text-slate-900">{{ room.name }}</div>
                <div class="text-xs text-slate-500">{{ room.type }} · {{ room.assignee }}</div>
              </div>
              <span 
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="room.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'"
              >
                {{ room.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Assign to Doctors -->
      <div 
        class="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.2s;"
      >
        <div class="order-2 lg:order-1 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-200 hover:bg-primary-50/50 transition-all cursor-pointer group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-bold text-slate-900">Shared Pool</div>
                  <div class="text-xs text-slate-500">Available to all professionals</div>
                </div>
              </div>
              <div class="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-primary-500"></div>
            </div>

            <div class="flex items-center justify-between p-4 border-2 border-primary-500 bg-primary-50/30 rounded-xl cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <User class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-bold text-slate-900">Dedicated</div>
                  <div class="text-xs text-slate-500">Assigned to specific professional</div>
                </div>
              </div>
              <div class="w-5 h-5 rounded-full border-[5px] border-primary-500 bg-white"></div>
            </div>
            
            <div class="pl-14">
              <label class="block text-sm font-medium text-slate-700 mb-2">Select Professional</label>
              <select class="w-full rounded-lg border-slate-300 text-sm focus:ring-primary-500 focus:border-primary-500">
                <option>Dr. Sarah Chen</option>
                <option>Mark Wilson</option>
              </select>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Decide who uses which room</h2>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            Some rooms are shared, others are dedicated to specific specialities or professionals. Configure access rules that work for your practice.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Available for all professionals (first-come, first-served).</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Dedicated to specific professionals (exclusive access).</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-primary-600 mt-1 shrink-0" />
              <span class="text-slate-700">Restricted by modality (e.g. only for child therapy).</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Section 3: Calendar Integration -->
      <div 
        class="text-center max-w-4xl mx-auto"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition: all 0.7s ease-out 0.4s;"
      >
        <h2 class="text-3xl font-bold text-slate-900 mb-6">Rooms directly inside your calendar</h2>
        <p class="text-lg text-slate-600 mb-12 leading-relaxed">
          When creating an in-person session, pick a room. The calendar shows room usage and helps avoid conflicts instantly.
        </p>
        
        <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div class="grid grid-cols-5 gap-4 text-left">
            <div class="col-span-1 text-xs text-slate-400 pt-2">09:00 AM</div>
            <div class="col-span-4 bg-primary-50 border-l-4 border-primary-500 p-3 rounded-r-lg mb-4">
              <div class="font-bold text-primary-900 text-sm">Session with Alex M.</div>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs text-primary-700 bg-primary-100 px-1.5 py-0.5 rounded">Room 1</span>
                <span class="text-xs text-primary-600">Dr. Chen</span>
              </div>
            </div>

            <div class="col-span-1 text-xs text-slate-400 pt-2">10:00 AM</div>
            <div class="col-span-4 bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r-lg mb-4">
              <div class="font-bold text-purple-900 text-sm">Group Therapy</div>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">Room 3 (Large)</span>
                <span class="text-xs text-purple-600">Mark Wilson</span>
              </div>
            </div>
          </div>
          
          <!-- Decorative overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

    </div>
  </div>
</template>
