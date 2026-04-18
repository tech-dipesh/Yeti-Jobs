import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Buttoncomps from '../Button';
import Popup from '../../Popup';
import InputComps from '../Input';
import ValidateApplication from '../../../auth/Application/ValidateApplications';
import Errorloading from '../Errorloading';
import { useAuth } from "../../../context/Authcontext"
import { applyToParticularJob } from '../../../api/auth.applications';
import Errorpopup from '../../Error/Errorpopup';
import useFetchData from '../../../hooks/useFetchData';
import Loading from '../../Loading';
import CleanFilterEmptySpace from "../../../auth/CleanFilterEmptySpace"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
export default function EachJobAction({ setAction, data, }) {
  const { data: userValue } = useAuth()
  const { role } = userValue ?? {}
  const { id } = useParams()
  const navigate = useNavigate()
  const [loaddesc, setShowDesc] = useState(false)
  const { description, salary, skills, company_id, is_applied, is_owner, total_job_views } = data || {}
  const [apply, setApply] = useState(false)
  const [value, setValue] = useState({ cover_letter: '', expected_salary: '', notice_period: '', why_hire: '' })
  const [error, setError] = useState(null)
  const { loading, error: apiapplyerror, execute } = useFetchData(applyToParticularJob)
  const allDivOptions = [
    { label: 'Cover Letter:', name: 'cover_letter', type: 'text' },
    { label: 'Expected Salary:', name: 'expected_salary', type: 'number', required: true },
    { label: 'Notice Period in:', name: 'notice_period', type: 'number', required: true },
    { label: 'Why Should We Hire You?', name: 'why_hire', type: 'text' }
  ]
  const submitFormApply = async (e) => {
    e.preventdefault()
    const err = ValidateApplication(value)
    if (err) {
      setError(err)
      return;
    }
    const clean = CleanFilterEmptySpace(value);
    const res = await execute({ id, value: clean })
    if (res) {
      setApply(!apply)
      navigate(0)
    }
  }
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <div className='bg-slate-800 rounded-2xl min-h-24'>
        <div className='text-xs tracking-widest text-slate-500 mb-2'>Description:</div>
        {description?.length < 100 ?
          <p className='text-slate-400 text-sm leading-relaxed'>{description}</p> :
          <>
            <p className='text-slate-300 text-sm'>
              {!loaddesc && description?.slice(0, 100)}
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
        <div className='bg-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3'>
          <Link to={`/companies/${company_id}/applications`} className='flex-1'>
            <Buttoncomps values='Applicants' color='bg-slate-600' />
          </Link>
          <Link to='edit' state={data} className='flex-1'>
            <Buttoncomps values='Edit' color={'bg-slate-600'} />
          </Link>
          <span onClick={() => setAction("delete")} className='flex-1'>
            <Buttoncomps values='Delete' color='bg-red-600' />
          </span>
          <div className='w-full flex justify-end'>
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
                <>
                  &#36; {salary}
                </>
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
        (!is_applied && apply) &&
        <Popup header={'Apply To the Job:'} setOpen={setApply} open={apply} height='min-h-auto' width='w-2xl'>
          <div>
            <Errorpopup error={apiapplyerror} />
            <form className='flex flex-col gap-4' onSubmit={submitFormApply}>
              {allDivOptions?.map(({ label, name, type, required }, i) =>
                <div className='flex flex-col gap-1' key={i}>
                  <label className='text-sm text-gray-300'>{label} {required && <span className='text-red-500 text-5xl'>*</span>}</label>
                  <InputComps value={value[name]} name={name} type={type} click={setValue} placeholder={label} error={setError} height={(name == 'cover_letter' || name == 'why_hire') && 'h-24'} />
                  {
                  (name == 'cover_letter' || name == 'why_hire') &&
                   <span className='text-xs text-gray-400 text-right'>{250 - value[name]?.length} Charachter Left
                   </span>
                   }
                </div>
              )}
              <Errorloading data={{ error }} />
              <div className='justify-center flex'>
                <Buttoncomps color={'bg-red-500'} />
              </div>
            </form>
          </div>
        </Popup>
      }
    </>
  )
}