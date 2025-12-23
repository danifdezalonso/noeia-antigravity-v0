<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonGroupVariants } from '.'

interface Props {
  variant?: 'default' | 'outline'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <div :class="cn(buttonGroupVariants(delegatedProps), props.class)">
    <slot />
  </div>
</template>
