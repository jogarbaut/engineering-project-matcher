-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table (extends auth.users)
create table public.users (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  full_name text,
  years_of_experience integer check (years_of_experience >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create teams table
create table public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_by uuid not null references public.users on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create team_members junction table
create type team_member_role as enum ('owner', 'admin', 'member');

create table public.team_members (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references public.teams on delete cascade,
  user_id uuid not null references public.users on delete cascade,
  role team_member_role not null default 'member',
  joined_at timestamptz not null default now(),
  unique(team_id, user_id)
);

-- Create licenses table
create table public.licenses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  license_type text not null,
  created_at timestamptz not null default now()
);

-- Create user_licenses junction table
create table public.user_licenses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users on delete cascade,
  license_id uuid not null references public.licenses on delete cascade,
  license_number text not null,
  state text not null,
  expiration_date date,
  created_at timestamptz not null default now(),
  unique(user_id, license_id, state)
);

-- Create projects table
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  start_date date,
  end_date date,
  project_value numeric(15, 2),
  client_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create user_projects junction table
create table public.user_projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users on delete cascade,
  project_id uuid not null references public.projects on delete cascade,
  role text,
  created_at timestamptz not null default now(),
  unique(user_id, project_id)
);

-- Create rfps table
create table public.rfps (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  agency_name text,
  due_date timestamptz,
  estimated_value numeric(15, 2),
  required_licenses text[],
  location text,
  scraped_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create rfp_matches table
create table public.rfp_matches (
  id uuid primary key default uuid_generate_v4(),
  rfp_id uuid not null references public.rfps on delete cascade,
  team_id uuid references public.teams on delete cascade,
  user_id uuid references public.users on delete cascade,
  match_score numeric(5, 2) check (match_score >= 0 and match_score <= 100),
  matching_criteria jsonb,
  created_at timestamptz not null default now(),
  check (
    (team_id is not null and user_id is null) or
    (team_id is null and user_id is not null)
  )
);

-- Create indexes for common queries
create index idx_team_members_team_id on public.team_members(team_id);
create index idx_team_members_user_id on public.team_members(user_id);
create index idx_user_licenses_user_id on public.user_licenses(user_id);
create index idx_user_projects_user_id on public.user_projects(user_id);
create index idx_user_projects_project_id on public.user_projects(project_id);
create index idx_rfps_due_date on public.rfps(due_date);
create index idx_rfp_matches_rfp_id on public.rfp_matches(rfp_id);
create index idx_rfp_matches_team_id on public.rfp_matches(team_id);
create index idx_rfp_matches_user_id on public.rfp_matches(user_id);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at columns
create trigger set_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.teams
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.rfps
  for each row
  execute function public.handle_updated_at();

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.licenses enable row level security;
alter table public.user_licenses enable row level security;
alter table public.projects enable row level security;
alter table public.user_projects enable row level security;
alter table public.rfps enable row level security;
alter table public.rfp_matches enable row level security;

-- Create RLS policies (basic - can be refined later)
-- Users can read their own data
create policy "Users can read own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own data"
  on public.users for update
  using (auth.uid() = id);

-- Team members can read their team data
create policy "Team members can read team data"
  on public.teams for select
  using (
    exists (
      select 1 from public.team_members
      where team_id = teams.id and user_id = auth.uid()
    )
  );

-- Team owners can update team data
create policy "Team owners can update team data"
  on public.teams for update
  using (
    exists (
      select 1 from public.team_members
      where team_id = teams.id and user_id = auth.uid() and role = 'owner'
    )
  );

-- All authenticated users can read licenses
create policy "Authenticated users can read licenses"
  on public.licenses for select
  to authenticated
  using (true);

-- All authenticated users can read RFPs
create policy "Authenticated users can read rfps"
  on public.rfps for select
  to authenticated
  using (true);

-- Users can read their own matches and their team's matches
create policy "Users can read own matches"
  on public.rfp_matches for select
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.team_members
      where team_id = rfp_matches.team_id and user_id = auth.uid()
    )
  );

-- INSERT policies
-- Users can create their own profile
create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Authenticated users can create teams
create policy "Authenticated users can create teams"
  on public.teams for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Team owners and admins can add team members
create policy "Team owners and admins can add members"
  on public.team_members for insert
  with check (
    exists (
      select 1 from public.team_members
      where team_id = team_members.team_id
        and user_id = auth.uid()
        and role in ('owner', 'admin')
    )
  );

-- Team members can read their team membership
create policy "Users can read team memberships"
  on public.team_members for select
  using (
    user_id = auth.uid() or
    exists (
      select 1 from public.team_members tm
      where tm.team_id = team_members.team_id and tm.user_id = auth.uid()
    )
  );

-- Users can add their own licenses
create policy "Users can insert own licenses"
  on public.user_licenses for insert
  with check (auth.uid() = user_id);

-- Users can read their own licenses
create policy "Users can read own licenses"
  on public.user_licenses for select
  using (auth.uid() = user_id);

-- Users can update their own licenses
create policy "Users can update own licenses"
  on public.user_licenses for update
  using (auth.uid() = user_id);

-- Users can delete their own licenses
create policy "Users can delete own licenses"
  on public.user_licenses for delete
  using (auth.uid() = user_id);

-- Users can create projects
create policy "Users can create projects"
  on public.projects for insert
  to authenticated
  with check (true);

-- Users can read projects they're associated with
create policy "Users can read associated projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.user_projects
      where project_id = projects.id and user_id = auth.uid()
    )
  );

-- Users can update projects they're associated with
create policy "Users can update associated projects"
  on public.projects for update
  using (
    exists (
      select 1 from public.user_projects
      where project_id = projects.id and user_id = auth.uid()
    )
  );

-- Users can add themselves to projects
create policy "Users can add project associations"
  on public.user_projects for insert
  with check (
    auth.uid() = user_id or
    exists (
      select 1 from public.user_projects up
      where up.project_id = user_projects.project_id and up.user_id = auth.uid()
    )
  );

-- Users can read project associations
create policy "Users can read project associations"
  on public.user_projects for select
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.user_projects up
      where up.project_id = user_projects.project_id and up.user_id = auth.uid()
    )
  );
