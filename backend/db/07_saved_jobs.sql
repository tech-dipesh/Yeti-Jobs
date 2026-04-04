-- Table Definition
CREATE TABLE IF NOT EXISTS saved_jobs (
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    company_id uuid,
    job_id uuid,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    users_id uuid,
    CONSTRAINT saved_jobs_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies(uid),
    CONSTRAINT saved_jobs_job_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(uid) ON DELETE CASCADE,
    CONSTRAINT saved_jobs_users_id_fkey FOREIGN KEY (users_id) REFERENCES users(uid),
    PRIMARY KEY (uid)
);