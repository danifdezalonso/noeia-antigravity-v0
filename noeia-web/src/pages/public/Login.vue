<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary-600 mb-8">Noeia Login</h1>
      <button 
        @click="auth.login()"
        class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mb-4 w-full"
      >
        Sign in with Google
      </button>
      
      <button 
        @click="auth.bypassLogin()"
        class="px-6 py-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors w-full text-sm font-medium"
      >
        Dev Bypass (Skip Login)
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>
