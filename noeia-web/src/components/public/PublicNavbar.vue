<script setup lang="ts">
const links = [
  { name: 'Features', href: '/#features', type: 'hash' },
  { name: 'Pricing', href: '/pricing', type: 'route' },
  { name: 'About', href: '/about', type: 'route' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-primary-700 transition-colors">N</div>
        <span class="font-bold text-xl tracking-tight text-slate-900">Noeia</span>
      </router-link>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <template v-for="link in links" :key="link.name">
          <a 
            v-if="link.type === 'hash'" 
            :href="link.href" 
            class="hover:text-slate-900 transition-colors"
          >
            {{ link.name }}
          </a>
          <router-link 
            v-else 
            :to="link.href" 
            class="hover:text-slate-900 transition-colors"
            active-class="text-primary-600"
          >
            {{ link.name }}
          </router-link>
        </template>
      </div>

      <!-- Auth Buttons -->
      <div class="flex items-center gap-4">
        <router-link to="/login" class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</router-link>
        <router-link to="/login" class="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
          Get Started
        </router-link>
      </div>
    </div>
  </nav>
</template>
