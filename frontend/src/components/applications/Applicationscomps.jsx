import {useState} from 'react'
import Linkcomps from '../ui/Linkcomps'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock,faBan,  faFileLines, faCommentDots, faBuilding } from '@fortawesome/free-solid-svg-icons';
export default function Applicationcomps ({ title, company_name, description, job_type, applied_at, cover_letter, notice_period, expected_salary, why_hire, experience_years, expired_at, status, uid }) {
  const [expandCL, setExpandCL] = useState(false)
  const [expandWH, setExpandWH] = useState(false)
  const totalDaysLeft = expired_at ? Math.ceil((new Date(expired_at) - new Date()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className='bg-neutral-700 rounded-xl shadow-lg transition-shadow flex justify-between items-start flex-col gap-3 border border-gray-200 p-8 w-full'>

      <div className='flex items-center justify-between w-full'>
        <Linkcomps content={title ?? 'Untitled'} to={`/jobs/${uid}`} style='text-xl text-blue-400 font-bold' />
        {status && (
          <span className={`text-xs px-2 py-1 rounded-full ${status === 'accepted' ? 'bg-green-200 text-green-800' : status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
            {status}
          </span>
        )}
      </div>

      {description && <h2 className='text-sm text-gray-300 line-clamp-2 leading-relaxed'>Description: {description}</h2>}

      <div className='flex gap-2 mt-2 flex-wrap'>
        {job_type && <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>{job_type}</span>}
        {expected_salary && <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>&#36; {expected_salary}</span>}
        {notice_period != null && <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm'><FontAwesomeIcon icon={faClock} className='mr-1'/>{notice_period}d notice</span>}
      </div>

      <div className='flex flex-wrap gap-5 text-sm'>
        {company_name && <span><FontAwesomeIcon icon={faBuilding} className='mr-1'/>{company_name}</span>}
        {experience_years != null && <span>{experience_years} yrs exp</span>}
      </div>

      <div className='flex flex-col gap-2 w-full'>
        
        <div className='bg-neutral-600 rounded-lg px-3 py-2 text-xs text-gray-300'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-1 font-semibold text-gray-400'>
              <FontAwesomeIcon icon={faFileLines} /> Cover Letter
            </span>
            {cover_letter && (
              <span onClick={() => setExpandCL(!expandCL)} className='text-blue-400 cursor-pointer hover:underline'>
                {expandCL ? 'less' : 'more'}
              </span>
            )}
          </div>
          {cover_letter
            ? <p className={`mt-1 text-gray-300 ${!expandCL ? 'line-clamp-1' : ''}`}>{cover_letter}</p>
            : <p className='mt-1 text-gray-500 italic flex items-center gap-1'><FontAwesomeIcon icon={faBan} /> Not provided</p>
          }
        </div>

        <div className='bg-neutral-600 rounded-lg px-3 py-2 text-xs text-gray-300'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-1 font-semibold text-gray-400'>
              <FontAwesomeIcon icon={faCommentDots} /> Why Hire
            </span>
            {why_hire && (
              <span onClick={() => setExpandWH(!expandWH)} className='text-blue-400 cursor-pointer hover:underline'>
                {expandWH ? 'less' : 'more'}
              </span>
            )}
          </div>
          {why_hire
            ? <p className={`mt-1 text-gray-300 ${!expandWH ? 'line-clamp-1' : ''}`}>{why_hire}</p>
            : <p className='mt-1 text-gray-500 italic flex items-center gap-1'><FontAwesomeIcon icon={faBan} /> Not provided</p>
          }
        </div>

      </div>

      <hr className='border-gray-500 w-full'/>

      <div className='flex justify-between w-full text-xs text-gray-500'>
        {applied_at && <span>Applied: {new Date(applied_at).toLocaleDateString()}</span>}
        {totalDaysLeft !== null && (
          <span className={`text-white p-1 rounded-xs ${totalDaysLeft < 0 ? 'bg-red-500' : 'bg-slate-500'}`}>
            {totalDaysLeft < 0 ? 'Expired' : `${totalDaysLeft} days left`}
          </span>
        )}
      </div>

    </div>
  );
};
