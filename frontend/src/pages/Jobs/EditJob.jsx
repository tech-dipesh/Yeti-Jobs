import { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { individualJobs, updateExistingJobs } from '../../api/auth.job'
import { useLocation, useNavigate, useParams } from 'react-router'
import InputComps from '../../components/common/Input'
import ButtonComps from '../../components/common/Button'
import Selectcomps from "../../components/common/Selectcomps"
import validateJobs from '../../auth/validateJobs'
import { JobtypeOption } from '../../Data/OptionList'
import Loading from '../../components/Loading'
import Errorloading from '../../components/common/Errorloading'
import Textcomps from '../../components/common/Textcomps'
import Goback from '../../components/common/Goback'

export default function EditJob() {
  const { id } = useParams()
  const { state } = useLocation();
  const [data, setData] = useState();
  const isState=state && state.title!=undefined;
  const [value, setValue] = useState(isState ? state: {})
  const [error, setError] = useState()

  const navigate = useNavigate()
  let { data: values, error: errValue, loading, execute } = useFetchData(individualJobs)
  const { error: submiterr, loading: submitload, execute: sendData } = useFetchData(updateExistingJobs)
  useEffect(() => {
    if (!state) execute(id)
    else setData(state)
  }, [])

  useEffect(() => {
    if (values) setData(values)
  }, [values])

  useEffect(() => {
    if (errValue) navigate("../")
  }, [errValue])
  if (loading || submitload) {
    return <Loading />
  }
  const submitForm = async (e) => {
    e.preventdefault()
    const err = validateJobs(value);
    if (err) {
      setError(err)
      return;
    }
    const skill = typeof value.skills == 'string' && value.skills?.split(",");
    setValue((prev) => ({ ...prev, skills: skill }))

    const res = await sendData({ id, value });
    if (res) {
      navigate("../")
    }
  }
  return (
    <div className='min-h-screen bg-slate-900 py-8 px-5'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-7 flex items-center gap-4'>
          <Goback to='/companies/dashboard'/>
          <Textcomps content='Edit the Job.' style={'text-2xl mx-auto text-center w-full'}/>
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
          <Errorloading data={{ error: error || submiterr }} />
          <div className='flex flex-col-reverse sm:flex-row gap-3 justify-between w-full'>
            <span onClick={() => setValue({ title:'', description:'', skills:'', location:'', experience_years:'', salary:'', job_type:'' })} className='w-full sm:w-1/2'>
              <ButtonComps values='Clear' color={'bg-slate-700 w-full'} />
            </span>
            <span className='w-full sm:w-1/2'>
            <ButtonComps values='Edit Job' color={'bg-slate-700 w-full'}/>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
