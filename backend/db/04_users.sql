create TABLE if not exists users (
    uid uuid not null default gen_random_uuid(),
    fname text not null,
    lname text,
    education user_degree_type not null default 'Basic'::user_degree_type,
    email text,
    password text,
    role role_type not null default 'guest'::role_type,
    company_id uuid,
    resume_url text,
    profile_pic_url text,
    skills _text,
    experience int4,
    constraint users_company_id_fkey foreign key (company_id) references companies(uid) ON DELETE cascade,
    primary key (uid)
);