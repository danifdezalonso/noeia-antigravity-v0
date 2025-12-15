<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'

defineProps<{
  currentData: { x: number; y: number }[]
  previousData: { x: number; y: number }[]
  color: string
}>()

const x = (d: { x: number; y: number }) => d.x
const y = (d: { x: number; y: number }) => d.y

const template = (d: any) => {
  if (!d) return ''
  return `
    <div style="padding: 4px; font-size: 12px;">
      <div style="font-weight: bold;">Value: €${d.y}</div>
      <div style="color: #666;">Day ${d.x}</div>
    </div>
  `
}
</script>

<template>
  <div class="h-full w-full">
    <VisXYContainer :height="300" :margin="{ top: 20, right: 20, bottom: 20, left: 40 }">
      <!-- Previous Period (Grey Line) -->
      <VisLine 
        :data="previousData"
        :x="x" 
        :y="y" 
        color="#e2e8f0" 
        :lineWidth="2" 
        :curve-type="'monotoneX'"
        :attributes="{ 'stroke-dasharray': '5,5' }"
      />
      
      <!-- Current Period (Colored Line) -->
      <VisLine 
        :data="currentData"
        :x="x" 
        :y="y" 
        :color="color" 
        :lineWidth="3" 
        :curve-type="'monotoneX'"
      />

      <!-- Attributes -->
      <VisAxis type="x" :numTicks="6" />
      <VisAxis type="y" :numTicks="5" :tickFormat="(d: number) => '€' + d" />
      <VisCrosshair :template="template" color="#888" />
      <VisTooltip />
    </VisXYContainer>
  </div>
</template>
