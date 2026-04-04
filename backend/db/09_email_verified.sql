
-- Table Definition
CREATE TABLE IF NOT EXISTS email_verified (
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    verified_type email_verification_type DEFAULT 'verify_mail'::email_verification_type,
    created_at timestamptz DEFAULT now(),
    expired_at timestamptz DEFAULT (now() + '00:15:00'::interval),
    verified_code int4,
    is_verified bool DEFAULT false,
    CONSTRAINT email_verified_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE,
    PRIMARY KEY (uid)
);