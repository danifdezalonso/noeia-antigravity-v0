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

    function bypassLogin() {
        user.value = {
            id: 'dev-user',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'dev@noeia.com',
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            confirmation_sent_at: '',
            confirmed_at: '',
            last_sign_in_at: '',
            app_metadata: { provider: 'email', providers: ['email'] },
            user_metadata: {
                full_name: 'Dev User',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as User
        router.push('/app')
    }

    function loginAsClient() {
        user.value = {
            id: 'test-client',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'client@test.com',
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            confirmation_sent_at: '',
            confirmed_at: '',
            last_sign_in_at: '',
            app_metadata: { provider: 'email', providers: ['email'] },
            user_metadata: {
                full_name: 'Sarah Connor',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as User
        // Ideally redirect to a client portal, but for now app is fine or maybe we need a client view?
        // For this task, let's assume they go to the same app but maybe see different things?
        // Or just redirect to /app for now.
        router.push('/app')
    }

    async function logout() {
        await supabase.auth.signOut()
        user.value = null
        router.push('/login')
    }

    async function checkAuth() {
        // If we already have a user (e.g. from bypass), don't overwrite with null session
        if (user.value?.id === 'dev-user') return

        const { data: { session } } = await supabase.auth.getSession()

        // Check again in case bypass was clicked during await
        if (user.value?.id === 'dev-user') return

        user.value = session?.user || null

        supabase.auth.onAuthStateChange((_event, session) => {
            // Don't kick out the dev user
            if (user.value?.id === 'dev-user') return

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
        bypassLogin,
        loginAsClient,
        logout,
        checkAuth,
    }
})
