import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { postNewJobs } from '../../api/auth.job'
import { Link, useNavigate } from 'react-router'
import InputComps from '../../components/common/Input'
import ButtonComps from '../../components/common/Button'
import validateJobs from '../../auth/validateJobs'
import Selectcomps from '../../components/common/Selectcomps'
import { JobtypeOption } from '../../Data/OptionList'
import Errorloading from "../../components/common/Errorloading"
import Loading from '../../components/Loading'
import Buttoncomps from '../../components/common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Textcomps from '../../components/common/Textcomps'
import Goback from '../../components/common/Goback'
export default function EditJob() {
  const [value, setValue] = useState({
    title: "",
    description: "",
    salary: '',
    skills: '',
    job_type: '',
    location: '',
    experience_years: '',
  })
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { loading, error: errors, execute } = useFetchData(postNewJobs)



  const submitForm = async (e) => {
    e.preventDefault()
    setError(null)
    const err = validateJobs(value);
    if (err) {
      setError(err)
      return;
    }
    const skill = typeof value.skills == 'string' && value.skills.split(",");

    setValue((prev) => ({ ...prev, skills: skill }))
    const res = await execute(value);
    setError(errors)
    if (res) {
      navigate(`../${res.message.uid}`)
    }
  }


  if (loading) {
    return <Loading />
  }

  return (
    <div className='min-h-screen bg-slate-900 py-8 px-5'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-7 flex items-center gap-4'>
          <Goback to='/companies/dashboard'/>
          <Textcomps content='Post a New Job' style={'text-2xl mx-auto text-center w-full'}/>
        </div>
          <p className=' text-slate-400 text-sm my-2'>
            All Fields Are Mandatory to filled:
          </p>
        <form onSubmit={submitForm} className='grid gap-6'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs text-slate-400'>Job Title *</label>
              <InputComps placeholder='Eg: Software Development Engineer'
                name='title' type='text'
                value={value.title} click={setValue} error={setError} />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs text-slate-400'>Description *</label>
              <textarea className={`bg-transparent max-h-36 min-h-36 w-full rounded-lg text-white focus:outline-none placeholder-gray-400 ring-2 px-2  ring-gray-500 `} placeholder='Eg:Explain Requirements Role, Benifits Expectations' value={value.description}
               onChange={(e)=>{
                setValue((prev)=>({...prev, description: e.target.value}))
                setError("")
              }}
               />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs text-slate-400'>
                  Skills <span className='text-slate-600'>Comma Separated</span>
                </label>
                <InputComps placeholder='React, Node.js, JavaScript...'
                  name='skills' type='text'
                  value={value.skills} click={setValue} error={setError} />
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs text-slate-400'>
                  Location
                </label>
                <InputComps placeholder='Bangalore, India/Remote'
                  name='location' type='text'
                  value={value.location} click={setValue} error={setError} />
              </div>
            </div>
            <div className='flex flex-col lg:grid lg:grid-cols-3 gap-1.5'>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs text-slate-400'>
                  Experience Years:
                </label>
                <InputComps placeholder='Eg: 3 Years'
                  name='experience_years' type='number'
                  value={value.experience_years} click={setValue} error={setError} />
              </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs text-slate-400'>Salary:</label>
              <InputComps placeholder='e.g. 80000'
                name='salary' type='number'
                value={value.salary} click={setValue} error={setError} />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs text-slate-400'>Job Type:</label>
              <Selectcomps value={value.job_type} name='job_type'
                change={setValue} option={JobtypeOption}
                multiple={true} error={setError} />
                </div>
            </div>
          <Errorloading data={{ error: error || errors }} />
          <div className='flex flex-col-reverse sm:flex-row gap-3 justify-between w-full'>
            <span onClick={() => setValue({ title:'', description:'', skills:'', location:'', experience_years:'', salary:'', job_type:'' })} className='w-full sm:w-1/2'>
              <ButtonComps values='Clear' color={'bg-slate-700 w-full'} />
            </span>
            <span className='w-full sm:w-1/2'>
            <ButtonComps values='Post Job' color={'bg-slate-700 w-full'}/>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
