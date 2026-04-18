-- Table Definition
create TABLE if not exists user_companies_follows (
    uid uuid not null default gen_random_uuid() primary key,
    user_id uuid not null,
    company_id uuid not null,
    created_at timestamptz default CURRENT_TIMESTAMP,
    constraint user_companies_follows_company_id_fkey foreign key (company_id) references companies(uid) on delete cascade,
    constraint user_companies_follows_user_id_fkey foreign key (user_id) references users(uid) on delete cascade
);