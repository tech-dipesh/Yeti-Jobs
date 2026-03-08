import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyDashboard } from '../../api/auth.companies'
import { Link, useNavigate, useParams } from 'react-router';
import Errorloading from '../../components/Errorloading';
import { useAuth } from '../../context/Authcontext';
import ButtonComps from '../../components/Button';

export default function Companydashboard() {
  const navigate=useNavigate()
   const {data:authdata, error:errdata, loading:loaddata}=useAuth();
  const { execute, data, error, loading } = useFetchData(getCompanyDashboard);
  useEffect(() => {
    (async () =>{
      await execute()
    })()
  }, [])
  if(error=="You're not a employee of the company"){
    return navigate("/")
  }
  const {company_id, userVerified}=authdata ?? {};
  return (
    <div>
      <h1>Company Dashboard.</h1>
      <Errorloading data={{error:errdata, loading:loaddata}}/>
      <Errorloading data={{error, loading}}/>
      <div className='gap-8 margin-8 space-4'>
      {data && data?.message.map(({ description, is_job_open, job_type, total_job_views, totalcount, title, status, uid }) => (
        <div key={uid} className='bg-zinc-500 grid container grid-cols-2 padding-8 '>
          <h1>Title: {title} </h1>
          <h1>  Description: {description} </h1>
          <h1>  Description: {description} </h1>
          <h1>  is_job_open: {is_job_open} </h1>
          <h1>  job_type: {job_type} </h1>
          <h1>  total_job_views: {total_job_views} </h1>
          <h1>  totalcount: {totalcount} </h1>
          <h1>  status: {status} </h1>
        </div>
      ))}
      </div>
       {company_id && 
          <>
          <Link to='/companies/all'><ButtonComps values='All Companies'/></Link>
          <Link to='/companies/new'><ButtonComps values='New Company'/></Link>
          <Link to={`/companies/${company_id}/analytics`}><ButtonComps values='Analytics'/></Link>
          <Link to={`/companies/${company_id}/jobs`}><ButtonComps values='All Jobs'/></Link>
          <Link to={`/companies/${company_id}/applications`}><ButtonComps values='All Applications'/></Link>
          </>
      }
       {(userVerified &&  company_id ) &&
            <Link to='users/all'>All Users</Link> }
    </div>
  )
}
