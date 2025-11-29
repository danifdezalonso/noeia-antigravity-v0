<script setup lang="ts">
import { ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
import PublicNavbar from '@/components/public/PublicNavbar.vue'

const isAnnual = ref(true)

const tiers = [
  {
    name: 'Free',
    description: 'Perfect for getting started and exploring Noeia.',
    price: { monthly: 0, annual: 0 },
    features: [
      'Up to 3 clients',
      'Basic session notes',
      'Simple calendar',
      '1 Invoice template',
    ],
    notIncluded: [
      'AI-powered insights',
      'Client portal',
      'Custom branding',
    ],
    cta: 'Get started',
    highlight: false
  },
  {
    name: 'Pro',
    description: 'For growing practices that need more power and automation.',
    price: { monthly: 29, annual: 24 },
    features: [
      'Unlimited clients',
      'Advanced AI session notes',
      'Smart calendar & reminders',
      'Unlimited invoices',
      'Client portal access',
      'Custom branding',
    ],
    notIncluded: [],
    cta: 'Start free trial',
    highlight: true
  },
  {
    name: 'Clinic',
    description: 'For group practices and clinics requiring team management.',
    price: { monthly: 59, annual: 49 },
    features: [
      'Everything in Pro',
      'Team management',
      'Role-based access',
      'Centralized billing',
      'Priority support',
      'API access',
    ],
    notIncluded: [],
    cta: 'Contact sales',
    highlight: false
  }
]
</script>

<template>
  <div class="min-h-screen bg-white font-sans selection:bg-primary-100 selection:text-primary-900">
    <!-- Navbar (Simplified) -->
    <PublicNavbar />

    <div class="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Simple, transparent pricing
        </h1>
        <p class="text-xl text-slate-500 mb-10">
          Start for free, upgrade when you love it. No hidden fees.
        </p>

        <!-- Toggle -->
        <div class="inline-flex items-center p-1 bg-slate-100 rounded-full relative">
          <button 
            @click="isAnnual = false"
            class="relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200"
            :class="!isAnnual ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          >
            Monthly
          </button>
          <button 
            @click="isAnnual = true"
            class="relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-2"
            :class="isAnnual ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          >
            Yearly
            <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">Save 20%</span>
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="(tier, index) in tiers" 
          :key="tier.name"
          class="relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
          :class="[
            tier.highlight 
              ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105 z-10' 
              : 'bg-white text-slate-900 border-slate-200 hover:shadow-lg hover:border-slate-300'
          ]"
          :style="{ animationDelay: `${index * 0.1 + 0.2}s` }"
        >
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-2">{{ tier.name }}</h3>
            <p :class="tier.highlight ? 'text-slate-400' : 'text-slate-500'" class="text-sm h-10">{{ tier.description }}</p>
          </div>

          <div class="mb-8 flex items-baseline gap-1">
            <span class="text-4xl font-bold">€{{ isAnnual ? tier.price.annual : tier.price.monthly }}</span>
            <span :class="tier.highlight ? 'text-slate-400' : 'text-slate-500'" class="text-sm">/user/month</span>
          </div>

          <button 
            class="w-full py-3 px-4 rounded-xl font-medium transition-all mb-8"
            :class="[
              tier.highlight 
                ? 'bg-white text-slate-900 hover:bg-slate-100' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            ]"
          >
            {{ tier.cta }}
          </button>

          <div class="space-y-4">
            <div class="text-xs font-bold uppercase tracking-wider mb-4" :class="tier.highlight ? 'text-slate-500' : 'text-slate-400'">Includes</div>
            <ul class="space-y-3">
              <li v-for="feature in tier.features" :key="feature" class="flex items-start gap-3 text-sm">
                <Check class="w-5 h-5 flex-shrink-0" :class="tier.highlight ? 'text-emerald-400' : 'text-primary-600'" />
                <span :class="tier.highlight ? 'text-slate-300' : 'text-slate-600'">{{ feature }}</span>
              </li>
              <li v-for="feature in tier.notIncluded" :key="feature" class="flex items-start gap-3 text-sm opacity-50">
                <X class="w-5 h-5 flex-shrink-0" :class="tier.highlight ? 'text-slate-600' : 'text-slate-400'" />
                <span :class="tier.highlight ? 'text-slate-500' : 'text-slate-500'">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- FAQ Section -->
      <div class="mt-24 max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div class="space-y-8">
            <div>
                <h3 class="font-semibold text-lg mb-2">Can I switch plans later?</h3>
                <p class="text-slate-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
            </div>
            <div>
                <h3 class="font-semibold text-lg mb-2">Is my data secure?</h3>
                <p class="text-slate-600">Absolutely. We use bank-level encryption and comply with all major privacy regulations (GDPR, HIPAA) to keep your client data safe.</p>
            </div>
            <div>
                <h3 class="font-semibold text-lg mb-2">Do you offer discounts for students?</h3>
                <p class="text-slate-600">Yes! Contact our support team with proof of enrollment to get 50% off the Pro plan.</p>
            </div>
        </div>
      </div>
    </div>
    
    <!-- Footer (Simplified) -->
    <footer class="bg-white border-t border-slate-100 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
          © 2024 Noeia Inc. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
