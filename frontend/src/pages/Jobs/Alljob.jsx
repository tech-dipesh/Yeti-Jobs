import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router';
import { allJobsList } from "../../api/auth.job"
import UseFetchData from "../../hooks/useFetchData"
import ButtonComps from '../../components/common/Button';
import Jobcomps from '../../components/common/Jobs/Jobcomps';
import Loading from '../../components/Loading';
import Emptycomps from '../../components/Emptycomps';
import Buttoncomps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';
import FilterSidebar from '../../components/common/Jobs/Filtersidebar';

export default function Jobs() {
  const { data, error, loading, execute } = UseFetchData(allJobsList)
  const [jobs, setJobs] = useState([])
  const isTrue = useRef(false)
  let page = 1;
  useEffect(() => {
    execute({ page })
  }, [])

  useEffect(() => {
    if (isTrue && data?.message) {
      setJobs((prev) => [...prev, ...data.message])
    }
    else if (data?.message) {
      setJobs(data.message)
      isTrue.current = true;
    }
  }, [data?.message])
  if (loading) {
    return <Loading />
  }
  const loadMore = async () => {
    page++;
    await execute({ page });
  }
  return (
    <div className='min-h-screen bg-slate-900 text-white'>
  <Errorloading data={{ error }} />
  <div className='max-w-7xl mx-auto px-6 py-10'>
    <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8'>
      <div className='lg:sticky lg:top-24 self-start'>
        <FilterSidebar />
      </div>
      <div>
        <Emptycomps data={jobs} type='Jobs' />
        <div className='flex justify-center gap-24'>
          <Link to='search'>
            <ButtonComps values='Search Job' className='text-4xl' />
          </Link>
        </div>
        <div className='container grid grid-cols-1 lg:grid-cols-2 gap-16 p-8'>
          {jobs && jobs.map((job) => (
            <Jobcomps key={job.uid} {...job} />
          ))}
        </div>
        {data?.page * data?.limit < data?.total && (
          <span className='grid justify-items-center' onClick={loadMore}>
            <Buttoncomps values={'Load More....'} />
          </span>
        )}
      </div>
    </div>
  </div>
</div> 
  )
}
