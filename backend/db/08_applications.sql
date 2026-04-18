-- Table Definition
create TABLE if not exists applications (
    user_id uuid,
    job_id uuid,
    status application_status default 'applied'::application_status,
    applied_at timestamptz default CURRENT_TIMESTAMP,
    uid uuid not null default gen_random_uuid(),
    cover_letter text,
    notice_period int4 not null default 0,
    expected_salary int8 not null default 0,
    why_hire text,
    constraint applications_job_id_fkey foreign key (job_id) references jobs(uid),
    constraint applications_user_id_fkey foreign key (user_id) references users(uid),
    primary key (uid)
);