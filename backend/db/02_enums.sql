DO $$ BEGIN
  CREATE TYPE "user_degree_type" AS ENUM ('Basic', 'Matrix', 'Undergraduation', 'Postgraduation', 'High School');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "role_type" AS ENUM ('guest', 'admin', 'recruiter');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
CREATE TYPE "public"."location_type_option" AS ENUM ('Remote', 'Onsite', 'Hybrid');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
  CREATE TYPE "public"."is_job_open" AS ENUM ('active', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
  CREATE TYPE "public"."application_status" AS ENUM ('applied', 'rejected', 'hired', 'shortlisted');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."email_verification_type" AS ENUM ('verify_mail', 'forget_password');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;






