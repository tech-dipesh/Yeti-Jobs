# Job Portal project:
## Project Started: 2026/Feb/19
- Phase 1:
  Backend:

## All Api Endpoints: 2025/feb/26
- applications: `lists, id/apply, id/withdraw, `
- companies: `/, id/dashbaord, id/employees, id/jobs, id/applications, id: get company all, id: post new company, / delete company, /id put new company`
- jobs: `saved_jobs/list, id/bookmark_job, id/remove_from_bookmar, /: all listing, /search, id/ particular listing jobs, id: new jobs, id/ deelete, /id update`
- users: `/logout, /login, /signup, /: all user, /:id individual user details, /skills add the user skills, /id, delete a user, /put, update user, /patch, update particular list, /forget-password, /forget-password-verify, /email-verify, /email-verify/resend, /upload-resume, /upload-profile-picture`
- admin: `/verify-admin, /users/search, /company/search, /admin/dashboard`

## Project Timeline:
- Basic Routing Setup
- Connecting to the database.
- `gen_random_uuid()` for generate a unique id.
- for define a enum we've to wrap name to single quotes like this: `create type location_type_option as enum ('Remote', 'Onsite', 'Hybrid');`
- add the location type: `alter table jobs add column job_type location_type_option;`
- adding a constraing with alter: `ALTER TABLE jobs ALTER COLUMN job_type SET DEFAULT 'Onsite';`
- remove a commnad wher null: `delete from jobs where job_type is Null;`
- for add a constraitn with name: `ALTER TABLE jobs ADD COLUMN company_name TEXT NOT NULL DEFAULT 'Unknown';`
- showing the tables: `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
- `create type is_job_open as enum ('active', 'closed'); alter table jobs add column job_status is_job_open not null default 'active';` for create a enum and add on is job_open
- change the table name: `ALTER TABLE "public"."jobs" RENAME COLUMN "job_status" TO "is_job_open";`
- All 4 crud operation.

- move `listings` route to `jobs` route.
- i've improve d the validation with rowCount.
- Also now i've try to impemtn the login for testing whether it match or not.



### Created Table Of Users:
- i've also addd a user email which i've not done previously.
- now i've added the email and the password with also teh role what the user is basicallly is user type is.


- as i've make a function for execute a query a commong function
- now i've make commong lboal error handler to handle all these things


- the another things to convert into a number from String is: `Number(value)` convert to the string
- parse to the safe 
- i've implement on both 2 data about the data validation from the zod.
- Now i'm salting and hashing a password

- we've setup the cookie with the httpOnly, and the value for storing a user whehter user is logged in or not.

- as we've setup the cookie but it's on the space format not on the correct format we've to use: `cookie-parser` for getting a cookie on the key value pair

- now companies have a separate table.


- Now i've make entier jwt authetnication only user have access who've logged in.


- we must and should use a jwt route on the cookies which header is not secure.
- i've undestood that i don't need to send a uid on my own way that token will handle everything of the jwt.



- for getting the Object key's: `Object.keys` now for getting a Values: `Object.values(obj)`
- i've make teh routes for patch udpat only necessary fileds update baed on the user input.
- we shouldn't store a lot of values on the array.




- on the zod schema, i've to make sure if regex exist, i can't add a required method.
- also for the min and max value i've to est the nuber to number.





- sample data: 
```js
  {
  "fname": "admin",
  "lname": "admin",
  "password": "Admin@123",
  "education": "Undergraduation",
  "email": "admin@gmail.com"
}
```



- i've make sure that each users have the company_id that connect a foreign ke to the companies by default it can be the null value
- also make sure i add the created_at company when they created 


- for making a better i've move my routes to the controller, with the better scalablity 
- i've add the feature of the created_by which i make relation to the users table;

- now on the jwt query i to send a both company you belong to and also the your uid to track on my database


- also the feature of thw only user allowed who own that id.
- for catching all the routes we can use:  `app.all() or app.get("*")` but better approach is: `app.use()` at last which handle every routes that doesn't match
- i've also add a global error handler which catch the error handler if not catch by any other routes.
- the common function of entire table fetch i've make a eachTablefetch.js on the srvices folder and use everywhere i'm tring to fetch a data from the table


- i've used a json webtoken on the: 2026/02/20 which on the json web token i'm sign a list such as: `user_type whether guest or the admin, and the userid, company_id if exist.
- i've used a mvc model which move wll the model to the database to models fodler which zod is vaidatoin our databas, routes mean v which all routes connect controller all the bussienss logic, also i've make a services folder that are commonly used such as eachTable Fetch,
and i've also create a middlewar with different use case.
- also teh db.js for connecting our database.


## Total api endpoints:
- users: `delete, getAll, getlogin, getParticular, patch, postSignup, put`
- companies: `delete, get, post, put`
- listings/jobs: ` deleteListingController, getAllListingController, getListingController, postListingController, putListingController`

- every list have must have user should be authenticated  and also the authorized for addding a companies only adming can add the companies,, 


- i've make the my `listings.routes.js` to `jobs.routes.js` to make the more relatable..


## applications List:
- created the application database where it've user_id, job_id, status, applied at, with status is enum.
- now i've multiple endpoints for the application such as, allist only admin allow, apply and the withdraw list,
- now i've make the models for verify a datas.
- which i've make all the routes now i want to show a list to the company that how many have they applied to their jobs.


- i'm planning to make`: `route.get` to giving a relelvent name let's see how it goes.


- which i've faced on problme of if user is upda status it creating a new data rather than updating which i've check with condition and update it.
- i've make my controller code to separate fro teh routrer.

- also make sure only owner can view and eidt the request.



- i've to use a dotenv for importing a file, and use it here.
## Upload Resume:
- now i will make the system where user can upload there resume
- with we've to send a form with the: `multipart/form-data`
- during file send we must send with same file name to avoid a error else it'll throw a `unexpected error`
2026/02/23
- now i've change my mind to use the supabase:
  - with the multer: `storage: multer.memoryStorage()`
  which saving the upload fiel on the disk, and send to our server, when it send request it finished.
  - also i use: `file.buffer` for actual file content in the bytes  with raw data.
    - aslo make sure to use: `content-type: `application/pdf` on bucket
  - also make sure to use a same name: `resume` for uploaind a file else it'll throw a unexpected error.
  - we can access `file` that can have input format with can access from: `req.file`
>:warning: we've to enable on the supabase for enable a all file upload with: `create policy "policy_name" ON storage.objects for insert with check (true);`
## access File:
  - for access fiel we can use: `supabase.storage.from('bucketname').getPublicUrl(pathurl)`

### database integration file upload:
- now i've also add one col of the resume url on users table
- which the url will store on the users table that we send.
- with make sure: `isAuthMiddlewaer` for only logged in user can upload a resume
- with now first i'm checking whether already have pdf or if pdf exist i must have to delete that user for overload our database usage
>:fire: the problem that i facing is unable to get the list from a supabase which is a access problem no error throw for that the solution is: 
``` sql 
CREATE POLICY "Allow all" ON storage.objects
FOR ALL TO public USING (bucket_id = 'resume') WITH CHECK (bucket_id = 'resume');
``` 
for allow all teh credentiants now work.
 

>:white_check_mark: when i change my json secret key i must have to again login first.
  - also one mistake that i've done is during sign i hardcorded a sign value which is causign a problem.

### Profile Picture Upload:
- now i've make my same logic of resume to profile picture upload.
- with same logic just change the bucket



## Pagination:
- i've used the logic of both page limit with offset with the page number for not the large query.


## Search Query:
- for search a query i'm trying to use a ts_vector with better searching way:
- with first have to add a tsvector column and have to populate existing content and create a index and every time when something update it must be automatically change.
- with type to: ` ALTER TABLE jobs add COLUMN search_title tsvector;` with tsvector 
>:fire: for existing content update with: `set search_title=to_tsvector('english', title)`

- now we'lll add the index for make a scalable system with:
  - we use called the gin index system:
  - ` create INDEX index_jobs_search_title on jobs using gin (search_title)`
  - we must have to create the trigger with must be the function on the postgres:
  - the function is:
    - `create function title_search_function_update() returns trigger as $$ begin new.search_title:=to_tsvector('english', new.title) return new; $$ language plppgsql`
  - Now i've to create trigger to run every time:
    - ` create trigger full_text_search_trigger before insert or update on jobs for each row execute function title_search_function_update()`
  - the Query we've to do with: `select * from jobs where search_title @@ to_tsquery('developer')`

## ts_vector understanding on the postgres:
  - **`tsvector`** — like it search a any term with the index version
  - tsquery common term are:
    -  `to_tsname('help')` exact match
    - `to_tsname('help:*')`: prefix match anything start with 'help'
    - `to_tsname('help & right')` - both must exist
    - `to_tsname('help | right')` one exist
  - which: `@@` is match operator between: `tsvector and tsquery`

- i can directly add a query like this: `($1:*)` which is not valid instead: `($1), ['${title};*']` for text searching

>:warning: the problem that i've faced is for searching it's not able to iplement a validation.

## Saved Jobs:
- for the saved jobs i've create data with: `saved_job_id, company_id, jobs_id, createdAt`
- with saved jobs only show to the user not the admin also not the company.
- which for the saved_jobs i've create three routes with save or bookmark jobs remove jobs and also oen to show all list of bookmark list.
- with simple database intercation i achieved with easily


## Security Feature: 2026/02/25
- for better security to safe from attacker i'lll be using some basic security for make more secure webiste.
- by default `helmet` js add 12 response header and remove one for better security purpose: `
- which remove: `"x-powered-by"` that express is shown which become attacker to know which system it developed
- it add 12 response headers such as: `content-security-policiy, x-xss-protection, strict and etc.`

### Rate Limit:
- the rate limit will slow down the user activity to maintain a stablity and also secure from hacker.
- with we only allow user to per minute can only send 30 request else it'll send a throw errror.,
- we also can use custom message but not will add as by default it've.


- I've also add add skills section with array, with also setup that feature.
  - with on the array can show the `array`

- 

>:warning: As utils mean reusable small code while lib mean big block of code so which previously tableData add on the services, the services should have the business logic.



### Companies Dashboard:
- now company will have a option to see all their emploee list,
- also a all jobs list.
- now i add on applications oof primary key uid to identify by that primar key



## Other features:
- now i'm trying to improve a new jobs with addinga a new array with list of skills that user will add, and also change on our code
- with also create one user for the testing which i find many bug that i fix.
- i've to make sure that skills should be added of both jbos and the users.
- also i make sure that skills only user can add that they've not added prevoiusly with append skills not create new
- add the feature of the total job views by on the each request it'll count how many total job_views there.
- i've make sure add the dashboard feature only a authorized that owned company have access.



## Node Cron Task:
- i will implement the features of teh application will be expired if the date is exceeded.
- `node-cron` for schedule task.
- `"* * * * * *",` with 6 param mean it's running on the every second: `*/2 * * * *` like it'll running on the every 2 second.
- with for run the every new day we can set: `0 0 * * * `
- now i'm using a command to show: `select * from jobs where is_job_open<>'closed';` only which are not closed.
- nwo node cron will update if date exceed make a active to closed.



## Versioning and the cors:
- also i make sure that it've cors configuration to the client side.
-  with: `cors` libraray i make sure it work cors configuration.



- on the every request i've correct status code with suitable res message that i make sure work with every middleware and on every routes and the methods

## Other Features:
- i've add a experience_year on the both jobs and the users so we can make relate or better data.
- my server is not running the problem is: i'm calling a cors like this: `cors` which causing a problem not runing.
- as postgres doesn't allow parameter placeholder i can't do: `order by $1 desc` which doesn't consider.
  - which i've to make the template literal
- i've implement the custom sort by now i will be implmenet a filter with any sort by based on the title.



## Future Features that i migh implmenet in coming days:
- applicatin status_history log with on the table every status create a log report.
- with recommendation system features.
- add the totalCount of how many applications list.
- i've add the `analytics` api where i will count total applicant on teh company, this week applicant with: `where date_applied>=trunc('week' now())`
- and totalStatus, with using a formula of: `total/sum` of each list, shows as a percentage list.
- this api is protected only for the company employee.


## Email verification:
- for the user email verification i'll be using a nodemailer which use the smtp service to send the mail, which is the encyprted version.
- i've create a one function that for generate random number which is on the utils now i can use this number.
2026/02/26
- with i've take random 6 digit number with `Math.random` with sent to their email which i also store on my db to verify whether user enter correct password or not.
- create the new table of named: `email_verified` with list of such as: `uid, userid, type, email_verify, expired, is_used, and created_at`
- we've to use the: `interval` for manipulate our time.
- both: `now(), current_timestamp` are the same method to get the current time.- i on
- we've to make sure to do: `date=new Date().toIsoString, allDate=new Date(date)` which make sure to convert to the object.
- i make sure to send on the: `error` with implment a rate limit on the response.
- i've done if user is already verified don't need to logged in again user.


## forget Password:
- i've use almost same logic for the forget password.
- with sending a unique password code to the db and send that code to the db and validate user from another routes then only allow
- with create a two routes where first for send a request for the forget password.
- with every edge case i check whether a token is expired or not, whehter that token is already used or not, whetehr a email correct or not.
- with i'm updating on the both users table of password and also for the email_verified table.
- i can say it's realted to the reset password system.



- i've also make sure if already user is logged in don't allow them again go to the `signup/login` page.


## Implementation:
  - for the email verification after cretaing a table i confused whether should i wait a user till response or instantly response but that will not store the key value.

  - add the constraint of `on delete cascade of foriegn relation to the user.`
  

- resend teh verification code:


- i've also add the logout feature with just clear a cookie from the server that's it, with the authentication.


## Packages I use:
1. Express
2. pg
3. zod
4. bcryptjs
5. cookie-parser
6. jsonwebtoken
7. dotenv
8.  @supabase/supabase-js
9. helmet.js
10. express-rate-limit
12. node-cron
13. nodemailer


- i also make sure to add the feature of the logout, and also if user is already logged in, don't show a option of signup login.



- how can i make sure that only print a enum i've try: `select * from application_enum`;




- on: 2026/02/22 i've not write any single code due to litte bit of illness.


## More Feature after the 02/26:
- add the id validation custom function to check whether id is correct or not. with set to the middleware.
- i also make sure that it's the correct dns type or correct domain that i can check with: `dns.resolve`
- add the two is user logged in but not verified.
- also fix minor verification code error.
- also where user is already logged in the data is not store on teh email_ verify i'm adding try catch and throw a request.
- i've created a earlier a is_email_verify on the users table which i deleted instead already have separate table for that.

- i also make sure only send a all user list which is needed not all i've sending.
- add the validate correct uid on everywhere.
- i've add a two things change a name of resme upload  and also on 10+ area change my status code
- also chaeck edge case of user is not upload resume don't consider it.
- as of now i've not test a bookmark job which now i'll test a bookmark a job.

## more 03/01:
- i also make sure to check is user is already saved that jobs make sure have a simple query with true false to again saved_jobs.
- we can use: `explain analyze` for performance analysis.
- with zod valdation of aray convertion i'm so stuck let see how it goes.
- with simple mistake of: `j.uid = s.job_id and j.uid` with must be a : `j.uid = s.job_id and j.uid` with it's returning a different value.
- i've not the ` on delete cascade` of foreign relation for data with violate a constraint with i addd a on delete cascade.
- i've used the three join method to find all the applicant on the particular Job.
- minor mistake of i'm writing: `experience_years instead of experience` which is still not fetching a data



03/02:
- with select exists(select 1) return only true false if exists.
- the `z.coerce` conver tour any value to that native alue for the zod valiadtion.

03/03:
- the recruiter can't apply to the jobs
- i'm mistakenly add a company_id from users cookie data, rather i should get from url.
- one problem is: `/all` routes i've add after: `/:id` which is catching later.
- with the domain i check with the try catch block. of domain existance.


- one things that i missed when user is verify their mail i make sure that again resned a token with updated token ok.
- i make sure that addJwtKey to reusable fucntion as i've use multiple place so it's better to have a reusable function.
- add the two column of: `founded_year, location` on the company details.



- now for uploading a feature of teh companies logo i've to change a lot but i will change it.
- 
- i've make the company dashboard to show a company all employees, total jobs like this.
- add the htree emore routes on the admin for assign any user to the companies.
-with proper data validation 
- i make sure to verify a code only logged in email shoulbe be the valid one.

>:warning: today i only know that on the bruno i can make the baseurl with: `{{base-url}}`.
- i've face one problem of zod validation as status comes on teh normal case but i want the lower case which i've to use teh preprocesser.

- add the backend system where on the users if the any perosn is the recruiter we it must have to add teh company_id with db constraint.

- for assing a any users to the cmopanies i've setup by 2 backend routes frirst search all the companies and then assing that companies to the any user that exist.
- previously i've not added the experience_years and the location on the new jobs, now i'm adding a experinece_year and the location which are missing.
## Pagination:
- with on teh pagination logic now i don't need to check i can pass the default value if not exist.
- also i can send a total length tot the database so that frontend can know how many data are there.
- which i need only offset to send a data and based on the page it can check a data.
- i've finally implement the load more features with the page limit and the offeset.
- with experience_year is not have on the put i've added that.


## Lot Features:
- with the database constraint if teh user have company_id that only must be the recruiter not a admin and not also the guest.
- with add the new routes of: `admin/dashboard` of the entire admin setup.

- change the my app password so it can set a new value.
- set the type to appropirate to the both email veriification and the reset password on the send email.
- on the application table i've add a new table column of: `cover_letter, notice_period, expected_salary, why_hire`
- with i set to the database validation which with expected_salary must be above 5000 and why hire must be the at least 10 letter word on the database validation.
-addd hte new shortlisted value for the appliocation.
- which one things one i set tot he expected salary must not be the not null and the notice_period can be not null 
- i set the optional to the three things on here.
- with only once user can send apply to the any role.
- 


# The Backend Project is finished on: 2026/02/26





## Followeres System:
- with i've creaet a followers system where user can follow a any company.
- with: `uid, user_id, compny_id, created_at` table where it's having a unique of user_id and company_id which only once user can follow a company.
- with foreign key referecens.
- where both follow/unfollow company backend logic is written now i've to write logic for my client side code.
