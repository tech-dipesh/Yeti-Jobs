import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { individualJobs, isUserOwnedRoute, updateExistingJobs } from '../../api/auth.job'
import { useLocation, useNavigate, useParams } from 'react-router'
import InputComps from '../../components/Input'
import ButtonComps from '../../components/Button'
import validateJobs from '../../auth/validateJobs'

export default function EditJob() {
  const { id } = useParams()
  const { state } = useLocation();
  const [value, setValue] = useState(state || {})
  const [error, setError] = useState()
  const sameValue =state;
  
  const navigate = useNavigate()
  const { error: errValue, loading, execute } = useFetchData(individualJobs)
  const { loading: submitload, execute: sendData } = useFetchData(updateExistingJobs)
  
  useEffect(() => {
    if (!state) {
      ; (async () => {
        await execute(id).then(t => {setValue(t?.message), sameValue(t?.message)})
      })()
    }
    // if(error || errValue){
      //   return navigate('../../')
      // }
    }, [])

  if (errValue) {
    return <div>{navigate("../../")}</div>
  }
  if (loading || submitload) {
    return <div>loading....</div>
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const err = validateJobs(value, sameValue);
    if(err){
      setError(err)
      return;
    }
    const skill=typeof value.skills=='string' && value.skills?.split(",");
    setValue((prev)=>({...prev, skills: skill}))

    const res = await sendData({ id, value });
    if(res){
      navigate("..")
    }
  }
  return (
    <div>
      <h2>Edit the Job:</h2>
      <form method="post" onSubmit={submitForm}>
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
