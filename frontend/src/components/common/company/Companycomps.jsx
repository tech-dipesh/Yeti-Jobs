import React from 'react'
import Textcomps from '../Textcomps'
import { Link, useNavigate, useParams } from 'react-router'
import Linkcomps from "../Linkcomps"
import {useAuth} from "../../../context/Authcontext"
import Buttomcomps from "../Button"
import useFetchData from '../../../hooks/useFetchData'
import { deleteCompany } from '../../../api/auth.companies'
export default function Companycomps({uid, resume_url, name, description, website, created_at, title, status, salary, experience_years, job_type, created_by, total_job_views, founded_year, location}) {
  const {data}=useAuth();
  const {role}=data || {}
  const {execute}=useFetchData(deleteCompany)
  const navigate=useNavigate()
  const {id}=useParams()
  const clickDelete=async()=>{
    const res=await execute(uid);
    if(res){
      setTimeout(() => {
        navigate(0)
      }, 250); 
    }
  }

  return (
    <div key={uid} className='bg-neutral-600  rounded-xl shadow-lg transition-shadow  hover:shadow-xl flex justify-between items-start flex-col gap-3 border border-gray-200 p-8 w-80 '>
        {title && <Textcomps content={`Title: ${title}`} size='text-2xl'/>}
        {name &&  <h2 className='line-clamp-2'>Name: {name}</h2>}
        <h2 className='line-clamp-2'>Description: {description}</h2>
        {job_type && <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>{job_type}</span>}
        {created_by && <h3>Created By: {created_by}</h3>}
        <h3>Created At: {new Date(created_at).toLocaleDateString()}</h3>
        {salary && <div>Salary: {salary}</div>}
        {status && (
          <div className='mt-3 pt-3 border-t border-neutral-400'>
            <span className={`text-sm px-3 py-1 rounded-full ${
              status === 'accepted' ? 'bg-green-200' : 
              status === 'rejected' ? 'bg-red-200' : 'bg-yellow-200'
            }`}>
              Status: {status}
            </span>
          </div>
        )}
    {resume_url &&  <Link to={`https://${resume_url}`} className='text-blue-500 underline'>Link to Resume Pic</Link>}
    {total_job_views && <h2>Total Job Views: {total_job_views}</h2>}
    {experience_years && <h2>Experience Years: {experience_years}</h2>}
    {website && <Linkcomps content={"Visit Website"}  to={`https://${website}`}/>}
    {founded_year && <div>Founded Year: {founded_year}</div>}
    <Linkcomps content={'All Company Jobs'} to={`/companies/${uid}/jobs`}/>
    {location && <div>Location: {location}</div>}
      {role=='admin' && 
      <>
    <span onClick={clickDelete}>
      <Buttomcomps values='Delete Company'/>
    </span>
    <Linkcomps content={'Edit Company'} to={`/companies/${uid}/edit`}/>
    </>
      }
    </div>
  )
}
