# Yeti Jobs:
- Full stack Job Portal Connectina  job sekker to the recruiter with the smart search with build with pern stack sclable job posting resume analysis, real time application managment.



## Overview:
- The Project is a job Portal Platform With All of the Features that needs to build the job portal platofnr, such as all the crud operation, roll back access controll, jobs, companies, apply, withdraw create job, create a new company, admin controler and a cron queue.
- The Project can be build as a production level project with some minor things to do.



## DEmo Url:
https://vercel.com
https://render.com/project/api/v1


## Features:
1. Users:
  - Apply/Withdraw Job, Add/Bookmark
  - Search Jobs
  - Edit Profile And Other Credentials
  - Add a Resume, Profile Picture
  - See All Applied jobs
  - All Companies List
  - Individual Company jobs and Description About Company
  - view Job

2. Employees:
  - Company Dashboard
  - All Applicants
  - See All Jobs
  - See All employees
  - See Profile
  - Create/Delete/Edit a Job
  - Change a Applicant STatus
  - Update Company
  - All followrrs Company
  -

3. Admin:
   - Assign User to companies.
   - edit/delete/create/update Company
  - Company Entire Overview dashboard
  
4. Common:
  - Login
  - Signup
  - Verify Email
  - Reset Password
5. Authenticatoin:
  - JWT
  - Roll Back Access Control


## Tech Stack:
Frontend:
React
TailwindCSS

Backend:
Node.js/Express

Database:
PostgresSQL

Devops:
Docker


## Architecture Overview:
- The Project is buld on the top of the PERN-stack based with teh layered architececturedw where i've used a reacct for the ui staate and Node/Express for backend (API, auth Logic), PostgreSQL (data logic)
- with Rest api connect layers, jwt for the auth and modular services fo the handler jobs, applicatoins, companies, resume parsing, profile picture uploadtion.
- with the total more than thte 40 api endpoints with the every endpoints correct validation, and everytying to teh both client and the server validation.


## Folder STructure
### Backend:
  -- app.js
  ---  controllers
  ---  Middlewars
  ---  Models
  ---  routes
  ---  services
  ---  utils
### Frontend:
  -- app.jsx
  --- api
  --- assets
  --- auth
  --- components
  --- context
  --- Data
  --- hooks
  --- lib
  --- pages
  --- services



## Environement Variables:
### Backend:
  - Postgres:
    - USER
    - PASSWORD
    - HOST
    - DATABASE_PORT
    - DATABASE
  - SUPABASE:
    - URL_SUPABASE_CONNECT
    - ANON_KEY_SUPABASE
  - NODEMAILER:
    - NODEMAILER_MY_EMAIL  
    - NODEMAILER_MY_PASSWORD  
  - JWT:
   - JWT_SECRET_KEY:
  - COMMON:
    - CLIENT_BASE_URL
    - PORT
    - MAXAGE

### Frontend:
  - VITE_SERVER_URL


## Instalation & Setup:
- As It's based on the PERN Stack we've, required above all things to run our server.
- Requirements: `Nodejs, Postgres Server, Supabase Keys, Nodemailer Keys`
### Backend Configuration:
  -
  ``` bash 
      cd backend
  ```
  ``` bash
    touch .env 
  ```
  ``` bash 
    vim .env (Insert all the env keys on here)
  ```

  ``` bash
    npm i
  ```

  ``` bash
    npm start/node app.js
  ```
- now the server will run on the defined port of: `.env`

### Frontend:
  ``` bash
    cd frontend
  ```
  ``` bash
    touch .env
  ```
  ``` bash
    vim .env
  ```
  ``` vim
    VITE_SERVER_URL=ADD_HERE
  ```
  ``` bash
    npm i
  ```
  ``` bash
    npm start/run dev
  ```
- your client will run on the http://localhost:5173



## Docker Setup:
- Dockerbase have only one single container of the nodejs configuration.
- 


## Api Documentation:


## Database Design:
- For the Database Design, i make sure have the separation of concern with only single tables do the single task not multiple.
 - which help us to get a wanted data on the correct tables.
### Database Tables:
- applications
- companies
- email_verified
- jobs
- saved_jobs
- user_companies_follows
- users


### Application Table:
- The Table  is mainly for track al the appplied jobs tracking which have mostly user id and job id as a forigen key and other relevent information for applying a job.
- with toe ther information such as: `cover letter, notice period, expected slary, why we should hire you`
 - whic two: `letter, period` are mandatory rest two are the optional.


### Companies Table:
- all the list of the companies which exist on the platform with their relvent other information.
- with teh routes of: `admin` which only accessible to the role of teh admin.

### Email Verified Table:
- for track the email verified users, and also have the when user is try a forget password i've also store on teh email verified tables.
- with the enum type whether email verify or forget password with link to the user id and teh random code and relevent other information.

### Jobs Table:
- jobs is one of the most importatn table, which content lot of column on the single table.
- with the company id to teh user id who created and other basic jobs such as title, desc, salary, type and lot more.

### Saved jobs Table:
- with user have the option to bookmark a any jobs.
- on the bookmark with foreign relation of teh jobs and the user id and otehr relevent info.
### User Companies Follow or Followers Table:
- with i've add the lately of the following and the followers system for the following only company and by only the users.

### Users Table:
- with the user info and also the role whehter the user is guest, admin or the recruiter.
- with the profile pic and also teh resume have.
- education skills and the company id which only be valid for the enum recruiter.
- and lot of other information.
### Extra
- have a trigger and also teh index operation on the database
- with the enum for the education, role and other information.
- iwth lof of database validation with the check and the constraint.
- with also i use the `on delete cascase or on delete restrict` on the foreign relation if the foregin relation data is delete dshould we allow that linked data to be deleted or what.


## Cron Task:
- The cron task mean it'll run on that particular time which we've specified.
- i've used on only one operation but wee can use for the many operation.
- the opratoin that i've using a  cron is on the jobs which have the expirary time of the 30 days which checks on every night 12 noon a cron runs that time, 
- on the every noon cron node check whterh the jobs time have expired or not if expired change the that job set to teh closeed of is_job_active



## Testing:
- as of now i've not the testing.
- which i'm plan to add the integration testing with teh jest and the supertest.
- if not possible only main routes such as: `login, signup, jobs, new jobs` will have the testing but it might take time as i'm currently learning a testing so.

## Deployment:
- for the deployment i'm plan to use the `vercel` for the both frontend and the backend project.
- which vercel nowdays support also the backedn also have the backeup option of the render but that is too slow.
- for the database i'm planning to use: `supabase/neon` let's see which one i will choose for my postgres db.
- for the frontne no doubt i'll be usiing the vercel.

## Security:
- it's the one of the secured platform with teh lot of the validation and the middlewares.
### validatin Security:
- Every Major table hav ethe validation from the zod which check validate the integratiy of our data.
- beside teh client side validat, server side validation, i aloso make suer to add the database validatino,
- even if user bypass a both client and server validation it can't insert due to teh database validation.
- with checking a pattern, blank, min length max length which are common i've implemented.
- i make sure to every single data to enforce the database integrity.


### System Security:
- The Most important thigns that i added here is the rate limiting.
- which hacker even cant' try to do the brute force with the strict method.
  - for any request, on the backedn only can send the request of the 200 per minutes, which i feel it still high, but considerign we've to request on the development mode lot of time i plan to make the 100 request per minute.
- also add the rate limiting for the reset password and the forget password only can send the request twice per minute which enforce tha lot of times that user can't send the request.
- use the helemtn for the reponse purpose which remove teh x powered by that the client will nto knwo which frameworkd we've build without this it'll show it build from the express.
 - and also haev one more feature ao it alls the 12 more repsonse header, for better secuirty epurpsoe of prevent from teh xss attack.
- Use the cors for only allow my client url dont' allow any external api endponkts which also have a better security featuer.s



### Middlewares:
- i make sure to validate every incomonign  request to the both cilent side and the server side have teh middleware.
#### Client Valdiation:
- on the client valdiation guest cant' visit the page of the admin dashboard and the other admin restricted page and also teh employee restricted page.
- while the employees only restrict to perfomr a employee cant' apply to teh jbos or can't perfmor a the neither a guest or the admin action.
- admin which have little bit of the freedom but also enforce  cant' visit the page of the guest or the employee action.
#### Server MIddleware:
- i've more than the 9 middleware for the server validation.
- with make the controller user action to teh only isJobSekkker, companeis contoller to teh isEmployee and the admin contoller tot eh ony isAdmin.
- with i also valdiation whether the use is logged in or not, and also whter the user logged in but not verified, whtehr teh user is owner of that routes or not, whetehr the user given a correct uuid which i also validatino that also save some time for invalid ui to check from teh database.


## Performance Optimization:
- for the perfomacne i've make sure that
- add the indexing purpose which use to query a any data with teh faster time.
- Add the lazy loading and also the suspense loading for only fetch data when needed dont' request to server when don't need that.
- use the useContext for centralize  for the check a whether a user is verifed, logged in and the user role.
- Used the Pagination for the preofmrance optimization for the jobs specifally.
- i make sure indexing a search query that also do the faster operation.
- i've optimzed my signup of the: `dns/promises` using a library of in build to verify a whether the given user email domain is valid or nto before even try to send a mail.
- with rather then chekcing a entire select statement i've used a: `select exists(select 1)` which can be used for condition match return true and don't fetch all else false which also imporove the perofmaance of the system.



## Sclabality Considration:
- for the scalabity considertation it's a very scalabel system.
- with done the proper api versisong and teh follow the mvc (mrc) pattern for buildign a rest architecture.
- With have the global error handling on the both client and server error event if it's error occured it'll catch and dont' crash a system on teh both side.
- Use the postgres full text search which which use the gin index for search any jobs, which bypass a prefix searhc from teh: `ilike` dbms
-  on the every request it's sending a correct message as well with also the correct status code which range from 200, 400, 500.
- check teh multiple command such as join, group by, nested query witht eh : `explain analyze` for the perofmance analysis which can have the faster query.
- 

## Known Issue:
- The Major Issue i've only faced on only on teh ui design.
- with only the minor patch issue face on the backend.
- while on teh frontend specially a tailwindcss have lot of known issue of  specifically a : `position, display`.
- as i've not idea about that sometimes postgresql: `$1` doesn't understand which at that time we've to use the template literal, but also ahve cons  of the sql injection attack that i also prevent from using the whetehr the given user input allowed or not.
- during a building a email template for the backend i've also face a lot of issue on there.
- One Issue that i sitll have is, for sending a mail, iv'et eh synchrounous, mean i'm not waiting for that request, as but when the email is invalid it's tryign to send a mail that still a issue.
 - i can use the `promise.all` which i'm plan to use for the better perofmace 
-  during the email resend token, i've to make sure send the updated token, rather i'm sending a old token.
- with i make sure to send the: `withCredntiatils` from the frontend on the every request which i use teh axios create function for sending at oncee.
- for sending a file i've to mandatory to send a file on the: `formData` which sometmes it becmoe a silent error.


## LImitation:
- as i'm using a everywher the free tier for database/MAU at one time, which is efficient for the smaller student level projects.
-

## Someting Go Beyong Featuers:
- i've make sure to dockerize my sytem with also ignore some files that dont' needed.
- as of now i only dockerize to teh nodejs, coming days might be also teh dbms let's see.
- also have the controller and also the abot feature if the request takes longer time dont' wat for more than  a 10 sec.
- now on the react 19 we dont' need: `auth.provider rather it also work a auth` 
- use the portal system for the popup of the some features.
- for previous a page on the profile picturee of the resume to change it i can use: `createObjectURL` to print show it.
- add the vercel analytics for the get the stats about the frontend application.


## Future Improvemnts:
- add the feature of the getting a notification or the email when that company post a new job.
- also have the real time chat notification with the employers and the job seeker.
- Have teh midn to move from teh useContext to Redux, i'm flexible to work on teh redux but tis' due to the time constraint.
- Adding the log report to the system, with teh logs/monitororing/observablty.
- socker io feature for the real tiem whic i also plan
- Trying to make the ats socing for the any user profiel with their background jobs.
- user can add a their employment_history and shows that employment history to the user page, which is feasalbe now and also can add the new table of the education 
- inteview shechduling system with auomated email remainder and video call link generation from google clander api.
- resume parsing analysisx with exrrac skills education, ats.
- make the company alsert to send the email to the user about notificy their feed.
- make the notification page about inform user about latest events.
- profile completneess score based on the badged applicant top skilsl and active jobs seeker.
- real time chat between recuriters and the applicant.
- with for better optimizatino for te mainly edit option if user don't change anything from the input and just try to submit don't allow them as it's just wastinr a resoruces only allow after somthings chnage else cancel the action.


## Contributing:
