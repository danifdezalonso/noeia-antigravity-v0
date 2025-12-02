<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero -->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Starting is simple
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Noeia is designed to be easy to use from day one. Here is how you get started.
          </p>
        </div>
        
        <!-- Background Gradients -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
        
        <!-- SECTION 1: Invitation -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">It starts with an invite</h2>
            <p class="text-lg text-slate-600">
              You don’t need to sign up for Noeia on your own. Your therapist or clinic will send you a secure invitation link.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Mail class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Check your email</h3>
                  <p class="text-slate-600 text-sm">Look for an email from Noeia with your unique setup link.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck class="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Set your password</h3>
                  <p class="text-slate-600 text-sm">Create a secure password to access your private portal.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Visual -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-blue-200 to-emerald-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Mail class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">You've been invited to Noeia</h3>
              <p class="text-slate-600 text-sm mb-6 max-w-xs">
                Dr. Sarah Jenkins has invited you to join her patient portal. Click below to set up your account.
              </p>
              <div class="w-full max-w-xs bg-primary-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-200">
                Accept Invitation
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: First Day -->
        <section class="reveal">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">Your first day in the app</h2>
            <p class="text-slate-600">Once you’re in, here are the first three things you might want to do.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white border border-slate-200 rounded-2xl p-8 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/30 transition-all group">
              <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
                <Calendar class="w-6 h-6 text-slate-600 group-hover:text-primary-600 transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">1. Check your sessions</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Confirm your next appointment time and see if it’s online or in-person.
              </p>
            </div>
            
            <div class="bg-white border border-slate-200 rounded-2xl p-8 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/30 transition-all group">
              <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
                <FileText class="w-6 h-6 text-slate-600 group-hover:text-primary-600 transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">2. Fill out intake forms</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                If your therapist sent any initial questionnaires, you’ll find them in the Exercises tab.
              </p>
            </div>
            
            <div class="bg-white border border-slate-200 rounded-2xl p-8 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/30 transition-all group">
              <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
                <MessageSquare class="w-6 h-6 text-slate-600 group-hover:text-primary-600 transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">3. Say hello</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Send a quick message in the chat to confirm you have access and are ready to start.
              </p>
            </div>
          </div>
        </section>

        <!-- SECTION 3: Before & After -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-blue-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-500">1</div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-1">Before a session</h4>
                    <p class="text-sm text-slate-600">You get a reminder. You check your notes from last time. You write down a topic you want to discuss.</p>
                  </div>
                </div>
                <div class="w-0.5 h-8 bg-slate-100 ml-4"></div>
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 font-bold text-primary-600">2</div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-1">During the session</h4>
                    <p class="text-sm text-slate-600">You focus on the conversation. Your therapist might assign an exercise for later.</p>
                  </div>
                </div>
                <div class="w-0.5 h-8 bg-slate-100 ml-4"></div>
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-500">3</div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-1">After the session</h4>
                    <p class="text-sm text-slate-600">You receive a summary or notes. You complete the assigned exercise during the week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">How it fits your routine</h2>
            <p class="text-lg text-slate-600">
              Noeia isn't something you need to check constantly. It’s there when you need it—before, during, and after your sessions.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                  <Bell class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Helpful reminders</h3>
                  <p class="text-slate-600 text-sm">Get notified about upcoming sessions so you never miss one.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Smartphone class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Always accessible</h3>
                  <p class="text-slate-600 text-sm">Log in from your phone or computer whenever you want to reflect.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- SECTION 4: Expectations -->
        <section class="reveal text-center max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Ready to start?</h2>
          <p class="text-lg text-slate-600 mb-8">
            If your therapist uses Noeia, ask them for an invitation link. If you are a therapist looking to use Noeia, you can start a free trial today.
          </p>
          <div class="flex justify-center gap-4">
            <RouterLink to="/login" class="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
              Log in
            </RouterLink>
            <RouterLink to="/for-psychologists" class="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200">
              I'm a therapist
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
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { Mail, Calendar, ShieldCheck, MessageSquare, Bell, Smartphone } from 'lucide-vue-next'

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
