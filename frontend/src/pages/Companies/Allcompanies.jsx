import { useEffect, useRef } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllCompanies } from '../../api/auth.companies'
import Companycomps from '../../components/companies/Companycomps'
import Errorloading from "../../components/ui/Errorloading"
import Emptycomps from '../../components/ui/Emptycomps'
import Buttoncomps from '../../components/ui/Button'
import { useState } from 'react'
import Loading from '../../components/feedback/Loading'
export default function Allcompanies() {
  const [pagination, setPagination]=useState({page: 1})
  const {data, error, loading, execute}=useFetchData(getAllCompanies)
  const [companies, setCompanies]=useState([])
  const isTrue=useRef(false)
  useEffect(()=>{
    execute(pagination)
  }, [])
useEffect(() => {
  if (data?.message) {
    if (isTrue.current) {
      setCompanies(prev => [...(prev || []), ...data.message])
    } else {
      setCompanies(data.message)
      isTrue.current = true
    }
  }
}, [data?.message])

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
      <Emptycomps data={companies} type={'Companies'}/>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8'>
      {companies && companies.map(({uid, name, description, website, created_at, founded_year, location}, i)=>(
        <Companycomps key={i} uid={uid} website={website} name={name} description={description} created_at={created_at} founded_year={founded_year} location={location}/>
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
