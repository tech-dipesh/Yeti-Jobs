-- Indices
create index if not exists idx_companies_name on companies using btree (name);


-- Indices
create unique index if not exists unique_user_companies on user_companies_follows using btree (user_id, company_id);


-- Comments
COMMENT on table jobs is 'Jobs in Small List';


-- Indices
create index if not exists index_jobs_search_title on jobs using gin (search_title);



-- Indices
create index if not exists idx_verified_code on email_verified using btree (verified_code);