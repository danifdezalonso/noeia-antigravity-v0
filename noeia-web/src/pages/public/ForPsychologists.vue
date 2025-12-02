<script setup lang="ts">
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { Calendar, FileText, Users, Lock, Monitor } from 'lucide-vue-next'

const features = [
  {
    icon: Calendar,
    title: 'Calendar designed for real sessions',
    description: 'Block your week, manage cancellations, and reschedule instantly. No clutter, no generic appointment software vibes.'
  },
  {
    icon: FileText,
    title: 'Session notes that write themselves',
    description: 'Paste your raw thoughts after a session. Noeia turns them into a clean summary, structured reflections, and a plan for the next appointment.'
  },
  {
    icon: Users,
    title: 'Client records you can trust',
    description: 'Every file, every message, every progress thread in one timeline. No hunting across folders, PDFs, or WhatsApp screenshots.'
  },
  {
    icon: Lock,
    title: 'Private workspace',
    description: 'Your clinical notes are not shared with clients. You decide what gets surfaced in reports or follow-ups.'
  },
  {
    icon: Monitor,
    title: 'Freedom of modality',
    description: 'Work online or in person. Assign rooms, manage telehealth, and avoid double-booking without additional tools.'
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
            For psychologists who want more time with their patients
          </h1>
          <p class="text-xl text-text-muted leading-relaxed">
            Work at your pace. Capture what matters. Let Noeia handle the parts that slow you down.
          </p>
        </div>

        <!-- Visuals Section -->
        <div class="grid md:grid-cols-2 gap-8 mb-24 items-start">
          <!-- Left: Calendar Visual -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden h-96 relative">
            <div class="absolute top-0 left-0 right-0 h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4">
              <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div class="mx-auto text-xs font-medium text-slate-500">Calendar</div>
            </div>
            <div class="mt-10 space-y-4">
              <!-- Mock Calendar Events -->
              <div class="flex gap-4">
                <div class="w-12 text-xs text-slate-400 text-right pt-2">09:00</div>
                <div class="flex-1 bg-primary-50 border-l-4 border-primary-500 p-3 rounded text-sm">
                  <div class="font-medium text-primary-900">Session with Alex</div>
                  <div class="text-primary-700 text-xs">In-person • Room A</div>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 text-xs text-slate-400 text-right pt-2">10:00</div>
                <div class="flex-1 border-t border-dashed border-slate-200 relative h-12"></div>
              </div>
               <div class="flex gap-4">
                <div class="w-12 text-xs text-slate-400 text-right pt-2">11:00</div>
                <div class="flex-1 bg-purple-50 border-l-4 border-purple-500 p-3 rounded text-sm">
                  <div class="font-medium text-purple-900">Initial Consultation</div>
                  <div class="text-purple-700 text-xs">Online</div>
                </div>
              </div>
               <div class="flex gap-4">
                <div class="w-12 text-xs text-slate-400 text-right pt-2">12:00</div>
                <div class="flex-1 bg-slate-50 border-l-4 border-slate-300 p-3 rounded text-sm opacity-60">
                  <div class="font-medium text-slate-700">Lunch Break</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Notes Visual -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-96 relative flex flex-col">
             <div class="absolute top-0 left-0 right-0 h-12 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-4">
               <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                  <span class="text-xs font-medium text-slate-600">AI summary generated</span>
               </div>
               <span class="text-xs text-primary-600 font-medium cursor-pointer hover:underline">Edit freely</span>
            </div>
            <div class="mt-10 flex-1 font-mono text-sm text-slate-600 leading-relaxed overflow-hidden">
              <p class="mb-4"><span class="text-slate-400"># Summary</span><br>Patient expressed anxiety regarding upcoming career transition. Discussed coping mechanisms practiced since last week.</p>
              <p class="mb-4"><span class="text-slate-400"># Key Themes</span><br>• Uncertainty<br>• Professional Identity<br>• Family Expectations</p>
              <p><span class="text-slate-400"># Plan</span><br>Focus on "Circle of Control" exercise next session.</p>
              
              <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
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
