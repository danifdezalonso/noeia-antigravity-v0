<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
            N
          </div>
          <span class="font-bold text-xl text-slate-900">Noeia</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink to="/features" class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Features</RouterLink>
          <RouterLink to="/pricing" class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Pricing</RouterLink>
          <RouterLink to="/about" class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">About</RouterLink>
        </nav>

        <!-- Actions -->
        <div class="hidden md:flex items-center gap-4">
          <RouterLink to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </RouterLink>
          <RouterLink to="/signup">
            <Button size="sm">Get Started</Button>
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-slate-600">
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden border-t border-slate-100 bg-white p-4 space-y-4">
        <nav class="flex flex-col space-y-4">
          <RouterLink to="/features" class="text-sm font-medium text-slate-600">Features</RouterLink>
          <RouterLink to="/pricing" class="text-sm font-medium text-slate-600">Pricing</RouterLink>
          <RouterLink to="/about" class="text-sm font-medium text-slate-600">About</RouterLink>
        </nav>
        <div class="flex flex-col gap-2 pt-4 border-t border-slate-100">
          <RouterLink to="/login" class="w-full">
            <Button variant="ghost" block>Log in</Button>
          </RouterLink>
          <RouterLink to="/signup" class="w-full">
            <Button block>Get Started</Button>
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-50 border-t border-slate-200 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 class="font-semibold text-slate-900 mb-4">Product</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li><a href="#" class="hover:text-primary-600">Features</a></li>
              <li><a href="#" class="hover:text-primary-600">Pricing</a></li>
              <li><a href="#" class="hover:text-primary-600">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-slate-900 mb-4">Company</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li><a href="#" class="hover:text-primary-600">About</a></li>
              <li><a href="#" class="hover:text-primary-600">Blog</a></li>
              <li><a href="#" class="hover:text-primary-600">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li><a href="#" class="hover:text-primary-600">Privacy</a></li>
              <li><a href="#" class="hover:text-primary-600">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-slate-900 mb-4">Connect</h4>
            <div class="flex gap-4 text-slate-400">
              <!-- Social icons placeholder -->
              <div class="w-6 h-6 bg-current rounded-full"></div>
              <div class="w-6 h-6 bg-current rounded-full"></div>
            </div>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          © {{ new Date().getFullYear() }} Noeia. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
