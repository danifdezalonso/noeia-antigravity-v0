<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, Check, Calendar, Sparkles, Clock, User, Users, FileText, CreditCard, Settings, BrainCircuit, MessageSquare, Download, Edit2, TrendingUp, CheckCircle2 } from 'lucide-vue-next'

const isLoaded = ref(false)
const activeTab = ref('calendar')

const tabs = [
  { id: 'clients', icon: Users, label: 'Patients' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'chat', icon: MessageSquare, label: 'Messages' },
  { id: 'notes', icon: FileText, label: 'Notes' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
  { id: 'ai', icon: BrainCircuit, label: 'NoeIA' },
]

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <section class="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-secondary-200/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-0 items-center">
        
        <!-- Left Column: Copy -->
        <div 
          class="max-w-2xl transition-all duration-700 ease-out transform"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-6">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            SaaS for psychologists & clinics
          </div>
          
          <h1 class="text-5xl lg:text-6xl font-bold tracking-tight text-text mb-6 leading-[1.1]">
            The workspace for <span class="text-primary-500">modern therapy</span> practices.
          </h1>
          
          <p class="text-lg lg:text-xl text-text-muted mb-8 leading-relaxed max-w-lg">
            Noeia centralizes calendar, notes, and client communication so psychologists can spend more time in session—and less time in their inbox.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <RouterLink to="/login">
              <Button size="lg" class="w-full sm:w-auto rounded-full px-8 bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-primary-500/25 transition-all">
                Book a live demo
                <ArrowRight class="w-4 h-4 ml-2" />
              </Button>
            </RouterLink>
            <RouterLink to="/product">
              <Button variant="outline" size="lg" class="w-full sm:w-auto rounded-full px-8 border-slate-300 hover:bg-slate-50 text-text">
                Explore the product
              </Button>
            </RouterLink>
          </div>

          <p class="text-sm text-text-light flex items-center gap-2">
            <Check class="w-4 h-4 text-secondary-500" />
            Designed with psychologists, built for solo practices and multi-clinic teams.
          </p>
        </div>

        <!-- Right Column: Hero Card -->
        <div 
          class="relative lg:h-[650px] flex items-center justify-center transition-all duration-1000 ease-out delay-200 transform perspective-1000"
          :class="isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-y-12'"
        >
          <!-- Main App Card -->
          <div class="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-3xl group h-[500px] flex flex-col">
            
            <!-- App Content -->
            <div class="flex-1 flex overflow-hidden">
              <!-- Sidebar -->
              <div class="w-16 flex flex-col items-center gap-6 pt-6 border-r border-slate-100 bg-slate-50/50 flex-shrink-0">
                <div class="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-sm mb-2">N</div>
                
                <div class="flex flex-col gap-4 w-full items-center">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group/icon relative"
                    :class="activeTab === tab.id ? 'bg-primary-50 border border-primary-100 text-primary-600 shadow-sm' : 'bg-white border border-slate-200 text-slate-400 hover:text-primary-600 hover:border-primary-200'"
                  >
                    <component :is="tab.icon" class="w-4 h-4 transition-transform" :class="activeTab !== tab.id ? 'group-hover/icon:scale-110' : ''" />
                    <!-- Tooltip -->
                    <span class="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {{ tab.label }}
                    </span>
                  </button>
                </div>

                <div class="mt-auto mb-6">
                  <div class="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:text-slate-600 transition-colors cursor-pointer">
                    <Settings class="w-4 h-4" />
                  </div>
                </div>
              </div>

              <!-- Content Area -->
              <div class="flex-1 bg-white overflow-hidden relative">
                
                <!-- Calendar View -->
                <div v-if="activeTab === 'calendar'" class="h-full p-4 flex flex-col animate-fade-in">
                  <div class="flex justify-between items-center mb-6">
                    <div>
                      <h3 class="font-semibold text-slate-800 text-sm">October 2023</h3>
                      <p class="text-[10px] text-slate-500">Check last session highlights and patient storical</p>
                    </div>
                    <div class="flex gap-1">
                      <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-400 text-xs hover:bg-slate-200 cursor-pointer">&lt;</div>
                      <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-400 text-xs hover:bg-slate-200 cursor-pointer">&gt;</div>
                    </div>
                  </div>
                  
                  <div class="flex-1 relative border-t border-slate-100 pt-4">
                    <!-- Time Indicator Line -->
                    <div class="absolute top-12 left-0 w-full border-t border-red-200 border-dashed z-0"></div>
                    <div class="absolute top-11 left-0 bg-red-50 text-red-500 text-[9px] px-1 rounded font-medium z-10">10:45 AM</div>

                    <div class="space-y-3">
                      <!-- Event 1 -->
                      <div class="p-3 rounded-xl bg-primary-50 border border-primary-100 border-l-4 border-l-primary-500 shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer relative z-10">
                        <div class="flex justify-between items-start mb-1">
                          <span class="text-xs font-bold text-primary-700">Initial Consultation</span>
                          <span class="text-[10px] text-primary-500 font-medium bg-white px-1.5 py-0.5 rounded-full">09:00 AM</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-primary-600 mb-2">
                          <User class="w-3 h-3" />
                          Sarah Johnson
                        </div>
                        <div class="flex items-center gap-1 text-[10px] text-primary-400">
                          <Clock class="w-3 h-3" />
                          50 min • Room A
                        </div>
                      </div>

                      <!-- Event 2 -->
                      <div class="p-3 rounded-xl bg-secondary-50 border border-secondary-100 border-l-4 border-l-secondary-500 shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer opacity-90 relative z-10">
                        <div class="flex justify-between items-start mb-1">
                          <span class="text-xs font-bold text-secondary-800">Therapy Session</span>
                          <span class="text-[10px] text-secondary-600 font-medium bg-white px-1.5 py-0.5 rounded-full">11:00 AM</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-secondary-700 mb-2">
                          <User class="w-3 h-3" />
                          Michael Brown
                        </div>
                      </div>

                      <!-- Event 3 -->
                      <div class="p-3 rounded-xl bg-white border border-slate-200 border-l-4 border-l-slate-300 shadow-sm opacity-60 relative z-10">
                        <div class="flex justify-between items-start">
                          <span class="text-xs font-bold text-slate-600">Lunch Break</span>
                          <span class="text-[10px] text-slate-400">13:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Chat View -->
                <div v-else-if="activeTab === 'chat'" class="h-full flex animate-fade-in">
                  <!-- Chat List -->
                  <div class="w-1/3 border-r border-slate-100 bg-slate-50/50 p-2 space-y-2">
                    <div class="p-2 bg-white rounded-lg border border-primary-100 shadow-sm">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-600">SJ</div>
                        <div class="flex-1 min-w-0">
                          <div class="text-[10px] font-bold text-slate-800 truncate">Sarah Johnson</div>
                          <div class="text-[8px] text-slate-400">10:30 AM</div>
                        </div>
                      </div>
                      <div class="text-[9px] text-slate-500 truncate">I have a question about...</div>
                    </div>
                    <div class="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-colors">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center text-[10px] font-bold text-secondary-600">MB</div>
                        <div class="flex-1 min-w-0">
                          <div class="text-[10px] font-bold text-slate-800 truncate">Michael Brown</div>
                          <div class="text-[8px] text-slate-400">Yesterday</div>
                        </div>
                      </div>
                      <div class="text-[9px] text-slate-500 truncate">Thanks for the resources.</div>
                    </div>
                  </div>
                  <!-- Chat Area -->
                  <div class="flex-1 flex flex-col bg-white">
                    <div class="p-3 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-600">SJ</div>
                        <span class="text-xs font-bold text-slate-800">Sarah Johnson</span>
                      </div>
                      <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div class="flex-1 p-3 space-y-3 overflow-y-auto bg-slate-50/30">
                      <div class="flex justify-start">
                        <div class="bg-white border border-slate-100 text-slate-600 rounded-lg rounded-bl-none px-2 py-1.5 text-[10px] max-w-[80%] shadow-sm">
                          Hi Dr., I need to reschedule our next session.
                        </div>
                      </div>
                      <div class="flex justify-end">
                        <div class="bg-primary-600 text-white rounded-lg rounded-br-none px-2 py-1.5 text-[10px] max-w-[80%] shadow-sm">
                          Hello Sarah, no problem. What time works for you?
                        </div>
                      </div>
                      <div class="flex justify-start">
                        <div class="bg-white border border-slate-100 text-slate-600 rounded-lg rounded-bl-none px-2 py-1.5 text-[10px] max-w-[80%] shadow-sm">
                          Is next Tuesday at 3 PM available?
                        </div>
                      </div>
                    </div>
                    <div class="p-2 border-t border-slate-100">
                      <div class="bg-slate-50 rounded-lg border border-slate-200 h-8 flex items-center px-2 text-[10px] text-slate-400">
                        Type a message...
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Clients View -->
                <div v-else-if="activeTab === 'clients'" class="h-full p-4 animate-fade-in">
                  <h3 class="font-semibold text-slate-800 text-sm mb-4">Patients</h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="p-3 rounded-xl border border-slate-200 bg-white hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group">
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">SJ</div>
                        <div>
                          <div class="text-xs font-bold text-slate-800">Sarah Johnson</div>
                          <div class="text-[10px] text-slate-500">Anxiety</div>
                        </div>
                      </div>
                      <div class="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-primary-500 w-3/4"></div>
                      </div>
                      <div class="mt-1 text-[9px] text-slate-400 text-right">75% Progress</div>
                    </div>
                    <div class="p-3 rounded-xl border border-slate-200 bg-white hover:border-secondary-200 hover:shadow-md transition-all cursor-pointer group">
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-8 h-8 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-xs">MB</div>
                        <div>
                          <div class="text-xs font-bold text-slate-800">Michael Brown</div>
                          <div class="text-[10px] text-slate-500">Depression</div>
                        </div>
                      </div>
                      <div class="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-secondary-500 w-1/2"></div>
                      </div>
                      <div class="mt-1 text-[9px] text-slate-400 text-right">50% Progress</div>
                    </div>
                  </div>
                </div>

                <!-- Notes View -->
                <div v-else-if="activeTab === 'notes'" class="h-full p-4 animate-fade-in flex flex-col">
                  <h3 class="font-semibold text-slate-800 text-sm mb-4">Recent Session Notes</h3>
                  <div class="space-y-3">
                    <!-- Note 1 -->
                    <div class="p-3 rounded-xl border border-primary-100 bg-primary-50/30">
                      <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-600">SJ</div>
                          <div>
                            <div class="text-xs font-bold text-slate-800">Sarah Johnson</div>
                            <div class="text-[10px] text-slate-500">Yesterday • Anxiety</div>
                          </div>
                        </div>
                        <div class="flex items-center gap-1 px-1.5 py-0.5 bg-white rounded-full border border-primary-100 shadow-sm">
                          <Sparkles class="w-2.5 h-2.5 text-primary-500" />
                          <span class="text-[9px] font-medium text-primary-600">AI Summarized</span>
                        </div>
                      </div>
                      <div class="text-[10px] text-slate-600 leading-relaxed mb-2">
                        Patient reported improved sleep patterns but increased work stress. Discussed coping mechanisms for upcoming presentation.
                      </div>
                      <div class="flex gap-1 flex-wrap">
                        <span class="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] text-slate-500">Sleep</span>
                        <span class="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] text-slate-500">Work Stress</span>
                        <span class="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] text-slate-500">Coping</span>
                      </div>
                    </div>

                    <!-- Note 2 -->
                    <div class="p-3 rounded-xl border border-slate-200 bg-white opacity-80">
                      <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center text-[10px] font-bold text-secondary-600">MB</div>
                          <div>
                            <div class="text-xs font-bold text-slate-800">Michael Brown</div>
                            <div class="text-[10px] text-slate-500">2 days ago • Depression</div>
                          </div>
                        </div>
                        <div class="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 rounded-full border border-slate-100">
                          <Clock class="w-2.5 h-2.5 text-slate-400" />
                          <span class="text-[9px] font-medium text-slate-500">Processing...</span>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div class="h-2 bg-slate-100 rounded w-full animate-pulse"></div>
                        <div class="h-2 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                        <div class="h-2 bg-slate-100 rounded w-4/6 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Billing View -->
                <div v-else-if="activeTab === 'billing'" class="h-full p-4 animate-fade-in flex flex-col">
                  <h3 class="font-semibold text-slate-800 text-sm mb-4">Billing Overview</h3>
                  
                  <!-- Stats -->
                  <div class="grid grid-cols-3 gap-2 mb-6">
                    <div class="p-2 rounded-lg bg-green-50 border border-green-100">
                      <div class="text-[9px] text-green-600 font-medium mb-0.5">Earned</div>
                      <div class="text-sm font-bold text-green-700">€12,450</div>
                      <div class="text-[8px] text-green-600 flex items-center gap-0.5">
                        <TrendingUp class="w-2 h-2" /> +12%
                      </div>
                    </div>
                    <div class="p-2 rounded-lg bg-orange-50 border border-orange-100">
                      <div class="text-[9px] text-orange-600 font-medium mb-0.5">Pending</div>
                      <div class="text-sm font-bold text-orange-700">€1,200</div>
                      <div class="text-[8px] text-orange-600">3 invoices</div>
                    </div>
                    <div class="p-2 rounded-lg bg-blue-50 border border-blue-100">
                      <div class="text-[9px] text-blue-600 font-medium mb-0.5">Sessions</div>
                      <div class="text-sm font-bold text-blue-700">45</div>
                      <div class="text-[8px] text-blue-600">This month</div>
                    </div>
                  </div>

                  <!-- Invoices -->
                  <h4 class="font-medium text-slate-700 text-xs mb-2">Recent Invoices</h4>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-white hover:border-primary-100 transition-colors group">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                          <CheckCircle2 class="w-4 h-4" />
                        </div>
                        <div>
                          <div class="text-[10px] font-bold text-slate-800">INV-2023-001</div>
                          <div class="text-[9px] text-slate-500">Sarah Johnson • €150.00</div>
                        </div>
                      </div>
                      <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                          <Download class="w-3 h-3" />
                        </button>
                        <button class="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                          <Edit2 class="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div class="flex items-center justify-between p-2 rounded-lg border border-orange-100 bg-orange-50/30 hover:border-orange-200 transition-colors group">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                          <Clock class="w-4 h-4" />
                        </div>
                        <div>
                          <div class="text-[10px] font-bold text-slate-800">INV-2023-002</div>
                          <div class="text-[9px] text-slate-500">Michael Brown • €150.00</div>
                        </div>
                      </div>
                      <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                          <Download class="w-3 h-3" />
                        </button>
                        <button class="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                          <Edit2 class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- NoeIA View -->
                <div v-else-if="activeTab === 'ai'" class="h-full relative overflow-hidden animate-fade-in flex flex-col">
                  <!-- Animated Background -->
                  <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
                  <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div class="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-indigo-200/20 via-purple-200/20 to-pink-200/20 animate-spin-slow blur-3xl rounded-full"></div>
                  </div>

                  <div class="relative z-10 p-4 h-full flex flex-col">
                    <div class="flex items-center gap-2 mb-4">
                      <div class="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Sparkles class="w-3 h-3" />
                      </div>
                      <h3 class="font-bold text-slate-800 text-sm">NoeIA Insights</h3>
                    </div>

                    <div class="flex-1 space-y-3 overflow-hidden">
                      <!-- Transcript Snippet -->
                      <div class="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm">
                        <div class="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-2">Live Analysis</div>
                        <div class="space-y-2">
                          <p class="text-[10px] text-slate-600 leading-relaxed">
                            <span class="font-bold text-slate-800">Patient:</span> I've been feeling much better about the <span class="bg-green-100 text-green-700 px-1 rounded">work situation</span>.
                          </p>
                          <p class="text-[10px] text-slate-600 leading-relaxed">
                            <span class="font-bold text-slate-800">Therapist:</span> That's great progress. What specific <span class="bg-indigo-100 text-indigo-700 px-1 rounded">strategies</span> helped?
                          </p>
                        </div>
                      </div>

                      <!-- AI Insight Card -->
                      <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 transform transition-all hover:scale-[1.02] cursor-pointer">
                        <div class="flex items-center gap-2 mb-2">
                          <BrainCircuit class="w-3 h-3 text-indigo-200" />
                          <span class="text-[10px] font-bold text-indigo-100">Key Insight Detected</span>
                        </div>
                        <p class="text-[11px] font-medium leading-relaxed">
                          Patient shows significant improvement in coping with work-related stress. Positive reinforcement of new strategies is recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Other Views (Placeholder) -->
                <div v-else class="h-full flex items-center justify-center text-slate-400 text-xs animate-fade-in">
                  <div class="text-center">
                    <component :is="tabs.find(t => t.id === activeTab)?.icon" class="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Content for {{ tabs.find(t => t.id === activeTab)?.label }}</p>
                  </div>
                </div>

              </div>
            </div>

            <!-- Floating AI Panel (Smaller, Stars) -->
            <div class="absolute bottom-4 right-4 bg-white rounded-xl shadow-xl border border-slate-200 p-3 transform transition-all duration-700 delay-500 max-w-[200px] z-20"
              :class="isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'"
            >
              <div class="flex items-center gap-2 mb-2">
                <div class="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <Sparkles class="w-2.5 h-2.5 animate-pulse" />
                </div>
                <span class="text-[10px] font-bold text-slate-700">NoeIA</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex gap-0.5">
                  <div class="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 300ms"></div>
                </div>
                <span class="text-[9px] text-slate-500 font-medium">Summarizing and highlighting...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-12 {
  transform: rotateY(12deg);
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
