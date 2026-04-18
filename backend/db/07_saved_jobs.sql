-- Table Definition
create TABLE if not exists saved_jobs (
    uid uuid not null default gen_random_uuid(),
    company_id uuid,
    job_id uuid,
    created_at timestamptz default CURRENT_TIMESTAMP,
    users_id uuid,
    constraint saved_jobs_company_id_fkey foreign key (company_id) references companies(uid),
    constraint saved_jobs_job_id_fkey foreign key (job_id) references jobs(uid) on delete cascade,
    constraint saved_jobs_users_id_fkey foreign key (users_id) references users(uid),
    primary key (uid)
);