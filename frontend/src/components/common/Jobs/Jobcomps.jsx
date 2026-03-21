import Linkcomps from '../Linkcomps'
import { useAuth } from '../../../context/Authcontext'
import { faBuilding, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Jobcomps({ uid, title, description, salary, job_type, total_job_views, skills, is_job_open, status, experience_years, company_name, applied_at, expired_at }) {
  const { data } = useAuth()
const totalDaysLeft = Math.ceil((new Date(expired_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)); 

  return (
    <div key={uid} className='bg-neutral-700  rounded-xl shadow-lg transition-shadow flex  justify-between items-start flex-col gap-3 border border-gray-200 p-8 min-h-auto w-full'>
      <div className='flex items-center justify-between w-full'>
        <Linkcomps content={title} to={`/jobs/${uid}`} style='text-xl text-blue-400 font-bold' />
        {is_job_open !== undefined && (
          <span className={`text-xs px-2 py-1 rounded-full ${is_job_open ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {is_job_open ? ' Open' : 'Closed'}
          </span>
        )}
      </div>
      <h2 className='text-sm text-gray-300 line-clamp-2 leading-relaxed'>Description: {description}</h2>
      <div className='flex gap-2 mt-2 flex-wrap'>
        <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>{job_type}</span>
        {salary && <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>&#36; {salary}</span>}
      {status && (
          <span className={`text-sm px-3 py-1 rounded-full ${status === 'accepted' ? 'bg-green-200' :
              status === 'rejected' ? 'bg-red-200' : 'bg-yellow-200'
            }`}>
            Status: {status}
          </span>
      )}
      </div>
      <div className='flex flex-wrap gap-5 text-sm '>
        {company_name && <span><FontAwesomeIcon icon={faBuilding}/>: {company_name}</span>}
        {experience_years && <span>{experience_years} yrs exp</span>}
      </div>
      {skills?.length > 0 && (
        <div className='flex flex-wrap gap-1 mt-2'>
          {skills.slice(0, 3).map((s, i) => (
            <span key={i} className='bg-purple-100 text-purple-800 p-1 rounded text-xs'>{s}</span>
          ))}
          {skills.length > 3 && <span className='text-xs text-gray-500'>+{skills.length - 3}</span>}
        </div>
      )}
      <hr className='border-gray-500 w-full'/>
      <div className='flex justify-between w-full text-xs text-gray-500'>
      {applied_at && <span className=''>Applied: {new Date(applied_at).toLocaleDateString()}</span>}
      <span className={`text-white p-1 rounded-xs ${totalDaysLeft<0? 'bg-red-500': 'bg-slate-500'}`}>{totalDaysLeft<0 ?'expired': `${totalDaysLeft} days left`}</span>
      {(data?.role == 'admin' || data?.role == 'recruiter') &&<span><FontAwesomeIcon icon={faEye}/> {total_job_views} views</span>

    }

      </div>
    </div>
  )
}
