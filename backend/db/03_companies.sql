-- Table Definition
create TABLE if not exists companies (
    uid uuid not null default gen_random_uuid(),
    name text not null,
    description text,
    website text,
    created_at timestamptz default CURRENT_TIMESTAMP,
    founded_year int2 not null default 2026,
    location text,
    logo_url text,
    primary key (uid)
);