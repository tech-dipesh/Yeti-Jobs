import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyEmployee } from '../../api/auth.companies'
import { useParams } from 'react-router';
import Employecomps from '../../components/common/employees/employecomps';
import Errorloading from '../../components/common/Errorloading';

export default function AllEmployees() {
  const {data, error, loading, execute}=useFetchData(getCompanyEmployee);
  const {id}=useParams()
  useEffect(()=>{
    execute(id)
  }, [])
  return (
    <div>
      <Errorloading data={{error, loading}}/>
      <div className='px-8 pt-8 pb-4 border-b border-neutral-700 mb-6'>
      <h2 className='text-3xl font-bold text-white'>All Employees</h2>
      <p className='text-neutral-400 mt-1'>Manage and view all registered employees</p>
     </div>
        {data?.message.length === 0 && (
      <div className='text-center py-20 text-neutral-400'>
        <p className='text-3xl'>👥</p>
        <p className='mt-2 text-lg'>No employees found</p>
      </div>
    )}
     <span className='ml-3 text-sm bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full'>
      {data?.message.length} employees
    </span>
      {data?.message && data?.message.map(({uid, full_name, email, experience, education, role, resume_url, profile_pic_url})=>(
        <Employecomps key={uid} full_name={full_name} email={email} experience={experience} education={education} role={role} resume_url={resume_url} profile_pic_url={profile_pic_url}/>
      ))}
    </div>
  )
}
