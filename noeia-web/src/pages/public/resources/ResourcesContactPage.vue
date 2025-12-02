<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessageSquare, Mail, MessageCircle, MapPin, Send } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const handleSubmit = () => {
  isSubmitting.value = true
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    formData.value = { name: '', email: '', subject: '', message: '' }
  }, 1500)
}
</script>

<template>
  <div class="bg-white min-h-screen pt-32">
    <!-- Hero -->
    <section class="text-center px-4 mb-20">
      <div class="inline-flex items-center justify-center p-3 bg-slate-900 rounded-2xl mb-6">
        <MessageSquare class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Contact Us</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Have a question or feedback? We’d love to hear from you.</p>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div class="grid md:grid-cols-2 gap-16 items-start">
        
        <!-- Contact Info -->
        <div 
          class="space-y-12"
          :class="isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
          style="transition: all 0.5s ease-out"
        >
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Get in touch</h2>
            <p class="text-slate-600 text-lg leading-relaxed mb-8">
              Whether you're interested in a demo, need support, or just want to say hello, our team is ready to help.
            </p>
          </div>

          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Mail class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 mb-1">Email us</h3>
                <p class="text-slate-500 mb-2">For general inquiries and support.</p>
                <a href="mailto:hello@noeia.com" class="text-primary-600 font-medium hover:text-primary-700">hello@noeia.com</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <MessageCircle class="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 mb-1">Live Chat</h3>
                <p class="text-slate-500 mb-2">Available Mon-Fri, 9am-5pm EST.</p>
                <button class="text-primary-600 font-medium hover:text-primary-700">Start a chat</button>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <MapPin class="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 mb-1">Office</h3>
                <p class="text-slate-500">
                  123 Innovation Drive<br>
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div 
          class="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50"
          :class="isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'"
          style="transition: all 0.5s ease-out 0.2s"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6" v-if="!isSuccess">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">Name</label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="Jane Doe"
                >
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">Email</label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="jane@example.com"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Subject</label>
              <select 
                v-model="formData.subject"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
              >
                <option value="" disabled selected>Select a topic</option>
                <option value="demo">Request a Demo</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Message</label>
              <textarea 
                v-model="formData.message"
                required
                rows="4"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <Button 
              type="submit" 
              block 
              class="rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-4"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
                Send Message <Send class="w-4 h-4" />
              </span>
              <span v-else>Sending...</span>
            </Button>
          </form>

          <!-- Success State -->
          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
            <p class="text-slate-500 mb-8">Thanks for reaching out. We'll get back to you shortly.</p>
            <button 
              @click="isSuccess = false" 
              class="text-primary-600 font-bold hover:text-primary-700"
            >
              Send another message
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
