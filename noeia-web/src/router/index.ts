import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/public/Landing.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/pricing',
            name: 'pricing',
            component: () => import('@/pages/public/Pricing.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/public/About.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/public/Login.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/app',
            name: 'dashboard',
            component: () => import('@/pages/app/Dashboard.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/calendar',
            name: 'calendar',
            component: () => import('@/pages/app/Calendar.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/clients',
            name: 'clients',
            component: () => import('@/pages/app/Clients.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/clients/:id',
            name: 'client-detail',
            component: () => import('@/pages/app/ClientDetail.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/sessions',
            name: 'sessions',
            component: () => import('@/pages/app/Sessions.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/billing',
            name: 'billing',
            component: () => import('@/pages/app/Billing.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/settings',
            name: 'settings',
            component: () => import('@/pages/app/Settings.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
    ],
})

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router

