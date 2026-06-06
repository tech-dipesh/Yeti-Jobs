import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router';
import { allJobsList, FilterWithSearchJobs } from "../../api/auth.job"
import UseFetchData from "../../hooks/useFetchData"
import ButtonComps from '../../components/common/Button';
import Jobcomps from '../../components/common/Jobs/Jobcomps';
import Loading from '../../components/Loading';
import Emptycomps from '../../components/Emptycomps';
import Buttoncomps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';
import FilterSidebar from '../../components/common/Jobs/Filtersidebar';
export default function Jobs() {
  const [filters, setFilters] = useState({});
  const { data, error, loading, execute } = UseFetchData(allJobsList)
  const { data: filterdata, error: filtererror, loading: filterloader, execute: filterexecute } = UseFetchData(FilterWithSearchJobs)
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
  const ApplyFilter =async (newFilters) => {
    setFilters(newFilters);
const allValues = { page, sortby: newFilters?.sortby ?? 'created_at', min_salary: newFilters?.minSalary ?? '', max_salary: newFilters?.maxSalary ?? '', min_exp: newFilters?.minExp ?? '', max_exp: newFilters?.maxExp ?? '', skills: newFilters?.skills ?? '', location: newFilters?.location ?? '', job_type: newFilters?.jobType ?? '', status: newFilters?.status ?? '', posted: newFilters?.posted ?? '', };
    const queryStringAll = new URLSearchParams(allValues).toString();
    console.log("query string", queryStringAll);
    await filterexecute({content: queryStringAll})
  const result = await filterexecute({ content: queryStringAll });
  if (result?.message) {
    setJobs(result?.message);
  }
  };
const ClearFilter = () => {
  const cleared = { jobType: '', status: '', posted: '', minSalary: '', maxSalary: '', minExp: '', maxExp: '', skills: '', location: '' };
  setFilters(cleared);
  ApplyFilter(cleared);
}; 
  if(loading || filterloader){
    return <Loading/>
  }
  return (
     <div className='min-h-screen bg-slate-900 text-white'>
  <Errorloading data={{ error }} />
  <div className='max-w-7xl mx-auto px-6 py-10'>
    <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start'>
      <div className='sticky top-24 self-start'>
        <FilterSidebar onApply={ApplyFilter} onClear={ClearFilter} />
      </div>
      <div>
       <Emptycomps data={jobs} type='Jobs' />
        <div className='flex justify-center mb-6'>
          <Link to='search'>
            <ButtonComps values='Search Job' />
          </Link>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {jobs && jobs.map((job, i) => <Jobcomps key={i} {...job} />)}
        </div>
        {data?.page * data?.limit < data?.total && (
          <span className='flex justify-center mt-8' onClick={loadMore}>
            <Buttoncomps values='Load More....' />
          </span>
        )}
      </div>
    </div>
  </div>
</div>
  )
}
