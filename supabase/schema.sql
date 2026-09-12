-- PFPSS Schema — Membri + Cotizație + Documente + Petiții
-- Rulează în Supabase Dashboard → SQL Editor

-- ============================================================================
-- ENUMS
-- ============================================================================
create type organization_status as enum ('pending', 'approved', 'rejected', 'suspended');
create type membership_status as enum ('unpaid', 'paid', 'overdue');
create type document_category as enum ('cod-etic', 'ghid', 'model', 'raport', 'regulament');
create type user_role as enum ('applicant', 'member', 'admin');

-- ============================================================================
-- PROFILES (1:1 cu auth.users)
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role user_role not null default 'applicant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- ORGANIZATIONS (datele organizației membru)
-- ============================================================================
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,

  -- Date legale
  legal_name text not null,
  cui text,
  registration_number text,
  legal_form text, -- SRL, SA, ONG, etc.

  -- Contact
  contact_name text not null,
  contact_email text not null,
  contact_phone text,

  -- Adresă
  county text,
  city text,
  address text,

  -- Servicii
  service_type text, -- rezidențial, zi, mobilă
  license_number text,
  license_expiry date,
  accreditation_number text,
  capacity integer,

  -- Status
  status organization_status not null default 'pending',
  rejection_reason text,
  approved_at timestamptz,
  approved_by uuid references public.profiles(id),

  -- Stripe
  stripe_customer_id text,

  -- Metadata
  description text,
  website text,
  logo_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- MEMBERSHIPS (cotizație lunară)
-- ============================================================================
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  period text not null, -- format: "2026-09"
  amount_cents integer not null,
  status membership_status not null default 'unpaid',
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  invoice_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  unique (organization_id, period)
);

-- ============================================================================
-- DOCUMENTS (resurse private pentru membri)
-- ============================================================================
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category document_category not null default 'ghid',
  file_url text not null,
  file_size bigint,
  members_only boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- PETITIONS_SIGNATURES (semnături petiții de la membri)
-- ============================================================================
create table public.petitions_signatures (
  id uuid primary key default gen_random_uuid(),
  petition_slug text not null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  signed_at timestamptz not null default now(),
  unique (petition_slug, organization_id)
);

-- ============================================================================
-- TRIGGERS — auto-create profile pe signup
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- UPDATED_AT triggers
-- ============================================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger organizations_updated_at
  before update on public.organizations
  for each row execute function public.handle_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Profiles: user vede doar propriul profil; admin vede tot
alter table public.profiles enable row level security;

create policy "profiles_self_select"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_self_update"
  on public.profiles for update
  using (auth.uid() = id);

-- Organizations: user vede propria organizație; admin vede tot
alter table public.organizations enable row level security;

create policy "org_self_select"
  on public.organizations for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "org_self_insert"
  on public.organizations for insert
  with check (auth.uid() = user_id);

create policy "org_self_update"
  on public.organizations for update
  using (auth.uid() = user_id);

-- Memberships: user vede propria cotizație; admin vede tot
alter table public.memberships enable row level security;

create policy "membership_self_select"
  on public.memberships for select
  using (
    exists (
      select 1 from public.organizations
      where id = organization_id and user_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "membership_self_insert"
  on public.memberships for insert
  with check (
    exists (
      select 1 from public.organizations
      where id = organization_id and user_id = auth.uid()
    )
  );

create policy "membership_self_update"
  on public.memberships for update
  using (
    exists (
      select 1 from public.organizations
      where id = organization_id and user_id = auth.uid()
    )
  );

-- Documents: membri și admin văzi tot; publicul vede doar cele non-members
alter table public.documents enable row level security;

create policy "docs_public_select"
  on public.documents for select
  using (
    members_only = false
    or exists (
      select 1 from public.organizations
      where user_id = auth.uid() and status = 'approved'
    )
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "docs_admin_insert"
  on public.documents for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "docs_admin_update"
  on public.documents for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "docs_admin_delete"
  on public.documents for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Petitions signatures: membri pot semna; toți membrii pot vedea
alter table public.petitions_signatures enable row level security;

create policy "petitions_member_select"
  on public.petitions_signatures for select
  using (
    exists (
      select 1 from public.organizations
      where user_id = auth.uid() and status = 'approved'
    )
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "petitions_member_insert"
  on public.petitions_signatures for insert
  with check (
    exists (
      select 1 from public.organizations
      where id = organization_id and user_id = auth.uid() and status = 'approved'
    )
  );

-- ============================================================================
-- HELPER: check if current user is admin
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================================
-- SEED: documente demo
-- ============================================================================
insert into public.documents (title, description, category, file_url, members_only) values
  ('Cod Etic PFPSS 2026', 'Codul de etică al Patronatului Furnizorilor Privați de Servicii Sociale', 'cod-etic', '/documents/cod-etic-2026.pdf', true),
  ('Ghid de acreditare 2026', 'Ghidul complet pentru procesul de acreditare și recertificare', 'ghid', '/documents/ghid-acreditare-2026.pdf', true),
  ('Model cerere licență', 'Model de cerere pentru obținerea licenței de funcționare', 'model', '/documents/model-cerere-licenta.pdf', true),
  ('Raport anual 2025', 'Raportul anual de activitate al PFPSS', 'raport', '/documents/raport-anual-2025.pdf', true),
  ('Statutul PFPSS', 'Statutul actualizat al patronatului', 'regulament', '/documents/statut-pfpss.pdf', true)
on conflict do nothing;
