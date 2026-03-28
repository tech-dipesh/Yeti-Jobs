import { useState } from 'react'
import { useEffect } from 'react'
import CustomDebounceHook from "../../hooks/useDebounce"
import useFetchData from '../../hooks/useFetchData'
import { searchJobs } from '../../api/auth.job'
import ButtonComps from '../../components/common/Button'
import Jobcomps from '../../components/common/Jobs/Jobcomps'
import Errorloading from '../../components/common/Errorloading'
import Loading from '../../components/Loading'
import { sortByFilter } from '../../Data/OptionList'
import Goback from '../../components/common/Goback'
export default function Searchjobs() {
  const [search, setSearch] = useState("")
  const [sortby, setSortBy] = useState("created_at")
  const debounce = CustomDebounceHook(search, 300)
  const { data, error, loading, execute } = useFetchData(searchJobs);
  useEffect(() => {
    if (debounce) {
      execute({ title: debounce, order: sortby });
    }
  }, [debounce]);
  if (loading) {
    return <Loading />
  }
  const clearFilter = (e) => {
    setSearch(""),
      data.message = [];
    setSortBy("created_at")
  }
  return (
    <div className='bg-neutral-800 min-h-screen max-w-5/6 py-4 mx-auto p-6'>
      <div className='flex flex-col min-h-screen'>
        <div className='mb-6'>
          <Goback to='/jobs' content='Go Back To Jobs'/>
        </div>
        <div className='flex flex-col items-center'>
          <span className='grid justify-items-center'>
            {/* <InputComps placeholder='' type='text' click={setSearch} value={search} className='text-center text-gray-600 mt-2' /> */}
            <input type="text" autoFocus className={`bg-transparent h-11 w-full rounded-lg text-white placeholder-gray-400 ring px-2  ring-white focus:ring-sky-500 focus:outline-none`} placeholder="Your Search Term" value={search} onChange={(e)=>setSearch(e.target.value)}/>
          </span>
          <div className='grid justify-items-center gap-3 my-3'>
            <h2>Sort By:</h2>
            <select value={sortby} onChange={(e) => setSortBy(e.target.value)} className='bg-neutral-700 text-white cursor-pointer p-3 border-none rounded-lg shadow-md hover:bg-neutral-600 focus:ring-2  transition-all duration-200'>
              <>
                <option hidden>Select Option</option>
                {sortByFilter?.map((o, i) => (
                  <option className='mb-4 p-2 border rounded cursor-pointer' key={i} value={o.backend}>{o.frontend}</option>
                ))}
              </>
            </select>
            <span onClick={clearFilter}><ButtonComps values='Clear' /></span>
          </div>
        </div>
        <Errorloading data={{ error, loading }} />
        {data?.message &&
          <div className='flex gap-6 justify-center text-sm text-gray-300 my-3'>
            <span>Search Term: <strong className='text-white'>{debounce || "-"}</strong></span>
            <span>Results: <strong className='text-white'>{data?.message?.length ?? 0} Jobs</strong></span>
          </div>
        }
        <div className='grid container mx-auto space-y-2 grid-cols-1 lg:grid-cols-2 gap-6 p-4'>
          {data?.message?.length ? data?.message.map(({ uid, title, description, salary, job_type, expired_at }) => (
            <Jobcomps key={uid} uid={uid} title={title} description={description} salary={salary} job_type={job_type} expired_at={expired_at}/>
          ))
            :
            <div className='flex items-center justify-center text-gray-400 text-lg'>
              No Results For: <span className='text-white  font-semibold'>{debounce && debounce}</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
