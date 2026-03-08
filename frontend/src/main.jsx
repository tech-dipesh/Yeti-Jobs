import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { RouterProvider, createBrowserRouter } from "react-router"
import Jobs from "./pages/Jobs/Alljob"
import EachJob from './pages/Jobs/eachJobs'
import Login from './pages/User/Login'
import Signup from './pages/User/Signup'
import VerifyEmail from './pages/User/Verifyemail'
import ColorPaletteTester from './Colorsuggestion'
import Home from './pages/Home'
import Alluser from './pages/User/Alluser'
import Individualuser from './pages/User/Profile'
import Edituser from './pages/User/Edituser'
import ProfilePhoto from './pages/User/addProfilePhoto'
import Addresume from './pages/User/AddResume'
import AllBookmarks from './pages/Jobs/AllBookmarks'
import EditJob from './pages/Jobs/EditJob'
import IsloggedinUser from './components/auth/isLoggedInUser'
import IsownerUser from './components/auth/isOwnerUser'
import Newjob from './pages/Jobs/Newjob'
import Searchjobs from './pages/Jobs/Searchjobs'
import GetallApplied from './pages/Applications/GetallApplied'
import Jobapplicant from './pages/Applications/JobApplicant'
import AuthProvider from './context/Authcontext'
import Allcompanies from './pages/Companies/Allcompanies'
import NewCompany from './pages/Companies/NewCompany'
import Singlecompany from './pages/Companies/Singlecompany'
import Companydashboard from './pages/Companies/Companydashboard'
import Stats from './pages/Companies/Stats'
import AllCompanyJobs from './pages/Companies/AllCompanyJobs'
import Allapplications from './pages/Companies/Allapplicationscompany'
import Resetpassword from './pages/User/Resetpassword'
import IsEmployee from './components/auth/IsEmployee'
import AllEmployees from './pages/Companies/AllEmployees'
import Editcompany from './pages/Companies/Editcompany'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
          { path: "new", element: <Newjob /> },
          { path: "search", element: <Searchjobs /> },
          { path: ":id", element: <EachJob /> },
          { path: ":id/edit", element: <IsownerUser />, children: [{ index: true, element: <EditJob /> }] },
          { path: "bookmarks", element: <AllBookmarks /> },
        ]
      },
      {
        path: "users",
        children: [
          { path: "all", element: <Alluser /> },
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
        children: [
          {
            path: "all",
            element: <Allcompanies />
          },
          {
            path: "new",
            element: <NewCompany />
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
            path: ":id",
            element: <IsEmployee />,
            children: [
              {
                index: true,
                element: <Singlecompany />
              },
              {
                path: "edit",
                element: <Editcompany />
              },
              {
                path: "analytics",
                element: <Stats />
              },
              {
                path: "jobs",
                element: <AllCompanyJobs />
              },
              {
                path: "applications",
                element: <Allapplications />
              },
              {
                path: "users/all",
                element: <AllEmployees />
              },
            ],
          },
        ]
      },
    ]
  }]);
      
//  { path: "dev/colors",  element: <ColorPaletteTester />}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
