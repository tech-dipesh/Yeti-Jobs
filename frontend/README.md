## Yeti Jobs Frontend:
- Frontend of the Yeti Jobs platform built with React and Tailwind CSS, providing a responsive UI for job seekers, recruiters, and admins with role-based navigation and application management.
- The Frontend project started on: **2026/02/26**

## Features: 
- Authentication UI (login, signup, email verification)
- Role-based UI (job seeker, recruiter, admin)
- Job search with debounce
- Apply / withdraw applications
- Bookmark jobs
- Profile management (skills, resume, image upload)
- Company dashboard (jobs, applicants, employees)
- Pagination and lazy loading
- Responsive design (mobile-friendly)
- ATS Scoring And Suggestion


## Techincal Highlights:
- Centralized API handling using Axios instance
- Custom hooks for data fetching
- Request cancellation using AbortController
- Debounce for optimized search
- Context API for global auth state
- FormData handling for file uploads
- Route protection based on user roles

## Ui Features:

- Responsive design for mobile and desktop
- Dynamic navigation based on user role
- Modal and popup system using React Portal
- Toast notifications for user feedback
- Pagination and search UI improvements


## State Managment:
## State Management

- React Context API for authentication state
- Custom hooks for shared logic
- Centralized state to reduce prop drilling


## Performance Optimization:

- Debounced search queries
- Request cancellation using AbortController
- Lazy loading components
- Pagination for large datasets


## Routing & Access Control:

- Protected routes for authenticated users
- Role-based route access (admin, recruiter, user)
- Redirect to original page after login




## API:
Uses backend APIs available at:
https://yeti-jobs.onrender.com/api/v1


## Setup:
- cd frontend  
npm install  
npm run dev  

App runs on: http://localhost:5173


### Frontend Setup:


## UseFul NOtes That I Learneed:
- - Another concept I learned: to access `.env` content, it must start with `VITE` (capitalized).
- - GET methods don't send a body, so for login I used POST routes.
- I used `withCredentials` to store the token from the backend.
- Created custom `useFetchData` hook for Axios.
- Used `AbortController` to cancel requests.
  - Pass `{ signal: controller.signal }` to request.
  - Check with `!axios.isCancel(error)` for cleanup.
- For IIFE functions, used `;` to separate.
- For page navigation backward: `navigate(-1)`
- For resume upload, sent content via `FormData` (Axios didn't handle it properly initially).
- Used custom hooks for both each job and all jobs.
- Added `isUserLoggedIn` and `isOwner` middleware.
- Implemented update job with skills feature.
- Implemented delete and new job features.
- In React 19, don't need `Auth.Provider` — directly use `Auth`.
- If sending as group, I included name prop; otherwise omitted during input component
- Used custom hook with useContext (for auth data fetching).
- Used Link and iframe for resume and profile photo upload.
- For company dashboard, removed explicit ID — direct navigation.
- For text truncation: used `line-clamp-2`.
-  

## Future Features:
1. Company can change applicant status
2. Socket.io for real-time notifications



## Card Styling:
```html
<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <div class="rounded-lg bg-slate-700 p-6">
    <h2 class="mb-2 text-xl font-semibold text-gray-800">Value</h2>
  </div>
</div>
```

- `mx-auto` or `self-center` centers content in flex.
- Confirmation dialog: `fixed inset-0 top-0 flex`.

---

## UI Upgrades:
- Role `recruiter` must have `company_id` not null.
- Improved UI for all owned jobs.
- Centered dashboard content.
- Applicant list navigation fixed.
- Header shows correct options based on role.
- Added "Go Back" button to dashboard pages.
- Applicant status update implemented.
- Responsive applications page.
- Fixed company employees page and empty components.
- Added missing fields: experience years, job type in new job form.
- New job form has complete UI.
- All applied jobs page: improved top bar, empty component.
- Added admin icons from react-icons.
- Fixed card width from `w-82` to `w-full` to respect grid gaps.
- Profile popup closes when clicking Homepage or profile.
- Fixed login/signup buttons when user not logged in.
- Fixed spelling error: `jaon` → `json`.
- Empty components now responsive for mobile.
- Added pagination with limit and offset.
- Added back button on reset password page.
- Improved each jobs page UI.
- Apply/withdraw logic fully working.
- Implemented user search with better UI.
- Added portal for new skill popup.
- Profile page now shows email, skills popup, education.
- Used `revokeObjectURL` for image cleanup.
- Fixed minor link errors on resume/profile.
- Fixed signup page missing name field.
- Removed problematic trigger that auto-set recruiter.
- Fixed header to show appropriate options for unverified users.
- Added route protection: only recruiters can visit employee pages.
- New company form made responsive.
- Edit company UI improved.
- Added confirmation popup for delete actions.
- Added verified/unverified status in header.
- Fixed skills overflow on all users page.
- Added toast messages for all errors/successes.
- Auto-focus on search input.
- Load more/less on job description fixed.
- Fixed applicant list link to correct ID.
- Added missing "Visit Company" page link.
- Fixed input layout on companies page.
- Added `expired_at` to client side.
- Conditional check for `isEmployee`.
- Followers shown only for users, not companies.
- Fixed hard refresh on application status update.
- Added dollar sign for salary.
- Added modal for job application.
- Added share feature for companies.
- Redirect user after login back to original page.
- Fixed 204 status on withdraw (no data response).
- Added new logo created in Canva.
- Header Profile Ui Changed a Lot
- Improve the Add Resume Page With Better ui
- Added a phone number on the Edit User of new ui with the new library
---

## Portal:
- For popup positioning issues, used Portal.
- Steps: `createPortal(<div/>, document.getElementById("portal"))`
- HTML: `<div id="portal"></div>`

---

## More Features:
- For profile picture: used `URL.revokeObjectURL` to clean old image, `URL.createObjectURL` for new.
- Added Vercel Analytics for frontend stats.

## Libraries Used:
1. **axios** – data fetching
2. **tailwindcss** – styling
3. **fontawesome** – icons
4. **react-spinners** – loading indicators
5. **react-icons** – additional icons
6. **react-toastify** – toast alerts
7. **date-fns** – date operations (to be removed)
8. **@vercel/analytics** – frontend stats and visitor count