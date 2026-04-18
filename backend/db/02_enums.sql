DO $$ begin
  create type "user_degree_type" as enum ('Basic', 'Matrix', 'Undergraduation', 'Postgraduation', 'High School');
exception
  when duplicate_object then null;
END $$;

DO $$ begin
  create type "role_type" as enum ('guest', 'admin', 'recruiter');
exception
  when duplicate_object then null;
END $$;


DO $$ begin
  create type "public"."location_type_option" as enum ('Remote', 'Onsite', 'Hybrid');
exception
  when duplicate_object then null;
END $$;


DO $$ begin
  create type "public"."is_job_open" as enum ('active', 'closed');
exception
  when duplicate_object then null;
END $$;


DO $$ begin
  create type "public"."application_status" as enum ('applied', 'rejected', 'hired', 'shortlisted');
exception
  when duplicate_object then null;
END $$;

DO $$ begin
  create type "public"."email_verification_type" as enum ('verify_mail', 'forget_password');
exception
  when duplicate_object then null;
END $$;


