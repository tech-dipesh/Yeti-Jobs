import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs } from '../../api/auth.applications'
import Jobcomps from '../../components/common/Jobcomps'
import Selectcomps from '../../components/common/Selectcomps'
import { ApplystatusOption } from '../../Data/OptionList'
import { Link } from 'react-router'
import ButtonComps from '../../components/common/Button'
import Loading from '../../components/Loading'

export default function GetallApplied() {
  const {data, error, loading, execute}=useFetchData(getAllAppliedJobs)
  useEffect(()=>{
    execute()
  }, [])
  const [application, setApplication]=useState("")
  const filter=application ? data?.message.filter(d=>d.status==application.toLowerCase()):data?.message;
   if(loading){
    return <Loading/>
   }
  return (
    <div>
      {error && <div className='text-red-500'>{error}</div>}
      <h1>Get All Applied Jobs:</h1>
      <Selectcomps option={ApplystatusOption} value={application} change={setApplication}/>
      <span onClick={()=>setApplication("")}><ButtonComps values='Clear Filter'/></span>
      {!filter && (
        <div className='text-center py-12 text-gray-500'>
        <p>You haven't applied to any jobs yet.</p>
        <Link to='/jobs' className='text-blue-500 underline mt-2 block'>Browse Jobs</Link>
      </div>
       )}
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
      {data && filter.map(({title, description, uid, experience_years, job_type, status, applied_at})=>(
       <Jobcomps title={title} description={description} uid={uid} experience_years={experience_years} job_type={job_type} status={status} applied_at={applied_at}/>
      ))}
      </div>
    </div>
  )
}
