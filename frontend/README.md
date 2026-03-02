# Frontend Project:
- the proejct is started on: 2026/02/26


## frontend projects:
- when using teh children property i must use the: `outlet` on the app.
- as it's another concnetp that i''ve learn is for accessing a .env content i must start with: `vite` then i only can access a vite cotnte. with also must be the: `VITE` capital
- i make sreut that it only rerender when the jobid is changed.
- now i've change on the backend of validate a uid.
- now i also start for login signup flow.
- get method doesn't send anything on the body so for login i've to make the post rotues.
- i make sure that with: `withCredentiasls` store the token from the backend.
- i've also setup all teh signup feature here.

- i make sure to create a new separate page for each data validation on the frontend.
- the one major issue that i'm sendina  requeest to the: `login instead of verify`  

- axiosi instance that i'll be usin ght `services` fodler.


- i've created al the routes api connect of the users.
- now i'm trying to createe all the users list.
 - also with moving app.jsx homepage content ot the another page.
- created the separate indivua page like profiel picture url.
- add the user skills setup.

<!-- all backend route -->:
- applications: `lists, id/apply, id/withdraw, `
- companies: `/, id/dashbaord, id/employees, id/jobs, id/applications, id: get company all, id: post new company, / delete company, /id put new company`
- jobs: `saved_jobs/list, id/bookmark_job, id/remove_from_bookmar, /: all listing, /search, id/ particular listing jobs, id: new jobs, id/ deelete, /id update`
- users: `/logout, /login, /signup, /: all user, /:id individual user details, /skills add the user skills, /id, delete a user, /put, update user, /patch, update particular list, /forget-password, /forget-password-verify, /verify, /verify/resend, /upload-resume, /upload-profile-picture`


2026/02/28:
- update verify code and other logic.
- now i will be creatng a `lib` folder where i'll create one axios instance and use everywhere.


>:warning: i'll create the custom hooks of queryData for axios fetch data.
- i also make sure to use the axios new Abortcontrolle when user is abort a controller,
  - for sending a reuqest: `controler new AbortControll`
 and cancel with on the catch we've to send with the axios request like this: `{signal: controler+signal}` 
  - with check: `if(!axios.isCancel(error)) check`
  - cleanup method we can do with: `controller.abort()`

- we also can use: `iifeo` we can use the semicolon.
02/29
- i'm workion gon the backend.
- also minor change on th backendof patch a user.


- for navigate on page backward: `navigate(-1)`
- make my children route on teh main.jsx
- on the upload resume i'm sending a content through a : `formData` with axios not able to send it.
- also on teh api i've wrap on `object `which cause the erreror.
- also the resume hwich i've done creaging it will have a link tag.

- i've also use a custom hooks and function on both each jobs and the all jobs.
- i've faced a minor error of spelling: `bookmars` which cause data fetching another app.


- i've add the middlerare of isUserloggein and isOwner middleare.
>:warning: i shouldn't keep a setvalue initially on the normal flow should add on teh effect to not reerender too many.
- i also make sure that the pass a ... value so it can recieve a data.
- i've also impleemte a update a jobs with skills  features.
- now i will make sure to implmement a deleete features and 
- now i've done creatinga  delete feature now i will work on new Job features.

- with new jobs wrorkign perfely.

## The Input Comps:
- on the input comps i've make a way if i sendging on the group i'm sending also a name else not sending.
- now i'll be implmenet a debounce throutle.




## Libraries Used:
1. axios: for data fetching:
2. tailwindcss: for styling