import useFetchData from '../../hooks/useFetchData';
import { getCompanyApplications } from '../../api/auth.companies';
import Errorloading from '../../components/common/Errorloading';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import SingleApplicationsCompanycomps from '../../components/common/company/SingleApplicationsCompanycomps';
import Emptycomps from '../../components/Emptycomps';
import Goback from '../../components/common/Goback';
export default function Allapplications() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyApplications);
  useEffect(()=>{(async()=>execute(id))()}, [id])
  const {message}=data || {}
  return (
    <div className='bg-neutral-800 min-h-screen p-8'>
      <Goback to={`/companies/dashboard`}/>
      <Errorloading data={{error, loading}}/>
      <Emptycomps data={data?.message} type={'Applications'}/>
    <div className='flex gap-6 mb-6 text-white'>
      <span>Total: {message?.length}</span>
      <span>Pending: {message?.filter(a => a.status === 'pending').length}</span>
      <span>Approved: {message?.filter(a => a.status === 'approved').length}</span>
      </div>
      <h1 className='text-white text-2xl font-bold mb-6'>All Applications</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {message && message.map(({job_title, applicant_id, resume_url, status, total_job_views, phone_number, job_id, cover_letter, why_hire, expected_salary, notice_period}, i)=>(
        <SingleApplicationsCompanycomps  applicant_id={applicant_id} phone_number={phone_number} job_id={job_id} job_title={job_title} resume_url={resume_url} status={status} cover_letter={cover_letter} why_hire={why_hire} expected_salary={expected_salary} notice_period={notice_period} key={i}/>
      ))}
    </div>
    </div>
  )
}