# Job Portal Project
## Project Started: 2026/Feb/19

### Phase 1: Backend

## Database Schema
<p align="center">
  <picture>
      <img src="assets/supabase-schema.png" alt="Database Schema" width="250" height='250'>
  </picture>
</p>

## All API Endpoints (2026/Feb/26)

### Applications:
- List applications, `/:id/apply`, `/:id/withdraw`

### Companies:
- `/`, `/:id/dashboard`, `/:id/employees`, `/:id/jobs`, `/:id/applications`
- `/:id` (GET, POST, DELETE, PUT)

### Jobs:
- `saved_jobs/list`, `/:id/bookmark`, `/:id/remove-bookmark`
- `/` (all listings), `/search`, `/:id` (single job)
- `/:id` (new job, delete, update)

### Users:
- `/logout`, `/login`, `/signup`
- `/` (all users), `/:id` (individual user details)
- `/skills` (add user skills)
- `/:id` (delete user), `/put` (update user), `/patch` (partial update)
- `/forget-password`, `/forget-password-verify`
- `/email-verify`, `/email-verify/resend`
- `/upload-resume`, `/upload-profile-picture`

### Admin:
- `/verify-admin`, `/users/search`, `/company/search`, `/admin/dashboard`


## Created Table: Users
- Added user email (previously missing)
- Added email, password, and role (user type)


## Development Log

- Created a common function to execute queries
- Created a global error handler
- Convert string to number with `Number(value)`
- Implemented data validation with Zod
- Used salting and hashing for passwords

- Set up cookies with `httpOnly` flag to store user login status
- Used `cookie-parser` to access cookies as key-value pairs

- Created separate companies table

- Implemented JWT authentication — only logged-in users have access
- Used JWT in cookies (headers are not secure)
- Token handles everything — no need to send UID manually

- Used `Object.keys()` and `Object.values()`
- Created PATCH routes for updating only necessary fields

- In Zod schema: if regex exists, can't add `.required()`
- For min/max values, ensure numbers are properly typed

- Each user has `company_id` as foreign key (nullable by default)
- Added `created_at` timestamp for companies

- Moved routes to controllers for better scalability
- Added `created_by` field with relation to users table

- JWT payload includes: user type (guest/admin), user ID, company_id (if exists)

- Used MVC pattern:
  - **Models** → database + Zod validation
  - **Routes** → connect endpoints to controllers
  - **Controllers** → business logic
  - **Services** → reusable functions (e.g., table fetch)
  - **Middleware** → auth, validation, ownership checks
  - **db.js** → database connection


## Applications Feature
- Created applications table with: `user_id`, `job_id`, `status`, `applied_at`
- Status is enum type
- Multiple endpoints: admin list, apply, withdraw
- Created validation models
- Added route for companies to see who applied to their jobs

- Fixed issue where status update created new record instead of updating
- Separated controller code from router
- Only owner can view/edit applications


## All The Updated Routes:
/jobs:
/saved_jobs/list
/:id/bookmark_job
/:id/remove_from_bookmark
/
/search
/:id
new
/:id/delete
/:id/edit
/:id/verify-owner


/users:
/
/logout
/login
/signup
/all
/forget-password
/forget-password/verify
/verify
/verify/resend
/following
/resume
/profile-picture
/:id/skills
/:id
  : get
  : put
  :patch



companies:
/all
/new
/dashboard
/followers
/:id 
  :get
  :putKW
  :delete
/:id/follow
  : post
  :delete
/:id/analytics
/:id/employees
/:id/jobs
/:id/applications



/ application
/applylist
/:id/applist
/:id/apply
/:id/status
/:id/withdraw

/admin
/verify
/search/company
/search/users
/assign-user
/dashboard


## File Upload (Resume & Profile Picture)
- Used Supabase for file storage
- Used `multer.memoryStorage()` (store in memory, not disk)
- Used `file.buffer` for raw file content
- Required `Content-Type: application/pdf` in bucket
- Access file from `req.file`

**Enable upload policy in Supabase:**
```sql
CREATE POLICY "Allow all" ON storage.objects
FOR ALL TO public USING (bucket_id = 'resume') WITH CHECK (bucket_id = 'resume');
```

**Get public URL:**
```js
supabase.storage.from('bucketname').getPublicUrl(pathurl)
```

- Added `resume_url` column to users table
- Added check: if file exists, delete old one to avoid storage overload
- Same logic applied to profile picture upload


## Pagination
- Used `LIMIT` and `OFFSET` with page number for large queries


## PostgreSQL:


**Trigger function:**
```sql
CREATE FUNCTION title_search_function_update() RETURNS trigger AS $$
BEGIN
  new.search_title := to_tsvector('english', new.title);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER full_text_search_trigger
BEFORE INSERT OR UPDATE ON jobs
FOR EACH ROW EXECUTE FUNCTION title_search_function_update();
```

**tsvector & tsquery:**
- `tsvector` — indexed search
- `to_tsquery('help')` — exact match
- `to_tsquery('help:*')` — prefix match
- `to_tsquery('help & right')` — both must exist
- `to_tsquery('help | right')` — one must exist
- `@@` is match operator


## Saved Jobs
- Table: `saved_jobs` with `saved_job_id`, `job_id`, `user_id`, `createdAt`
- Only accessible to users (not admin/company)
- Three routes: save, remove, list all


## Security Features (2026/02/25)

**Helmet.js:**
- Adds 12 security headers
- Removes `X-Powered-By` (hides Express framework)

**Rate Limiting:**
- Limit: 30 requests per minute per user
- Prevents brute force attacks and ensures stability


## Skills Section
- Added skills array to users
- Skills can only be appended (duplicates prevented)


## Companies Dashboard
- Companies can view:
  - Employee list
  - All jobs
  - Applications (using primary key UID)


## Additional Features
- Added skills array to jobs
- Total job views count — increments on each request
- Dashboard access limited to authorized company owners


## Node Cron Task
- Used `node-cron` for scheduled tasks
- Cron runs daily at midnight: `0 0 * * *`
- Updates jobs to `closed` if expiry date exceeded
- Query: `SELECT * FROM jobs WHERE is_job_open <> 'closed'`


## Versioning & CORS
- Added CORS configuration for client-side
- Correct status codes on every response
- Consistent response messages across all routes


## Email Verification (2026/02/26)
- Used **Nodemailer** with SMTP for encrypted email sending
- Created `email_verified` table with: `uid`, `user_id`, `type`, `email`, `expired`, `is_used`, `created_at`
- Generated 6-digit random code with `Math.random()`
- Used `interval` for time manipulation
- `now()` and `current_timestamp` are same
- Convert ISO string to Date object


## Forget Password
- Similar logic to email verification
- Two routes: send reset request, verify and reset
- Handled edge cases: expired token, already used token, invalid email
- Updated both users table (password) and email_verified table


## Additional Improvements
- Added `ON DELETE CASCADE` for foreign key relations
- Resend verification code feature
- Logout: simply clear cookie from server
- Prevent logged-in users from accessing signup/login pages


## Packages Used
1. Express
2. pg
3. zod
4. bcryptjs
5. cookie-parser
6. jsonwebtoken
7. dotenv
8. @supabase/supabase-js
9. helmet.js
10. express-rate-limit
11. node-cron
12. nodemailer
13. yamljs
14. 


## Post-Feb 26 Features
- Custom ID validation middleware
- DNS domain validation with `dns.resolve`
- Unverified user handling middleware
- Fixed verification code logic
- Proper error handling for already logged-in users
- Removed `is_email_verified` column from users (separate table handles it)
- Validate correct UID everywhere
- Changed status codes in 10+ areas
- Bookmark job testing and fixes


## March 1–20
- Used `EXPLAIN ANALYZE` for performance analysis
- Fixed Zod array validation issues
- Added `ON DELETE CASCADE` for foreign relations
- Used 3 JOINs to fetch all applicants for a job
- Fixed `experience_years` field naming
- `SELECT EXISTS(SELECT 1)` returns true/false
- Used `z.coerce` for type coercion in Zod

- Recruiters cannot apply to jobs
- Fixed `/:all` routes being captured by `/:id`
- Domain validation with try-catch
- Resend token sends updated token
- Created reusable JWT signing function
- Added `founded_year` and `location` to companies table
- Update the `delete` route which is not a correct logic previously for delete a job.
- Implemented company logo upload feature
- The Bookmark action can't perform by the non job seeker role.
- with change the login status routes of follow rest standard.
- create the indexing on teh verified_code which we need the multiple times so.

- update the profile reset password verify with the correct logic.
- also create the index for the companies name which we need a frequently.
- port our local database to the supabase database.
- Move my system to the src folder structure.
- One really weird bug during the email confirmation is current Date is freezing and sending a old time rather we should do: `new Date()`



## Admin Routes
- Added 3 admin routes: assign user to company, search users, search companies
- Added database constraint: if user has `company_id`, role must be `recruiter` (not admin or guest)


## Pagination (March)
- Implemented load more with limit and offset
- Send total count to frontend


## Application Enhancements
- Added new columns: `cover_letter`, `notice_period`, `expected_salary`, `why_hire`
- Database validation: `expected_salary > 5000`, `why_hire` minimum 10 characters
- Added `shortlisted` status for applications
- One user can apply only once per job
- UUID validation before database request


## Backend Project Completed: 2026/Feb/26


## Followers System
- Created followers table: `uid`, `user_id`, `company_id`, `created_at`
- Unique constraint on `(user_id, company_id)` — one follow per user-company pair
- Foreign key references
- Follow/unfollow logic implemented


## Docker Setup (March 19)
- Used `npm ci` instead of `npm i` for smaller, faster image
- Added `.dockerignore` to exclude: `node_modules`, `.env`, `Dockerfile`, etc.
- Build command: `docker build -t job_portal .`

## Important Commands
- `npm audit` — check vulnerabilities
- `npm prune` — remove unnecessary packages