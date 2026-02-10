create extension if not exists "pgcrypto";

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  role text not null default 'student' check (role in ('student','admin','maintenance')),
  created_at timestamptz not null default now()
);

create table if not exists restroom_reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete set null,
  building text not null,
  floor text not null,
  cleanliness smallint not null check (cleanliness between 1 and 5),
  smell smallint not null check (smell between 1 and 5),
  supplies smallint not null check (supplies between 1 and 5),
  maintenance smallint not null check (maintenance between 1 and 5),
  status text not null check (status in ('Clean','Okay','Dirty','Avoid')),
  comment text not null,
  photo_url text,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  meeting_time text not null,
  location text not null,
  contact_email text not null,
  created_at timestamptz not null default now()
);

create table if not exists club_follows (
  club_id uuid references clubs(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (club_id, student_id)
);

create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references students(id),
  title text not null,
  category text not null check (category in ('announcement','event','alert')),
  content text not null,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text,
  details text
);

create table if not exists safety_guides (
  id uuid primary key default gen_random_uuid(),
  guide_type text not null unique,
  instructions text[] not null,
  last_updated timestamptz not null default now()
);

create table if not exists map_locations (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  location_type text not null,
  floor text not null,
  meta jsonb not null default '{}'::jsonb
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  teacher_name text not null,
  difficulty text not null check (difficulty in ('Low','Medium','High'))
);

create table if not exists student_guides (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references students(id),
  title text not null,
  body text not null,
  upvotes integer not null default 0,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists forum_threads (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references students(id),
  title text not null,
  content text not null,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists forum_comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references forum_threads(id) on delete cascade,
  author_id uuid references students(id),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists bell_schedules (
  id uuid primary key default gen_random_uuid(),
  schedule_date date not null,
  day_type text not null check (day_type in ('A','B','Special')),
  periods jsonb not null,
  unique(schedule_date)
);

create table if not exists moderation_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references students(id),
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  created_at timestamptz not null default now()
);
