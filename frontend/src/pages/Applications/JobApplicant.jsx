import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs, getAllJobsApplicant } from '../../api/auth.applications'
import { Link, useParams } from 'react-router'

export default function Jobapplicant() {
  const [result, setResult]=useState([])
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getAllJobsApplicant)
  useEffect(()=>{
    execute(id)
  }, [result])
  console.log('data', data?.message)
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}
      <h1>Who've applied so far on the role:</h1>
      {data && data.message.map(({applied_at, experience, full_name, resume_url, skills}, i)=>(
        <div className='p-4 bg-slate-300 text-black' key={i}>
            <h1>User Name: {full_name}</h1>
            <h2>Applied Time: {applied_at}</h2>
            <h3>Experience In Years: {experience}</h3>
            <Link  to={`${resume_url}`} className='text-blue-500 underline' target='_blank'>Resume Url</Link>
            {skills && skills.map((skill, i)=><p key={i} className='text-gray-400 '>{skill}</p>)}
        </div>
      ))}
    </div>
  )
}
