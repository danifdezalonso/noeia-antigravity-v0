<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonGroupVariants, type ButtonGroupVariants } from '.'

interface Props extends ButtonGroupVariants {
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
