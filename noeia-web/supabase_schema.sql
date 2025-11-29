  -- Enable UUID extension
  create extension if not exists "uuid-ossp";

  -- Drop existing tables to ensure clean setup
  drop table if exists public.invoice_items cascade;
  drop table if exists public.sessions cascade;
  drop table if exists public.invoices cascade;
  drop table if exists public.clients cascade;
  drop table if exists public.professionals cascade;
  drop table if exists public.organizations cascade;

  -- Organizations Table
  create table public.organizations (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    plan text default 'Free',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Professionals Table (linked to auth.users)
  create table public.professionals (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id),
    organization_id uuid references public.organizations(id),
    name text not null,
    role text default 'Psychologist',
    avatar text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Clients Table
  create table public.clients (
    id uuid default uuid_generate_v4() primary key,
    organization_id uuid references public.organizations(id),
    name text not null,
    email text,
    phone text,
    dob date,
    status text default 'Active',
    related text,
    avatar text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Invoices Table
  create table public.invoices (
    id uuid default uuid_generate_v4() primary key,
    organization_id uuid references public.organizations(id),
    client_id uuid references public.clients(id),
    professional_id uuid references public.professionals(id),
    date date not null,
    due_date date,
    status text default 'Draft',
    total numeric default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Sessions Table
  create table public.sessions (
    id uuid default uuid_generate_v4() primary key,
    organization_id uuid references public.organizations(id),
    client_id uuid references public.clients(id),
    professional_id uuid references public.professionals(id),
    title text not null,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    status text default 'Confirmed',
    fee numeric default 0,
    notes text,
    type text default 'Session',
    color text,
    invoice_id uuid references public.invoices(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Invoice Items Table
  create table public.invoice_items (
    id uuid default uuid_generate_v4() primary key,
    invoice_id uuid references public.invoices(id) on delete cascade,
    description text not null,
    amount numeric not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- RLS Policies (Simple version: allow all for authenticated users for now)
  alter table public.organizations enable row level security;
  alter table public.professionals enable row level security;
  alter table public.clients enable row level security;
  alter table public.sessions enable row level security;
  alter table public.invoices enable row level security;
  alter table public.invoice_items enable row level security;

  create policy "Enable read access for all users" on public.organizations for select using (true);
  create policy "Enable insert access for all users" on public.organizations for insert with check (true);

  create policy "Enable all access for all users" on public.professionals for all using (true);
  create policy "Enable all access for all users" on public.clients for all using (true);
  create policy "Enable all access for all users" on public.sessions for all using (true);
  create policy "Enable all access for all users" on public.invoices for all using (true);
  create policy "Enable all access for all users" on public.invoice_items for all using (true);

  -- Insert Mock Organization and Professional
  insert into public.organizations (id, name, plan)
  values ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Demo Org', 'Pro');

  insert into public.professionals (id, organization_id, name, role, avatar)
  values 
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dr. Smith', 'Psychologist', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dr. Jones', 'Psychiatrist', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jones');

  -- Insert Mock Clients
  insert into public.clients (id, organization_id, name, email, phone, dob, status, related, avatar)
  values
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Sarah Johnson', 'sarah.j@example.com', '+34 612 345 678', '1990-05-15', 'Active', 'None', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Michael Chen', 'm.chen@example.com', '+34 623 456 789', '1985-11-20', 'Active', 'Emma Davis (Partner)', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Emma Davis', 'emma.d@example.com', '+34 634 567 890', '1988-03-10', 'Inactive', 'Michael Chen (Partner)', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'James Wilson', 'j.wilson@example.com', '+34 645 678 901', '1995-07-25', 'Active', 'None', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James');

  -- Insert Mock Invoices
  insert into public.invoices (id, organization_id, client_id, professional_id, date, due_date, status, total)
  values
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '2025-10-01', '2025-10-15', 'Paid', 120),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '2025-09-28', '2025-10-12', 'Pending', 150);

  -- Insert Mock Invoice Items
  insert into public.invoice_items (id, invoice_id, description, amount)
  values
  (uuid_generate_v4(), 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Therapy Session (50m)', 120),
  (uuid_generate_v4(), 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Initial Consultation (60m)', 150);

  -- Insert Mock Sessions
  insert into public.sessions (id, organization_id, client_id, professional_id, title, start_time, end_time, status, fee, notes, type, color, invoice_id)
  values
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Therapy Session', now() + interval '1 day' + interval '10 hours', now() + interval '1 day' + interval '10 hours 50 minutes', 'Confirmed', 120, 'Regular session', 'Session', null, 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Initial Consultation', now() + interval '2 days' + interval '14 hours', now() + interval '2 days' + interval '15 hours', 'Pending', 150, 'First time visit', 'Consultation', null, 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Follow-up', now() - interval '1 day' + interval '16 hours 30 minutes', now() - interval '1 day' + interval '17 hours 20 minutes', 'Completed', 120, 'Follow up on progress', 'Session', null, null),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Therapy Session', now() + interval '3 days' + interval '11 hours', now() + interval '3 days' + interval '11 hours 50 minutes', 'Confirmed', 120, null, 'Session', null, null);
