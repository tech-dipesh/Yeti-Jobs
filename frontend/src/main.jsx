import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { RouterProvider, createBrowserRouter } from "react-router"

import ColorPaletteTester from './Colorsuggestion'
const Alluser = lazy(() => import('./pages/Admin/Alluser'))
const Individualuser = lazy(() => import('./pages/User/Profile'))
const Edituser = lazy(() => import('./pages/User/Edituser'))
const ProfilePhoto = lazy(() => import('./pages/User/addProfilePhoto'))
const Addresume = lazy(() => import('./pages/User/AddResume'))

const GetallApplied = lazy(() => import('./pages/Applications/GetallApplied'))
const Jobapplicant = lazy(() => import('./pages/Applications/JobApplicant'))
const AuthProvider = lazy(() => import('./context/Authcontext'))
const Allcompanies = lazy(() => import('./pages/Companies/Allcompanies'))
const NewCompany = lazy(() => import('./pages/Admin/NewCompany'))
const Singlecompany = lazy(() => import('./pages/Companies/Singlecompany'))
const Companydashboard = lazy(() => import('./pages/Companies/Companydashboard'))
const AllCompanyJobs = lazy(() => import('./pages/Companies/AllCompanyJobs'))
const Allapplications = lazy(() => import('./pages/Companies/Allapplicationscompany'))
const Resetpassword = lazy(() => import('./pages/User/Resetpassword'))
const IsEmployee = lazy(() => import('./components/auth/IsEmployee'))
const AllEmployees = lazy(() => import('./pages/Companies/AllEmployees'))
const Editcompany = lazy(() => import('./pages/Admin/Editcompany'))
const Isadmin = lazy(() => import('./components/auth/Isadmin'))
const Assignusertocompanies = lazy(() => import('./pages/Admin/Assignusertocompanies'))
const IsOwnerandloggedIn = lazy(() => import('./components/auth/isOwnerAndLoggedIn'))
const Admindashbaoard = lazy(() => import('./pages/Admin/Admindashboard'))
import Home from './pages/Home'
const Jobs = lazy(() => import("./pages/Jobs/Alljob"))
const EachJob = lazy(() => import('./pages/Jobs/eachJobs'))
const Login = lazy(() => import('./pages/User/Login'))
const Signup = lazy(() => import('./pages/User/Signup'))
const VerifyEmail = lazy(() => import('./pages/User/Verifyemail'))
const IsloggedinUser = lazy(() => import("./components/auth/isLoggedInUser"))
const AllBookmarks = lazy(() => import('./pages/Jobs/AllBookmarks'))
const EditJob = lazy(() => import('./pages/Jobs/EditJob'))
const Newjob = lazy(() => import('./pages/Jobs/Newjob'))
const Searchjobs = lazy(() => import('./pages/Jobs/Searchjobs'))


import Errorpage from './pages/Errorpage'
import Loading from './components/Loading'
import CompanyFollowers from './pages/Companies/CompanyFollowers'
import Notfound from './pages/Notfound'





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "verify-email", element: <VerifyEmail /> },
          { path: "forget-password", element: <Resetpassword /> },
        ]
      },
      {
        path: "jobs",
        element: <IsloggedinUser />,
        children: [
          { index: true, element: <Jobs /> },
          { path: "search", element: <Searchjobs /> },
          { path: ":id", element: <EachJob /> },
          { path: "new", element: <Newjob /> },
          { path: ":id/edit", element: <IsOwnerandloggedIn />, children: [{ index: true, element: <EditJob /> }] },
          { path: "bookmarks", element: <AllBookmarks /> },
        ]
      },
      {
        path: "users",
        children: [
          // { path: "all", element: <IsownerUser/>, children: [{index: true, element: <Alluser/>}] },
          { path: "all", element: <IsOwnerandloggedIn />, children: [{ index: true, element: <Alluser /> }] },
          {
            path: ":id",
            element: <IsloggedinUser />,
            children: [
              { path: "profile", element: <Individualuser /> },
              { path: "profile/edit", element: <Edituser /> },
              { path: "profile/profile-picture", element: <ProfilePhoto /> },
              { path: "profile/resume", element: <Addresume /> },
            ]
          },
        ]
      },
      {
        path: 'applications',
        element: <IsloggedinUser />,
        children: [
          {
            path: 'me',
            element: <GetallApplied />
          },
          {
            path: ':id/applylist',
            element: <IsEmployee />, children: [{ index: true, element: <Jobapplicant /> }]
          }
        ]

      },
      {
        path: "companies",
        element: <IsloggedinUser />,
        children: [
          { path: "all", element: <Allcompanies /> },
          { path: "followers", element: <CompanyFollowers /> },
          {
            path: "new",
            element: <Isadmin />,
            children: [{ index: true, element: <NewCompany /> }]
          },

          {
            path: "dashboard",
            element: <IsEmployee />,
            children: [
              {
                index: true,
                element: <Companydashboard />
              }]
          },
          {
            path: ":id/jobs",
            element: <AllCompanyJobs />
          },
          {
            path: ":id",
            element: <Singlecompany/>
          },
          {
            path: ":id",
            element: <IsEmployee />,
            children: [
              {
                path: "edit",
                element: <Editcompany />
              },
              {
                path: "applications",
                element: <Allapplications />,
              },
              {
                path: "users/all",
                element: <AllEmployees />
              },
            ],
          },
        ]
      },
      {
        path: "admin",
        element: <Isadmin />,
        children: [
          {
            "path": "dashboard",
            element: <Admindashbaoard />
          },
          {
            path: "users/all",
            element: <Alluser />
          },
          {
            path: "users/assign",
            element: <Assignusertocompanies />
          },
        ]
      },
      {
        path: "test",
        element: <Errorpage />
      },
      {
        path: "*",
        element: <Notfound />
      }
    ]
  }]);

//  { path: "dev/colors",  element: <ColorPaletteTester />}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </StrictMode>,
)
