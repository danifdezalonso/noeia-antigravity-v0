<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Check, HelpCircle } from 'lucide-vue-next'

// Independent billing periods for paid plans
const freelancersPeriod = ref<'monthly' | 'yearly'>('yearly')
const organizationPeriod = ref<'monthly' | 'yearly'>('yearly')

const plans = computed(() => [
  {
    id: 'free',
    name: 'Free',
    price: '€0',
    subtext: 'per user / month',
    tagline: 'Free for everyone',
    cta: 'Current plan',
    disabled: true,
    highlight: false,
    hasToggle: false
  },
  {
    id: 'freelancers',
    name: 'Freelancers',
    price: freelancersPeriod.value === 'yearly' ? '€10' : '€12',
    subtext: 'per user / month',
    tagline: freelancersPeriod.value === 'yearly' ? 'Billed yearly' : 'Billed monthly',
    cta: 'Upgrade',
    disabled: false,
    highlight: false,
    hasToggle: true,
    period: freelancersPeriod.value,
    toggle: () => freelancersPeriod.value = freelancersPeriod.value === 'yearly' ? 'monthly' : 'yearly'
  },
  {
    id: 'organization',
    name: 'Organization',
    price: organizationPeriod.value === 'yearly' ? '€16' : '€20',
    subtext: 'per user / month',
    tagline: organizationPeriod.value === 'yearly' ? 'Billed yearly' : 'Billed monthly',
    cta: 'Upgrade',
    disabled: false,
    highlight: true,
    hasToggle: true,
    period: organizationPeriod.value,
    toggle: () => organizationPeriod.value = organizationPeriod.value === 'yearly' ? 'monthly' : 'yearly'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    subtext: 'pricing',
    tagline: 'Billed yearly',
    cta: 'Talk to us',
    disabled: false,
    highlight: false,
    hasToggle: false
  }
])

const featureSections = [
  {
    title: 'Usage',
    rows: [
      { name: 'Who it’s for', description: 'Best fit for your practice size', values: ['Testing / very small', 'Independent psychologists', 'Clinics with multiple professionals', 'Multi-clinic orgs'] },
      { name: 'Professionals included', description: 'Number of practitioner accounts', values: ['1', '1', 'Up to 20', 'Unlimited'] },
      { name: 'Active clients', description: 'Number of clients with active records', values: ['30', 'Unlimited', 'Unlimited', 'Unlimited + segmentation'] },
      { name: 'Storage & files', description: 'Document and file storage limits', values: ['Basic', 'Standard', 'Increased per professional', 'Custom retention'] }
    ]
  },
  {
    title: 'Core Features',
    rows: [
      { name: 'Calendar', description: 'Scheduling capabilities', values: ['Single calendar', 'Day/week views', 'Clinic-wide calendar', 'Multi-location calendar'] },
      { name: 'Offices & rooms', description: 'Physical space management', values: ['1 office / 1 room', 'Up to 2 rooms', 'Unlimited rooms/offices', 'Advanced configurations'] },
      { name: 'Session scheduling', description: 'Booking workflows', values: ['Manual only', 'Sessions + rescheduling', 'Team scheduling + conflict hints', 'Advanced routing'] },
      { name: 'Client records', description: 'Patient data management', values: ['Basic profiles', 'Full history + files', 'Shared records w/ access control', 'Custom fields + integrations'] },
      { name: 'Client portal', description: 'Patient-facing interface', values: ['Email reminders only', 'Appointments + files', 'Full clinic portal', 'Custom branding/domains'] }
    ]
  },
  {
    title: 'Artificial Intelligence',
    rows: [
      { name: 'AI summaries', description: 'Automated session notes', values: ['15/month', '100/month', 'High usage (per team)', 'Custom limits'] },
      { name: 'AI templates', description: 'Note structures', values: ['Starter templates', 'Custom templates', 'Shared clinic templates', 'Library governance'] },
      { name: 'Context aware suggestions', description: 'Smart clinical hints', values: ['Basic', 'Per-client history', 'Clinic-wide patterns', 'Custom models'] }
    ]
  },
  {
    title: 'Integrations',
    rows: [
      { name: 'Calendar export', description: 'Sync with external calendars', values: ['ICS', 'ICS + basic', 'Integrated calendar for all', 'Custom flows'] },
      { name: 'Billing exports', description: 'Financial data', values: ['CSV', 'CSV for accounting', 'Billing by doctor', 'Full export endpoints'] },
      { name: 'APIs & webhooks', description: 'Programmable access', values: ['—', '—', 'Basic webhooks', 'Full API access'] }
    ]
  },
  {
    title: 'Team Management',
    rows: [
      { name: 'Roles & permissions', description: 'Access control levels', values: ['Single user', 'Single owner', 'Admin / Manager / Doctor', 'Custom roles'] },
      { name: 'Doctor management', description: 'Staff profiles', values: ['1', '1 full profile', 'Multi-professional', 'Segmented teams'] },
      { name: 'Office management', description: 'Location handling', values: ['1 shared office', 'Simple', 'Multi-office + assignment', 'Multi-location rules'] }
    ]
  },
  {
    title: 'Support',
    rows: [
      { name: 'Knowledge base', description: 'Self-help documentation', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
      { name: 'Direct support', description: 'Help channels', values: ['Community', 'Email', 'Priority email', 'Success manager'] },
      { name: 'Onboarding help', description: 'Setup assistance', values: ['Self-serve', 'Checklist', 'Assisted call', 'Rollout plan'] }
    ]
  }
]
</script>

<template>
  <section id="pricing" class="pt-4 pb-20 bg-white text-slate-900 font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      
      <!-- Beta Banner -->
      <div class="bg-primary-50 border border-primary-100 rounded-xl px-6 py-4 text-sm text-slate-700 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 class="font-bold text-primary-900 mb-1">We’re currently in beta.</h3>
          <p class="text-slate-600">
            Noeia is free for all users while we improve it based on clinic feedback. The table below shows our planned pricing structure.
          </p>
        </div>
        <div class="text-primary-700 text-xs font-medium whitespace-nowrap">
          Join now and help shape the platform.
        </div>
      </div>

      <!-- Header -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Plans</h2>
        <p class="text-slate-600 text-lg max-w-3xl">
          You are on the <span class="font-bold text-slate-900">Free plan</span>. If you have any questions or would like further support with your plan, <a href="#" class="text-primary-600 hover:underline">contact us ↗</a>
        </p>
      </div>

      <!-- Pricing Table Container -->
      <div class="relative isolate">
        <!-- Sticky Header Background (for visual continuity) -->
        <div class="sticky top-0 h-px w-full z-50"></div>

        <div class="overflow-x-auto pt-6 pb-12 -mx-4 px-4 scrollbar-hide">
          <table class="w-full min-w-[1000px] border-collapse text-left">
            <!-- Table Header -->
            <thead class="sticky top-0 z-40">
              <tr>
                <!-- Empty Top Left -->
                <th class="p-0 bg-white min-w-[200px] sticky left-0 z-50">
                   <div class="h-full w-full bg-white border-b border-slate-200"></div>
                </th>
                
                <!-- Plan Headers -->
                <th v-for="plan in plans" :key="plan.id" class="p-0 align-bottom">
                  <div 
                    class="px-6 py-6 transition-all duration-300 relative"
                    :class="[
                      plan.highlight ? 'bg-white rounded-t-xl border-t border-x border-primary-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20 -mb-px' : 'bg-white border-b border-slate-200'
                    ]"
                  >
                    <div v-if="plan.highlight" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-700 text-white text-sm font-medium px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
                      Most popular
                    </div>

                    <h3 class="text-lg font-bold text-slate-900 mb-1">{{ plan.name }}</h3>
                    <div class="flex items-baseline gap-1 mb-1">
                      <span class="text-3xl font-bold text-slate-900">{{ plan.price }}</span>
                      <span v-if="plan.price !== 'Custom'" class="text-xs text-slate-500">{{ plan.subtext }}</span>
                    </div>
                    
                    <!-- Toggle Switch -->
                    <div class="h-8 mb-2 flex items-center">
                      <div v-if="plan.hasToggle" class="flex items-center gap-2">
                         <button 
                          @click="plan.toggle"
                          class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                          :class="plan.period === 'yearly' ? 'bg-primary-600' : 'bg-slate-200'"
                        >
                          <span
                            class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                            :class="plan.period === 'yearly' ? 'translate-x-5' : 'translate-x-1'"
                          />
                        </button>
                        <span class="text-xs font-medium" :class="plan.period === 'yearly' ? 'text-primary-700' : 'text-slate-500'">
                          {{ plan.period === 'yearly' ? 'Billed yearly' : 'Billed monthly' }}
                        </span>
                      </div>
                      <div v-else class="text-xs text-slate-500 font-medium">
                        {{ plan.tagline }}
                      </div>
                    </div>
                    
                    <Button 
                      block 
                      size="sm"
                      :variant="plan.highlight ? 'primary' : 'outline'"
                      :disabled="plan.disabled"
                      class="w-full text-xs"
                      :class="[
                        plan.disabled ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400' : '',
                        !plan.highlight && !plan.disabled ? 'border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900' : '',
                        plan.highlight ? 'bg-primary-600 hover:bg-primary-700 border-transparent text-white shadow-md shadow-primary-900/10' : ''
                      ]"
                    >
                      {{ plan.cta }}
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="divide-y divide-slate-100">
              <template v-for="section in featureSections" :key="section.title">
                <!-- Section Header -->
                <tr>
                  <td class="sticky left-0 z-30 bg-slate-50 px-6 py-3 text-xs font-bold text-slate-900 uppercase tracking-wider border-y border-slate-200">
                    {{ section.title }}
                  </td>
                  <td v-for="i in 4" :key="i" class="bg-slate-50 border-y border-slate-200" :class="i === 3 ? 'bg-white border-x border-primary-200' : ''"></td>
                </tr>

                <!-- Feature Rows -->
                <tr 
                  v-for="(row, rIndex) in section.rows" 
                  :key="row.name" 
                  class="group transition-colors hover:bg-slate-50/50"
                  :class="rIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'"
                >
                  <!-- Feature Name (Sticky Left) -->
                  <td class="sticky left-0 z-30 px-6 py-4 text-sm font-medium text-slate-600 border-r border-slate-100 group-hover:bg-slate-50 transition-colors" :class="rIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'">
                    <div class="flex items-center gap-2 group/tooltip relative w-max">
                      {{ row.name }}
                      <HelpCircle class="w-3.5 h-3.5 text-slate-400 cursor-help" />
                      
                      <!-- Tooltip -->
                      <div class="absolute left-full top-1/2 -translate-y-1/2 translate-x-2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg max-w-xs w-48 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none shadow-xl">
                        {{ row.description }}
                      </div>
                    </div>
                  </td>

                  <!-- Plan Values -->
                  <td 
                    v-for="(value, vIndex) in row.values" 
                    :key="vIndex" 
                    class="px-6 py-4 text-sm text-center text-slate-500"
                    :class="[
                      vIndex === 2 ? 'bg-white border-x border-primary-200 shadow-[0_0_20px_rgba(0,0,0,0.02)]' : '', // Organization Column
                      value === 'Yes' ? 'text-slate-900' : '',
                      value === '—' ? 'text-slate-300' : ''
                    ]"
                  >
                    <template v-if="value === 'Yes'">
                      <Check class="w-5 h-5 text-green-500 mx-auto" />
                    </template>
                    <template v-else>
                      {{ value }}
                    </template>
                  </td>
                </tr>
              </template>
              
              <!-- Bottom Spacer for Organization Column Card Effect -->
               <tr>
                  <td class="sticky left-0 bg-white"></td>
                  <td></td>
                  <td></td>
                  <td class="bg-white h-4 rounded-b-xl border-b border-x border-primary-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"></td>
                  <td></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
