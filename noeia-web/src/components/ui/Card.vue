<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  noPadding?: boolean
}

withDefaults(defineProps<Props>(), {
  noPadding: false,
})
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div v-if="title || description" class="px-6 py-4 border-b border-slate-100">
      <h3 v-if="title" class="text-lg font-semibold text-slate-900">{{ title }}</h3>
      <p v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</p>
    </div>
    <div :class="{ 'p-6': !noPadding }">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 bg-slate-50 border-t border-slate-100">
      <slot name="footer" />
    </div>
  </div>
</template>
