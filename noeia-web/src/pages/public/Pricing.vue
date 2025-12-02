<script setup lang="ts">
import CtaSection from '@/components/public/CtaSection.vue'
import { Check } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const plans = [
  {
    name: 'Solo',
    price: '€29',
    description: 'Perfect for independent professionals.',
    features: ['All core features', '1 Calendar', '1 Office', 'Unlimited clients', 'Basic AI usage'],
    cta: 'Start Trial',
    popular: false
  },
  {
    name: 'Clinic',
    price: '€89',
    description: 'For growing teams and organizations.',
    features: ['Everything in Solo', 'Team management', 'Multiple offices', 'Admin controls', 'Advanced AI usage'],
    cta: 'Start Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large networks and hospitals.',
    features: ['Everything in Clinic', 'SSO & Advanced Security', 'Dedicated support', 'Custom integrations', 'SLA'],
    cta: 'Contact Sales',
    popular: false
  }
]
</script>

<template>
  <div>
    <section class="py-20 bg-background text-center">
      <h1 class="text-4xl font-bold text-text mb-4">Simple, transparent pricing</h1>
      <p class="text-text-muted">No hidden fees. Cancel anytime.</p>
    </section>
    
    <section class="py-10 max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(plan, index) in plans" 
          :key="index"
          class="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-all relative"
          :class="plan.popular ? 'border-primary-500 ring-2 ring-primary-100' : 'border-slate-200'"
        >
          <div v-if="plan.popular" class="absolute top-0 right-0 bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
          <h3 class="text-xl font-bold text-text mb-2">{{ plan.name }}</h3>
          <p class="text-sm text-text-muted mb-6">{{ plan.description }}</p>
          <div class="text-4xl font-bold text-text mb-6">{{ plan.price }}<span v-if="plan.price !== 'Custom'" class="text-sm font-normal text-text-muted">/mo</span></div>
          
          <Button :variant="plan.popular ? 'primary' : 'outline'" block class="mb-8 rounded-full">{{ plan.cta }}</Button>

          <ul class="space-y-3">
            <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="flex items-center gap-2 text-sm text-text-muted">
              <Check class="w-4 h-4 text-green-500" /> {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
