import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loading from '../../components/Loading';

import Buttoncomps from '../../components/common/Button';
import useFetchData from '../../hooks/useFetchData';
import { bookMarkJob, deleteExistingJobs, individualJobs, removeBookmark } from '../../api/auth.job';
import Confirmation from '../../components/Confirmation';
import Goback from '../../components/common/Goback';
import defaultImage from "../../assets/default-image.webp"
import Linkcomps from "../../components/common/Linkcomps"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookmark as solid, faShareNodes, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regular } from '@fortawesome/free-regular-svg-icons';
import { withdrawToParticularJob } from '../../api/auth.applications';
import { useAuth } from '../../context/Authcontext';
import Errorpopup from '../../components/Error/Errorpopup';
import EachJobAction from '../../components/common/Jobs/EachJobAction';

export default function EachJob() {
  const { id } = useParams();
  const { data, loading, execute, error } = useFetchData(individualJobs)
  useEffect(() => {
    execute(id)
  }, [id])

  const [action, setAction] = useState(null)
  const [copy, setCopy] = useState(false)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const { loading: loader, error: withdrawerror, execute: withd } = useFetchData(withdrawToParticularJob)
  const { error: errabookmark, loading: loadabookmark, execute: bookmark } = useFetchData(bookMarkJob)
  const { error: removeerrbookmark, loading: loadremovebookmark, execute: removeBook } = useFetchData(removeBookmark)
  const { error: errdelete, loading: loaddelete, execute: deletes } = useFetchData(deleteExistingJobs)
  const { data: initalValue = {}, reexecute } = useAuth()
  const { role } = initalValue;

  const confirmAnyActionPerform = async () => {
    let success = false;
    if (action === 'delete') {
      const res = await deletes(id)
      if (res) {
        navigate("/jobs")
      }
    } else if (action === 'withdraw') {
      const res = await withd(id)
      if (res) {
        navigate(0);
        success = true;
        return;
      }

    } else if (action === 'bookmark') {
      const res = await bookmark(id)
      if (res) {
        success = true;
      }
    } else if (action === 'withdrawbookmark') {
      const res = await removeBook(id)
      if (res) {
        success = true;
      }
    }
    setAction(null)
    if (success) {
      await execute(id)
      await reexecute()
    }
  }

  const { uid, title, job_type, location, salary, experience_years, logo_url, company_name, company_id, is_saved, is_owner } = data?.message || {}
  const valueButton = is_saved ? <FontAwesomeIcon icon={solid} /> : <FontAwesomeIcon icon={regular} />;

  if (loading || loadabookmark || loadremovebookmark || loaddelete || loader) {
    return <Loading />
  }
  return (
    <article className='min-w-screen min-h-screen px-6 py-8 bg-slate-900'>
      <Goback />
      <Errorpopup error={error || removeerrbookmark || errdelete || withdrawerror || errabookmark} />
      {data?.message &&
        <div className='bg-slate-800 p-8 max-w-5xl min-h-[90vh] mx-auto rounded-2xl flex flex-col gap-6'>
          <span className='text-slate-400 text-xs text-center opacity-90'>Job ID: {uid}</span>
          <div className='flex justify-between items-center gap-4'>
            <div className='flex items-center gap-3'>
              <img src={logo_url ? logo_url : defaultImage} alt="Logo" className='h-12 w-12 rounded-full object-cover shrink-0 border border-slate-600' />
              <div className='flex flex-col gap-1'>
                <p className='font-bold text-base text-white'>{company_name}</p>
                <Linkcomps
                  to={`/companies/${company_id}`}
                  content={
                    <span className='text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1'>
                      Visit Company: <FontAwesomeIcon icon={faArrowRight} /></span>
                  }
                />
              </div>
            </div>
            <div className='grid lg:flex items-center gap-2'>
              <div onClick={() => setOpen(!open)}>
                <Buttoncomps values={
                  <div className='flex items-center gap-2 p-2.5 rounded-lg border hover:bg-slate-700'
                    onClick={() => {
                      const CorrectUrl = window.location.href;
                      navigator.clipboard.writeText(CorrectUrl)
                      setCopy(!copy)
                    }}>
                    <span>{open ? 'Shared' : 'Share'}</span>
                    <FontAwesomeIcon icon={open ? faClipboardCheck : faShareNodes} style={''} className='transition-all' />
                  </div >
                }
                />
              </div >
              {(!is_owner && role == 'guest') &&
                <div
                  className=' items-center gap-2 px-2  py-1  rounded-lg border  border-slate-600 text-sm text-slate-300 hover:bg-slate-700 cursor-pointer transition'
                  onClick={() =>
                    is_saved ? setAction("withdrawbookmark") : setAction("bookmark")
                  } >
                  <Buttoncomps values={valueButton}
                  />
                  <span>Save</span>
                </div>
              }
            </div>
          </div>
          <div className='flex items-start justify-between gap-4'>
            <p className='text-3xl font-bold tracking-wide text-white'>{title}</p>
            <span className='text-xs p-2 bg-green-600 text-white rounded-full mt-2 bg-text-white whitespace-nowrap'>
              {job_type}</span>
          </div>
          <div className='flex flex-wrap gap-4 text-sm bg-slate-700/50 rounded-xl p-4 text-slate-300'>
            <div className='flex flex-col gap-1'>
              <span className='text-slate-500 text-xs'>Salary</span>
              <strong className='text-white'>{salary || 'Not Specified'}</strong>
            </div>
            <div className='w-px bg-slate-600' />
            <div className='flex flex-col gap-1'>
              <span className='text-slate-500 text-xs tracking-wide'>Experience</span>
              <strong className='text-white'>{experience_years || '0'} yrs</strong>
            </div>
            <div className='w-px bg-slate-600' />
            <div className='flex flex-col gap-0.5'>
              <span className='text-slate-500 text-xs tracking-wide'>Location</span>
              <strong className='text-white'>{location || 'Remote / Not specified'}</strong>
            </div>
          </div>
          {action && <Confirmation type={action} confirm={confirmAnyActionPerform} cancel={() => setAction(null)} />}
          <div className='flex flex-col flex-1'>
            <EachJobAction setAction={setAction} data={data?.message} />
          </div>
        </div>
      }
    </article>
  )
}
