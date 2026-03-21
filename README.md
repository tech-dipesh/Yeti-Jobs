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


### Companies Table:
- all the list of the companies which exist on the platform with their relvent other information.