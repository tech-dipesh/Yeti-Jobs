import React from 'react'
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllCompanies } from '../../api/auth.companies'
import { Link } from 'react-router'
import Companyjobcomps from '../../components/common/company/Companycomps'
import Companycomps from '../../components/common/company/Companycomps'
import ButtonComps from '../../components/common/Button'
import Titlecomps from '../../components/common/Titlecomps'
import Errorloading from "../../components/common/Errorloading"
export default function Allcompanies() {
  const {data, error, loading, execute}=useFetchData(getAllCompanies)
  useEffect(()=>{
    execute()
  }, [])
  return (
    <div>
      <div className='px-8 pt-8 pb-4 border-b border-neutral-700'>
      <h1 className='text-4xl font-bold text-white'>All Companies</h1>
      <p className='text-neutral-400 mt-1'>Browse all registered companies</p>
    </div>
      {/* <Titlecomps text={'All Companies List:'}/> */}
      <Errorloading data={{error, loading}}/>
      {data?.message.length === 0 && (
      <div className='text-center py-20 text-neutral-400'>
    <p className='text-2xl'>🏢</p>
    <p className='mt-2'>No companies found</p>
    </div>
      )}
    <span className='ml-3 text-sm bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full'>
  {data?.message.length} companies
    </span>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8'>
      {data && data?.message.map(({uid, name, description, website, created_at, founded_year, location})=>(
        <Companycomps uid={uid} website={website} name={name} description={description} created_at={created_at} founded_year={founded_year} location={location}/>
      ))}
      </div>
    </div>
  )
}
