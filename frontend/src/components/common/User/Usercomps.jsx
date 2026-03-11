import React from 'react'
import { Link } from 'react-router'

export default function Usercomps({fullname, education, email, role, resume_url, profile_pic_url, skills, experience_years}) {
  console.log(profile_pic_url)
  return (
    <div className='bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col gap-5'>
      <div className='flex items-center gap-4'>
        {profile_pic_url ? (
          <img
            src={profile_pic_url}
            alt={'User'}
            onError={e => { e.target.style.display = 'none' }}
            className='h-14 w-14 rounded-full object-cover ring-2 ring-slate-600'
          />
        ) : (
          <div className='h-14 w-14 rounded-xs bg-slate-700 flex items-center justify-center text-xs font-bold'>
            Resume Not Avaible
          </div>
        )}
          <div className='border-t border-slate-700' />
        <div className='flex flex-col gap-3 text-sm'>
        <div>
          <span className='text-neutral-500 text-xs'>Email</span>
          <p className='text-neutral-200'>{email ?? <span className='italic text-neutral-600'>Not available</span>}</p>
        </div>
        <div>
          <span className='text-neutral-500 text-xs'>Education</span>
          <p className='text-neutral-200'>{education ?? <span className='italic text-neutral-600'>Not available</span>}</p>
        </div>
        <div>
          <span className='text-neutral-500 text-xs'>Experience</span>
          <p className='text-neutral-200'>
            {experience_years != null
              ? `${experience_years} yr${experience_years !== 1 ? 's' : ''}`
              : <span className='italic text-neutral-600'>Not available</span>}
          </p>
        </div>
      </div>

      <div>
        <span className='text-neutral-500 text-xs'>Skills</span>
        {skills ? (
          <div className='flex flex-wrap gap-2 mt-1.5'>
            {skills.map((skill, i) => (
              <span key={i} className='text-xs bg-slate-700 text-slate-300 border border-slate-600 px-2.5 py-1 rounded-lg'>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className='text-sm italic text-neutral-600 mt-1'>No skills listed</p>
        )}
      </div>
  </div>

    <span className={`text-xs font-semibold p-1 rounded-full w-fit text-white ${
  role === 'admin'     ? 'bg-neutral-400 border border-neutral-500' :
  role === 'recruiter' ? 'bg-slate-600 border border-slate-500' :
  role === 'guest'     ? 'bg-neutral-500 border  border-neutral-600': ''}`}>
  {role ?? 'Unknown'}
</span>
    {resume_url ? 
    <Link to={resume_url} target='_blank'  className='text-xs text-blue-400 hover:text-blue-300 underline w-fit'>View Resume ↗</Link> : <span className='text-xs italic text-neutral-600'>No resume available</span>}
      </div>
  )
}
