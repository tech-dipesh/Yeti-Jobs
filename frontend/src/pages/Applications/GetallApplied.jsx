import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs } from '../../api/auth.applications'

export default function GetallApplied() {
  const [result, setResult]=useState([])
  const {data, error, loading, execute}=useFetchData(getAllAppliedJobs)
  useEffect(()=>{
    execute()
  }, [result])
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}
      <h1>Get All Applied Jobs:</h1>
      {data && data?.message.map(({title, description, uid, experience_years, job_type})=>(
        <div className='p-4 bg-slate-300' key={uid}>
            <h2>Title: {title}</h2>
            <p>Description:{description} </p>
            <h3>Experience Years: {experience_years}years</h3>
            <h4>Job Type: {job_type}</h4>
        </div>
      ))}
    </div>
  )
}
