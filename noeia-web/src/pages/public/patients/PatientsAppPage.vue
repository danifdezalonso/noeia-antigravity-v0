<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero -->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Your therapy, in one app
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Appointments, messages, history, and exercises — all in one place, separate from your everyday chats.
          </p>
        </div>
        
        <!-- Background Gradients -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div class="absolute top-20 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
          <div class="absolute top-40 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
        
        <!-- SECTION 1: App Overview -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">Everything at a glance</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  <Calendar class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Next session clearly visible</h3>
                  <p class="text-slate-600 text-sm">Always know when and where your next appointment is, right on the home screen.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                  <LayoutGrid class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Quick access to everything</h3>
                  <p class="text-slate-600 text-sm">One tap to reach your chat, session history, or assigned exercises.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Smartphone class="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Simple layout</h3>
                  <p class="text-slate-600 text-sm">Designed to be calm and easy to use, even if you’re not tech-savvy.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Phone Mockup -->
          <div class="relative mx-auto lg:mx-0 max-w-[300px]">
            <div class="absolute -inset-4 bg-gradient-to-b from-primary-200 to-purple-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <!-- Status Bar -->
              <div class="h-6 bg-slate-900 flex items-center justify-between px-6 pt-2">
                <div class="w-8 h-3 bg-slate-800 rounded-full"></div>
                <div class="flex gap-1">
                  <div class="w-3 h-3 bg-slate-800 rounded-full"></div>
                  <div class="w-3 h-3 bg-slate-800 rounded-full"></div>
                </div>
              </div>
              
              <!-- App Content -->
              <div class="p-6 space-y-6 bg-slate-50 min-h-[500px]">
                <!-- Header -->
                <div class="flex justify-between items-center">
                  <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                  <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>
                
                <!-- Next Session Card -->
                <div class="bg-white rounded-2xl p-5 text-slate-900 shadow-lg shadow-slate-200/50 border border-slate-100">
                  <div class="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Next session</div>
                  <div class="text-xl font-bold mb-4">Wed 18:00</div>
                  <div class="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin class="w-4 h-4" />
                    <span>In person</span>
                  </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <MessageSquare class="w-6 h-6 text-purple-600 mb-3" />
                    <div class="font-medium text-sm text-slate-900">Messages</div>
                  </div>
                  <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <FileText class="w-6 h-6 text-emerald-600 mb-3" />
                    <div class="font-medium text-sm text-slate-900">Exercises</div>
                  </div>
                </div>
                
                <!-- History Preview -->
                <div>
                  <div class="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">History</div>
                  <div class="space-y-3">
                    <div class="bg-white p-3 rounded-xl flex items-center gap-3 border border-slate-100 shadow-sm">
                      <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">24</div>
                      <div class="text-sm text-slate-700">Session completed</div>
                    </div>
                    <div class="bg-white p-3 rounded-xl flex items-center gap-3 border border-slate-100 shadow-sm">
                      <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">17</div>
                      <div class="text-sm text-slate-700">Session completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Dedicated Communication -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <!-- Chat Visual (Left on desktop) -->
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-blue-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 max-w-md mx-auto shadow-xl shadow-slate-200/50">
              <div class="space-y-4">
                <!-- Message Received -->
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">Dr</div>
                  <div class="bg-slate-100 rounded-2xl rounded-tl-none p-3 text-sm text-slate-700 max-w-[80%]">
                    Hi, just confirming our session for tomorrow. Please bring the journal we discussed.
                  </div>
                </div>
                <!-- Message Sent -->
                <div class="flex gap-3 justify-end">
                  <div class="bg-primary-600 rounded-2xl rounded-tr-none p-3 text-sm text-white max-w-[80%]">
                    Will do! I've written down some thoughts about the last week.
                  </div>
                </div>
                <!-- Message Received -->
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">Dr</div>
                  <div class="bg-slate-100 rounded-2xl rounded-tl-none p-3 text-sm text-slate-700 max-w-[80%]">
                    Great, looking forward to it.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">A dedicated space to talk</h2>
            <p class="text-lg text-slate-600">
              You use WhatsApp or Telegram with friends and family. Noeia gives therapy its own channel, keeping boundaries clear.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                <span class="text-slate-600">Message your therapist without mixing it with personal conversations.</span>
              </li>
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                <span class="text-slate-600">See previous messages linked to sessions context.</span>
              </li>
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                <span class="text-slate-600">Keep expectations clear about when to use chat vs sessions.</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- SECTION 3: Session Details -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">Know what each session was about</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Tag class="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Themes & Topics</h3>
                  <p class="text-slate-600 text-sm">Review the title or theme of each session to track what you worked on.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <FileText class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Shared Summaries</h3>
                  <p class="text-slate-600 text-sm">See therapist-shared summaries or key takeaways when available.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0">
                  <PenTool class="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Your Notes</h3>
                  <p class="text-slate-600 text-sm">Add your own private notes or questions to bring up next time.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Session Detail Visual -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-bl from-orange-200 to-pink-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <div class="text-sm text-slate-500">Tue, 14 May</div>
                  <div class="text-xl font-bold text-slate-900">Anxiety & Work Stress</div>
                </div>
                <div class="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase border border-green-100">Completed</div>
              </div>
              
              <div class="space-y-6">
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div class="text-xs font-bold text-slate-500 uppercase mb-2">Therapist Summary</div>
                  <p class="text-slate-700 text-sm leading-relaxed">
                    We discussed the recent project deadline and coping mechanisms. Breathing exercises introduced.
                  </p>
                </div>
                
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div class="text-xs font-bold text-slate-500 uppercase mb-2">My Notes</div>
                  <p class="text-slate-700 text-sm leading-relaxed italic">
                    Remember to practice the breathing technique before the Monday meeting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
    
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { Calendar, LayoutGrid, Smartphone, MapPin, MessageSquare, FileText, Check, Tag, PenTool } from 'lucide-vue-next'

const useScrollReveal = () => {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

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
