-- Table Definition
CREATE TABLE IF NOT EXISTS companies (
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    website text,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    founded_year int2 NOT NULL DEFAULT 2026,
    location text,
    logo_url text,
    PRIMARY KEY (uid)
);

