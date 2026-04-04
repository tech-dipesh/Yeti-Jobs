-- Table Definition
CREATE TABLE IF NOT EXISTS jobs (
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    salary int8 NOT NULL,
    job_type location_type_option DEFAULT 'Onsite'::location_type_option,
    is_job_open is_job_open NOT NULL DEFAULT 'active'::is_job_open,
    company_id uuid,
    created_by uuid NOT NULL,
    search_title tsvector,
    skills _text,
    total_job_views int8 NOT NULL DEFAULT '0'::bigint,
    created_at date DEFAULT CURRENT_DATE,
    experience_years int4,
    location text,
    expired_at date DEFAULT (CURRENT_DATE + 30),
    CONSTRAINT jobs_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies(uid),
    CONSTRAINT jobs_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(uid),
    PRIMARY KEY (uid)
);

