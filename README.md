# Yeti Jobs:
A Scalable job portal built with the **PERN stack** that connects job seekers and recruiters with advanced search, application tracking, and role based access control.
Full stack Job Portal **Connecting** job **seekers** to recruiters with smart search, built with PERN stack, scalable job posting, resume analysis, real-time application management.

<p align="center">
  <picture>
      <img src="frontend/public/logo-rounded.png" alt="Yeti Jobs" width="250" height='250'>
  </picture>
</p>
<p align="center">
  <strong>Climb your career like a Yeti climbs a mountain.</strong>
</p>

## Table of Contents:
1. [Overview](#overview)
2. [Screenshots](#screenshots)
3. [Demo URL](#demo-url)
4. [Tech Stack](#tech-stack)
5. [Architecture Overview](#architecture-overview)
6. [Folder Structure](#folder-structure)
7. [Environment Variables](#environment-variables)
8. [📦 Libraries Used](#libraries-used)
9. [Installation & Setup](#installation--setup)
10. [Docker Setup](#docker-setup)
11. [API Documentation](#api-documentation)
12. [Database Design](#database-design)
13. [Cron Task](#cron-task)
14. [Testing](#testing)
15. [Deployment](#deployment)
16. [Security](#security)
17. [Performance Optimization](#performance-optimization)
18. [Scalability Consideration](#scalability-consideration)
19. [Known Issue](#known-issue)
20. [Limitation](#limitation)
21. [Something Go Beyond Features](#something-go-beyond-features)
22. [Future Improvements](#future-improvements)


## Overview:
The Project is a Job Portal Platform **with** all the features needed to build a job portal platform, such as CRUD operations, **role-based** access control, jobs, companies, apply, withdraw, create a job, create a new company, admin controller, and a cron queue.
- The Project can be **built** as a production level project with some minor things to do.
## Screenshots:
<div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
    <img src="frontend/public/Documents/homepage.png" style="border-radius: 20px;" alt="Homepage" width="200" height="150">
    <img src="frontend/public/Documents/dashboard-employee.png" style="border-radius: 20px;" alt="Dashboard" width="200" height="150">
    <img src="frontend/public/Documents/jobs-ui.png" style="border-radius: 20px;" alt="All Jobs" width="200" height="150">
    <img src="frontend/public/Documents/profile-ui.png" style="border-radius: 20px;" alt="Profile UI" width="200" height="150">
    <img src="frontend/public/Documents/each-jobs-mobile.png" style="border-radius: 20px;" alt="Each jobs" width="200" height="450">
    <img src="frontend/public/Documents/repsonsive-ui-profile.png" style="border-radius: 20px;" alt="Responsive UI" width="200" height="450">
</div>

## Demo Url:
- Frontend: https://yeti-jobs.vercel.app
- Backend: https://yeti-jobs.onrender.com/api/v1/
- Backend Api Demo: https://yeti-jobs.onrender.com/api/v1/swagger


## Features:
### Job Seekers:
- Apply/Withdraw Job, Add/Bookmark
- Search Jobs
- Edit Profile And Other Credentials
- Add a Resume, Profile Picture
- View all jobs
- View all applicants
- All Companies List
- Individual Company jobs and Description About Company
- view Job

### Recruiters (Employees):
- Company Dashboard
- All Applicants
- See All Jobs
- See All employees
- See Profile
- Create/Delete/Edit a Job
- Update Company
- Change Applicant **Status**" 
- Get All **Followers** Company

### Admin:
- Assign User to companies.
- edit/delete/create/update Company
- Company Entire Overview dashboard
  
### Common:
- Authentication (JWT)
- Email Verification & password reset
- Role based access control.


## Tech Stack:
- Frontend:
  - React
  - TailwindCSS
- Backend:
  - Node.js
  - Express
- Database:
  - PostgreSQL
- Devops:
  - Docker


## Architecture Overview:
- The System follows a layered architecture:
  Client(React) -> API(Express) -> Service Layer -> PostgreSQL
- JWT-base authentication
- Modular services for jobs, applications, companies
- File storage via Supabase

<p align="center">
  <picture>
      <img src="backend/assets/supabase-schema.png" alt="Database Schema" width="250" height='250'>
  </picture>
</p>


## Folder Structure

### Backend:
- `app.js`: Main file Which Runs Our Server
- `controllers`: All our business Logic
- `Middleware`: custom Middleware between two middleware for security.
- `Models`: Data Validation
- `routes`: All Routes
- `services`: External Business Logic
- `utils`: Reusable Function
### Frontend:
- `api`: All the Api calling to the server request
- `assets`: Images to used on the project
- `auth`: Validate Data
- `components`: Reusuable components
- `context`: UseContext central state mangment
- `Data`: Form of array static data which used multiple places
- `hooks`: Custom hooks such as fetching a data.
- `lib`: Axios Default Api
- `pages`: Final Output pages that client will see:
- `services`: Reusuable Function.



## Environement Variables:
### Backend:
  - Postgres: Relational Database
    - USER
    - PASSWORD
    - HOST
    - DATABASE_PORT
    - DATABASE
  - SUPABASE: Used to Host our Files
    - URL_SUPABASE_CONNECT
    - ANON_KEY_SUPABASE
  - NODEMAILER: Send Mail To Customer
    - NODEMAILER_MY_EMAIL  
    - NODEMAILER_MY_PASSWORD  
  - JWT: JSON Web Token (JWT) for securely signed tamper proof information
    - JWT_SECRET_KEY:
  - COMMON:  Client URL to server that only **requests** port and also **how long** our cache should **be** stored"
    ```diff
    + CLIENT_BASE_URL=http://localhost:5173/
    - CLIENT_BASE_URL=https://yeti-jobs.vercel.app/
    ```
    - PORT
    - MAXAGE

### Frontend:
  - VITE_SERVER_URL: Server url which we'll send a request
    ```diff
    + VITE_SERVER_URL=http://localhost:3000/api/v1
    - VITE_SERVER_URL=https://yeti-jobs.onrender.com/api/v1/
    ```
## 📦Libraries Used

| Package | Version | Category |
| ------- | ------- | -------- |
| [![react](https://img.shields.io/npm/v/react.svg?label=react)](https://npmjs.com/package/react) | `19.2.0` | Frontend |
| [![axios](https://img.shields.io/npm/v/axios.svg?label=axios)](https://npmjs.com/package/axios) | `1.13.5` | Frontend |
| [![react-router](https://img.shields.io/npm/v/react-router.svg?label=react-router)](https://npmjs.com/package/react-router) | `7.13.1` | Frontend |
| [![react-icons](https://img.shields.io/npm/v/react-icons.svg?label=react-icons)](https://npmjs.com/package/react-icons) | `5.6.0` | Frontend |
| [![react-toastify](https://img.shields.io/npm/v/react-toastify.svg?label=react-toastify)](https://npmjs.com/package/react-toastify) | `11.0.5` | Frontend |
| [![react-spinners](https://img.shields.io/npm/v/react-spinners.svg?label=react-spinners)](https://npmjs.com/package/react-spinners) | `0.17.0` | Frontend |
| [![tailwindcss](https://img.shields.io/npm/v/tailwindcss.svg?label=tailwindcss)](https://npmjs.com/package/tailwindcss) | `4.2.1` | Frontend |
| [![express](https://img.shields.io/npm/v/express.svg?label=express)](https://npmjs.com/package/express) | `^5.2.1` | Backend |
| [![jsonwebtoken](https://img.shields.io/npm/v/jsonwebtoken.svg?label=jsonwebtoken)](https://npmjs.com/package/jsonwebtoken) | `^9.0.3` | Backend |
| [![bcryptjs](https://img.shields.io/npm/v/bcryptjs.svg?label=bcryptjs)](https://npmjs.com/package/bcryptjs) | `^3.0.3` | Backend |
| [![zod](https://img.shields.io/npm/v/zod.svg?label=zod)](https://npmjs.com/package/zod) | `^4.3.6` | Backend |
| [![helmet](https://img.shields.io/npm/v/helmet.svg?label=helmet)](https://npmjs.com/package/helmet) | `^8.1.0` | Security |
| [![express-rate-limit](https://img.shields.io/npm/v/express-rate-limit.svg?label=express-rate-limit)](https://npmjs.com/package/express-rate-limit) | `^8.2.1` | Security |
| [![cors](https://img.shields.io/npm/v/cors.svg?label=cors)](https://npmjs.com/package/cors) | `^2.8.6` | Security |
| [![multer](https://img.shields.io/npm/v/multer.svg?label=multer)](https://npmjs.com/package/multer) | `^2.0.2` | Upload |
| [![nodemailer](https://img.shields.io/npm/v/nodemailer.svg?label=nodemailer)](https://npmjs.com/package/nodemailer) | `^8.0.1` | Mail |
| [![node-cron](https://img.shields.io/npm/v/node-cron.svg?label=node-cron)](https://npmjs.com/package/node-cron) | `^4.2.1` | Jobs |
| [![pg](https://img.shields.io/npm/v/pg.svg?label=pg)](https://npmjs.com/package/pg) | `^8.18.0` | Database |
| [![cookie-parser](https://img.shields.io/npm/v/cookie-parser.svg?label=cookie-parser)](https://npmjs.com/package/cookie-parser) | `^1.4.7` | Middleware |
| [![dotenv](https://img.shields.io/npm/v/dotenv.svg?label=dotenv)](https://npmjs.com/package/dotenv) | `^17.3.1` | Config |
| [![@supabase/supabase-js](https://img.shields.io/npm/v/@supabase/supabase-js.svg?label=supabase-js)](https://npmjs.com/package/@supabase/supabase-js) | `^2.97.0` | Storage |



## Installation & Setup:
- To Run the System to a Local Server, we've to make sure have the muliple of systems for differnet purpose.
- Requirements: **Node.js**, Postgres Server, Supabase Keys, Nodemailer Keys

### Backend Configuration:
``` bash
  cd backend
  touch .env # Create Env File
  vim .env (Insert all the env keys on here)
```
- After inserting all the env keys
``` bash
npm i # Install all our node libraries
node app.js # Run our nodejs server
```


### Frontend:
``` bash
cd frontend
touch .env
vim .env
```
- Insert a: VITE_SERVER_URL on .env file.

``` bash
 npm i:  # Install all our node libraires
 npm run dev  # load our react page to browser
```

>:white_check_mark: your client page will run on the http://localhost:5173



## Docker Setup:
- Dockerbase have only one single container of the nodejs configuration.
- With Use the Image of the `node` image 
- in the coming time i'm plan to migrate my database to the dockrize.
- first Build the Image of The Nodejs Application:
  ``` bash
  cd backend
  docker build -t yeti-jobs-backend . # on current folder
  ```
- Now Run the Docker Container:
  ``` bash
  docker run -it 3000:3000 -d yeti-jobs-backend: # Run's on the backgound
  ```



## Api Documentation:
- Swagger UI: `https://yeti-jobs.onrender.com/api/v1/swagger`



## Database Design:
- For the Database Design, I made sure to have separation of concerns with only single tables doing a single task, not multiple.
<details>

<summary> Database Tables:</summary>
- applications
- companies
- email_verified
- jobs
- saved_jobs
- user_companies_follows
- users


### Application Table:
- The Table is mainly for **tracking** all **applied** jobs which have mostly user id and job id as a **foreign** key.
- with other relevant information such as: cover letter, notice period, expected salary, why we should hire you. **Two are mandatory** (cover letter, notice period) and the other two are optional

### Companies Table:
- all the list of the companies which exist on the platform with their relvent other information.
- with the routes of: `admin` which only accessible to the role of the admin.

### Email Verified Table:
- for track the email verified users, and also have the when user is try a forget password store a  on the database table of: `email_verified`.
- with the enum type whether email verify or forget password with link to the user id and the random code and relevent other information.

### Jobs Table:
- jobs is one of the most importatn table, which content lot of column on the single table.
- with the company id to the user id who created and other basic jobs such as title, desc, salary, type and lot more.

### Saved jobs Table:
- with user have the option to bookmark a any jobs.
- on the bookmark with foreign relation of the jobs and the user id and other relevent info.
### User Companies Follow or Followers Table:
- Following and followers features to only the guest role users can follow to the companies, and also only the `employees` can view all the followers list of the companies.

### Users Table:
- with the user info and also the role whehter the user is guest, admin or the recruiter.
- with the profile pic and also the resume have.
- education skills and the company id which only be valid for the enum recruiter.
- and lot of other information.
### Extra
- have a trigger and also the index operation on the database
- with the enum for the education, role and other information.
- Have the Muliple level of constraint/check to validate a inserted data with the data integrity.
- with also i use the `on delete cascase or on delete restrict` on the foreign relation if the foreign relation data is delete dshould we allow that linked data to be deleted or what.
</details>

## Cron Task:
- The cron task mean it'll run on that particular time which we've specified.
- the operation that I'm using cron for is on jobs which have an **expiry** time of 30 days, which checks every night at **midnight**.
- on the every noon cron node check which jobs time have expired or not if expired change the that job set to the closeed of is_job_active colum from `jobs` table.


## Testing:
- Currently Not implemnted.

### Planned:
- Unit Testing
- Integration testing(supertest)
- Focus on critical routes (auth, jobs, companies)


## Deployment:
- for the deployment i'm plan to use the `vercel` for the both frontend and the backend project.
- `render` for backend deployment with allow a connection pooler of ipv6 address.
- add a: `vercel.json` to make a serverlesss function.

### Database Migration:
- For Migrating to the `localhost` to the `supabase` it's done with only two steps.
- Where on the supabase we can get the: `DATABASE_URL` and where we can insert our project password on there.
- rather then giving port, user we only need to add the: `connectionString`
- And Also for unauthorized Access mean allow all our request we can allow to: `  ssl: {rejectUnauthorized: false}`
- which also the file uploades already integrated to the supabase.

### Backend:
- which for the backend previously only run's on our local server.
- Vercel also nowdays support the `express` framework with less steps and faster compare to the render.
- We've to add the: `vercel.json` for integrating also the backend

### Frontend:
- For the Frontend i will also use the: `vercel`.
- which doesn't have the complex structure easy to do it.


## Security:
- use **Helmet** for the response purpose which removes **X-Powered-By** so the client will not know which framework we've built with.
### validation Security:
- Every major table will have validation from Zod which **checks** the integrity of our data.
- beside the client side validate, server side validation, i also make sure to add the database validation.
- even if user bypass a both client and server validation it can't insert due to the database validation.
- With checking a text pattern, blank/undefined, correct data type, unique constraint,min length max length which are common for the data validation i've implemented.
- i make sure to every single data to enforce the database integrity.


### System Security:
- The Most important things that i added here is the rate limiting.
> Rate Limiting:
>> Rate limiting: 200 req/min globally
>>> Reset password: 2 req/min strictly
- use the helmet  for the reponse purpose which remove the `X-Powered` by that the client will not konw which framework we've build without this it'll show it build from the express.
  - Also have  one more feature  it's add 12 more responsive header, for better secuirty purpose of prevent from the `xss attack`.
- Use the `cors` library for only allow my client url dont' allow any external api endpoints which also have a better security feature for avoid a cross side attack.



### Middlewares:
- i make sure to validate every incomoning  request to the both cilent side and the server side have the middleware.
#### Client Validation:
- on the client validation guest can't visit the page of the admin dashboard and the other admin restricted page and also the employee restricted page.
- while the employees only restrict to perform a employee can't apply to the jobs or can't perform and also neither a guest or the admin action.
- admin which have little bit of the freedom but also enforce data on control integrity can't visit the page of the guest or the employee action.
#### Server MIddleware:-
- More than: 9+ middleware for server validation of custom middleware.
- With make the controller user action to the only isJobSekkker, companies contoller to the isEmployee and the admin contoller to the isAdmin.
- with i also validation whether the use is logged in or not, and also whether the user logged in but not verified, whether the user is owner of that routes or not, whether the user given a correct `uuid` which i also validaion that also save some time for invalid ui to check from the database.


## >:white_check_mark: Performance Optimization

### Database
>:white_check_mark: Added **indexing** on frequently queried columns for faster data retrieval
>:white_check_mark: Used `SELECT EXISTS(SELECT 1 ...)` instead of full `SELECT` statements for condition checks — returns `true/false` without fetching rows
>:white_check_mark: Indexed search query fields to ensure faster full-text or filter operations

### API & Server
>:white_check_mark: Validated email domains via Node's built-in `dns/promises` module before attempting to send mail — prevents unnecessary SMTP calls
>:white_check_mark: Implemented **pagination** for job listings to limit payload size per request

### Frontend
>:white_check_mark: Applied **lazy loading** with `React.lazy()` and `Suspense` — components and data are only fetched when needed
>:white_check_mark: Centralized auth state (verified, logged-in status, user role) using `useContext` to avoid redundant checks and prop drilling



## Scalablity Consideration:
- For scalability consideration, it's a very scalable system. - Done proper API versioning and follow the MVC pattern for building a REST architecture.
- with done the proper api versisong and the follow the mvc (mrc) pattern for building a rest architecture.
- With have the global error handling on the both client and server error event if it's error occured it'll catch and dont' crash a system on the both side.
- Use PostgreSQL full text search with GIN index for searching jobs, which bypasses prefix search from ILIKE
-  on the every request it's sending a correct message as well with also the correct status code which range from 200, 400, 500.
- check the multiple command such as join, group by, nested query with the : `explain analyze` for the performance analysis which can have the faster query.

## Known Issue:
- UI alignment issues (Tailwind CSS)
- Email Sending lacks a proper failure handling
- Token resend logic needs a improvment
- Making a token send mail: asynchrounous mail with have to wait rather i make just synchrounous
- with only the minor patch issue face on the backend.
- while on the frontend especially Tailwind CSS has known issues specifically with position and display.
- Sometimes PostgreSQL `$1` placeholder doesn't work as expected, requiring template literals, but this has SQL injection risks which I prevent by validating user input.
 - i can use the `promise.all` which i'm plan to use for the better performance 
- With i make sure to send the: `withCredntiatils` from the frontend on the every request which i use the axios create function for sending at oncee.
- For sending a file earlier it's sending from the state later, send a file to the: `formData`.


## Limitation:
- Have the Monthly Active Users on free tier database and the server and client which just efficient for student level project.
- Take a time to load our backend server when our sytem goes to sleep which is also the the downside of the system.
- Other Limitation as of now that it can't connect to the job sekker and hr directly just have user informatino such as email, name but not direct connection which i will be adding to it.


## Additional Features
- Dockerize a entire system with to the nodejs application and also docker ignore some files: `.dockerignore`
- also have the controller and also the abort feature if the request takes longer time dont' wat for more than  a 10 sec.
- now on the react 19 we dont' need: `auth.provider rather it also work a auth` 
- use the portal system for the popup of the some features.
- for previous a page on the profile picturee of the resume to change it i can use: `createObjectURL` to print show it.
- add the vercel analytics for the get the stats about the frontend application.
- With hr have the full control which use to reject which to move forward to the interview or the hired or rejected hr have full control.
- Add the List of the bruno all api endpoints link to convert to the swagger ui and add the endpoints of: `api/v1/swagger`

> [!NOTE]
> ## Future Improvements:
>-  Add notification/email when a company posts a new job.
> - Real-time chat between recruiters and applicants.
> -  Move from useContext to Redux. 
> - Add logging/monitoring/observability. 
> - Socket.io for real-time features.
> - ATS scoring for any user profile with background jobs queue.
> - interview scheduling system with automated email reminders and video call link generation from Google Calendar API.
> - User can add a their employment_history and shows that employment history to the user page.
> - List of the education history with the college cgpa and degree.
> - Resume parsing Analysis with extract skills education from: `pdf-parser` library.
> - Alert a user only to those which user followed their company with new jobs, must be the background jobs else it'll block the main block.
> - Add the notification page list about notified user about recent events, followed companies notification, recruiter viewed your resume.
> - profile completneess score based on the badged applicant top skills and how much active jobs seeker.
> - On the edit content page if user try to submit a content without any change don't allow them which reduce a less backend request.
> - Adding a phone number of the user that can send to hr when ur is accepted.
> - testing even it's not complete only the important routes to test in the coming days.
> - with on the deployment of details production vs development setup, also 
> - have to add the 50 dummy dat for the each list


<div align="center">

<div align="center">
  <a href="https://yeti-jobs.vercel.app">
    <picture>
      <img alt="Next.js logo" src="frontend/public/logo-rounded.png" height="128">
    </picture>
  </a>
  <h1>Yeti Blues</h1>
<a href="https://github.com/tech-dipesh/yeti-jobs/issues"><img alt="Request Issue on Github" src="frontend/public/Documents/readme-bar.png" height='50'></a>
</div>

## [Go Back To Top](#yeti-jobs)

## 🙏 Thanks 