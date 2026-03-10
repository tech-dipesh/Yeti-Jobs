import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyDashboard } from '../../api/auth.companies'
import { Link, useNavigate, useParams } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import ButtonComps from '../../components/common/Button';

export default function Companydashboard() {
  const navigate=useNavigate()
   const {data:authdata, error:errdata, loading:loaddata}=useAuth();
  const { execute, data, error, loading } = useFetchData(getCompanyDashboard);
  useEffect(() => {
    // (async () =>{
    //   await execute()
    // })()
    execute()
  }, [])
  if(error=="You're not a employee of the company"){
    return navigate("/")
  }
  console.log('data', data)
  const {company_id, userVerified, role}=authdata ?? {};
  const {message}=data || {}
  return (
    <div>
         <div className='px-8 pt-8 pb-4 border-b border-neutral-700 mb-6'>
      <h2 className='text-3xl font-bold text-white'>Company Dashboard</h2>
      <p className='text-neutral-400 mt-1'>See Company All The Stats</p>
     </div>
      <h2>Welcome Back:</h2>
      {message && 
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-black'>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Jobs: {message?.total_jobs || 'N/A'}</div>
      <div className='bg-green-100 p-4 rounded-lg'>Total Applications: {message?.total_applications || 'N/A'}</div>
      <div className='bg-yellow-100 p-4 rounded-lg'>Open Jobs: {message?.open_jobs || 'N/A'}</div>
      <div className='bg-purple-100 p-4 rounded-lg'>Total Employees: {message?.total_employees || 'N/A'}</div>
     </div>
      }
      <Errorloading data={{error:errdata, loading:loaddata}}/>
      <Errorloading data={{error, loading}}/>
       {company_id && 
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          <Link to={`/companies/${company_id}/jobs`}><ButtonComps values='All Owned Jobs'/></Link>
          <Link to={`/companies/${company_id}/applications`}><ButtonComps values='All Applications'/></Link>
          <Link to={`/companies/${company_id}/users/all`}><ButtonComps values='All Employees'/></Link>
          </div>
        }
        {role==='admin' && 
        <>
        <Link to='/companies/all'><ButtonComps values='All Companies'/></Link>
        <Link to='/companies/new'><ButtonComps values='New Company'/></Link>
        </>
        }
    </div>
  )
}
