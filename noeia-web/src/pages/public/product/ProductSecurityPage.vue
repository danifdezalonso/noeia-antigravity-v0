<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Lock, Shield, Eye, Database, Server, ArrowLeft, Check } from 'lucide-vue-next'

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-red-100">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mx-auto mb-8">
          <Lock class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Security and privacy <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">by design</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Your data is your most valuable asset. We protect it with banking-grade encryption and strict access controls.
        </p>
      </section>

      <!-- SECTION 2: Access Control -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Access Control UI Mock -->
            <div class="space-y-6">
              <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                  <Shield class="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div class="font-bold text-slate-900">Role-Based Access</div>
                  <div class="text-sm text-slate-500">Granular permissions for every user type.</div>
                </div>
                <div class="ml-auto">
                  <Check class="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div class="space-y-3 pl-8 border-l-2 border-slate-100">
                <div class="flex items-center justify-between p-3 bg-white rounded border border-slate-200 shadow-sm">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <span class="text-sm font-medium text-slate-900">Dr. Sarah (Admin)</span>
                  </div>
                  <span class="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-bold">Full Access</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-white rounded border border-slate-200 shadow-sm">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <span class="text-sm font-medium text-slate-900">Receptionist</span>
                  </div>
                  <span class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">Scheduling Only</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200 opacity-60">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <span class="text-sm font-medium text-slate-700">Intern</span>
                  </div>
                  <span class="text-xs bg-red-50 text-red-600 px-2 py-1 rounded font-bold">No Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Access control</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Roles and permissions aligned with clinical realities.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Strict separation between clinical and administrative data.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Audit trails for every data access event.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Storage & Logs -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Storage and logs</h2>
          <p class="text-lg text-slate-600">
            We keep a detailed record of everything that happens, while keeping the data itself unreadable to unauthorized eyes.
          </p>
          <div class="grid gap-4">
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Database class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Encrypted Storage</div>
                <div class="text-sm text-slate-500">AES-256 encryption at rest and in transit.</div>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                <Eye class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Activity Logs</div>
                <div class="text-sm text-slate-500">See who viewed what, and when.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
           <!-- Logs UI Mock -->
           <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl w-full max-w-sm font-mono text-xs">
             <div class="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
               <div class="w-3 h-3 rounded-full bg-red-500"></div>
               <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div class="w-3 h-3 rounded-full bg-green-500"></div>
               <span class="ml-auto">audit_log.txt</span>
             </div>
             <div class="space-y-3 text-slate-300">
               <div class="flex gap-2">
                 <span class="text-slate-500">[10:42:15]</span>
                 <span class="text-blue-400">ACCESS</span>
                 <span>User: sarah@clinic.com</span>
               </div>
               <div class="pl-16 text-slate-500">Resource: patient_8823_record</div>
               
               <div class="flex gap-2">
                 <span class="text-slate-500">[10:45:30]</span>
                 <span class="text-emerald-400">UPDATE</span>
                 <span>User: sarah@clinic.com</span>
               </div>
               <div class="pl-16 text-slate-500">Action: note_created</div>

               <div class="flex gap-2">
                 <span class="text-slate-500">[11:02:10]</span>
                 <span class="text-red-400">DENIED</span>
                 <span>User: intern@clinic.com</span>
               </div>
               <div class="pl-16 text-slate-500">Reason: insufficient_permissions</div>
             </div>
           </div>
        </div>
      </section>

      <!-- SECTION 4: Compliance -->
      <section class="text-center max-w-3xl mx-auto reveal bg-slate-50 rounded-3xl p-12 border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Server class="w-8 h-8 text-slate-400" />
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Built for compliance</h2>
        <p class="text-lg text-slate-600 mb-8">
          Our infrastructure is hosted in the EU and built to support strict data protection regulations.
        </p>
        <div class="flex justify-center gap-4 flex-wrap">
          <div class="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">EU Hosted</div>
          <div class="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">GDPR Ready</div>
          <div class="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">HIPAA Aligned</div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <h2 class="text-3xl font-bold text-slate-900 mb-6">Ready to secure your practice?</h2>
        <RouterLink to="/login">
          <Button size="lg" class="rounded-full px-10 bg-primary-600 hover:bg-primary-700 text-white shadow-xl shadow-primary-200 transition-all hover:scale-105">
            Start your free trial
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
