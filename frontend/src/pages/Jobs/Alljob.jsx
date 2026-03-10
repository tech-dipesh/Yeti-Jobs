import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Links, useSearchParams } from 'react-router';
import {allJobsList} from "../../api/auth.job"
import UseFetchData from "../../hooks/useFetchData"
import ButtonComps from '../../components/common/Button';
import Jobcomps from '../../components/common/Jobcomps';
import Loading from '../../components/Loading';
const {VITE_SERVER_URL}=import.meta.env

export default function Jobs() {
  
  const {data, error, loading, execute } = UseFetchData(allJobsList)
  useEffect(()=>{
    ;(async()=>{
      await execute()
  })()
}, [])

 if(loading){
  return <Loading/>
 }
  // const buttons=['1', '2', '3', '4', '5', '7']
  return (
    <div className='grid w-auto'>
    <div className='flex justify-center gap-24'>
      <Link to='search'>
      <ButtonComps values='Search Job' className='text-4xl' />
      </Link>
      <Link to='../applications/me' className='text-blue-500 underline'>
      <ButtonComps values='Get All Applied Jobs' className='text-4xl' />
      </Link>
    </div>
      
    <div className='container grid grid-cols-2 gap-16 p-8'>
      {data && data?.message.map(({ uid, title, description, salary, job_type, total_job_views, skills, is_job_open, experience_years, company_name }) => (
        <Jobcomps uid={uid} title={title} description={description} salary={salary} job_type={job_type} total_job_views={total_job_views} skills={skills} is_job_open={is_job_open} experience_years={experience_years} company_name={company_name}/>
      ))}
    </div>

      </div>
  )
}
