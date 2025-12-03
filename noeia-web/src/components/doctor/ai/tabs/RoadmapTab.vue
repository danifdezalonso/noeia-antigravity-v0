<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Circle, Clock } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const goals = ref([
  { id: 1, title: 'Reduce panic attack frequency', status: 'In Progress', dueDate: '2024-03-01' },
  { id: 2, title: 'Establish consistent sleep schedule', status: 'Planned', dueDate: '2024-02-15' },
])

const interventions = ref([
  { id: 1, title: 'CBT for Anxiety', description: 'Weekly sessions focusing on cognitive restructuring' },
  { id: 2, title: 'Mindfulness Training', description: 'Daily 10min practice' },
])

const nextFocus = ref('Deep dive into workplace triggers and role-play assertive communication.')
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Goals -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-slate-900">Therapeutic Goals</h3>
        <Button variant="ghost" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>
      <div class="space-y-3">
        <div v-for="goal in goals" :key="goal.id" class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
          <div :class="goal.status === 'In Progress' ? 'text-primary-600' : 'text-slate-400'">
            <Clock v-if="goal.status === 'In Progress'" class="w-5 h-5" />
            <Circle v-else class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <div class="font-medium text-slate-900">{{ goal.title }}</div>
            <div class="text-xs text-slate-500">Due: {{ new Date(goal.dueDate).toLocaleDateString() }}</div>
          </div>
          <span class="px-2 py-1 rounded-full text-xs font-medium" :class="goal.status === 'In Progress' ? 'bg-primary-50 text-primary-700' : 'bg-slate-100 text-slate-700'">
            {{ goal.status }}
          </span>
        </div>
      </div>
    </section>

    <!-- Interventions -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-slate-900">Planned Interventions</h3>
        <Button variant="ghost" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add Intervention
        </Button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="item in interventions" :key="item.id" class="p-4 bg-white border border-slate-200 rounded-lg">
          <h4 class="font-medium text-slate-900 mb-1">{{ item.title }}</h4>
          <p class="text-sm text-slate-600">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- Next Session -->
    <section>
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Next Session Focus</h3>
      <div class="bg-white border border-slate-200 rounded-lg p-4">
        <textarea 
          v-model="nextFocus"
          class="w-full resize-none focus:outline-none text-slate-700"
          rows="3"
        ></textarea>
      </div>
    </section>
  </div>
</template>
