import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs } from '../../api/auth.applications'

export default function GetallApplied() {
  const [result, setResult]=useState([])
  const {data, error, loading, execute}=useFetchData(getAllAppliedJobs)
  useEffect(()=>{
    execute()
  }, [result])
  console.log('result', result)
  return (
    <div>
      <h1>Get All Applied Jobs:</h1>
      
    </div>
  )
}
