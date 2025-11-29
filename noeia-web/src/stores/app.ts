import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase'

// --- Interfaces (Frontend) ---

export interface Client {
    id: string
    name: string
    email: string
    phone: string
    dob: string
    status: 'Active' | 'Inactive'
    related: string
    avatar: string
}

export interface Professional {
    id: string
    name: string
    role: string
    avatar: string
}

export interface Session {
    id: string
    title: string
    clientId: string
    professionalId: string
    start: string // ISO string
    end: string // ISO string
    status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'
    fee: number
    invoiceId?: string
    notes?: string
    color?: string // New field for custom colors
    type?: string // e.g. 'Session', 'Consultation'
}

export interface Invoice {
    id: string
    clientId: string
    professionalId: string
    date: string
    dueDate: string
    items: Array<{ description: string; amount: number }>
    status: 'Paid' | 'Pending' | 'Overdue' | 'Draft'
    total: number
    displayId?: string // Computed frontend ID
}

// --- Store ---

export const useAppStore = defineStore('app', () => {
    // --- State ---
    const professionals = ref<Professional[]>([])
    const clients = ref<Client[]>([])
    const sessions = ref<Session[]>([])
    const invoices = ref<Invoice[]>([])

    // Mock Org ID for now (should come from auth/context)
    const ORGANIZATION_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'

    // --- Getters ---

    const getClientById = (id: string) => clients.value.find(c => c.id === id)
    const getProfessionalById = (id: string) => professionals.value.find(p => p.id === id)
    const getInvoiceById = (id: string) => invoices.value.find(i => i.id === id)

    const enrichedSessions = computed(() => {
        return sessions.value.map(session => {
            const client = getClientById(session.clientId)
            const professional = getProfessionalById(session.professionalId)
            return {
                ...session,
                clientName: client?.name || 'Unknown',
                clientAvatar: client?.avatar,
                professionalName: professional?.name || 'Unknown'
            }
        })
    })

    const enrichedInvoices = computed(() => {
        return invoices.value.map(invoice => {
            const client = getClientById(invoice.clientId)
            const professional = getProfessionalById(invoice.professionalId)
            const clientNameSlug = client?.name.replace(/\s+/g, '') || 'Unknown'
            const displayId = `INV_${clientNameSlug}_${invoice.date}`

            return {
                ...invoice,
                clientName: client?.name || 'Unknown',
                professionalName: professional?.name || 'Unknown',
                displayId
            }
        })

    })

    // --- Actions ---

    async function fetchAll() {
        console.log('Fetching all data...')
        await Promise.all([
            fetchProfessionals(),
            fetchClients(),
            fetchSessions(),
            fetchInvoices()
        ])
        console.log('All data fetched')
    }

    async function fetchProfessionals() {
        const { data, error } = await supabase
            .from('professionals')
            .select('*')
            .eq('organization_id', ORGANIZATION_ID)

        if (error) console.error('Error fetching professionals:', error)
        else if (data) {
            console.log('Professionals fetched:', data.length)
            professionals.value = data.map(p => ({
                id: p.id,
                name: p.name,
                role: p.role,
                avatar: p.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`
            }))
        }
    }

    async function fetchClients() {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('organization_id', ORGANIZATION_ID)

        if (error) console.error('Error fetching clients:', error)
        else if (data) {
            console.log('Clients fetched:', data.length)
            clients.value = data.map(c => ({
                id: c.id,
                name: c.name,
                email: c.email,
                phone: c.phone,
                dob: c.dob,
                status: c.status as any,
                related: c.related,
                avatar: c.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`
            }))
        }
    }

    async function fetchSessions() {
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .eq('organization_id', ORGANIZATION_ID)

        if (error) console.error('Error fetching sessions:', error)
        else if (data) {
            console.log('Sessions fetched:', data.length)
            sessions.value = data.map(s => ({
                id: s.id,
                title: s.title,
                clientId: s.client_id,
                professionalId: s.professional_id,
                start: s.start_time,
                end: s.end_time,
                status: s.status as any,
                fee: s.fee,
                invoiceId: s.invoice_id,
                notes: s.notes,
                color: s.color, // Assuming DB might have it, or we handle it locally
                type: s.type || 'Session'
            }))
        }
    }

    async function fetchInvoices() {
        const { data, error } = await supabase
            .from('invoices')
            .select('*, invoice_items(*)')
            .eq('organization_id', ORGANIZATION_ID)

        if (error) console.error('Error fetching invoices:', error)
        else if (data) {
            console.log('Invoices fetched:', data.length)
            invoices.value = data.map(i => ({
                id: i.id,
                clientId: i.client_id,
                professionalId: i.professional_id,
                date: i.date,
                dueDate: i.due_date,
                status: i.status as any,
                total: i.total,
                items: i.invoice_items.map((item: any) => ({
                    description: item.description,
                    amount: item.amount
                }))
            }))
        }
    }

    async function addClient(client: Omit<Client, 'id' | 'avatar'>) {
        const { data, error } = await supabase
            .from('clients')
            .insert({
                organization_id: ORGANIZATION_ID,
                name: client.name,
                email: client.email,
                phone: client.phone,
                dob: client.dob,
                status: client.status,
                related: client.related
            })
            .select()
            .single()

        if (error) {
            console.error('Error adding client:', error)
            throw error
        } else if (data) {
            const newClient: Client = {
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                status: data.status as any,
                related: data.related,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
            }
            clients.value.push(newClient)
            return newClient.id
        }
    }

    async function addSession(session: Omit<Session, 'id'>) {
        console.log('addSession called with:', session)
        const payload = {
            organization_id: ORGANIZATION_ID,
            title: session.title,
            client_id: session.clientId || null,
            professional_id: session.professionalId || null, // Ensure null if undefined
            start_time: session.start,
            end_time: session.end,
            status: session.status,
            fee: session.fee,
            notes: session.notes
            // type: session.type // Column does not exist in DB yet
        }
        console.log('Supabase insert payload:', payload)

        const { data, error } = await supabase
            .from('sessions')
            .insert(payload)
            .select()
            .single()

        if (error) {
            console.error('Error adding session:', error)
            throw error
        } else if (data) {
            const newSession: Session = {
                id: data.id,
                title: data.title,
                clientId: data.client_id,
                professionalId: data.professional_id,
                start: data.start_time,
                end: data.end_time,
                status: data.status as any,
                fee: data.fee,
                notes: data.notes,
                invoiceId: data.invoice_id,
                type: session.type || 'Session', // Use local value as DB doesn't return it
                color: session.color // Persist color locally at least
            }
            sessions.value.push(newSession)
            return newSession.id
        }
    }

    async function createInvoice(invoice: Omit<Invoice, 'id'>) {
        // 1. Create Invoice
        const { data: invoiceData, error: invoiceError } = await supabase
            .from('invoices')
            .insert({
                organization_id: ORGANIZATION_ID,
                client_id: invoice.clientId,
                professional_id: invoice.professionalId,
                date: invoice.date,
                due_date: invoice.dueDate,
                status: invoice.status,
                total: invoice.total
            })
            .select()
            .single()

        if (invoiceError) {
            console.error('Error creating invoice:', invoiceError)
            throw invoiceError
        }

        // 2. Create Invoice Items
        if (invoice.items.length > 0) {
            const itemsToInsert = invoice.items.map(item => ({
                invoice_id: invoiceData.id,
                description: item.description,
                amount: item.amount
            }))

            const { error: itemsError } = await supabase
                .from('invoice_items')
                .insert(itemsToInsert)

            if (itemsError) console.error('Error creating invoice items:', itemsError)
        }

        // 3. Update local state
        const newInvoice: Invoice = {
            id: invoiceData.id,
            clientId: invoiceData.client_id,
            professionalId: invoiceData.professional_id,
            date: invoiceData.date,
            dueDate: invoiceData.due_date,
            status: invoiceData.status as any,
            total: invoiceData.total,
            items: invoice.items
        }
        invoices.value.push(newInvoice)
        return newInvoice.id
    }

    async function updateInvoice(id: string, updates: Partial<Invoice>) {
        // This is a simplified update, mostly for status or basic fields.
        // Updating items would require more complex logic (delete/insert).

        const dbUpdates: any = {}
        if (updates.status) dbUpdates.status = updates.status
        if (updates.date) dbUpdates.date = updates.date
        if (updates.dueDate) dbUpdates.due_date = updates.dueDate
        if (updates.total) dbUpdates.total = updates.total

        const { error } = await supabase
            .from('invoices')
            .update(dbUpdates)
            .eq('id', id)

        if (error) {
            console.error('Error updating invoice:', error)
        } else {
            const index = invoices.value.findIndex(i => i.id === id)
            if (index !== -1) {
                invoices.value[index] = { ...invoices.value[index], ...updates } as Invoice
            }
        }
    }

    async function completeSession(sessionId: string, notes: string, finalFee: number) {
        const sessionIndex = sessions.value.findIndex(s => s.id === sessionId)
        if (sessionIndex === -1) return

        const session = sessions.value[sessionIndex]
        if (!session) return

        // 1. Create Invoice
        // Generate custom ID for display (computed in getter), but we use UUID for DB.
        const dateStr = new Date().toISOString().split('T')[0] || ''

        const invoiceId = await createInvoice({
            clientId: session.clientId,
            professionalId: session.professionalId,
            date: dateStr,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || '',
            items: [{ description: session.title, amount: finalFee }],
            status: 'Draft',
            total: finalFee
        })

        // 2. Update Session
        const { error } = await supabase
            .from('sessions')
            .update({
                status: 'Completed',
                fee: finalFee,
                notes: notes,
                invoice_id: invoiceId
            })
            .eq('id', sessionId)

        if (error) {
            console.error('Error completing session:', error)
        } else {
            sessions.value[sessionIndex] = {
                ...session,
                status: 'Completed',
                fee: finalFee,
                notes,
                invoiceId
            }
        }

        return invoiceId
    }

    async function updateSessionNotes(sessionId: string, notes: string) {
        const { error } = await supabase
            .from('sessions')
            .update({ notes })
            .eq('id', sessionId)

        if (error) {
            console.error('Error updating session notes:', error)
            throw error
        } else {
            const session = sessions.value.find(s => s.id === sessionId)
            if (session) {
                session.notes = notes
            }
        }
    }

    async function deleteSession(sessionId: string) {
        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', sessionId)

        if (error) {
            console.error('Error deleting session:', error)
            throw error
        } else {
            sessions.value = sessions.value.filter(s => s.id !== sessionId)
        }
    }

    async function updateSessionColor(sessionId: string, color: string) {
        // Optimistic update
        const session = sessions.value.find(s => s.id === sessionId)
        if (session) {
            session.color = color
        }
    }

    return {
        clients,
        professionals,
        sessions,
        invoices,
        enrichedSessions,
        enrichedInvoices,
        getClientById,
        getProfessionalById,
        getInvoiceById,
        fetchAll,
        fetchClients,
        fetchSessions,
        fetchInvoices,
        addClient,
        addSession,
        createInvoice,
        updateInvoice,
        completeSession,
        updateSessionNotes,
        deleteSession,
        updateSessionColor
    }
})
