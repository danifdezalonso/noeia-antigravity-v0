<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'

const user = ref({
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567'
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Profile</h1>
      <p class="text-slate-500">Manage your personal information.</p>
    </div>

    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700">Full Name</label>
          <div class="mt-1 text-slate-900">{{ user.name }}</div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">Email</label>
          <div class="mt-1 text-slate-900">{{ user.email }}</div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">Phone</label>
          <div class="mt-1 text-slate-900">{{ user.phone }}</div>
        </div>
      </div>
      <div class="mt-6">
        <Button variant="outline">Edit Profile</Button>
      </div>
    </div>
  </div>
</template>
