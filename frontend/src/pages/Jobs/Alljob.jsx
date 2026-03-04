import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Links, useSearchParams } from 'react-router';
import {allJobsList} from "../../api/auth.job"
import UseFetchData from "../../hooks/useFetchData"
import ButtonComps from '../../components/Button';
const {VITE_SERVER_URL}=import.meta.env

export default function Jobs() {
  
  const {data, error, loading, execute } = UseFetchData(allJobsList)
  useEffect(()=>{
    ;(async()=>{
      await execute()
  })()
}, [])

  if(loading){
    return <div>Loading...</div>
  }
  // const buttons=['1', '2', '3', '4', '5', '7']
  return (
    <>
    <Link to='new'>
    <ButtonComps values='Create New Job' className='text-4xl' />
    </Link>
    <Link to='search'>
    <ButtonComps values='Search Job' className='text-4xl' />
    </Link>
    <Link to='../applications/me' className='text-blue-500 underline'>
    <ButtonComps values='Get All Applied Jobs' className='text-4xl' />
    </Link>
      
    <div className='container grid grid-cols-4 gap-16 p-8'>
      {data && data?.message.map(({ uid, title, description, salary, job_type, total_job_views, skills, is_job_open, experience_years, company_name }) => (
        <div key={uid} className='bg-taupe-600 rounded-xl p-8 gap-8 '>
          <Link to={`./${uid}`} className='text-blue-500 underline'>{uid}</Link>
          <h2 className=''>Title: {title}</h2>
          <h2>Dexcription: {description}</h2>
          <h2>Salary: {salary}</h2>
          <h2>Job type: {job_type}</h2>
          <h2>Total Job Views: {total_job_views}</h2>
          <div>Skills:
            {skills?.map((skill, i) =>
              <p key={i}>{skill}</p>
            )}
          </div>
          <h2>Is job Open: {is_job_open}</h2>
          <h2>Experience Years: {experience_years}</h2>
          <h2>Company Name: {company_name}</h2>
        </div>
      ))}
    </div>

      </>
  )
}
