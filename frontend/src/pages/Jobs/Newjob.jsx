import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { individualJobs, isUserOwnedRoute, postNewJobs, updateExistingJobs } from '../../api/auth.job'
import {  Link, useNavigate, useParams } from 'react-router'
import InputComps from '../../components/Input'
import ButtonComps from '../../components/Button'
import validateJobs from '../../auth/validateJobs'

export default function EditJob() {
  const [value, setValue] = useState({
    title: "",
    description: "",
    salary: '',
    skills: '',
    job_type: ""
  })
  const [error, setError] = useState()
  
  const navigate = useNavigate()
  const { loading, error:errors, execute } = useFetchData(postNewJobs)
  


  if (loading) {
    return <div>loading....</div>
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const err = validateJobs(value);
    if(err){
      setError(err)
      return;
    }
    const skill= typeof value.skills=='string' && value.skills.split(",");
    
    setValue((prev)=>({...prev, skills: skill}))
    const res = await execute(value);
    setError(errors)
    if(res){
      setTimeout(() => {
        navigate(`../${res.message}`)
      }, 100);
    }
  }
  return (
    <div className='grid'>
      <h2>Add New Job:</h2>
      <form method="post" onSubmit={submitForm} className=''>
        <div className='justify-center align-middle'>
          <div>Title</div>
          <InputComps
            placeholder='Title'
            name='title'
            type='text'
            value={value.title}
            click={setValue}
            error={setError} />
          <div>DEscription</div>
          <InputComps placeholder='DEscription' name='description' type='text' value={value.description} click={setValue} error={setError} />
            <div>Salary</div>
          <InputComps placeholder='Salary' name='salary' type='number' value={value.salary} click={setValue} error={setError} />
            <div>Skills</div>
          <InputComps placeholder='Skills' name='skills' type='text' value={value.skills} click={setValue} error={setError} />
            <div>Job type</div>
          <select value={value.job_type} onChange={(e) => setValue((prev) => ({ ...prev, job_type: e.target.value }))} className='bg-gray-300 text-black cursor-pointer'>
            <option hidden>Select Option</option>
            <option>Remote</option>
            <option>Onsite</option>
            <option>Hybrid</option>
          </select>
          <hr />
          <ButtonComps values='Submit' />
        </div>
      </form>

    {error && <div className='text-red-500 left-20 relative'>{error}</div>}
    </div>
  )
}
