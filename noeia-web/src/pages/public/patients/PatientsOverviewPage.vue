<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero Section (Preserved) -->
      <HeroSection
        title="Therapy that feels like progress"
        subtitle="A dedicated space for your journey. Book sessions, track your growth, and keep your exercises in one place."
        primaryCtaText="Get started"
        primaryCtaLink="/login"
        secondaryCtaText="Learn more"
        secondaryCtaLink="#why-noeia-patients"
      />

      <!-- Content Wrapper -->
      <div class="max-w-6xl mx-auto px-4 py-20 space-y-24">
        
        <!-- SECTION 1: Why Noeia for patients -->
        <section id="why-noeia-patients" class="border-t border-slate-200 pt-16 grid lg:grid-cols-2 gap-12 items-center reveal">
          <!-- Left Copy -->
          <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900">Why Noeia for patients</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
              Therapy doesn’t only happen during the session. Noeia gives you a clear view of your appointments, a dedicated space to talk to your therapist, and a place to keep your notes, exercises, and reflections together.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check class="w-4 h-4 text-primary-600" />
                </div>
                <span class="text-slate-600">See upcoming and past sessions on a proper calendar.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check class="w-4 h-4 text-primary-600" />
                </div>
                <span class="text-slate-600">Talk to your therapist without mixing it with personal apps.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check class="w-4 h-4 text-primary-600" />
                </div>
                <span class="text-slate-600">Keep exercises, notes, and guidance in one app.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check class="w-4 h-4 text-primary-600" />
                </div>
                <span class="text-slate-600">Follow how you’re doing over time.</span>
              </li>
            </ul>
          </div>

          <!-- Right Visual -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-200 to-purple-200 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <div class="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-8 hover:scale-105 hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary-200 transition-all duration-300 ease-out">
              <!-- Card Header -->
              <div class="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div>
                  <div class="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Next Session</div>
                  <div class="text-xl font-bold text-slate-900">Tue 17:00 · Online</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <Video class="w-5 h-5 text-primary-600" />
                </div>
              </div>
              
              <!-- List Items -->
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/item">
                  <div class="flex items-center gap-3">
                    <MessageSquare class="w-5 h-5 text-slate-400 group-hover/item:text-primary-600 transition-colors" />
                    <span class="text-slate-700 font-medium">Messages</span>
                  </div>
                  <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/item">
                  <div class="flex items-center gap-3">
                    <FileText class="w-5 h-5 text-slate-400 group-hover/item:text-primary-600 transition-colors" />
                    <span class="text-slate-700 font-medium">Exercises</span>
                  </div>
                  <span class="text-xs text-slate-500">2 active</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/item">
                  <div class="flex items-center gap-3">
                    <History class="w-5 h-5 text-slate-400 group-hover/item:text-primary-600 transition-colors" />
                    <span class="text-slate-700 font-medium">Session history</span>
                  </div>
                  <ChevronRight class="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Three pillars for patients -->
        <section class="border-t border-slate-200 pt-16 reveal">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">Everything you need between sessions</h2>
            <p class="text-slate-600">Noeia helps you stay connected to your process, not just your appointments.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <!-- Card 1 -->
            <RouterLink to="/for-patients/booking" class="group block p-6 rounded-2xl border border-slate-200 bg-white hover:scale-105 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-200 ease-out">
              <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <Calendar class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Book and manage sessions</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                See your therapist’s availability and book directly from a calendar. No back-and-forth emails.
              </p>
            </RouterLink>

            <!-- Card 2 -->
            <RouterLink to="/for-patients/app" class="group block p-6 rounded-2xl border border-slate-200 bg-white hover:scale-105 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-200 ease-out">
              <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <MessageSquare class="w-6 h-6 text-purple-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Stay connected with your therapist</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Use a single secure chat to send short messages or clarifications.
              </p>
            </RouterLink>

            <!-- Card 3 -->
            <RouterLink to="/for-patients/history" class="group block p-6 rounded-2xl border border-slate-200 bg-white hover:scale-105 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-200 ease-out">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <History class="w-6 h-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">Understand your own process</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Review past sessions, exercises, and notes to see how things are changing.
              </p>
            </RouterLink>
          </div>
        </section>

      </div>
    </main>
    
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import HeroSection from '@/components/public/HeroSection.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { Check, Video, MessageSquare, FileText, History, ChevronRight, Calendar } from 'lucide-vue-next'

// Scroll Reveal Composable
const useScrollReveal = () => {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })
}

useScrollReveal()
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
