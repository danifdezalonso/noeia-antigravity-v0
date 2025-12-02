<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CtaSection from '@/components/public/CtaSection.vue'
import { History, Tag } from 'lucide-vue-next'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const changelog = [
  {
    date: 'October 24, 2024',
    version: 'v2.4.0',
    changes: [
      { type: 'feature', text: 'New Calendar View for mobile devices' },
      { type: 'improvement', text: 'Reduced initial load time by 30%' },
      { type: 'fix', text: 'Fixed an issue with recurring appointment timezone calculations' }
    ]
  },
  {
    date: 'October 18, 2024',
    version: 'v2.3.8',
    changes: [
      { type: 'improvement', text: 'Updated patient intake form UI' },
      { type: 'fix', text: 'Resolved PDF export formatting issues on Safari' }
    ]
  },
  {
    date: 'October 10, 2024',
    version: 'v2.3.5',
    changes: [
      { type: 'feature', text: 'Patient Portal document upload' },
      { type: 'feature', text: 'Insurance card scanning via mobile camera' },
      { type: 'improvement', text: 'Better error messages for failed payments' }
    ]
  },
  {
    date: 'October 02, 2024',
    version: 'v2.3.2',
    changes: [
      { type: 'fix', text: 'Fixed notification badge count not updating in real-time' },
      { type: 'improvement', text: 'Added keyboard shortcuts for calendar navigation' }
    ]
  },
  {
    date: 'September 28, 2024',
    version: 'v2.3.0',
    changes: [
      { type: 'feature', text: 'AI-Powered Clinical Notes (Beta)' },
      { type: 'feature', text: 'SOAP note templates editor' },
      { type: 'improvement', text: 'Enhanced security for API keys' }
    ]
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'feature': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'improvement': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'fix': return 'bg-amber-100 text-amber-700 border-amber-200'
    default: return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}
</script>

<template>
  <div class="bg-white min-h-screen pt-32">
    <!-- Hero -->
    <section class="text-center px-4 mb-20">
      <div class="inline-flex items-center justify-center p-3 bg-slate-100 rounded-2xl mb-6">
        <History class="w-8 h-8 text-slate-600" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Changelog</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">A running timeline of every improvement, new feature, and bug fix.</p>
    </section>

    <!-- Changelog List -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
      <div class="space-y-12 relative border-l border-slate-200 ml-4 md:ml-0 pl-8 md:pl-0">
        <div 
          v-for="(entry, index) in changelog" 
          :key="index"
          class="relative md:flex gap-8"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <!-- Dot -->
          <div class="absolute -left-[37px] md:left-[143px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-200"></div>

          <!-- Date Column -->
          <div class="md:w-32 md:text-right shrink-0 mb-2 md:mb-0">
            <div class="text-sm font-bold text-slate-500">{{ entry.date }}</div>
            <div class="text-xs font-mono text-slate-400 mt-1">{{ entry.version }}</div>
          </div>

          <!-- Content Column -->
          <div class="flex-1 pb-12 border-b border-slate-100 last:border-0">
            <ul class="space-y-4">
              <li v-for="(change, i) in entry.changes" :key="i" class="flex items-start gap-3">
                <span 
                  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0 mt-0.5"
                  :class="getTypeColor(change.type)"
                >
                  {{ change.type }}
                </span>
                <span class="text-slate-700 leading-relaxed">{{ change.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
