import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllCompanies } from '../../api/auth.companies'
import Companycomps from '../../components/common/company/Companycomps'
import Errorloading from "../../components/common/Errorloading"
import Emptycomps from '../../components/Emptycomps'
export default function Allcompanies() {
  const {data, error, loading, execute}=useFetchData(getAllCompanies)
  useEffect(()=>{
    execute()
  }, [])
  return (
    <div>
      {/* <Titlecomps text={'All Companies List:'}/> */}
      <Errorloading data={{error, loading}}/>
    <Emptycomps data={data?.message} type={'Companies'}/>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8'>
      {data && data?.message.map(({uid, name, description, website, created_at, founded_year, location})=>(
        <Companycomps key={uid} uid={uid} website={website} name={name} description={description} created_at={created_at} founded_year={founded_year} location={location}/>
      ))}
      </div>
    </div>
  )
}
