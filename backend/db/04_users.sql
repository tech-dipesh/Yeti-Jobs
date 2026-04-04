CREATE TABLE IF NOT EXISTS users (
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    fname text NOT NULL,
    lname text,
    education user_degree_type NOT NULL DEFAULT 'Basic'::user_degree_type,
    email text,
    password text,
    role role_type NOT NULL DEFAULT 'guest'::role_type,
    company_id uuid,
    resume_url text,
    profile_pic_url text,
    skills _text,
    experience int4,
    CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies(uid) ON DELETE RESTRICT,
    PRIMARY KEY (uid)
);