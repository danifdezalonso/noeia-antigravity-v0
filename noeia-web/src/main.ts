import { createApp } from 'vue'
import { createPinia } from 'pinia'
import posthog from 'posthog-js'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize PostHog
const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST

if (posthogKey) {
    posthog.init(posthogKey, {
        api_host: posthogHost || 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        loaded: (_posthog) => {
            console.log('PostHog loaded successfully')
        }
    })

    // Track page views
    router.afterEach((to) => {
        posthog.capture('$pageview', {
            $current_url: window.location.href,
            path: to.path
        })
    })
}

app.mount('#app')
