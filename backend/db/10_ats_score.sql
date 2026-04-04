-- Table Definition
CREATE TABLE IF NOT EXISTS ats_score (
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    score int4,
    feedback jsonb,
    CONSTRAINT ats_score_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE,
    PRIMARY KEY (uid)
);