-- Table Definition
CREATE TABLE IF NOT EXISTS user_companies_follows (
    uid uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    company_id uuid NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_companies_follows_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies(uid) ON DELETE CASCADE,
    CONSTRAINT user_companies_follows_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE,
);