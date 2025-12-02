<script setup lang="ts">
import CtaSection from '@/components/public/CtaSection.vue'
</script>

<template>
  <div>
    <section class="py-20 bg-background text-center">
      <h1 class="text-4xl font-bold text-text mb-4">About Noeia</h1>
      <p class="text-text-muted max-w-2xl mx-auto">We're on a mission to help mental health professionals spend more time with their patients and less time on paperwork.</p>
    </section>
    
    <section class="py-20 max-w-4xl mx-auto px-4">
      <div class="prose prose-slate mx-auto">
        <h2>Our Story</h2>
        <p>Noeia was born out of frustration with clunky, outdated software that made running a therapy practice harder, not easier. We believe that technology should be invisible, supportive, and calm.</p>
        
        <h2>Our Values</h2>
        <ul>
          <li><strong>Privacy First:</strong> Your client data is sacred. We treat it that way.</li>
          <li><strong>Clinical Autonomy:</strong> We build tools that adapt to your style, not the other way around.</li>
          <li><strong>Clarity:</strong> We value simple, clear design that reduces cognitive load.</li>
        </ul>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
