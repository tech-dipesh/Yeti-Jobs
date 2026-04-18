-- Table Definition
create TABLE if not exists jobs (
    uid uuid not null default gen_random_uuid(),
    title text not null,
    description text,
    salary int8 not null,
    job_type location_type_option default 'Onsite'::location_type_option,
    is_job_open is_job_open not null default 'active'::is_job_open,
    company_id uuid,
    created_by uuid not null,
    search_title tsvector,
    skills _text,
    total_job_views int8 not null default '0'::bigint,
    created_at date default CURRENT_DATE,
    experience_years int4,
    location text,
    expired_at date default (CURRENT_DATE + 30),
    constraint jobs_company_id_fkey foreign key (company_id) references companies(uid),
    constraint jobs_created_by_fkey foreign key (created_by) references users(uid),
    primary key (uid)
);

