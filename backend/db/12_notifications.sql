create table notifications if not exists(
    uuid uuid primary key,
    users_id uuid references users(uid) on delete cascade,
    company_id uuid references companies(uid) on delete cascade,
    job_id uuid references jobs(uid),
    type notifications_type,
    created_at timestamp default current_timestamp,
    read_at timestamp
);
