import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import useFetchData from '../hooks/useFetchData'
import { logoutUser } from '../api/auth.user'
import { useAuth } from '../context/Authcontext'
import { faArrowRotateRight, faBars, faBriefcase, faMagnifyingGlass, faUser, faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Linkcomps from './common/Linkcomps'
import { GrUserAdmin } from 'react-icons/gr'
import LogoRounded from "../assets/logo-rounded.png"
export default function Header() {
  const navigate = useNavigate()
  const { execute } = useFetchData(logoutUser);
  const [profile, setProfile] = useState(false)
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const LogoutPage = async () => {
    await execute()
    navigate(0)
  }

  const { data, error, reexecute } = useAuth();
  const { userVerified, uid, role } = data ?? {};
  const allUserLinks = data ? (role == 'guest' ?
    [
      { value: 'Visit Your Profile', link: `users/${uid}/profile` },
      { value: 'All Jobs', link: `/jobs` },
      { value: 'All Bookmarks', link: `/jobs/bookmarks` },
      { value: 'Get All Applied Jobs', link: `/applications/me` },
      { value: 'All Companies', link: `/companies/all` },

    ] : role == 'admin' ? [
      { value: 'Admin Dashboard', link: `admin/dashboard` },
      { value: 'Assign User To Companies', link: `admin/users/assign` },
    ] : role == 'recruiter' ? [
      { value: 'Dashboard', link: `companies/dashboard` },
      { value: 'Create New Job', link: `jobs/new` },
    ] : error == "Please Verify Your verification code." ? [
      { value: 'Verify Email', link: `auth/verify-email` },
    ] : []
  ) :
    [
      { value: 'Login', link: `/auth/login` },
      { value: 'Signup', link: `/auth/signup` }
    ]


  const userProfile = <>{
    uid && <div className='relative'>
      <FontAwesomeIcon icon={faUser} onClick={() => setProfile(!profile)} size='2x' className='bg-slate-900 h-32 w-32 rounded-full cursor-pointer flex justify-center items-center' />
      {profile &&
        <nav className='absolute top-12 right-4  bg-gray-500 shadow-lg rounded-lg p-4 w-32 border z-50 justify-center'
        //  onClick={()=>setProfile(!profile)}
        >
          <span onClick={() => setProfile(false)}><Linkcomps to={`/users/${uid}/profile`} content='Your Profile' /></span>
          <FontAwesomeIcon icon={faArrowRotateRight} onClick={() => reexecute()} className='cursor-pointer justify-center' />
          <div className='flex'><span className='px-2'>You're:</span><span className=''> {role == 'recruiter' ? <FontAwesomeIcon icon={faBriefcase} /> : role == 'admin' ? <GrUserAdmin /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}</span></div>
          <span><FontAwesomeIcon icon={userVerified ? faUserCheck:faUserXmark} color={userVerified ?'green': 'red'}/>Verified</span>
          <Link to='/' onClick={LogoutPage} className='block py-2 hover:underline'>
            Logout
          </Link>
        </nav>
      }
    </div>
  }
    {error == "Please Verify Your verification code." ?
      <div className='mx-4 flex gap-4 space-4'>
        <Linkcomps to={'/auth/verify-email'} content={'Verify Email'} />
        <Linkcomps onClick={LogoutPage} to={'/'} content='Logout' />
      </div> :
      (!uid && error)?
      <div className='mx-4 flex gap-8'>
      <Linkcomps to='/auth/login' content={'Login'} />
      <Linkcomps to='/auth/signup' content={'Signup'} />
      </div>: null
    }
  </>

  const allNavLinks = <div className=' hidden md:flex lg:flex gap-7 ml-auto items-center'>
    {role == 'guest' &&
      <>
        <Linkcomps to={'/jobs'} content='Jobs' />
        <Linkcomps to={'/jobs/bookmarks'} content='Bookmarks' />
        <Linkcomps to={'/applications/me'} content='Get All Applied Jobs' />
        <Linkcomps to={'/companies/all'} content='All Companies' />
      </>
    }
    {userProfile}
  </div>

  const allCompanyLinks =
    <nav className='hidden md:flex lg:flex gap-7 ml-auto items-center'>
      {role == 'admin' ?
        <>
          <Linkcomps to='admin/dashboard' content={'Admin Dashboard'} />
          <Linkcomps to='admin/users/assign' content={'Asssign User To Companies'} />
        </> :
        role=='recruiter'?
        <>
          <Linkcomps to='companies/dashboard' content={'Dashboard'} />
          <Linkcomps to='jobs/new' content={'Create New Job'} />
        </>: null}
      {userProfile}
    </nav>

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
