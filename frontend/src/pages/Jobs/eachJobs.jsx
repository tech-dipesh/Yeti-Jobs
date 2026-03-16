import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Applyjob from '../Applications/Applyjob';
import Loading from '../../components/Loading';
import Errorloading from '../../components/common/Errorloading';

import Buttoncomps from '../../components/common/Button';
import useFetchData from '../../hooks/useFetchData';
import { individualJobs } from '../../api/auth.job';
import Confirmation from '../../components/Confirmation';
import Goback from '../../components/common/Goback';
export default function EachJob() {
  const { id } = useParams();
  const { data, error, loading, execute } = useFetchData(individualJobs)
  const [loaddesc, setLoadDesc]=useState(false)
  useEffect(() => {
    execute(id)
  }, [id])

  if(loading){
    return <Loading/>
  }
  const {description, title, job_type, salary, experience_years, location, skills}=data || {}
  // console.log('description ')
  return (
    <article className='min-w-screen min-h-screen px-6 py-8'>
      <Goback/>
      <Errorloading data={{ error: error }} />
      {data &&
        <div className='bg-slate-800 p-8 max-w-5xl min-h-[90vh] mx-auto  rounded-2xl space-y-5'>
          <span className='text-slate-400 text-xs text-center opacity-90'>Job Id: {data.uid}</span>
          <div className='grid grid-cols-2'>
            <p className='text-3xl font-bold tracking-wide'>Title: {title}</p>
            <p className='font-semibold text-right text-gray-300'>Job Type: {job_type}</p>
          </div>
           <div className='flex gap-6 text-sm text-slate-300'>
        <span>Salary: {salary || 'N/A'}</span>
        <span>Experience: {experience_years || '0'} yrs</span>
      </div>
        <p className='text-xl wrap-break-word text-slate-300 leading-relaxed block min-h-30'>Description: 
              {description?.length<100 ?
                description: 
              <>
              {!loaddesc && description?.slice(0, 100)}
              {!loaddesc && <span onClick={()=>setLoadDesc(!loaddesc)}><Buttoncomps values='Load More'/></span>}
              {loaddesc && description}
              {loaddesc && <span onClick={()=>setLoadDesc(!loaddesc)}><Buttoncomps values='Show Less'/></span>}
              </>
              } 
        </p>
          <div className='grid grid-cols-2'>
            <div className='flex flex-wrap gap-2'>
              <span>Skills</span>
              {skills?.map((skill, i) => <span key={i} className=' px-3 py-1 bg-slate-700 rounded-full text-sm'>{skill}</span>)}
            </div>
            <p className='text-right text-slate-300 text-sm'>Location: {location || 'none'}</p>
          </div>
          <div className='min-h-2xl'>
            <Applyjob data={data} execute={execute}/>
          </div>
          </div>
      }
    </article>
  )
}