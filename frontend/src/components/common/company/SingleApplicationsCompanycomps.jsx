import { useEffect, useState } from 'react'
import { ApplyLowerCasestatusOption } from '../../../Data/OptionList';
import Linkcomps from '../Linkcomps';
import useFetchData from '../../../hooks/useFetchData';
import Loading from '../../Loading';
import Successcomps from '../Success';
import { changeApplicationStatus } from '../../../api/auth.applications';
import Errorpopup from '../../Error/Errorpopup';

export default function SingleApplicationsCompanycomps({ job_id, applicant_id, job_title, resume_url, phone_number, status: oldstatus, cover_letter, notice_period, expected_salary, why_hire }) {
  let [status, setStatus] = useState(oldstatus)
  const { data, execute, error, loading } = useFetchData(changeApplicationStatus)
  useEffect(() => {
    (() => {
      setStatus(oldstatus)
    })()
  }, [])
  const changeStatus = async (e) => {
    const newValue = e.target.value;
    if (newValue == oldstatus) {
      return;
    }
    await execute({ status: newValue.toLowerCase(), applicant_id, id: job_id })
    if (data) {
      window.location.reload();
    }
  }
  if (loading) {
    return <Loading />
  }
  return (
    <div>
      <Errorpopup error={ error } />
      <Successcomps data={data} />
      <div className='bg-neutral-800 text-white rounded-xl shadow-lg flex justify-between items-start flex-col gap-3 border border-neutral-600 p-8 w-82'>
        <Linkcomps to={`/jobs/${job_id}`} content={'Visit Jobs Description'} style={'bg-slate-800'}/>
        <h2>Title: {job_title}</h2>
        {resume_url ? <Linkcomps to={resume_url} content={'View Resume'} /> : <div className='block h-6'></div>}
        <h2>status: <span className='font-semibold'>{oldstatus}</span></h2>
        <div className=''>
          <div className='font-medium'>Change Status:</div>
          {/* <Selectcomps option={ApplystatusOption} change={setStatus} name={'status'} value={status} /> */}
          <select value={status} onChange={changeStatus} className='bg-neutral-700 text-white cursor-pointer p-3 border-none rounded-lg shadow-md hover:bg-neutral-600 outline-none transition-all duration-200'>
            <>
              {!status && <option hidden>Select Option</option>}
              {ApplyLowerCasestatusOption?.map((o, i) => <option value={o} className='mb-4 p-2 text-2xl lg:text-xl border rounded cursor-pointer' defaultValue={oldstatus && o === oldstatus} key={i}>{o}</option>)}
            </>
          </select>
          <p>Phone Number: {phone_number}</p>
        </div>
        <div>
          {cover_letter && <h3>Cover Letter: {cover_letter}</h3>}
          {notice_period && <h3>Notice Period: {notice_period} days</h3>}
          {expected_salary && <h3>Expected Salary: &#36; {expected_salary}</h3>}
          {why_hire && <h3>Why Do Want To Join Us: {why_hire}</h3>}
        </div>
      </div>
    </div>
  )
}
