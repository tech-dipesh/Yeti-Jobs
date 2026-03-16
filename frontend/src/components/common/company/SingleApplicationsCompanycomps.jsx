import { useEffect, useState } from 'react'
import { ApplyLowerCasestatusOption } from '../../../Data/OptionList';
import Linkcomps from '../Linkcomps';
import useFetchData from '../../../hooks/useFetchData';
import Loading from '../../Loading';
import Errorloading from '../Errorloading';
import Successcomps from '../Success';
import { changeApplicationStatus } from '../../../api/auth.applications';

export default function SingleApplicationsCompanycomps({job_id, applicant_id, job_title, resume_url, status:oldstatus}) {
  let [status, setStatus]=useState(oldstatus)
  const {data, execute, error, loading}=useFetchData(changeApplicationStatus)
  useEffect(()=>{
    (()=>{
      setStatus(oldstatus)
    })()
  }, [])
  const changeStatus=async(e)=>{
    const newValue = e.target.value;
    if(newValue==oldstatus){
      return;
    }
        await execute({status:newValue.toLowerCase(), applicant_id, id: job_id})
    // }, 1000);
  }
  if(loading){
    return <Loading/>
  }
  return (
    <div>
      <Errorloading data={{error}}/>
      <Successcomps data={data?.message}/>
      <div key={job_id} className='bg-neutral-800 text-white rounded-xl shadow-lg flex justify-between items-start flex-col gap-3 border border-neutral-600 p-8 w-82'>
          <Linkcomps to={`/jobs/${job_id}`} content={'Visit Jobs Description'}/>
          <h2>Title: {job_title}</h2>
          {resume_url ? <Linkcomps to={resume_url} content={'View Resume'}/>:<div className='block h-6'></div>}
          <h2>status: <span className='font-semibold'>{oldstatus}</span></h2>
           <div className=''>
            <div className='font-medium'>Change Status:</div>
            {/* <Selectcomps option={ApplystatusOption} change={setStatus} name={'status'} value={status} /> */}
            <select value={status} onChange={changeStatus}  className='bg-neutral-700 text-white cursor-pointer p-3 border-none rounded-lg shadow-md hover:bg-neutral-600 outline-none transition-all duration-200'>
            <>
          {!status && <option hidden>Select Option</option>}
          {ApplyLowerCasestatusOption?.map((o, i)=><option value={o} className='mb-4 p-2 text-2xl lg:text-xl border rounded cursor-pointer' defaultValue={oldstatus && o === oldstatus}  key={i}>{o}</option>)}
          </>
       </select>
           </div>
          </div>
    </div>
  )
}
