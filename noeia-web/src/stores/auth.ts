import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = computed(() => !!user.value)
    const router = useRouter()

    async function login() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/app`
            }
        })
        if (error) console.error('Login error:', error)
    }

    function loginAsDoctor() {
        const mockUser = {
            id: 'test-doctor',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'doctor@noeia.com',
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            confirmation_sent_at: '',
            confirmed_at: '',
            last_sign_in_at: '',
            app_metadata: { provider: 'email', providers: ['email'], role: 'doctor' },
            user_metadata: {
                full_name: 'Dr. Sarah Connor',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                role_label: 'Doctor'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as User
        user.value = mockUser
        localStorage.setItem('mockUser', JSON.stringify(mockUser))
        router.push('/app/doctor-onboarding')
    }

    function loginAsOrganization() {
        const mockUser = {
            id: 'test-org',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'admin@clinic.com',
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            confirmation_sent_at: '',
            confirmed_at: '',
            last_sign_in_at: '',
            app_metadata: { provider: 'email', providers: ['email'], role: 'organization' },
            user_metadata: {
                full_name: 'Clinic Admin',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
                role_label: 'Organization'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as User
        user.value = mockUser
        localStorage.setItem('mockUser', JSON.stringify(mockUser))
        router.push('/app/organization-onboarding')
    }

    function loginAsClient() {
        const mockUser = {
            id: 'test-client',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'client@test.com',
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            confirmation_sent_at: '',
            confirmed_at: '',
            last_sign_in_at: '',
            app_metadata: { provider: 'email', providers: ['email'], role: 'client' },
            user_metadata: {
                full_name: 'John Doe',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                role_label: 'Client'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as User
        user.value = mockUser
        localStorage.setItem('mockUser', JSON.stringify(mockUser))
        router.push('/app/onboarding')
    }

    async function logout() {
        await supabase.auth.signOut()
        user.value = null
        localStorage.removeItem('mockUser')
        router.push('/login')
    }

    async function checkAuth() {
        // First check for mock user
        const mockUser = localStorage.getItem('mockUser')
        if (mockUser) {
            user.value = JSON.parse(mockUser)
            return
        }

        const { data: { session } } = await supabase.auth.getSession()

        user.value = session?.user || null

        supabase.auth.onAuthStateChange((_event, session) => {
            user.value = session?.user || null
            if (!session && router.currentRoute.value.meta.requiresAuth) {
                router.push('/login')
            }
        })
    }

    return {
        user,
        isAuthenticated,
        login,
        login,
        loginAsDoctor,
        loginAsOrganization,
        loginAsClient,
        logout,
        checkAuth,
    }
})
