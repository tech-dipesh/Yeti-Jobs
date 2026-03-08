import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { getCompanyApplications, getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/Errorloading';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';

export default function Allapplications() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyApplications);
  useEffect(()=>{(async()=>execute(id))()}, [id])
  const {message}=data || {}
  return (
    <div>
      <Errorloading data={{error, loading}}/>
      <h1>All applications company list:</h1>
    <div className='grid container grid-cols-3'>
      {message && message.map(({job_title, resume_url, status, total_job_views, applicant_id})=>(
            <div key={applicant_id} className='padding-8'>
            <h2>Title: {job_title}</h2>
            <Link to={`https://${resume_url}`} className='text-blue-500 underline'>View Resume</Link>
            <h2>total_job_views: {total_job_views}</h2>
            <h2>status: {status}</h2>
        </div>
      ))}
    </div>
    </div>
  )
}
