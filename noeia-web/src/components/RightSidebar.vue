<script setup lang="ts">
import { ref } from 'vue'
import { 
  Sparkles, 
  Info, 
  LifeBuoy,
  Notebook,
  X,
  Send,
  CheckCircle2,
  Circle,
  ExternalLink,
  Maximize2
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

type PanelType = 'ai' | 'quick_start' | 'notebooks' | 'docs' | 'help' | null

const activePanel = ref<PanelType>(null)

function togglePanel(panel: PanelType) {
  if (activePanel.value === panel) {
    activePanel.value = null
  } else {
    activePanel.value = panel
  }
}

// Mock Data for Quick Start
const quickStartProgress = ref(70)
const quickStartSteps = [
  { id: 1, title: 'Create your first session', completed: true },
  { id: 2, title: 'Add your first patient', completed: true },
  { id: 3, title: 'Generate a bill', completed: false },
  { id: 4, title: 'Invite your team', completed: false },
]
</script>

<template>
  <div class="flex h-full shrink-0 font-sans relative">
    
    <!-- Expanded Panel (Left of Strip) -->
    <div 
      class="bg-background flex flex-col h-full shadow-inner transition-[width] duration-300 ease-in-out overflow-hidden border-l"
      :class="activePanel ? 'w-[400px]' : 'w-0 border-none'"
    >
      <div v-if="activePanel" class="flex flex-col h-full w-[400px]">
        <!-- Panel Header -->
        <div class="h-14 flex items-center justify-between px-6 border-b shrink-0 bg-background">
          <h3 class="font-semibold text-base flex items-center gap-2">
            <Sparkles v-if="activePanel === 'ai'" class="w-4 h-4 text-orange-500" />
            <span v-if="activePanel === 'ai'">Noeia AI</span>
            
            <span v-if="activePanel === 'quick_start'" class="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-xs font-bold">3</span>
            <span v-if="activePanel === 'quick_start'">Quick start</span>

            <Notebook v-if="activePanel === 'notebooks'" class="w-4 h-4 text-muted-foreground" />
            <span v-if="activePanel === 'notebooks'">My scratchpad</span>

            <Info v-if="activePanel === 'docs'" class="w-4 h-4" />
            <span v-if="activePanel === 'docs'">Documentation</span>
            
            <LifeBuoy v-if="activePanel === 'help'" class="w-4 h-4" />
            <span v-if="activePanel === 'help'">Help & Support</span>
          </h3>
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground">
              <Maximize2 class="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground" @click="activePanel = null">
              <X class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <!-- Panel Content -->
        <ScrollArea class="flex-1 bg-muted/5 w-full">
          
          <!-- AI Panel Content -->
          <div v-if="activePanel === 'ai'" class="p-8 flex flex-col items-center text-center space-y-8 h-full max-w-2xl mx-auto w-full">
             <div class="mt-16 mb-6 relative">
               <div class="absolute inset-0 bg-orange-500 blur-3xl opacity-10 rounded-full"></div>
               <Sparkles class="w-20 h-20 text-slate-800 relative z-10" />
             </div>
             
             <div class="space-y-3 max-w-sm mx-auto">
               <h2 class="text-2xl font-bold tracking-tight">What do you want to know today?</h2>
               <p class="text-muted-foreground">Build something people want.</p>
             </div>

             <div class="w-full space-y-4 mt-8">
               <div class="relative w-full shadow-lg rounded-lg">
                 <Input 
                   placeholder="Ask a question / for commands" 
                   class="pr-12 h-14 text-base bg-background border-muted-foreground/20 rounded-lg focus-visible:ring-offset-2 focus-visible:ring-orange-500" 
                 />
                 <Button size="icon" class="absolute right-1.5 top-1.5 h-11 w-11 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors">
                   <Send class="w-5 h-5" />
                 </Button>
               </div>
               
               <div class="flex flex-wrap gap-2 justify-center pt-2">
                  <Button variant="outline" size="sm" class="h-8 text-xs bg-background/50 border-dashed hover:bg-background hover:border-solid transition-all">
                     <Sparkles class="w-3 h-3 mr-1.5 text-orange-500" />
                     Product analytics
                  </Button>
                  <Button variant="outline" size="sm" class="h-8 text-xs bg-background/50 border-dashed hover:bg-background hover:border-solid transition-all">
                     @ My App Dashboard
                  </Button>
               </div>
             </div>

             <div class="w-full pt-12 mt-auto pb-4">
               <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">Try Noeia AI for...</h4>
               <div class="flex flex-wrap gap-2 justify-center">
                 <Badge variant="secondary" class="cursor-pointer hover:bg-background hover:shadow-sm px-3 py-1.5 font-normal border transition-all">Product analytics</Badge>
                 <Badge variant="secondary" class="cursor-pointer hover:bg-background hover:shadow-sm px-3 py-1.5 font-normal border transition-all">SQL</Badge>
                 <Badge variant="secondary" class="cursor-pointer hover:bg-background hover:shadow-sm px-3 py-1.5 font-normal border transition-all">Session replay</Badge>
                 <Badge variant="secondary" class="cursor-pointer hover:bg-background hover:shadow-sm px-3 py-1.5 font-normal border transition-all">Feature flags</Badge>
                 <Badge variant="secondary" class="cursor-pointer hover:bg-background hover:shadow-sm px-3 py-1.5 font-normal border transition-all">Experiments</Badge>
               </div>
             </div>
          </div>

          <!-- Quick Start Content -->
          <div v-if="activePanel === 'quick_start'" class="p-0 bg-background min-h-full w-full">
            <div class="p-8 bg-slate-50 border-b">
               <div class="flex items-start gap-6">
                  <div class="space-y-4 flex-1">
                     <h2 class="text-lg font-semibold">Quick start</h2>
                     <p class="text-muted-foreground leading-relaxed">Use our Quick Start guide to learn about everything Noeia can do for you and your product.</p>
                     
                     <div class="space-y-2 pt-2">
                        <div class="flex justify-between text-sm font-medium">
                           <span>Progress</span>
                           <span>{{ quickStartProgress }}%</span>
                        </div>
                        <Progress :model-value="quickStartProgress" class="h-2.5 bg-slate-200" />
                     </div>
                  </div>
                  <div class="h-20 w-20 bg-orange-100 rounded-xl flex items-center justify-center text-4xl shadow-sm">
                     🦔
                  </div>
               </div>
            </div>

            <div class="p-6 max-w-lg mx-auto">
               <div class="font-semibold text-sm px-2 py-4 text-muted-foreground uppercase tracking-wider">Onboarding Checklist</div>
               <div class="space-y-2">
                 <div 
                    v-for="step in quickStartSteps" 
                    :key="step.id" 
                    class="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group"
                    :class="{ 'bg-slate-50/50 border-transparent': step.completed }"
                 >
                    <div class="shrink-0">
                      <CheckCircle2 v-if="step.completed" class="w-6 h-6 text-green-500 fill-green-100" />
                      <Circle v-else class="w-6 h-6 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span class="text-base font-medium" :class="{ 'text-muted-foreground line-through decoration-slate-300': step.completed }">{{ step.title }}</span>
                 </div>
               </div>
            </div>
          </div>

          <!-- Notebooks Content -->
          <div v-if="activePanel === 'notebooks'" class="p-6 space-y-6 h-full flex flex-col bg-background w-full">
             <div class="bg-blue-50/50 border border-blue-100 rounded-lg p-4 space-y-3">
                <p class="text-sm text-blue-700 leading-relaxed">This is your scratchpad. It is only visible to you and is persisted only in this browser. It's a great place to gather ideas before turning into a saved Notebook!</p>
                <Button variant="outline" size="sm" class="w-full justify-start h-9 bg-white hover:bg-blue-50 text-blue-700 border-blue-200">
                   Convert to notebook
                </Button>
             </div>
             
             <div class="flex-1 outline-none space-y-4">
                <input 
                  type="text" 
                  value="Untitled" 
                  class="text-3xl font-bold text-muted-foreground/60 w-full bg-transparent border-none focus:ring-0 p-0 placeholder:text-muted-foreground/30"
                />
                <textarea 
                    class="w-full h-full resize-none bg-transparent border-none focus:ring-0 p-0 text-base leading-relaxed placeholder:text-muted-foreground/40 font-mono text-slate-700" 
                    placeholder="Start typing..."
                ></textarea>
             </div>
             
             <div class="flex justify-end pt-4 border-t">
                <div class="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                   <CheckCircle2 class="w-5 h-5" />
                </div>
             </div>
          </div>

          <div v-if="activePanel === 'docs'" class="p-12 text-center space-y-6 h-full flex flex-col items-center justify-center bg-background w-full">
             <div class="bg-muted/30 p-4 rounded-full">
               <Info class="w-12 h-12 text-muted-foreground" />
             </div>
             <div class="space-y-2 max-w-md">
               <h3 class="font-semibold text-lg">Documentation</h3>
               <p class="text-muted-foreground">Find guides and API references to help you build.</p>
             </div>
             <Button variant="outline" class="gap-2">
               <ExternalLink class="w-4 h-4" /> Open Docs
             </Button>
          </div>

          <div v-if="activePanel === 'help'" class="p-12 text-center space-y-6 h-full flex flex-col items-center justify-center bg-background w-full">
             <div class="bg-muted/30 p-4 rounded-full">
               <LifeBuoy class="w-12 h-12 text-muted-foreground" />
             </div>
             <div class="space-y-2 max-w-md">
               <h3 class="font-semibold text-lg">Help & Support</h3>
               <p class="text-muted-foreground">Need help? Reach out to our support team.</p>
             </div>
             <Button>Contact Support</Button>
          </div>

        </ScrollArea>
      </div>

    </div>

    <!-- Sidebar Strip (Right Side) -->
    <div class="w-12 bg-muted/10 flex flex-col items-center py-4 gap-4 h-full z-20 relative bg-slate-50/80 backdrop-blur-sm border-l">
      <!-- Top Group -->
      <div class="flex flex-col gap-8 w-full">
        <!-- AI Agent -->
        <button 
          @click="togglePanel('ai')"
          class="group flex flex-col items-center gap-2 relative w-full"
        >
          <!-- Active Background Extension (Right Side Connection) -->
          <div 
            v-if="activePanel === 'ai'" 
            class="absolute left-[-1px] right-0 top-[-8px] bottom-[-8px] bg-background border-y border-r border-border rounded-l-lg shadow-sm z-[-1]"
          ></div>

          <div 
             class="h-8 w-8 rounded-md flex items-center justify-center transition-colors relative"
             :class="activePanel === 'ai' ? 'text-orange-600' : 'text-slate-500 group-hover:text-foreground'"
          >
            <Sparkles class="w-5 h-5 fill-current" />
          </div>
          <div class="writing-mode-vertical text-[10px] font-medium tracking-wide transition-colors whitespace-nowrap py-1 relative"
             :class="activePanel === 'ai' ? 'text-orange-600' : 'text-muted-foreground group-hover:text-foreground'"
          >
            Noeia AI
          </div>
        </button>

        <!-- Quick Start -->
        <button 
          @click="togglePanel('quick_start')"
          class="group flex flex-col items-center gap-2 relative w-full"
        >
          <div 
            v-if="activePanel === 'quick_start'" 
            class="absolute left-[-1px] right-0 top-[-8px] bottom-[-8px] bg-background border-y border-r border-border rounded-l-lg shadow-sm z-[-1]"
          ></div>

          <div class="relative h-8 w-8 rounded-md flex items-center justify-center transition-colors"
             :class="activePanel === 'quick_start' ? 'text-orange-700' : 'text-orange-600'"
          >
            <div 
               class="absolute inset-0 rounded-full border-2 border-orange-500 opacity-20"
               :class="{ 'opacity-100 bg-orange-100': activePanel === 'quick_start' }"
            ></div>
            <span class="text-xs font-bold font-mono relative z-10">3</span>
          </div>
          <div class="writing-mode-vertical text-[10px] font-medium tracking-wide transition-colors whitespace-nowrap py-1 relative"
             :class="activePanel === 'quick_start' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'"
          >
            Quick start
          </div>
        </button>
      </div>

      <div class="flex-1"></div>

      <!-- Bottom Group -->
      <div class="flex flex-col gap-6 w-full pb-2">
        <!-- Notebooks -->
        <button 
          @click="togglePanel('notebooks')"
          class="group flex flex-col items-center gap-2 relative w-full"
        >
           <div 
            v-if="activePanel === 'notebooks'" 
            class="absolute left-[-1px] right-0 top-[-8px] bottom-[-8px] bg-background border-y border-r border-border rounded-l-lg shadow-sm z-[-1]"
          ></div>

          <div class="h-8 w-8 rounded-md flex items-center justify-center transition-colors relative"
             :class="activePanel === 'notebooks' ? 'text-foreground' : 'text-slate-500 group-hover:text-foreground'"
          >
            <Notebook class="w-5 h-5" />
          </div>
          <div class="writing-mode-vertical text-[10px] font-medium tracking-wide transition-colors whitespace-nowrap py-1 relative"
             :class="activePanel === 'notebooks' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'"
          >
            Notebooks
          </div>
        </button>

        <!-- Docs -->
        <button 
          @click="togglePanel('docs')"
          class="group flex flex-col items-center gap-2 relative w-full"
        >
           <div 
            v-if="activePanel === 'docs'" 
            class="absolute left-[-1px] right-0 top-[-8px] bottom-[-8px] bg-background border-y border-r border-border rounded-l-lg shadow-sm z-[-1]"
          ></div>

          <div class="h-8 w-8 rounded-md flex items-center justify-center transition-colors relative"
             :class="activePanel === 'docs' ? 'text-foreground' : 'text-slate-500 group-hover:text-foreground'"
          >
            <Info class="w-5 h-5" />
          </div>
          <div class="writing-mode-vertical text-[10px] font-medium tracking-wide transition-colors whitespace-nowrap py-1 relative"
             :class="activePanel === 'docs' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'"
          >
            Docs
          </div>
        </button>

        <!-- Help -->
        <button 
          @click="togglePanel('help')"
          class="group flex flex-col items-center gap-2 relative w-full"
        >
           <div 
            v-if="activePanel === 'help'" 
            class="absolute left-[-1px] right-0 top-[-8px] bottom-[-8px] bg-background border-y border-r border-border rounded-l-lg shadow-sm z-[-1]"
          ></div>

          <div class="h-8 w-8 rounded-md flex items-center justify-center transition-colors relative"
             :class="activePanel === 'help' ? 'text-foreground' : 'text-slate-500 group-hover:text-foreground'"
          >
            <LifeBuoy class="w-5 h-5" />
          </div>
          <div class="writing-mode-vertical text-[10px] font-medium tracking-wide transition-colors whitespace-nowrap py-1 relative"
             :class="activePanel === 'help' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'"
          >
            Help
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
