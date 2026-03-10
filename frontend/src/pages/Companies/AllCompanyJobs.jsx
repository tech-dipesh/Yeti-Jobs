import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/common/Errorloading';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Companycomps from '../../components/common/company/Companycomps';
import Jobcomps from '../../components/common/Jobcomps';
import Titlecomps from '../../components/common/Titlecomps';

export default function AllCompanyJobs() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyJobs);
  // useEffect(()=>execute(id), [id])
  useEffect(()=>{
    ;(async()=>await execute(id))()
  },[id])
  const {message}=data || {};
  console.log('message', message)
  console.log(message?.length)
  return (
  <div>
        <div className='px-8 pt-8 pb-4 border-b border-neutral-700'>
        <h1 className='text-4xl font-bold text-white'>All Company Jobs</h1>
        <p className='text-neutral-400 mt-1'>Browse all Jobs</p>
      </div>
        <Errorloading data={{error, loading}}/>
        {data?.message.length === 0 && (
        <div className='text-center py-20 text-neutral-400'>
      <p className='text-2xl'>💼</p>
      <p className='mt-2'>No Jobs found</p>
      </div>
        )}
      <span className='ml-3 text-sm bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full'>
    {data?.message.length} companies
      </span>
        
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8'>
      {message && message.map(({uid, title, description, salary, job_type, experience_years, total_job_views, founded_year, location})=>(
        <Jobcomps uid={uid} title={title} description={description} salary={salary} job_type={job_type} experience_years={experience_years} total_job_views={total_job_views}/>
      ))}
      </div>
    </div>
  )
}
