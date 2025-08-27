-- Organizations (tenants)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- Users (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  role text check (role in ('admin','recruiter','hiring_manager','viewer')) default 'viewer',
  full_name text,
  created_at timestamptz not null default now()
);

-- Jobs
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text not null,
  location text,
  employment_type text,
  salary_min numeric,
  salary_max numeric,
  skills text[] default '{}',
  status text check (status in ('draft','published','closed')) default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Candidates
create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  location text,
  resume_url text,
  linkedin_url text,
  github_url text,
  years_experience numeric,
  education text,
  skills text[] default '{}',
  created_at timestamptz not null default now(),
  unique (organization_id, email)
);

-- Applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  source text,
  status text check (status in ('new','screening','assessment','interview','offer','hired','rejected')) default 'new',
  match_score numeric,
  stage_position int default 0,
  created_at timestamptz not null default now(),
  unique (job_id, candidate_id)
);

-- Parsed resumes
create table if not exists public.parsed_resumes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  candidate_id uuid references public.candidates(id) on delete cascade,
  file_path text not null,
  provider text not null,
  raw jsonb not null,
  extracted jsonb not null,
  created_at timestamptz not null default now()
);

-- Scoring history
create table if not exists public.scoring_history (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  score numeric not null,
  breakdown jsonb not null,
  weights jsonb not null,
  created_at timestamptz not null default now()
);

-- Saved filter presets
create table if not exists public.filter_presets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  query jsonb not null,
  is_shared boolean default false,
  created_at timestamptz not null default now()
);

-- Audit logs
create table if not exists public.audit_logs (
  id bigserial primary key,
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text,
  entity_id text,
  ip text,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;
create policy "tenant isolated read audit" on public.audit_logs
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = audit_logs.organization_id
  ));

-- RLS
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.candidates enable row level security;
alter table public.applications enable row level security;
alter table public.parsed_resumes enable row level security;
alter table public.scoring_history enable row level security;
alter table public.filter_presets enable row level security;

create policy "profiles are viewable by user" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles are insertable by user" on public.profiles
  for insert with check (auth.uid() = id);

create policy "tenant isolated read" on public.jobs
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = jobs.organization_id
  ));

create policy "tenant isolated write" on public.jobs
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = organization_id
  ));

create policy "tenant isolated read candidates" on public.candidates
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = candidates.organization_id
  ));

create policy "tenant isolated read applications" on public.applications
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = applications.organization_id
  ));

create policy "tenant isolated read parsed" on public.parsed_resumes
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = parsed_resumes.organization_id
  ));

create policy "tenant isolated write parsed" on public.parsed_resumes
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = organization_id
  ));

create policy "tenant isolated read scoring" on public.scoring_history
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = scoring_history.organization_id
  ));

create policy "tenant isolated write scoring" on public.scoring_history
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = organization_id
  ));

create policy "tenant isolated read presets" on public.filter_presets
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = filter_presets.organization_id
  ));

create policy "tenant isolated write presets" on public.filter_presets
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.organization_id = organization_id
  ));

