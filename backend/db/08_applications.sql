-- Table Definition
CREATE TABLE IF NOT EXISTS applications (
    user_id uuid,
    job_id uuid,
    status application_status DEFAULT 'applied'::application_status,
    applied_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    cover_letter text,
    notice_period int4 NOT NULL DEFAULT 0,
    expected_salary int8 NOT NULL DEFAULT 0,
    why_hire text,
    CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(uid),
    CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(uid),
    PRIMARY KEY (uid)
);