import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { individualJobs, isUserOwnedRoute, postNewJobs, updateExistingJobs } from '../../api/auth.job'
import {  Link, useNavigate, useParams } from 'react-router'
import InputComps from '../../components/common/Input'
import ButtonComps from '../../components/common/Button'
import validateJobs from '../../auth/validateJobs'
import Selectcomps from '../../components/common/Selectcomps'
import { JobtypeOption } from '../../Data/OptionList'
import Linkcomps from "../../components/common/Linkcomps"
import Errorloading from "../../components/common/Errorloading"
import Loading from '../../components/Loading'
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
  


   if(loading){
    return <Loading/>
   }

  const submitForm = async (e) => {
    e.preventDefault()
    console.log('value', value)
    
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
      <h2 >Add New Job:</h2>
      <form onSubmit={submitForm} className='grid gap-6'>
        <Errorloading data={{error}}/>
        <div className='justify-center align-middle items-center'>
          <label htmlFor='title'>Title</label>
          <InputComps
            placeholder='Title'
            name='title'
            type='text'
            value={value.title}
            click={setValue}
            error={setError} />
          <label htmlFor='description'>Description</label>
          <InputComps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError} />
            <label htmlFor='salary'>Salary</label>
          <InputComps placeholder='Salary' name='salary' type='number' value={value.salary} click={setValue} error={setError} />
            <label htmlFor='skills'>Skills</label>
          <InputComps placeholder='Skills' name='skills' type='text' value={value.skills} click={setValue} error={setError} />
            <div htmlFor='job_type'>Job type</div>
          {/* <Selectcomps value={value.job_type} name='job_type' change={setValue} multiple={true} option={JobtypeOption}/> */}
          <Selectcomps value={value.job_type} name='job_type' change={setValue} option={JobtypeOption} multiple={true} error={setError}/>
          <hr />
          <ButtonComps values='Submit' />
        </div>
      </form>
      <span onClick={()=>navigate("../")}>
          <ButtonComps values='Go Back' />
      </span>

        <Errorloading data={{error: errors, loading}}/>
    </div>
  )
}
