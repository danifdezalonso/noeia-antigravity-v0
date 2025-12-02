<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Shield, Users, CreditCard, ArrowLeft, ArrowRight, Check, Download, Filter } from 'lucide-vue-next'

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
  <div class="bg-white min-h-screen text-slate-900 selection:bg-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-20 space-y-32">
      
      <!-- SECTION 1: HERO -->
      <section class="pt-12 reveal text-center max-w-4xl mx-auto">
        <div class="mb-8 flex justify-center">
          <RouterLink to="/product" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to Product Overview
          </RouterLink>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 mx-auto mb-8 border border-slate-200">
          <Shield class="w-8 h-8" />
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
          Admin controls for <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400">growing clinics</span>
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Manage your team, track revenue, and handle billing without the headache.
        </p>
      </section>

      <!-- SECTION 2: Team Management -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
          <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
            <!-- Team Table Mock -->
            <div class="space-y-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-lg text-slate-900">Team Members</h3>
                <div class="flex gap-2">
                  <button class="p-2 rounded bg-slate-50 border border-slate-200 text-slate-500"><Filter class="w-4 h-4" /></button>
                  <button class="px-3 py-1 rounded bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">Invite</button>
                </div>
              </div>
              
              <div class="space-y-2">
                <!-- Header -->
                <div class="grid grid-cols-4 gap-4 text-xs text-slate-400 uppercase font-bold pb-2 border-b border-slate-100">
                  <div class="col-span-2">Name</div>
                  <div>Role</div>
                  <div class="text-right">Status</div>
                </div>
                <!-- Rows -->
                <div class="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-50">
                  <div class="col-span-2 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div class="font-medium text-slate-900 text-sm">Sarah Cohen</div>
                  </div>
                  <div><span class="px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold border border-purple-100">Admin</span></div>
                  <div class="text-right"><span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span></div>
                </div>
                <div class="grid grid-cols-4 gap-4 items-center py-2 border-b border-slate-50">
                  <div class="col-span-2 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div class="font-medium text-slate-900 text-sm">Mike Ross</div>
                  </div>
                  <div><span class="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">Doctor</span></div>
                  <div class="text-right"><span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span></div>
                </div>
                <div class="grid grid-cols-4 gap-4 items-center py-2 opacity-60">
                  <div class="col-span-2 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div class="font-medium text-slate-900 text-sm">Jen Smith</div>
                  </div>
                  <div><span class="px-2 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">Intern</span></div>
                  <div class="text-right"><span class="w-2 h-2 rounded-full bg-slate-300 inline-block"></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Team management</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Invite doctors, admins, and support staff.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Assign roles and permissions in seconds.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Deactivate accounts instantly when staff leave.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION 3: Patient Assignment -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-slate-900">Patient assignment</h2>
          <p class="text-lg text-slate-600">
            Ensure every patient has a lead doctor. Reassign easily when caseloads change.
          </p>
          <div class="grid gap-4">
            <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Users class="w-5 h-5" />
              </div>
              <div>
                <div class="font-bold text-slate-900">Caseload Balancing</div>
                <div class="text-sm text-slate-500">See how many active patients each doctor has.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
           <!-- Assignment Card Mock -->
           <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl w-full max-w-sm">
             <div class="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
               <div class="w-12 h-12 rounded-full bg-slate-200"></div>
               <div>
                 <div class="font-bold text-slate-900">Ana Martinez</div>
                 <div class="text-sm text-slate-500">Patient since 2022</div>
               </div>
             </div>
             <div class="space-y-4">
               <div class="text-xs font-bold text-slate-400 uppercase">Assigned Doctor</div>
               <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                 <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                   <span class="font-medium text-slate-900">Dr. Sarah Cohen</span>
                 </div>
                 <button class="text-xs text-blue-600 font-bold hover:underline">Change</button>
               </div>
             </div>
           </div>
        </div>
      </section>

      <!-- SECTION 4: Billing -->
      <section class="grid lg:grid-cols-2 gap-16 items-center reveal">
        <div class="order-2 lg:order-1 relative group">
           <div class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
           <div class="relative rounded-xl bg-white border border-slate-200 p-6 shadow-2xl">
             <!-- Billing UI Mock -->
             <div class="space-y-6">
               <div class="flex justify-between items-end">
                 <div>
                   <div class="text-sm text-slate-500 mb-1">Total Revenue (Oct)</div>
                   <div class="text-3xl font-bold text-slate-900">$42,500</div>
                 </div>
                 <button class="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100">
                   <Download class="w-3 h-3" /> Export CSV
                 </button>
               </div>
               
               <div class="h-32 flex items-end gap-2">
                 <div class="flex-1 bg-slate-100 rounded-t h-[40%]"></div>
                 <div class="flex-1 bg-slate-100 rounded-t h-[50%]"></div>
                 <div class="flex-1 bg-slate-100 rounded-t h-[45%]"></div>
                 <div class="flex-1 bg-slate-100 rounded-t h-[60%]"></div>
                 <div class="flex-1 bg-slate-100 rounded-t h-[55%]"></div>
                 <div class="flex-1 bg-emerald-500 rounded-t h-[80%] shadow-lg shadow-emerald-200"></div>
                 <div class="flex-1 bg-slate-50 rounded-t h-[30%] border border-slate-200 border-dashed"></div>
               </div>

               <div class="grid grid-cols-2 gap-4">
                 <div class="p-3 rounded bg-slate-50 border border-slate-200">
                   <div class="text-xs text-slate-500 mb-1">Outstanding</div>
                   <div class="font-bold text-red-600">$1,200</div>
                 </div>
                 <div class="p-3 rounded bg-slate-50 border border-slate-200">
                   <div class="text-xs text-slate-500 mb-1">Paid</div>
                   <div class="font-bold text-emerald-600">$41,300</div>
                 </div>
               </div>
             </div>
           </div>
        </div>
        <div class="order-1 lg:order-2 space-y-6">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CreditCard class="w-6 h-6" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Billing & revenue</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Generate invoices automatically from sessions.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Track payments and outstanding balances.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" />
              </div>
              <span class="text-slate-600">Export financial reports for accounting.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="text-center pb-12 reveal">
        <RouterLink to="/product/security">
          <Button variant="ghost" class="text-slate-500 hover:text-slate-900 group">
            Next: Security & Data <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
