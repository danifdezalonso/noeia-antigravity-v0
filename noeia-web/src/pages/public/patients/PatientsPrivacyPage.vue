<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
    <PublicNavbar />
    
    <main>
      <!-- Hero -->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Your space, your data
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Therapy requires trust. We built Noeia to keep your personal thoughts private and your data secure.
          </p>
        </div>
        
        <!-- Background Gradients -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div class="absolute top-20 left-1/4 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-60"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
        
        <!-- SECTION 1: What your therapist sees -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">What your therapist sees</h2>
            <p class="text-lg text-slate-600">
              Your therapist needs information to help you, but there are clear boundaries.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                  <Check class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Shared exercises & results</h3>
                  <p class="text-slate-600 text-sm">Questionnaires and exercises you submit are visible to them.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                  <Check class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Chat messages</h3>
                  <p class="text-slate-600 text-sm">Messages you send in the secure chat are visible to them.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <X class="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Your private journal</h3>
                  <p class="text-slate-600 text-sm">Personal notes marked as private are <span class="font-bold text-slate-900">never</span> visible to your therapist.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Visual -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-green-200 to-blue-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <User class="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <div class="font-bold text-slate-900">Dr. Sarah Jenkins</div>
                  <div class="text-xs text-slate-500">Clinical Psychologist</div>
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                  <div class="flex items-center gap-3">
                    <FileText class="w-5 h-5 text-green-600" />
                    <span class="font-medium text-slate-700">GAD-7 Results</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs font-bold text-green-700 bg-white px-2 py-1 rounded-lg border border-green-200">
                    <Eye class="w-3 h-3" />
                    VISIBLE
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="flex items-center gap-3">
                    <Lock class="w-5 h-5 text-slate-400" />
                    <span class="font-medium text-slate-700">Personal Journal Entry</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">
                    <EyeOff class="w-3 h-3" />
                    HIDDEN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: What other patients see -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-slate-300 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50 text-center">
              <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6">
                <Users class="w-10 h-10 text-slate-300" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">You are invisible to others</h3>
              <p class="text-slate-600 leading-relaxed">
                Other patients cannot see your name, your profile, or even know that you use Noeia. There is no public directory of patients.
              </p>
            </div>
          </div>

          <div class="order-1 lg:order-2 space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">What other patients see</h2>
            <p class="text-lg text-slate-600">
              Nothing. Noeia is not a social network.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Ghost class="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">No public profile</h3>
                  <p class="text-slate-600 text-sm">You don’t have a profile page that others can visit.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Search class="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Unsearchable</h3>
                  <p class="text-slate-600 text-sm">Other users cannot search for you by name or email.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- SECTION 3: Your Control -->
        <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900">You are in control</h2>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Download class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Export your data</h3>
                  <p class="text-slate-600 text-sm">Request a copy of your data at any time.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <Trash2 class="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Delete your account</h3>
                  <p class="text-slate-600 text-sm">If you leave therapy, you can choose to delete your account and data.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Control Visual -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-blue-200 to-slate-200 blur-2xl rounded-full opacity-50"></div>
            <div class="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
              <div class="space-y-4">
                <div class="p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between group">
                  <div class="flex items-center gap-3">
                    <Download class="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span class="font-medium text-slate-700 group-hover:text-slate-900">Download my data</span>
                  </div>
                  <ChevronRight class="w-4 h-4 text-slate-400" />
                </div>
                <div class="p-4 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-100 transition-colors cursor-pointer flex items-center justify-between group">
                  <div class="flex items-center gap-3">
                    <Trash2 class="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors" />
                    <span class="font-medium text-slate-700 group-hover:text-red-700">Delete account</span>
                  </div>
                  <ChevronRight class="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 4: Data Handling -->
        <section class="reveal text-center max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-slate-900 mb-12">How we handle data</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield class="w-6 h-6 text-slate-600" />
              </div>
              <h3 class="font-bold text-slate-900 mb-2">Encrypted</h3>
              <p class="text-slate-600 text-sm">Data is encrypted in transit and at rest.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Server class="w-6 h-6 text-slate-600" />
              </div>
              <h3 class="font-bold text-slate-900 mb-2">EU Servers</h3>
              <p class="text-slate-600 text-sm">Hosted on secure servers within the European Union.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lock class="w-6 h-6 text-slate-600" />
              </div>
              <h3 class="font-bold text-slate-900 mb-2">Strict Access</h3>
              <p class="text-slate-600 text-sm">Only you and your authorized therapist have access.</p>
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
import { Eye, User, Check, Download, FileText, Lock, Server, Shield, X, EyeOff, Ghost, Search, Trash2, ChevronRight } from 'lucide-vue-next'

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
