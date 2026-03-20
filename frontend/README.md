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
  - on react 19 i don't need to wite: `auth.provider` directly: `auth`


  - with now enw logic with the navigate provide a way to where we left off can go again back there.
  - also now i'm using a custom hook also the useContext. where useContext i already have the logic for use data fething.
  - i've add all the 4 things on teh application apply, withdraw, see all your application and all appied things.


  ## New Data:
  - the better appraoch on teh login system, is store the output as data cant' be updated instantly and redirect homepage and again refresh a data.

  - with the help of the Link and the iframe i make sure resume and profile photo can upload 
  - on the company dashboard i now don't give the id, just directly goes to the dashboard.


  ## Election Day:
  - i'm addinga  fontawesome for the adding a icons, have to add teh library for using it: `@fortawesome/react-fontawesome, @fortawesome/free-solid-svg-icons`
  - i've nto done much of teh things day afer election day due to election news.


  - also makre sure i added a 2 exrta info on teh companies of locationand the founded_year,
- i've ad the loading feature and update to the every page.
- alter my postgres table with add the role types to `recruiter`


  ## More:
  - for the line truncation of the any content or split a line we can use: `line-clamp-2`
  - add the better ui of the resume and profle picture.
  - it has both method of the pagination and also the deobounce method for the searching.
  - i've add the assignUserToCompanies with three api interact with the backend, .
  - also make sure hav ethe interacperts or middleware which we can called the outlet that on teh isAdmin, isOwnedUser, and isLoggedinUser so that user can only redirect to routes that they have access.
  - with i make sure it have some level of responsive design nto that depth but very basic should not broke something when user ivsit fro the mobile.
  - now the next features that i'm planing is two features: `the companies person can change the user applied status and also will implement teh socket io features for real time notification system.`
  - implement hte fature of the company owener person can change the status of user applied.
- with i add one more routes on teh admin dashboard for differnete paeg.

## The Card Stylying:
```html 
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <div class="rounded-lg bg-slate-700 p-6">
    <h2 class="mb-2 text-xl font-semibold text-gray-800">Value</h2>
  </div>
```

- the: `mx-auto or self-center` make a center content on the flex.
- with i add teh confirmation like any page with the dialog bar with the: `fixed inset-0 top-0 flex` make the top of the page 


## Ui Upgrade:
  Done Following Ui Upgrade on the page
with i make sure that if the role is recutier it must have company_id then is not null.
  - with all owned jobs i've improve some minor ui.
  - make the dashboard to cente of all teh contnt.
  - with make all jobs applicant point to the correct area.
  - and the header option should see a valid option.E
  - add the go back option to all 3 page on the dashboar page.
  - make sure to have a valid status option and user can change a status.
  - repsonsive page of teh all application status.
  - fix the company employees with also minor change on thee empty comps and add a back option 
  - i've not added the experince years field on teh new job and also the job type which i missed now i'm adding.
  - the new job will have the compelelty different ui which i've make the prototype and worked around that.
  - entire new jobs system have with the best uid.
  - all applied jobs user site, is better top bar with empty comps add.
  - add the icoicons of the admin icons from react icons.
  - empty comps on the job applicant add.
  - make the w-82 to full as it's need to take full space and giving a gap.
  - where on the header if i click on profile or homepage that popup bar should be closed.
  - both the login and the signup button broken is fix with single line two line from the repsonsive design.
  - which login signup page is not coming when user it not loggd in the header which also i fix that.
  - for i've to login again twic eis the minor spell error of: `jaon` which i've not noticed. 
  - i've make a empty comps of the two liner on the mobile phone.
  - get all applied ui is now make a repsonsive page.
  - with the page limti and the offest i've able to make the pagination system with very good thining.
  - - add the go back to login page on the reste password page. which i also add to the each jobs.
  - with the apply jobs i've chanage hte entire loooks of the page, and now i'm trying to fix a problem inside a edit job.
  - also update the edit jobs which have the logical error not all value are there.
  - with edit jobs also finished now lets' see other content to fix.
  - with both applie jobs and withdra jobs i've both make a logic for that.
  - with the each jobs page become a very good ui,
  - now i will make the page of responseive of the each page.
  - with the apply jobs and withdraw and all applied list also comes on the center of the page.
  - with backend where i've nto send a request on the withdraw and appply and also on the update jobs i've nto setup a location and experience years i've setup all that.
-  with apply and withdraw and edit delete all the logic is working now. all loic is working now.
- now i've move forwared to the user search with the better ui.
- add the portal to the add the new skills page.
- with a profile is set perfectly with the better uurl.
- the email is better visisble with the add skilsls is become a new popp page with cance button.with like who you are also have impoove i with teh education si also comes with the better styleying.
- on the profile pic page it'm restructuringe everthing with showing the more details.
- on the upload image everything have perfecet with, with: `revokeObjectUrl` learn some small things .
- with i make sure on the upload a resume and the pofile picture are almost same just hte iframe different.
- and also i fix minor link error on the resume and profile picture.
- minor change on the profile of the edit profile link.
- on the signup page i've forget to give the naeme which is not able to track ght education.
- which i've delete a one trigger which set to recruiter i don't need that it cause lot of problem to me.
- with the is user is not logged in or not i've done minor change.
- where one logical errorr that is addedd a trigger on the role become a recruiter but condition i didn't add add which become to the every new page took lot of time to fix a bug.
- with on the header i've also add the option.
- with on the backedn whih i've not added the payload which i've added to it.
- with the on resend once user is verify i can redirect to the homepage user.
- redirect to user on the verify when user is not logged in.
- with also i've add the go back page on the verify code.
- add all applied jobs added to the header.
- now on the empty filter tha tthe filter option i will not added as it's empty.
- change teh entier style of the search list with lof of stylying.
- minor change ont eh seach jobs which have grid 3 property.
- theres' the naming which i'm giving: `exists but on code it's is_verified` which makes a conflict lukily i fixed that.
- which edit user is now fix with the good ui level
- add the empy comps of all the applicant which also add on the company jobs all .
- all employees make hte center of the paeg.
- fix when user is not logged in show appropirate header and for not verify user and verify user.
- add one more routes for separate a admin page.
- and also i valid on teh isemployee only recireter can visite the page.
- new company entire is changed to make a repsonseive also teh upload resum make the better with the center a content.
- the edit company, is also make the flex with also the header is more improved version.
- with on the all companies that i've the confirm button which i will be wrap to the popup system.
- improve a lot on the single company and the company comps which are mix and also add the popup box on there for delete a action.
- with add the popup bar and children move any content that are replacable.
- now i'm also adding whether that user is verified or not on the header bar.
- add the verified or nto verired on the user header bar.
- with also fetch a company_name for any job .
- the company comps i've fix all the sytlihg on teh company comps.
- make the better version of all jobs which now looks clean and readable format.
- set the toast message for th eevery error.re
- which is the success and error message will be both.
- enw companies have hte repsonive design.
- which now skills are not going outside of teh box on teh all user page which is issue on the registered users page.
- add the go back new component page.
-- i make sure on the toast i set to the useEffect Which only mount once and also one things that i added is there: `toatId` which make sure to only run once
- with also i added to the successs compes.
- also another one things that i added the autofocus mode on the search previusluy wihch it doesn't have.
- which the load more featurs on the companies have with the pagination i've done that.
- the laod more and load less on the eah description which have not on the correct style i fix that.
- mionr style change on the apply job and withdraw jobs.
- on the all applicant list, i've a link to the applicant uid rather it should be the job id.
-    - the single company where from all the companies i've to link to the visit company page which other have but visit company doesn't have.
   -  remove the https://on the all companies page.
 - and the input, page of the companies ui the input is also comes on the one line which i've to fix it.
- with assign user to companies minro brake on the mobiel fix that.
- add new go back component page.

- add everywere the expired_at to the client side..
- just need the and condition for check whether a isEmployee or not.
- the following only can shows on the users  not the company.
- make the hard refrsh on teh all application status.
- with dollar sign real add.
- with only rexecute data is valid. which causing the errror.
- one things that i add is the modal for apply a jobs.

- with change the icon to the simpel small page tnot eh entire ocmps.
- also add the shaer to the any particular company which i also make have a sharable features.
- make sure that i add from the logic where user coming from redirect themm after login
- also update on the veriy email where user is coming from.
- i've to make sure send non: 204 status on the withdraw applicatioon as 204 mean data will send nothing on the frontend.
- add the new logo that i create from the canva




- change the email template logo to the new logo
- give the name to: `yetijobs.com`
- remove the inline search on homepage which don't have any representation.
- change the version to: `0.0.1`
- with not found page i make sure to add the appripate message and lot better ui.




## Portal:
- as for the popup which is the major problem of the posotion indexing which is the better solution of the portal.
- which portal will have the separate html index contnet we just wrap everything to that.
- with following three step process: `return createPortal(<div/>, document.getelementById("portal"))` 
  - ```html <div id='portal'/>```

## More Features:
- with on the profiel picture option i've also make sure to add the previosu page of the previous page with the: `URL.revokeObjectURL` REmove Old and add new object with: `URL.createObjectURL`



## Future Features That I Would Like to Work But Not Feasable From My Current Knowldege:
- Trying to make the ats socing for the any user profiel with their background jobs.
- user can add a their employment_history and shows that employment history to the user page, which is feasalbe now and also can add the new table of the education 
- inteview shechduling system with auomated email remainder and video call link generation from google clander api.
- resume parsing analysisx with exrrac skills education, ats.
- make the company alsert to send the email to the user about notificy their feed.
- make the notification page about inform user about latest events.
- profile completneess score based on the badged applicant top skilsl and active jobs seeker.
- real time chat between recuriters and the applicant.
-


  ## Libraries Used:
  1. axios: for data fetching:
  2. tailwindcss: for styling
  3. fontaswesome: for adding a icons
  4. react-spinners for the loading icon.
  5. react icons adding some not have font aweome icon.
  6. react-toastify: for adding the alert message for the better user interaction.
  7. date-fns: for perfomr a some acion on the date-fns. remove later.
  
  
  