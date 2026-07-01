-- ============================================================
-- PLAY TEE TOMIC — Supabase Schema
-- Run this in the Supabase SQL Editor (once, top to bottom)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES (extends Supabase auth.users) ──────────────────
create table public.profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  name         text not null,
  username     text unique not null,
  city         text,
  bio          text,
  handicap     numeric(4,1) default 36,
  initials     text,
  color        text default 'from-brand-green to-brand-field',
  avatar_url   text,
  rounds       int default 0,
  created_at   timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, username, initials)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    split_part(new.email, '@', 1),
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 2))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── FIELDS ──────────────────────────────────────────────────
create table public.fields (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  location        text,
  holes           int default 18,
  par             int default 72,
  course_rating   numeric(4,1),
  slope           int,
  rating          numeric(3,1),
  gradient        text,
  is_partner      boolean default false,
  created_at      timestamptz default now()
);

alter table public.fields enable row level security;
create policy "Fields viewable by everyone" on public.fields for select using (true);
create policy "Only admins insert fields" on public.fields for insert with check (false);

-- ── MATCHES ─────────────────────────────────────────────────
create table public.matches (
  id            uuid primary key default uuid_generate_v4(),
  field_id      uuid references public.fields(id) on delete set null,
  creator_id    uuid references public.profiles(id) on delete cascade not null,
  date          date not null,
  tee_time      time,
  holes         int default 18,
  max_players   int default 4,
  hcp_min       numeric(4,1) default 0,
  hcp_max       numeric(4,1) default 54,
  type          text check (type in ('social','competitive','open')) default 'social',
  description   text,
  created_at    timestamptz default now()
);

alter table public.matches enable row level security;

create policy "Matches viewable by everyone" on public.matches for select using (true);
create policy "Authenticated users can create matches" on public.matches
  for insert with check (auth.uid() = creator_id);
create policy "Creator can update own match" on public.matches
  for update using (auth.uid() = creator_id);
create policy "Creator can delete own match" on public.matches
  for delete using (auth.uid() = creator_id);

-- ── MATCH PLAYERS (join table) ───────────────────────────────
create table public.match_players (
  match_id    uuid references public.matches(id) on delete cascade,
  user_id     uuid references public.profiles(id) on delete cascade,
  joined_at   timestamptz default now(),
  primary key (match_id, user_id)
);

alter table public.match_players enable row level security;
create policy "Match players viewable by everyone" on public.match_players for select using (true);
create policy "Users can join matches" on public.match_players
  for insert with check (auth.uid() = user_id);
create policy "Users can leave matches" on public.match_players
  for delete using (auth.uid() = user_id);

-- ── POSTS ───────────────────────────────────────────────────
create table public.posts (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete cascade not null,
  text            text not null,
  image_gradient  text,
  likes           int default 0,
  comments        int default 0,
  scorecard       jsonb,
  created_at      timestamptz default now()
);

alter table public.posts enable row level security;
create policy "Posts viewable by everyone" on public.posts for select using (true);
create policy "Authenticated users can post" on public.posts
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own posts" on public.posts
  for delete using (auth.uid() = user_id);

-- ── POST LIKES ───────────────────────────────────────────────
create table public.post_likes (
  post_id     uuid references public.posts(id) on delete cascade,
  user_id     uuid references public.profiles(id) on delete cascade,
  created_at  timestamptz default now(),
  primary key (post_id, user_id)
);

alter table public.post_likes enable row level security;
create policy "Likes viewable by everyone" on public.post_likes for select using (true);
create policy "Users can like posts" on public.post_likes
  for insert with check (auth.uid() = user_id);
create policy "Users can unlike posts" on public.post_likes
  for delete using (auth.uid() = user_id);

-- Increment/decrement likes counter
create or replace function public.handle_like_insert()
returns trigger as $$
begin
  update public.posts set likes = likes + 1 where id = new.post_id;
  return new;
end;
$$ language plpgsql security definer;

create or replace function public.handle_like_delete()
returns trigger as $$
begin
  update public.posts set likes = greatest(likes - 1, 0) where id = old.post_id;
  return old;
end;
$$ language plpgsql security definer;

create trigger on_like_insert after insert on public.post_likes
  for each row execute function public.handle_like_insert();
create trigger on_like_delete after delete on public.post_likes
  for each row execute function public.handle_like_delete();

-- ── SCORECARDS ───────────────────────────────────────────────
create table public.scorecards (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.profiles(id) on delete cascade not null,
  field_id      uuid references public.fields(id) on delete set null,
  field_name    text,
  date          date default current_date,
  scores        int[] not null,
  pars          int[],
  gross         int,
  stableford    int,
  created_at    timestamptz default now()
);

alter table public.scorecards enable row level security;
create policy "Users can view own scorecards" on public.scorecards
  for select using (auth.uid() = user_id);
create policy "Users can insert own scorecards" on public.scorecards
  for insert with check (auth.uid() = user_id);

-- ── NOTIFICATIONS ────────────────────────────────────────────
create table public.notifications (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.profiles(id) on delete cascade not null,
  from_user_id  uuid references public.profiles(id) on delete set null,
  type          text not null,
  message       text not null,
  read          boolean default false,
  created_at    timestamptz default now()
);

alter table public.notifications enable row level security;
create policy "Users see own notifications" on public.notifications
  for select using (auth.uid() = user_id);
create policy "Users can mark own notifications read" on public.notifications
  for update using (auth.uid() = user_id);

-- ── SEED: FIELDS ────────────────────────────────────────────
insert into public.fields (name, location, holes, par, course_rating, slope, rating, gradient, is_partner) values
  ('Real Club de Golf de Sevilla',   'Sevilla, Andalucía',      18, 72, 73.5, 135, 4.9, 'from-amber-900 via-green-800 to-green-600', true),
  ('Club de Golf Costa del Sol',     'Málaga, Andalucía',       18, 72, 72.1, 128, 4.8, 'from-teal-900 via-green-700 to-cyan-600',   true),
  ('Real Club de Golf El Prat',      'Barcelona, Cataluña',     18, 72, 74.2, 141, 4.7, 'from-indigo-900 via-blue-800 to-green-700', true),
  ('Club de Golf La Moraleja',       'Madrid',                  18, 72, 73.8, 137, 4.9, 'from-red-900 via-amber-800 to-green-700',   true),
  ('Real Club de Golf Las Palmas',   'Las Palmas, Canarias',    18, 71, 70.5, 124, 4.6, 'from-gray-900 via-green-900 to-green-600',  true),
  ('Club de Golf Neguri',            'Bilbao, País Vasco',      18, 70, 69.8, 122, 4.5, 'from-slate-800 via-green-800 to-green-500', false),
  ('Club de Golf Valderrama',        'Sotogrande, Andalucía',   18, 71, 75.7, 147, 5.0, 'from-green-950 via-green-800 to-emerald-600', true),
  ('Real Club de Golf de Pedreña',   'Pedreña, Cantabria',      18, 71, 71.2, 130, 4.8, 'from-slate-900 via-teal-800 to-green-600',  true);
