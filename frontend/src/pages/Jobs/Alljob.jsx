import { useEffect } from 'react'
import { Link } from 'react-router';
import { allJobsList } from "../../api/auth.job"
import UseFetchData from "../../hooks/useFetchData"
import ButtonComps from '../../components/common/Button';
import Jobcomps from '../../components/common/Jobs/Jobcomps';
import Loading from '../../components/Loading';
import Emptycomps from '../../components/Emptycomps';
import Buttoncomps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';

export default function Jobs() {
  const { data, error, loading, execute } = UseFetchData(allJobsList)
  let page = 1;
  useEffect(() => {
    ; (async () => {
      await execute({ page })
    })()
  }, [])

  if (loading) {
    return <Loading />
  }
  const loadMore = async () => {
    page++;
    await execute({ page });
  }
  return (
    <div className='min-h-screen grid min-w-screen w-auto bg-slate-900 text-white'>
      <Errorloading data={{ error }} />
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <Emptycomps data={data?.message} type='Jobs' />
        <div className='flex justify-center gap-24'>
          <Link to='search'>
            <ButtonComps values='Search Job' className='text-4xl' />
          </Link>
        </div>

        <div className='container grid grid-cols-1 lg:grid-cols-2 gap-16 p-8'>
          {data && data?.message.map(({ uid, title, description, salary, job_type, total_job_views, skills, is_job_open, experience_years, company_name, expired_at }) => (
            <Jobcomps key={uid} uid={uid} title={title} description={description} salary={salary} job_type={job_type} total_job_views={total_job_views} skills={skills} is_job_open={is_job_open} experience_years={experience_years} company_name={company_name} expired_at={expired_at} />
          ))}
        </div>
        {data?.page * data?.limit < data?.total &&
          <span className='grid justify-items-center' onClick={loadMore}>
            <Buttoncomps values={'Load More....'} />
          </span>
        }
      </div>
    </div>
  )
}
