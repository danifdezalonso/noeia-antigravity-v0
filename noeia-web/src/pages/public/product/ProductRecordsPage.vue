<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Users, FileText, ArrowLeft, ArrowRight, Check, Lock, Share2 } from 'lucide-vue-next'

// Animation composable
const useScrollReveal = () => {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-4')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    })

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-4')
      observer.value?.observe(el)
    })
  })
}

useScrollReveal()
</script>

<template>
  <div class="bg-white min-h-screen text-slate-900 selection:bg-emerald-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-8">
          <Users class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Client records that <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">reflect the full story</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Every session, document, and follow-up in one timeline. No more digging through folders.
        </p>
      </section>

      <!-- SECTION 2: Timeline -->
      <section class="grid lg:grid-cols-2 gap-16 items-start reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Timeline UI Mock -->
            <div class="relative pl-8 border-l-2 border-slate-100 space-y-8">
              <!-- Item 1 -->
              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm">
                  <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-slate-900">Session #12</div>
                    <div class="text-xs text-slate-500">Oct 24, 2023</div>
                  </div>
                  <p class="text-sm text-slate-600 mb-3">Patient discussed anxiety triggers at work. Explored cognitive reframing techniques.</p>
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-medium">Notes</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-medium">Homework</span>
                  </div>
                </div>
              </div>
              <!-- Item 2 -->
              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-slate-300 shadow-sm"></div>
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-slate-700">Homework Completed</div>
                    <div class="text-xs text-slate-500">Oct 20, 2023</div>
                  </div>
                  <p class="text-sm text-slate-500">Patient uploaded "Anxiety Log" PDF.</p>
                </div>
              </div>
              <!-- Item 3 -->
              <div class="relative">
                 <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-slate-300 shadow-sm"></div>
                 <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                   <div class="flex justify-between items-start mb-2">
                     <div class="font-bold text-slate-700">Session #11</div>
                     <div class="text-xs text-slate-500">Oct 17, 2023</div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">A living timeline</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Session-by-session view with notes, attachments, and AI summaries.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Filter by type: sessions, documents, messages, or exercises.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Privacy & Sharing -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Private vs. Shared</h2>
          <p class="text-lg text-slate-600">
            Keep your clinical notes strictly private, while sharing summaries or homework with patients.
          </p>
          <div class="grid gap-4">
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                <Lock class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Clinician Notes</div>
                <div class="text-sm text-slate-500">Encrypted, private, for your eyes only.</div>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Share2 class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Shared Resources</div>
                <div class="text-sm text-slate-500">Summaries, exercises, and files sent to the patient app.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
           <!-- Mock Toggle UI -->
           <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl max-w-sm w-full">
             <div class="flex items-center justify-between mb-8">
               <span class="font-bold text-slate-900">Visibility</span>
               <div class="flex bg-slate-100 rounded-lg p-1">
                 <button class="px-4 py-1 rounded bg-white text-slate-900 text-xs font-bold shadow">Private</button>
                 <button class="px-4 py-1 rounded text-slate-500 text-xs font-bold hover:text-slate-700">Shared</button>
               </div>
             </div>
             <div class="space-y-4">
               <div class="h-2 bg-slate-100 rounded w-full"></div>
               <div class="h-2 bg-slate-100 rounded w-5/6"></div>
               <div class="h-2 bg-slate-100 rounded w-4/6"></div>
               <div class="h-2 bg-slate-100 rounded w-full"></div>
             </div>
             <div class="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
               <Lock class="w-3 h-3" /> Only visible to assigned doctors
             </div>
           </div>
        </div>
      </section>

      <!-- SECTION 4: Exercises -->
      <section class="text-center max-w-3xl mx-auto reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FileText class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Exercises & Follow-ups</h2>
        <p class="text-lg text-slate-600 mb-8">
          Attach exercises to sessions and track completion directly in the timeline.
        </p>
        <RouterLink to="/product/offices">
          <Button variant="outline" class="border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400">
            Next: Offices & Rooms
          </Button>
        </RouterLink>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/offices">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Offices & Rooms <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </RouterLink>
      </section>

    </div>
  </div>
</template>

<style scoped>
.reveal {
  will-change: opacity, transform;
}
</style>
