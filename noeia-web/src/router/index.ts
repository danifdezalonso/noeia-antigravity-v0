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
            component: () => import('@/pages/public/product/ProductOverviewPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/website',
            name: 'product-website',
            component: () => import('@/pages/public/product/ProductWebsitePage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/app',
            name: 'product-app',
            component: () => import('@/pages/public/product/ProductAppPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/ai',
            name: 'product-ai',
            component: () => import('@/pages/public/product/ProductAiPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/calendar',
            name: 'product-calendar',
            component: () => import('@/pages/public/product/ProductCalendarPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/records',
            name: 'product-records',
            component: () => import('@/pages/public/product/ProductRecordsPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/offices',
            name: 'product-offices',
            component: () => import('@/pages/public/product/ProductOfficesPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/admin',
            name: 'product-admin',
            component: () => import('@/pages/public/product/ProductAdminPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/product/security',
            name: 'product-security',
            component: () => import('@/pages/public/product/ProductSecurityPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources',
            name: 'resources',
            component: () => import('@/pages/public/Resources.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources/guides',
            name: 'resources-guides',
            component: () => import('@/pages/public/resources/ResourcesGuidesPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources/updates',
            name: 'resources-updates',
            component: () => import('@/pages/public/resources/ResourcesUpdatesPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources/blog',
            name: 'resources-blog',
            component: () => import('@/pages/public/resources/ResourcesBlogPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources/help',
            name: 'resources-help',
            component: () => import('@/pages/public/resources/ResourcesHelpPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources/changelog',
            name: 'resources-changelog',
            component: () => import('@/pages/public/resources/ResourcesChangelogPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/resources/contact',
            name: 'resources-contact',
            component: () => import('@/pages/public/resources/ResourcesContactPage.vue'),
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
            path: '/for-psychologists/workflow',
            name: 'PsychologistsWorkflow',
            component: () => import('@/pages/public/psychologists/PsychologistsWorkflowPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-psychologists/records',
            name: 'PsychologistsRecords',
            component: () => import('@/pages/public/psychologists/PsychologistsRecordsPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-psychologists/ai',
            name: 'PsychologistsAi',
            component: () => import('@/pages/public/psychologists/PsychologistsAiPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-psychologists/portal',
            name: 'PsychologistsPortal',
            component: () => import('@/pages/public/psychologists/PsychologistsPortalPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-psychologists/getting-started',
            name: 'PsychologistsGettingStarted',
            component: () => import('@/pages/public/psychologists/PsychologistsGettingStartedPage.vue'),
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
            component: () => import('@/pages/public/patients/PatientsOverviewPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients/app',
            name: 'patients-app',
            component: () => import('@/pages/public/patients/PatientsAppPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients/booking',
            name: 'patients-booking',
            component: () => import('@/pages/public/patients/PatientsBookingPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients/history',
            name: 'patients-history',
            component: () => import('@/pages/public/patients/PatientsHistoryPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients/exercises',
            name: 'patients-exercises',
            component: () => import('@/pages/public/patients/PatientsExercisesPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients/privacy',
            name: 'patients-privacy',
            component: () => import('@/pages/public/patients/PatientsPrivacyPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-patients/getting-started',
            name: 'patients-getting-started',
            component: () => import('@/pages/public/patients/PatientsGettingStartedPage.vue'),
            meta: { layout: 'public' },
        },
        // For Clinics Area
        {
            path: '/for-clinics/team',
            name: 'clinics-team',
            component: () => import('@/pages/public/clinics/ClinicsTeamPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-clinics/offices',
            name: 'clinics-offices',
            component: () => import('@/pages/public/clinics/ClinicsOfficesPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-clinics/calendar',
            name: 'clinics-calendar',
            component: () => import('@/pages/public/clinics/ClinicsCalendarPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-clinics/billing',
            name: 'clinics-billing',
            component: () => import('@/pages/public/clinics/ClinicsBillingPage.vue'),
            meta: { layout: 'public' },
        },
        {
            path: '/for-clinics/onboarding',
            name: 'clinics-onboarding',
            component: () => import('@/pages/public/clinics/ClinicsOnboardingPage.vue'),
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
            name: 'app-root',
            redirect: () => {
                const authStore = useAuthStore()
                const role = authStore.user?.app_metadata?.role
                if (role === 'client') return '/app/client'
                else if (role === 'organization') return '/app/organization'
                else return '/app/doctor'
            }
        },

        // --- Doctor Routes ---
        {
            path: '/app/doctor',
            name: 'doctor-dashboard',
            component: () => import('@/pages/app/Dashboard.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/calendar',
            name: 'doctor-calendar',
            component: () => import('@/pages/app/Calendar.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/sessions',
            name: 'doctor-sessions',
            component: () => import('@/pages/app/Sessions.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/patients',
            name: 'doctor-patients',
            component: () => import('@/pages/app/Clients.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/patients/:id',
            name: 'doctor-patient-detail',
            component: () => import('@/pages/app/ClientDetail.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/messages',
            name: 'doctor-messages',
            component: () => import('@/pages/app/Messages.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/billing',
            name: 'doctor-billing',
            component: () => import('@/pages/app/Billing.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/ai',
            name: 'doctor-ai',
            component: () => import('@/pages/app/AI.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/doctor/settings',
            name: 'doctor-settings',
            component: () => import('@/pages/app/Settings.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },

        // --- Client Routes ---
        {
            path: '/app/client',
            name: 'client-dashboard',
            component: () => import('@/pages/app/Dashboard.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/calendar',
            name: 'client-calendar',
            component: () => import('@/pages/app/Calendar.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/messages',
            name: 'client-messages',
            component: () => import('@/pages/app/Messages.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/billing',
            name: 'client-billing',
            component: () => import('@/pages/app/client/ClientBilling.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/profile',
            name: 'client-profile',
            component: () => import('@/pages/app/client/ClientProfile.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/client/settings',
            name: 'client-settings',
            component: () => import('@/pages/app/Settings.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },

        // --- Organization Routes ---
        {
            path: '/app/organization',
            name: 'org-dashboard',
            component: () => import('@/pages/app/org/OrganizationDashboard.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/doctors',
            name: 'org-doctors',
            component: () => import('@/pages/app/org/OrganizationDoctors.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/patients',
            name: 'org-patients',
            component: () => import('@/pages/app/org/OrganizationPatients.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/calendar',
            name: 'org-calendar',
            component: () => import('@/pages/app/org/OrganizationCalendar.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/messages',
            name: 'org-messages',
            component: () => import('@/pages/app/Messages.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/office',
            name: 'org-office',
            component: () => import('@/pages/app/org/OrganizationOffice.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/billing',
            name: 'org-billing',
            component: () => import('@/pages/app/org/OrganizationBilling.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },
        {
            path: '/app/organization/settings',
            name: 'org-settings',
            component: () => import('@/pages/app/org/OrganizationSettings.vue'),
            meta: { requiresAuth: true, layout: 'app' },
        },

        // --- Onboarding Routes ---
        {
            path: '/app/onboarding',
            name: 'onboarding',
            component: () => import('@/pages/app/ClientOnboarding.vue'),
            meta: { requiresAuth: true, layout: 'public' },
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

