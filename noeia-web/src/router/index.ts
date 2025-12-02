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
            path: '/product',
            name: 'product',
            component: () => import('@/pages/public/Product.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources',
            name: 'resources',
            component: () => import('@/pages/public/Resources.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/public/About.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-psychologists',
            name: 'for-psychologists',
            component: () => import('@/pages/public/ForPsychologists.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-clinics',
            name: 'for-clinics',
            component: () => import('@/pages/public/ForClinics.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients',
            name: 'for-patients',
            component: () => import('@/pages/public/ForPatients.vue'),
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
            path: '/app/ai',
            name: 'ai',
            component: () => import('@/pages/app/AI.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/calendar',
            name: 'calendar',
            component: () => import('@/pages/app/Calendar.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/profile',
            name: 'ClientProfile',
            component: () => import('@/pages/app/client/ClientProfile.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/billing',
            name: 'ClientBilling',
            component: () => import('@/pages/app/client/ClientBilling.vue'),
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
        {
            path: '/app/messages',
            name: 'messages',
            component: () => import('@/pages/app/Messages.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/onboarding',
            name: 'onboarding',
            component: () => import('@/pages/app/ClientOnboarding.vue'),
            meta: { requiresAuth: true, layout: 'public' }, // Use public layout or none for full screen
        },
        {
            path: '/app/doctor-onboarding',
            name: 'doctor-onboarding',
            component: () => import('@/pages/app/DoctorOnboarding.vue'),
            meta: { requiresAuth: true, layout: 'public' },
        },
        {
            path: '/app/organization-onboarding',
            name: 'organization-onboarding',
            component: () => import('@/pages/app/OrganizationOnboarding.vue'),
            meta: { requiresAuth: true, layout: 'public' },
        },
        // Organization App Routes
        {
            path: '/app/org/dashboard',
            name: 'org-dashboard',
            component: () => import('@/pages/app/org/OrganizationDashboard.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/org/doctors',
            name: 'org-doctors',
            component: () => import('@/pages/app/org/OrganizationDoctors.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/org/patients',
            name: 'org-patients',
            component: () => import('@/pages/app/org/OrganizationPatients.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/org/calendar',
            name: 'org-calendar',
            component: () => import('@/pages/app/org/OrganizationCalendar.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/org/office',
            name: 'OrganizationOffice',
            component: () => import('@/pages/app/org/OrganizationOffice.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/org/billing',
            name: 'OrganizationBilling',
            component: () => import('@/pages/app/org/OrganizationBilling.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/org/settings',
            name: 'org-settings',
            component: () => import('@/pages/app/org/OrganizationSettings.vue'),
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

