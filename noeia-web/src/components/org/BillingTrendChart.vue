<script setup lang="ts">
import { VisXYContainer, VisArea, VisLine } from '@unovis/vue'

defineProps<{
  data: { x: number; y: number }[]
  color: string
}>()

const x = (d: { x: number; y: number }) => d.x
const y = (d: { x: number; y: number }) => d.y
</script>

<template>
  <div class="h-[60px] w-full">
    <VisXYContainer :data="data" :height="60" :margin="{ top: 5, right: 0, bottom: 5, left: 0 }">
      <VisArea 
        :x="x" 
        :y="y" 
        :color="color" 
        :opacity="0.1" 
        :curve-type="'monotoneX'"
      />
      <VisLine 
        :x="x" 
        :y="y" 
        :color="color" 
        :lineWidth="2" 
        :curve-type="'monotoneX'"
      />
    </VisXYContainer>
  </div>
</template>
