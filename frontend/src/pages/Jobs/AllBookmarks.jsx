import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { savedJobsList } from '../../api/auth.job'
import useFetchData from '../../hooks/useFetchData'
import Jobcomps from '../../components/Jobcomps'
import { Link } from 'react-router'
import ButtonComps from '../../components/Button'

export default function AllBookmarks() {
  const [value, setValue]=useState()
  const {error, loading, execute } = useFetchData(savedJobsList)
  useEffect(()=>{
      ;(async()=>{
          await execute().then(t=>setValue(t?.message))
      })()
    },[])
    if(loading){
      return <div>loading...</div>
    }
  return (
    <div>
      {!value?.length && (
   <div className='text-center py-12 col-span-4'>
        <p className='text-gray-500'>No bookmarks yet. Start saving jobs!</p>
        <Link to='/jobs'><ButtonComps values='Browse Jobs' /></Link>
      </div>
    )}
      <div className='container grid grid-cols-4 margin-8'>
      {value?.map(({uid, title, description, job_type, is_job_open, salary})=>(
        <Jobcomps uid={uid} title={title} description={description} job_type={job_type} is_job_open={is_job_open} salary={salary}/>
      ))}
    </div>
    </div>
  )
}
