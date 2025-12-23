<script setup lang="ts">
import { ref } from 'vue'
import { 
  Dialog, 
  DialogContent, 
} from '@/components/ui/dialog'
import Button from '@/components/ui/Button.vue'
import { Zap, Sparkles, FileText, Timer } from 'lucide-vue-next'


interface Props {
  open: boolean
  daysRemaining?: number
}

withDefaults(defineProps<Props>(), {
  daysRemaining: 14
})

const emit = defineEmits(['update:open'])

const isYearly = ref(true)

</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-w-[900px] p-0 overflow-hidden bg-white rounded-3xl border-none shadow-2xl">
      <div class="flex flex-col md:flex-row h-full min-h-[500px]">
        
        <!-- Left Column: Testimonial -->
        <div class="md:w-[45%] bg-[#FAF5F0] p-8 flex flex-col justify-between relative overflow-hidden">
             <!-- Top Badge -->
             <div>
                <span class="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-800 border border-slate-100 shadow-sm">
                    Cancel anytime
                </span>
             </div>

             <!-- Main Quote -->
             <div class="mt-8 mb-auto dark:text-slate-900 z-10">
                 <h2 class="text-4xl md:text-5xl font-serif leading-tight text-[#211217]">
                    Custom templates change the game... <br/>
                    I'm in love.
                 </h2>
             </div>

             <!-- User Profile -->
             <div class="mt-8 flex items-center gap-3 z-10">
                 <img src="https://i.pravatar.cc/150?u=doc_david" alt="Dr. David Canes" class="w-10 h-10 rounded-full border-2 border-white" />
                 <div>
                     <div class="text-sm font-bold text-[#211217]">Dr. David Canes</div>
                     <div class="text-[11px] text-[#755760]">Urologist • Lahey Hospital & Medical Center</div>
                 </div>
             </div>

             <!-- Trustpilot -->
             <div class="mt-6 z-10">
                 <div class="flex items-center gap-1 mb-1">
                     <span class="text-green-500 font-bold text-lg">★ Trustpilot</span>
                 </div>
                 <div class="flex gap-0.5">
                     <div class="w-5 h-5 bg-green-500 flex items-center justify-center text-white text-xs">★</div>
                     <div class="w-5 h-5 bg-green-500 flex items-center justify-center text-white text-xs">★</div>
                     <div class="w-5 h-5 bg-green-500 flex items-center justify-center text-white text-xs">★</div>
                     <div class="w-5 h-5 bg-green-500 flex items-center justify-center text-white text-xs">★</div>
                     <div class="w-5 h-5 bg-green-500 flex items-center justify-center text-white text-xs">★</div>
                 </div>
                 <div class="text-[10px] text-slate-500 mt-1">TrustScore <b>4.8</b> 400+ reviews</div>
             </div>

             <!-- Background Decoration -->
             <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F2E8DE] rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
        </div>

        <!-- Right Column: Pricing & Features -->
        <div class="md:w-[55%] bg-white p-8 flex flex-col">
            <div class="mb-6">
                <h3 class="text-2xl font-serif font-medium text-slate-900 mb-2">
                    {{ daysRemaining }} days remaining in your Noe Pro trial
                </h3>
                <p class="text-sm text-slate-500">
                    When your trial ends, you'll need to sign up to Pro or you'll be downgraded to Free.
                </p>
            </div>

            <!-- Toggle -->
            <div class="flex bg-[#F8F5F2] p-1 rounded-lg self-start mb-6 w-full max-w-sm border border-slate-100">
                <button 
                    @click="isYearly = true"
                    class="flex-1 py-1.5 px-3 rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    :class="isYearly ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'"
                >
                    Yearly
                    <span class="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full font-bold">Save 30%</span>
                </button>
                <button 
                     @click="isYearly = false"
                     class="flex-1 py-1.5 px-3 rounded-md text-sm font-semibold transition-all"
                     :class="!isYearly ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'"
                >
                    Monthly
                </button>
            </div>

            <!-- Pricing Box -->
            <div class="border border-slate-100 rounded-xl p-4 mb-6 bg-[#FFFCF8]">
                <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-3xl font-bold text-slate-900">50 €</span>
                    <div class="flex flex-col text-xs text-slate-500 leading-tight">
                        <span>per month</span>
                        <span v-if="isYearly">billed yearly</span>
                        <span v-else>billed monthly</span>
                    </div>
                </div>

                <div class="text-sm font-bold text-slate-900 mb-3">In {{ daysRemaining }} days you will lose access to:</div>
                
                <div class="space-y-3">
                    <div class="flex gap-3 items-start">
                        <FileText class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                            <div class="text-sm font-bold text-slate-800">Unlimited custom templates</div>
                            <div class="text-xs text-slate-500">For notes that sound even more like you</div>
                        </div>
                    </div>
                    <div class="flex gap-3 items-start">
                        <Sparkles class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                            <div class="text-sm font-bold text-slate-800">Unlimited Ask Noe prompts</div>
                            <div class="text-xs text-slate-500">For tweaking and editing or generating new documents</div>
                        </div>
                    </div>
                    <div class="flex gap-3 items-start">
                        <Timer class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                            <div class="text-sm font-bold text-slate-800">Light speed productivity</div>
                            <div class="text-xs text-slate-500">With priority processing speed</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="mt-auto space-y-3">
                <Button block size="lg" class="bg-[#8B88F8] hover:bg-[#7a77e0] text-white font-bold text-base shadow-md shadow-indigo-200 rounded-xl h-12">
                    <Zap class="w-4 h-4 mr-2 fill-current" />
                    Stay on Pro after trial ends
                </Button>
                
                <p class="text-[10px] text-center text-slate-400 mx-auto max-w-xs leading-tight">
                    Don't worry if Noe Pro isn't for you. After your trial ends you can always use Noe's free forever plan.
                </p>
            </div>

        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
