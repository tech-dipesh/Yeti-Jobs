import useFetchData from '../../hooks/useFetchData';
import { getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/common/Errorloading';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import Jobcomps from "../../components/common/Jobs/Jobcomps"
import Emptycomps from "../../components/Emptycomps"
import Goback from '../../components/common/Goback';
export default function AllCompanyJobs() {
  const { id } = useParams()
  const { data, error, loading, execute } = useFetchData(getCompanyJobs);
  // useEffect(()=>execute(id), [id])
  useEffect(() => {
    execute(id)
  }, [id])

  const {pathname}=useLocation()
  const isJob=pathname.split("/")[3]
  return (
    <div>
      <Goback to={isJob ? `../${id}` : '/jobs'} content={isJob ? 'View Company Page':'Visit All Jobs'}/>
      <Errorloading data={{ error, loading }} />
      <Emptycomps data={data?.message} type={'Company Jobs'}/>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8'>
        {data?.message && data?.message.map(({ uid, title, description, salary, job_type, experience_years, total_job_views, expired_at, company_name }) => (
          <Jobcomps key={uid} title={title} description={description} salary={salary} job_type={job_type} experience_years={experience_years} total_job_views={total_job_views} company_name={company_name} expired_at={expired_at}/>
        ))}
      </div>
    </div>
  )
}
