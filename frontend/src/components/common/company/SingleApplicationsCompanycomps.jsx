import React, { useState } from 'react'
import Selectcomps from '../Selectcomps';
import { ApplystatusOption } from '../../../Data/OptionList';
import Linkcomps from '../Linkcomps';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router';
import Loading from '../../Loading';
import Errorloading from '../Errorloading';
import Successcomps from '../Success';
import { changeApplicationStatus } from '../../../api/auth.applications';

export default function SingleApplicationsCompanycomps({job_id, applicant_id, job_title, resume_url, status:oldstatus}) {
  const {id}=useParams()
  let [status, setStatus]=useState("")
  const {data, execute, error, loading}=useFetchData(changeApplicationStatus)
  const changeStatus=async(e)=>{
    setStatus(e.target.value)
    const lowerCase=status.toLowerCase();
    console.log('lowercase', lowerCase)
    // setTimeout(async () => {
        await execute({status:lowerCase, applicant_id, id: job_id})
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
          {resume_url && <Linkcomps to={`https://${resume_url}`} content={'View Resume'}/>}
          <h2>status: {oldstatus}</h2>
           <div className=''>
            <div className='font-medium'>Change Status:</div>
            {/* <Selectcomps option={ApplystatusOption} change={setStatus} name={'status'} value={status} /> */}
            <select value={status} onChange={changeStatus}  className='bg-neutral-700 text-white cursor-pointer p-3 border-none rounded-lg shadow-md hover:bg-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200'>
            <>
          <option hidden>Select Option</option>
          {ApplystatusOption?.map((o, i)=><option className='mb-4 p-2 border rounded cursor-pointer' key={i}>{o}</option>)}
          </>
       </select>
           </div>
          </div>
    </div>
  )
}
