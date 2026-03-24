import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { Link, useNavigate } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import ButtonComps from '../../components/common/Button';
import { adminDashboardData } from '../../api/auth.admin';

export default function Admindashbaoard() {
  const navigate = useNavigate()
  const { data: authdata, error: errdata, loading: loaddata } = useAuth();
  const { execute, data, error, loading } = useFetchData(adminDashboardData);
  useEffect(() => {
    // (async () =>{
    //   await execute()
    // })()
    execute()
  }, [])
  if (error == "You're not a employee of the company") {
    return navigate("/")
  }
  const {role } = authdata ?? {};
  const { message } = data || {}
  return (
    <div>
      <div className='px-8 pt-8 pb-4 border-b border-neutral-700 mb-6'>
        <h2 className='text-3xl font-bold text-white'>Admin Dashboard Page</h2>
        <p className='text-neutral-400 mt-1'>Admin Entire System Dashboard</p>
      </div>
      <h2 className='text-gray-200'>Welcome Back On <strong className='text-white'>Admin</strong> Page:</h2>
      <Errorloading data={{ error: errdata, loading: loaddata }} />
      <Errorloading data={{ error, loading }} />
      <div className='grid grid-cols-1 md:grid-cols-4  gap-4 mb-8 text-black'>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Entire System Users: {message?.users_count || 'N/A'}</div>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Entire System Jobs: {message?.jobs_count || 'N/A'}</div>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Entire System Companies: {message?.companies_count || 'N/A'}</div>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Entire System Aplications: {message?.applications_count || 'N/A'}</div>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Entire System Saved Jobs: {message?.saved_jobs_count || 'N/A'}</div>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Entire System Email Verified: {message?.email_verified_count || 'N/A'}</div>
     </div>
      {role &&
        <span className='grid grid-cols-1 lg:grid-cols-3 my-4 gap-4 justify-items-center lg:justify-evenly'>
          <Link to='/companies/all'><ButtonComps values='All Companies' /></Link>
          <Link to='/companies/new'><ButtonComps values='New Company' /></Link>
          <Link to={`/admin/users/all`}><ButtonComps values='All Users' /></Link>
        </span>
      }
    </div>
  )
}
