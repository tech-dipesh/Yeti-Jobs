import { Fragment, useEffect, useState } from 'react'
import ButtonComps from '../../components/common/Button'
import useFetchData from '../../hooks/useFetchData'
import { Link, useNavigate, useParams } from 'react-router'
import { applyToParticularJob, withdrawToParticularJob } from "../../api/auth.applications"
import Loading from '../../components/Loading'
import { bookMarkJob, deleteExistingJobs, removeBookmark } from '../../api/auth.job'
import { useAuth } from '../../context/Authcontext'
import { faBookmark as solid } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regular } from '@fortawesome/free-regular-svg-icons'
import Errorloading from '../../components/common/Errorloading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Confirmation from '../../components/Confirmation'

export default function Applyjob({ data: children, execute: reexecute }) {
  const [confirm, setConfirm] = useState(false)
  const { uid, title, description, job_type, is_applied, location, is_saved, skills, salary, company_id, total_job_views, is_owner } = children || {};
  useEffect(() => { }, [children])
  const { id } = useParams();
  const navigate = useNavigate()
  const { data, loading, error: apiapplyerror, execute } = useFetchData(applyToParticularJob)
  const { data: output, loading: loader, error, execute: withd } = useFetchData(withdrawToParticularJob)
  const { data: bookmarkdata, error: errabookmark, loading: loadabookmark, execute: bookmark } = useFetchData(bookMarkJob)
  const { data: removebookdata, error: removeerrbookmark, loading: loadremovebookmark, execute: removeBook } = useFetchData(removeBookmark)
  const { data: datadelete, error: errdelete, loading: loaddelete, execute: deletes } = useFetchData(deleteExistingJobs)
  const { data: initalValue = {} } = useAuth()
  const { role } = initalValue
  const confirmAnyActionPerform = async () => {
    if (confirm === 'delete') {
      await deletes(id)
      await reexecute(id)
      if (datadelete) setTimeout(() => navigate('..'), 250)
    } else if (confirm === 'apply') {
      await execute({ id })
      await reexecute(id)
      if (data) navigate(0)
    } else if (confirm === 'withdraw') {
      await withd(id)
      await reexecute(id)
      if (output) navigate(0)
    } else if (confirm === 'bookmark') {
      await bookmark(id)
      await reexecute(id)
      if (bookmarkdata) navigate(0)
    } else if (confirm === 'withdrawbookmark') {
      await removeBook(id)
      await reexecute(id)
      if (removebookdata) navigate(0)
    }
    setConfirm(null)
  }
  const Applyjob = async () => {
    setConfirm("apply")
  }
  const removeJob = async () => {
    setConfirm("withdraw")
  }
  const saveJob = async () => {
    setConfirm("bookmark")
  }
  const RemoveSavedJobs = async () => {
    setConfirm("withdrawbookmark")
  }


  const deleteJob = async () => {
    setConfirm("delete")
  }


  const valueButton = is_saved ? <FontAwesomeIcon icon={solid} /> : <FontAwesomeIcon icon={regular} />;

  if (loading || loadabookmark || loadremovebookmark || loaddelete || loader) {
    return <Loading />
  }
  return (
    <Fragment>
      {confirm && <Confirmation type={confirm} confirm={confirmAnyActionPerform} cancel={() => setConfirm(null)} />}
      <Errorloading data={{ error: error || errabookmark || apiapplyerror || removeerrbookmark || errdelete }} />
      <div className='flex items-center justify-between relative'>
        <div className=' flex justify-center align-middle'>
          {is_owner ?
            // <div className='grid justify-items-center mx-auto lg:flex gap-6  my-4 items-center lg:justify-center'>
            <div className='gap-8 space-x-8 lg:space-x-38 '>
              <Link to={`/companies/${company_id}/applications`} className='flex-1'>
                <ButtonComps values='Applicants' color='bg-slate-600' />
              </Link>
              <Link to='edit' state={children} className='flex-1'>
                <ButtonComps values='Edit' />
              </Link>
              <span onClick={deleteJob} className='flex-1'>
                <ButtonComps values='Delete' color='bg-red-600' />
              </span>
            </div> :
            <span onClick={is_applied ? removeJob : Applyjob} className='absolute left-1/2 -translate-x-1/2 lg:my-10 text-nowrap text-2xl my-6'>
              <ButtonComps values={is_applied ? 'Withdraw Apply' : "Apply Job"} color={is_applied ? 'bg-yellow-500' : 'bg-green-500'} />
            </span>
          }
        </div>
        <div className='flex grid-cols-2 space-x-8'>
          {is_owner && <p className='text-sm text-slate-400 ml-auto'>Total Job View: {total_job_views}</p>}
          {(!is_owner && role == 'guest') &&
            // <span onClick={is_saved ? RemoveSavedJobs : saveJob} className='flex justify-end'><ButtonComps values={valueButton} /></span>}
            <span className='flex justify-end'>
              <ButtonComps values={valueButton} onClick={is_saved ? RemoveSavedJobs : saveJob} />
            </span>
          }
        </div>
      </div>
    </Fragment>
  )
}
