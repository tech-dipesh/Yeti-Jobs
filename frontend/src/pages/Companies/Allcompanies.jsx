import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllCompanies } from '../../api/auth.companies'
import Companycomps from '../../components/common/company/Companycomps'
import Errorloading from "../../components/common/Errorloading"
import Emptycomps from '../../components/Emptycomps'
import Buttoncomps from '../../components/common/Button'
import { useState } from 'react'
import Loading from '../../components/Loading'
export default function Allcompanies() {
  const [pagination, setPagination]=useState({page: 1})
  const {data, error, loading, execute}=useFetchData(getAllCompanies)
  useEffect(()=>{
    execute(pagination)
  }, [])
   const loadMore = async () => {
    setPagination((prev)=>({
      page: prev.page+1,
    }))
    await execute(pagination);
  }
  if(loading){
    return <Loading/>
  }
  return (
    <div>
      <Errorloading data={{error, loading}}/>
      <Emptycomps data={data?.message} type={'Companies'}/>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8'>
      {data && data?.message.map(({uid, name, description, website, created_at, founded_year, location})=>(
        <Companycomps key={uid} uid={uid} website={website} name={name} description={description} created_at={created_at} founded_year={founded_year} location={location}/>
      ))}
      </div>
      {data?.page * data?.limit < data?.total &&
          <span className='grid justify-items-center' onClick={loadMore}>
            <Buttoncomps values={'Load More....'} />
          </span>
      }
    </div>
  )
}
