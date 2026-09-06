import { useState } from 'react'
import { Link} from 'react-router'
import Buttoncomps from '../ui/Button';
import { useAuth } from "../../context/Authcontext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {IndianRupee} from "lucide-react"
import ApplyJobPopup from './Applyjobpopup';
export default function EachJobAction({ setAction, data, }) {
  const { data: userValue } = useAuth()
  const { role } = userValue ?? {}
  const [loaddesc, setShowDesc] = useState(false)
  const { description, salary, skills, company_id, is_applied, is_owner, total_job_views } = data || {}
  const [apply, setApply] = useState(false)
  return (
    <>
      <div className='bg-slate-800 rounded-2xl min-h-24'>
        <div className='text-xs tracking-widest text-slate-500 mb-2'>Description:</div>
        {description?.length < 100 ?
          <p className='text-slate-400 text-sm leading-relaxed'>{description}</p> :
          <>
            <p className='text-slate-300 text-sm'>
              {!loaddesc &&<span>{description?.slice(0, 100)} ...</span> }
              {loaddesc && description}
            </p>
            <span onClick={() => setShowDesc(!loaddesc)} className='mt-2 inline-block'>
              <Buttoncomps values={loaddesc ? 'Show Less' : 'Load More'} />
            </span>
          </>
        }
      </div>
      <div className='bg-slate-800 rounded-2xl p-4'>
        <div className='tracking-widest text-xs text-slate-500 mb-3'>Skills</div>
        <div className='flex flex-wrap gap-2'>
          {skills?.map((skill, i) =>
            <span key={i} className=' px-3 py-1 bg-slate-700 border border-slate-600 rounded-full text-sm text-slate-300'>{skill}
            </span>
          )}
        </div>
      </div>
      {is_owner ?
        <div className='bg-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3 flex-1 lg:flex-3'>
          <Link to={`/companies/${company_id}/applications`} className='flex-1'>
            <Buttoncomps values='Applicants' color='bg-slate-600' />
          </Link>
          <Link to='edit' state={data} className='flex-1'>
            <Buttoncomps values='Edit' color={'bg-slate-600'} />
          </Link>
          <span onClick={() => setAction("delete")} className='flex-1 md:left-40'>
            <Buttoncomps values='Delete' color='bg-red-600' />
          </span>
          <div className='flex justify-end'>
            <p className='text-xs text-slate-500'><FontAwesomeIcon icon={faEye} />Total Views: 
              <span className='text-slate-300 font-semibold'> {total_job_views}</span>
            </p>
          </div>
        </div> :
        <div className='flex items-center bg-slate-800 rounded-2xl justify-between w-full p-4 gap-4'>
          <div className='flex flex-col'>
            <p className='text-xs text-slate-400 mb-1'>Annual salary</p>
            <p className='text-lg font-semibol text-whited'>
              {salary ?
                <span className="flex">
                <IndianRupee /> {salary}
                  {/* &#8377;{salary} */}
                </span>
                :
                <span className='text-slate-500'>Not Given</span>
              }
            </p>
          </div>
          {role == 'guest' &&
            <span onClick={() => is_applied ? setAction("withdraw") : setApply(true)}
            // className='lg:my-10 text-nowrap text-2xl my-6 justify-end'
            >
              <Buttoncomps values={is_applied ? 'Withdraw Apply' : "Apply Job"} color={is_applied ? 'bg-red-500' : 'bg-blue-500'} />
            </span>
          }
        </div>
      }
      {
        (!is_applied && apply) && <ApplyJobPopup apply={apply} setApply={setApply} /> }
    </>
  )
}
