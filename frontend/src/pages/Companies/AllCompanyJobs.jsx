import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/Errorloading';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';

export default function AllCompanyJobs() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyJobs);
  // useEffect(()=>execute(id), [id])
  useEffect(()=>{
    ;(async()=>await execute(id))()
  },[id])
   
  const {message}=data || {};
  return (
    <div>
      <Errorloading data={{error, loading}}/>
      <h1>All Company Jobs</h1>
      <div className='grid container grid-cols-3'>
      {message && message.map(({uid, title, description, salary, job_type})=>(
        <div key={uid} className='padding-8'>
            <Link to={`../../jobs/${uid}`} className='text-blue-500 underline'>Go to Jobs Page</Link>
            <h2>Title: {title}</h2>
            <h2>description: {description}</h2>
            <h2>salary: {salary}</h2>
            <h2>job_type: {job_type}</h2>
        </div>
      ))}
      </div>
    </div>
  )
}
