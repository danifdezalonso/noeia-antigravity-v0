<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-background border-t border-slate-200 pt-16 pb-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
        <!-- Product -->
        <div>
          <h4 class="font-bold text-text mb-6">Product</h4>
          <ul class="space-y-3 text-sm text-text-muted">
            <li><RouterLink to="/product" class="hover:text-primary-500 transition-colors">Overview</RouterLink></li>
            <li><RouterLink to="/product#calendar" class="hover:text-primary-500 transition-colors">Calendar</RouterLink></li>
            <li><RouterLink to="/product#ai" class="hover:text-primary-500 transition-colors">AI Notes</RouterLink></li>
            <li><RouterLink to="/product#portal" class="hover:text-primary-500 transition-colors">Client Portal</RouterLink></li>
            <li><RouterLink to="/product#office" class="hover:text-primary-500 transition-colors">Office & Rooms</RouterLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="font-bold text-text mb-6">Company</h4>
          <ul class="space-y-3 text-sm text-text-muted">
            <li><RouterLink to="/about" class="hover:text-primary-500 transition-colors">About</RouterLink></li>
            <li><RouterLink to="/careers" class="hover:text-primary-500 transition-colors">Careers</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-primary-500 transition-colors">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="font-bold text-text mb-6">Resources</h4>
          <ul class="space-y-3 text-sm text-text-muted">
            <li><RouterLink to="/blog" class="hover:text-primary-500 transition-colors">Blog</RouterLink></li>
            <li><RouterLink to="/guides" class="hover:text-primary-500 transition-colors">Guides</RouterLink></li>
            <li><RouterLink to="/help" class="hover:text-primary-500 transition-colors">Help Center</RouterLink></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-bold text-text mb-6">Legal</h4>
          <ul class="space-y-3 text-sm text-text-muted">
            <li><RouterLink to="/privacy" class="hover:text-primary-500 transition-colors">Privacy</RouterLink></li>
            <li><RouterLink to="/terms" class="hover:text-primary-500 transition-colors">Terms</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="font-bold text-lg text-primary-500">noeia</span>
          <span class="text-xs text-text-muted">© {{ new Date().getFullYear() }} Noeia. All rights reserved.</span>
        </div>
        <p class="text-xs text-text-muted text-center md:text-right max-w-md">
          Noeia helps psychologists work faster, think clearer, and stay with their patients, not their paperwork.
        </p>
      </div>
    </div>
  </footer>
</template>
