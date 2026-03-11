import React from 'react'
import { Link } from 'react-router'
import Linkcomps from '../Linkcomps'

export default function Applicationscomps({job_id, job_title, resume_url, total_job_views, status}) {
  return (
    <div key={job_id} className='bg-neutral-800 text-white rounded-xl shadow-lg flex justify-between items-start flex-col gap-3 border border-neutral-600 p-8 w-82'>
          <Linkcomps to={`/jobs/${job_id}`} content={'Visit Jobs Description'}/>
          <h2>Title: {job_title}</h2>
          {resume_url && <Linkcomps to={`https://${resume_url}`} content={'View Resume'}/>}
          <h2>status: {status}</h2>
          <Linkcomps to={`/${job_id}`} content={'Visit Applications'}/>
      </div>
  )
}
