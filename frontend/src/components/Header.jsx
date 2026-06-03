import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router'
import useFetchData from '../hooks/useFetchData'
import { logoutUser } from '../api/auth.user'
import { useAuth } from '../context/Authcontext'
import { faArrowRightFromBracket, faArrowRotateRight, faBars, faBriefcase, faMagnifyingGlass, faUser, faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Linkcomps from './common/Linkcomps'
import { GrUserAdmin } from 'react-icons/gr'
import LogoRounded from "../assets/logo-rounded.png"
import {allAuthRoutes} from "../Data/UserArray"
import { Bell } from "lucide-react";
export default function Header() {
  const {pathname}=useLocation();
  console.log(pathname==='/auth/login' || pathname==='/auth/signup'?"Yes": "No");
  const navigate = useNavigate()
  const { execute } = useFetchData(logoutUser);
  const [profile, setProfile] = useState(false)
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const LogoutPage = async () => {
    await execute()
    navigate(0)
  }

  const { data, error, reexecute,url} = useAuth();
  const { verify, uid, role } = data ?? {};

  const allUserLinks = role === 'guest' ? [
    { value: 'Visit Your Profile', link: `users/${uid}/profile` },
    { value: 'All Jobs', link: `/jobs` },
    { value: 'All Bookmarks', link: `/jobs/bookmarks` },
    { value: 'Applied Jobs', link: `/applications/me` },
    { value: 'All Companies', link: `/companies/all` },
  ]
    : role === 'admin' ? [
      { value: 'Admin Dashboard', link: `admin/dashboard` },
      { value: 'Assign User To Companies', link: `admin/users/assign` },
    ]
      : role === 'recruiter' ? [
        { value: 'Dashboard', link: `companies/dashboard` },
        { value: 'Create New Job', link: `jobs/new` },
      ]
        : verify === false ? [
          { value: 'Verify Email', link: `auth/verify-email` },
        ]
          :!(allAuthRoutes.includes(pathname))?
            [    { value: 'Login', link: `/auth/login` },
              { value: 'Signup', link: `/auth/signup` },
            ]
            :            []

  const roleIcon = {
    recruiter: <FontAwesomeIcon icon={faBriefcase} />,
    admin: <GrUserAdmin />,
    guest: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  }

  const userProfile = (
    <>
      {uid && (
        <div className='relative'>
          <div 
            onClick={() => setProfile(!profile)}
            className='bg-slate-900 h-10 w-10 rounded-full cursor-pointer flex justify-center items-center overflow-hidden'
          >
            {url ? (
              <img src={url} alt="Profile" className='w-full h-full object-cover' />
            ) : (
                <FontAwesomeIcon icon={faUser} size='sm' className="text-white" />
              )}
          </div>          {profile && (
            <nav className='absolute top-14 right-0 bg-neutral-800 shadow-2xl rounded-lg p-2 w-52 border border-neutral-600 z-50 flex flex-col gap-1'>

              <div className='px-3 py-2 border-b border-neutral-600 mb-1'>
                <p className='text-xs text-neutral-400 uppercase tracking-widest mb-1'>Signed in as</p>
                <div className='flex items-center gap-2'>
                  <span className='text-white font-semibold capitalize text-sm'>{role}</span>
                  <span className='bg-blue-600 p-1 rounded-md text-white text-xs'>
                    {roleIcon[role]}
                  </span>
                </div>
              </div>

              <span
                onClick={() => setProfile(false)}
                className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-700 cursor-pointer text-slate-200 text-sm transition-colors'
              >
                <FontAwesomeIcon icon={faUser} className='text-neutral-400 w-4' />
                <Linkcomps to={`/users/${uid}/profile`} content='Your Profile' />
              </span>

              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm
${verify ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}
              >
                <FontAwesomeIcon icon={verify ? faUserCheck : faUserXmark} className='w-4' />
                <span>{verify ? 'Verified Account' : 'Not Verified'}</span>
              </div>

              <button
                onClick={reexecute}
                className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-700 text-slate-200 text-sm transition-colors w-full text-left'
              >
                <FontAwesomeIcon icon={faArrowRotateRight} className='text-neutral-400 w-4' />
                <span>Refresh Session</span>
              </button>

              <div className='border-t border-neutral-600 my-1' />

              <Link
                to='/'
                onClick={LogoutPage}
                className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-200/20 text-red-400 text-sm transition-colors'
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='w-4' />
                <span>Logout</span>
              </Link>

            </nav>
          )}
        </div>
      )}

      {error?.login === true && error?.verify === false ? (
        <div className='mx-4 flex gap-4'>
          <Linkcomps to='/auth/verify-email' content='Verify Email' />
          <Linkcomps to='/' onClick={LogoutPage} content='Logout' />
        </div>
      ) : !uid && (
          <div className='mx-4 flex gap-8'>
            <Linkcomps to='/auth/login' content='Login' />
            <Linkcomps to='/auth/signup' content='Signup' />
          </div>
        )}
    </>
  )

  const guestNavLinks = (
    <>
      <Linkcomps to='/jobs' content='Jobs' />
      <Linkcomps to='/jobs/bookmarks' content='Bookmarks' />
      <Linkcomps to='/applications/me' content='Applied Jobs' />
      <Linkcomps to='/companies/all' content='All Companies' />
    </>
  )

  const adminNavLinks = (
    <>
      <Linkcomps to='admin/dashboard' content='Admin Dashboard' />
      <Linkcomps to='admin/users/assign' content='Assign User To Companies' />
    </>
  )

  const recruiterNavLinks = (
    <>
      <Linkcomps to='companies/dashboard' content='Dashboard' />
      <Linkcomps to='jobs/new' content='Create New Job' />
    </>
  )

  const allNavLinks = (
    <div className='hidden md:flex gap-7 ml-auto items-center'>
      <Link to={"/notifications"}> <Bell className='cursor-pointer'/></Link>
      {role === 'guest' && guestNavLinks}
      {userProfile}
    </div>
  )

  const allCompanyLinks = (
    <nav className='hidden md:flex gap-7 ml-auto items-center'>
      {role === 'admin' && adminNavLinks}
      {role === 'recruiter' && recruiterNavLinks}
      {userProfile}
    </nav>
  )

  return (
    <div className='mt-1 sticky top-0 z-50 md:w-screen sm:w-screen w-full overflow-y-visible flex justify-end items-center px-4 py-4 bg-neutral-700'>
      <header className='flex w-full overflow-y-visible font-semibold items-center justify-between'>
        <Link to={'/'} onClick={() => setProfile(false)}><img src={LogoRounded} className='h-8 w-8' alt="Profile" /></Link>
        <div className='flex md:hidden items-center justify-center'>
          <div className='flex md:hidden items-center'>
            <FontAwesomeIcon icon={faBars} className='cursor-pointer text-white text-xl' onClick={() => setIsMobileMenu(!isMobileMenu)} />
          </div>
          {isMobileMenu &&
            <div className='absolute top-full left-0 w-full bg-neutral-800 md:hidden'>
              <nav className='flex flex-col p-2'>
                <Link to={"/notifications"}> <Bell className='cursor-pointer flex justify-center h-12 align-middle ml-8  relative'/></Link>
                {allUserLinks.map(({ value, link }, i) => (
                  <NavLink key={i} onClick={() => setIsMobileMenu(false)} to={link}
                    className={({ isActive }) =>
                      `w-full px-4 py-3 rounded-md transition-colors duration-200 font-medium ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                  >
                    {value}
                  </NavLink>
                ))}
                {uid && <NavLink onClick={LogoutPage} className='w-full p-3 rounded-md hover:bg-slate-500'>Logout</NavLink>}
              </nav>
            </div>
          }
        </div>
        {role == 'recruiter' || role == 'admin' ? allCompanyLinks : allNavLinks}
      </header>
    </div>
  )
}
