import React, { useState } from 'react'
import InputComps from '../../components/common/Input'
import { useEffect } from 'react'
import CustomDebounceHook from "../../hooks/useDebounce"
import useFetchData from '../../hooks/useFetchData'
import { searchJobs } from '../../api/auth.job'
import { Link } from 'react-router'
import Textcomps from '../../components/common/Textcomps'
import ButtonComps from '../../components/common/Button'
import Jobcomps from '../../components/common/Jobcomps'
import Errorloading from '../../components/common/Errorloading'
import Loading from '../../components/Loading'
export default function Searchjobs() {
  const [search, setSearch]=useState("")
  const debounce=CustomDebounceHook(search, 300)
const { data, error, loading, execute } = useFetchData(searchJobs);

  useEffect(() => {
    if (debounce) {
      execute(debounce);
    }
  }, [debounce]);
 if(loading){
  return <Loading/>
 }
  return (
  // <div className='bg-slate-700 min-h-screen'>
    <div className='flex flex-col min-h-screen'>
      <Textcomps content='Search a jobs'/>
      <div className='max-w-2xl mx-auto w-full space-x-2'>
      <InputComps placeholder='Your Search Term' type='text' click={setSearch} value={search} className='text-center text-gray-600 mt-2'/>
      <span onClick={()=>{
        setSearch(""),
        data.message=[];
        }}><ButtonComps values='Clear'/></span>
      </div>
      <div>Search Term: {debounce}</div>
      <Errorloading data={{error, loading}}/>
      {!data && <div>No Result Found</div>}
      <div className='grid container mx-auto space-y-2 grid-cols1 gap-6 p-4'>
        {data && data?.message.map(({uid, title, description, salary, job_type})=>(
          <Jobcomps uid={uid} title={title} description={description} salary={salary} job_type={job_type}/>
        ))}
    </div>
    </div>
  )
}
