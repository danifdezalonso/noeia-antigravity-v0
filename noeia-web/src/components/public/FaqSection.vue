<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus } from 'lucide-vue-next'

const openIndex = ref<number | null>(0)

const faqs = [
  {
    question: 'Is Noeia only for psychologists?',
    answer: 'No. While we’re focused on mental health practices, any talk-therapy professional can use Noeia, including counselors, therapists, and coaches.'
  },
  {
    question: 'Do you replace my existing video call or telehealth tool?',
    answer: 'Noeia can sit alongside your current telehealth solution. You keep using your preferred video provider (Zoom, Google Meet, etc.); we orchestrate the rest.'
  },
  {
    question: 'Where is my data stored?',
    answer: 'We rely on EU-based infrastructure and follow industry best practices for security and data protection (GDPR compliant).'
  },
  {
    question: 'Can I try Noeia without inviting my whole team?',
    answer: 'Yes. You can start alone and add professionals when you’re ready. Our Solo plan is perfect for individual practitioners.'
  }
]

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="py-20 bg-white border-t border-slate-100">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl font-bold text-center text-text mb-12">Questions, answered.</h2>

      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300"
          :class="openIndex === index ? 'bg-slate-50 border-slate-300' : 'bg-white hover:border-slate-300'"
        >
          <button 
            @click="toggle(index)"
            class="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
          >
            <span class="font-semibold text-text">{{ faq.question }}</span>
            <component :is="openIndex === index ? Minus : Plus" class="w-5 h-5 text-slate-400" />
          </button>
          
          <div 
            v-show="openIndex === index"
            class="px-6 pb-4 text-text-muted text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
