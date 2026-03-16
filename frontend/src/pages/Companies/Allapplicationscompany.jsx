  import React, { useState } from 'react'
import useFetchData from '../../hooks/useFetchData';
import { getCompanyApplications, getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/common/Errorloading';
import { useEffect } from 'react';
import { Link, Links, useParams } from 'react-router';
import Applicationscomps from '../../components/common/applications/applicationscomps';
import Selectcomps from "../../components/common/Selectcomps"
import { ApplystatusOption } from '../../Data/OptionList';
import Linkcomps from '../../components/common/Linkcomps';
import SingleApplicationsCompanycomps from '../../components/common/company/SingleApplicationsCompanycomps';
import Buttoncomps from '../../components/common/Button';
import Emptycomps from '../../components/Emptycomps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Goback from '../../components/common/Goback';
export default function Allapplications() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyApplications);
  useEffect(()=>{(async()=>execute(id))()}, [id])
  const {message}=data || {}
  console.log('user', message)
  return (
    <div className='bg-neutral-700 min-h-screen p-8'>
      <Goback to={`../`}/>
      <Errorloading data={{error, loading}}/>
      <Emptycomps data={data?.message} type={'Applications'}/>
    <div className='flex gap-6 mb-6 text-white'>
      <span>Total: {message?.length}</span>
      <span>Pending: {message?.filter(a => a.status === 'pending').length}</span>
      <span>Approved: {message?.filter(a => a.status === 'approved').length}</span>
      </div>
      <h1 className='text-white text-2xl font-bold mb-6'>All Applications</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {message && message.map(({job_title, applicant_id, resume_url, status, total_job_views, job_id})=>(
         <SingleApplicationsCompanycomps applicant_id={applicant_id} job_id={job_id} job_title={job_title} resume_url={resume_url} status={status} key={job_id}/>
      ))}
    </div>
    </div>
  )
}