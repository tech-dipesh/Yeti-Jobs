-- Indices
CREATE INDEX idx_companies_name ON companies USING btree (name);


-- Indices
CREATE UNIQUE INDEX unique_user_companies ON user_companies_follows USING btree (user_id, company_id);


-- Comments
COMMENT ON TABLE jobs IS 'Jobs in Small List';


-- Indices
CREATE INDEX index_jobs_search_title ON jobs USING gin (search_title);



-- Indices
CREATE INDEX idx_verified_code ON email_verified USING btree (verified_code);