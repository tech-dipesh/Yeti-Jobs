import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyEmployee } from '../../api/auth.companies'
import { useParams } from 'react-router';
import Employecomps from '../../components/common/employees/Employecomps';
import Errorloading from '../../components/common/Errorloading';
import Emptycomps from '../../components/Emptycomps';
import Goback from '../../components/common/Goback';
export default function AllEmployees() {
  const {data, error, loading, execute}=useFetchData(getCompanyEmployee);
  const {id}=useParams()
  useEffect(()=>{
    execute(id)
  }, [])
  return (
    <div className='my-8'>
      <Errorloading data={{error, loading}}/>
      <Goback to={'/companies/dashboard'}/>
      <Emptycomps data={data?.message} type={'Employees'}/>
      <div className='grid grid-cols-1 justify-items-center lg:grid-cols-4 gap-6'>
      {data?.message && data?.message.map(({uid, full_name, email, experience, education, role, resume_url, profile_pic_url})=>(
        <Employecomps key={uid} full_name={full_name} email={email} experience={experience} education={education} role={role} resume_url={resume_url} profile_pic_url={profile_pic_url}/>
      ))}
      </div>
    </div>
  )
}
