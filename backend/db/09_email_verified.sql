
-- Table Definition
create TABLE if not exists email_verified (
    uid uuid not null default gen_random_uuid(),
    user_id uuid,
    verified_type email_verification_type default 'verify_mail'::email_verification_type,
    created_at timestamptz default now(),
    expired_at timestamptz default (now() + '00:15:00'::interval),
    verified_code int4,
    is_verified bool default false,
    constraint email_verified_user_id_fkey foreign key (user_id) references users(uid) on delete cascade,
    primary key (uid)
);