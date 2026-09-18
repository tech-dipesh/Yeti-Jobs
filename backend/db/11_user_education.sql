create table if not exists user_educations(
  uid uuid PRIMARY key DEFAULT gen_random_uuid(),
  user_id uuid not null REFERENCES users(uid) on  delete CASCADE,
  university_name text not null,
  degree text not null,
  start_date date,
  end_date date,
  grade text
  );