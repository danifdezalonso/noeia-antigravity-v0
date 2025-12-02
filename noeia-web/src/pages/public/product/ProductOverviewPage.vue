<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Building, Smartphone, Sparkles, Calendar, Users, Shield, ArrowRight, Activity } from 'lucide-vue-next'

import posthog from 'posthog-js'

const trackCta = (text: string, destination: string) => {
  posthog.capture('cta_clicked', {
    cta_location: 'product_overview',
    cta_text: text,
    cta_destination: destination
  })
}

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-blue-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
      
      <!-- SECTION 1: HERO -->
      <section class="text-center pt-12 reveal">
        <h1 class="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 text-slate-900">
          One platform, <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">three perspectives</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Noeia unifies the clinical experience. Whether you manage the organization, treat patients, or are the patient yourself—it all happens here.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <RouterLink to="/login" @click="trackCta('Start free trial', '/login')">
            <Button size="lg" class="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all hover:scale-105">
              Start free trial
            </Button>
          </RouterLink>
          <RouterLink to="/contact" @click="trackCta('Contact sales', '/contact')">
            <Button variant="outline" size="lg" class="rounded-full px-8 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
              Contact sales
            </Button>
          </RouterLink>
        </div>

        <!-- 3 Pillars Mini Bento -->
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <!-- Card 1 -->
          <RouterLink to="/product/website" class="group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Building class="w-24 h-24 text-blue-600" />
            </div>
            <div class="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Building class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-slate-900">Website platform</h3>
            <p class="text-slate-500 mb-4">The command center for clinics and professionals.</p>
            <div class="flex items-center text-blue-600 font-bold text-sm">
              Learn more <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </RouterLink>

          <!-- Card 2 -->
          <RouterLink to="/product/app" class="group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Smartphone class="w-24 h-24 text-purple-600" />
            </div>
            <div class="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Smartphone class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-slate-900">Apps</h3>
            <p class="text-slate-500 mb-4">Dedicated mobile experiences for everyone.</p>
            <div class="flex items-center text-purple-600 font-bold text-sm">
              Learn more <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </RouterLink>

          <!-- Card 3 -->
          <RouterLink to="/product/ai" class="group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles class="w-24 h-24 text-emerald-600" />
            </div>
            <div class="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-slate-900">AI assistant</h3>
            <p class="text-slate-500 mb-4">NoeIA, your partner for notes and summaries.</p>
            <div class="flex items-center text-emerald-600 font-bold text-sm">
              Learn more <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- SECTION 2: PILLAR 1 - WEBSITE -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
            Pillar 1
          </div>
          <h2 class="text-4xl font-bold text-slate-900">The clinical workspace</h2>
          <p class="text-lg text-slate-600">
            A powerful web platform where administrators manage the business and clinicians manage their day.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Multi-professional calendar and room management.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Secure client records and history.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Granular permissions for every role.</span>
            </li>
          </ul>
          <RouterLink to="/product/website">
            <Button variant="outline" class="mt-4 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50">
              Explore the Platform
            </Button>
          </RouterLink>
        </div>
        <div class="relative group">
          <div class="absolute -inset-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <!-- Mock UI -->
            <div class="h-10 border-b border-slate-100 bg-slate-50 flex items-center px-4 gap-2">
              <div class="w-3 h-3 rounded-full bg-slate-200"></div>
              <div class="w-3 h-3 rounded-full bg-slate-200"></div>
              <div class="w-3 h-3 rounded-full bg-slate-200"></div>
            </div>
            <div class="p-6 bg-white">
              <div class="flex gap-6">
                <div class="w-16 space-y-4">
                  <div class="w-10 h-10 rounded-lg bg-blue-600 shadow-lg shadow-blue-200"></div>
                  <div class="w-10 h-10 rounded-lg bg-slate-50"></div>
                  <div class="w-10 h-10 rounded-lg bg-slate-50"></div>
                </div>
                <div class="flex-1 space-y-4">
                  <div class="h-32 rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <div class="w-1/3 h-4 bg-slate-200 rounded mb-4"></div>
                    <div class="space-y-2">
                      <div class="w-full h-2 bg-slate-100 rounded"></div>
                      <div class="w-5/6 h-2 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="h-24 rounded-xl bg-blue-50 border border-blue-100"></div>
                    <div class="h-24 rounded-xl bg-slate-50 border border-slate-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: PILLAR 2 - APPS -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative">
           <!-- Bento Grid of Phones -->
           <div class="grid grid-cols-2 gap-4">
             <div class="col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
               <div class="flex items-center gap-4 mb-4">
                 <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                   <Users class="w-5 h-5" />
                 </div>
                 <div>
                   <div class="font-bold text-slate-900">Patient App</div>
                   <div class="text-xs text-slate-500">Homework, Chat, Appointments</div>
                 </div>
               </div>
               <div class="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                 <div class="h-full bg-purple-500 w-2/3"></div>
               </div>
             </div>
             <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
               <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                 <Activity class="w-4 h-4" />
               </div>
               <div class="font-bold text-slate-900 text-sm">Doctor App</div>
               <div class="text-xs text-slate-500">Schedule & Notes</div>
             </div>
             <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
               <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mb-3">
                 <Building class="w-4 h-4" />
               </div>
               <div class="font-bold text-slate-900 text-sm">Org App</div>
               <div class="text-xs text-slate-500">Metrics & Rooms</div>
             </div>
           </div>
        </div>
        <div class="order-1 lg:order-2 space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider">
            Pillar 2
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Apps for everyone</h2>
          <p class="text-lg text-slate-600">
            Three distinct mobile experiences ensuring that patients, doctors, and clinic managers are always connected.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Patients track progress and manage appointments.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Doctors capture notes and insights on the go.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Managers monitor clinic pulse and room usage.</span>
            </li>
          </ul>
          <RouterLink to="/product/app">
            <Button variant="outline" class="mt-4 border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50">
              See the Apps
            </Button>
          </RouterLink>
        </div>
      </section>

      <!-- SECTION 4: PILLAR 3 - AI -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            Pillar 3
          </div>
          <h2 class="text-4xl font-bold text-slate-900">NoeIA, the AI assistant</h2>
          <p class="text-lg text-slate-600">
            NoeIA listens to your rough notes and transforms them into structured clinical summaries, saving you hours every week.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Drafts summaries from your shorthand.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Prepares you for the next session with key recaps.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-700">Never hallucinates; you always have the final say.</span>
            </li>
          </ul>
          <RouterLink to="/product/ai">
            <Button variant="outline" class="mt-4 border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50">
              Meet NoeIA
            </Button>
          </RouterLink>
        </div>
        <div class="relative group">
          <div class="absolute -inset-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 shadow-2xl p-6">
            <!-- Chat UI Mock -->
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-slate-100 shrink-0"></div>
                <div class="bg-slate-50 rounded-2xl rounded-tl-none p-4 text-sm text-slate-600 border border-slate-100">
                  <p>Patient mentioned insomnia and anxiety about the new job. Breathing exercises helped.</p>
                </div>
              </div>
              <div class="flex gap-4 flex-row-reverse">
                <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Sparkles class="w-4 h-4" />
                </div>
                <div class="bg-emerald-50 rounded-2xl rounded-tr-none p-4 text-sm text-slate-700 border border-emerald-100 shadow-sm">
                  <p class="font-bold text-emerald-700 mb-1">Suggested Summary:</p>
                  <p>Patient reports continued insomnia and work-related anxiety. Positive response to breathing exercises noted.</p>
                  <div class="mt-3 flex gap-2">
                    <button class="px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs font-bold text-emerald-600 hover:bg-emerald-50">Approve</button>
                    <button class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-50">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: CORE FEATURES GRID -->
      <section class="reveal">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-slate-900 mb-4">Core features</h2>
          <p class="text-lg text-slate-600">Everything else you need to run a modern practice.</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Calendar -->
          <RouterLink to="/product/calendar" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <Calendar class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Calendar</h3>
            <p class="text-slate-500 text-sm">Multi-view scheduling for individuals and teams.</p>
          </RouterLink>

          <!-- Records -->
          <RouterLink to="/product/records" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <Users class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Client Records</h3>
            <p class="text-slate-500 text-sm">Comprehensive timelines of sessions and history.</p>
          </RouterLink>

          <!-- Offices -->
          <RouterLink to="/product/offices" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <Building class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Offices & Rooms</h3>
            <p class="text-slate-500 text-sm">Manage physical spaces and capacity.</p>
          </RouterLink>

          <!-- Admin -->
          <RouterLink to="/product/admin" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mb-4 group-hover:scale-110 transition-transform">
              <Activity class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Admin & Billing</h3>
            <p class="text-slate-500 text-sm">Invoicing, revenue tracking, and team roles.</p>
          </RouterLink>

          <!-- Security -->
          <RouterLink to="/product/security" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
              <Shield class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Security</h3>
            <p class="text-slate-500 text-sm">Bank-grade encryption and access logs.</p>
          </RouterLink>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 reveal">
        <h2 class="text-3xl font-bold text-slate-900 mb-6">See the three pillars working together</h2>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/login" @click="trackCta('Book a live demo', '/login')">
            <Button size="lg" class="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 transition-all hover:scale-105">
              Book a live demo
            </Button>
          </RouterLink>
          <RouterLink to="/login" @click="trackCta('Join the beta', '/login')">
            <Button variant="outline" size="lg" class="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-white">
              Join the beta
            </Button>
          </RouterLink>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.reveal {
  will-change: opacity, transform;
}
</style>
