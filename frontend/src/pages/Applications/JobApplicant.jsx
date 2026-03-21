import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllJobsApplicant } from '../../api/auth.applications'
import { useParams } from 'react-router'
import Loading from '../../components/Loading'
import Employeecomps from '../../components/common/employees/Employecomps'
import Emptycomps from '../../components/Emptycomps'
import Errorloading from '../../components/common/Errorloading'

export default function Jobapplicant() {
  const { id } = useParams()
  const { data, error, loading, execute } = useFetchData(getAllJobsApplicant)
  useEffect(() => {
    execute(id)
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <div>
      <Errorloading data={{ error: error }} />
      <Emptycomps data={data?.message} type={'All Applicant'} />
      <div className='container grid grid-cols-2 gap-16 p-8'>
        {data && data.message.map(({ applied_at, experience, full_name, resume_url, skills, education }, i) => (
          <Employeecomps education={education} key={i} full_name={full_name} applied_at={applied_at} experience={experience} skills={skills} />
        ))}
      </div>
    </div>
  )
}
