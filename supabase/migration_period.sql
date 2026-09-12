-- Migrație: schimbă memberships.year (integer) → memberships.period (text)
-- Rulează în Supabase Dashboard → SQL Editor

-- 1. Adaugă coloana nouă
alter table public.memberships add column period text;

-- 2. Migrează datele existente (dacă există)
update public.memberships
set period = year::text || '-01'
where period is null;

-- 3. Setează NOT NULL
alter table public.memberships alter column period set not null;

-- 4. Șterge constrângerea unică veche
alter table public.memberships drop constraint memberships_organization_id_year_key;

-- 5. Șterge coloana veche
alter table public.memberships drop column year;

-- 6. Adaugă constrângerea unică nouă
alter table public.memberships add constraint memberships_organization_id_period_key unique (organization_id, period);
