import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyDashboard } from '../../api/auth.companies'
import { Link, useNavigate } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import ButtonComps from '../../components/common/Button';

export default function Companydashboard() {
  const navigate = useNavigate()
  const { data: authdata, error: errdata, loading: loaddata } = useAuth();
  const { execute, data, error, loading } = useFetchData(getCompanyDashboard);
  useEffect(() => {
    execute()
    if (error == "You're not a employee of the company") {
      return navigate("/")
    }
  }, [])
  const { company_id, role } = authdata ?? {};
  const { message } = data || {}
  const allRecruiterLink = [
    { to: `/companies/${company_id}/jobs`, value: 'All Owned Jobs' },
    { to: `/companies/${company_id}/applications`, value: 'All Applications' },
    { to: `/companies/${company_id}/users/all`, value: 'All Employees' },
    { to: `/companies/followers`, value: 'Followers' },
  ]
  const allStats = [
    { bg: 'bg-blue-100', name: 'Jobs: ', value: 'total_jobs' },
    { bg: 'bg-green-100', name: 'Applications', value: 'total_applications' },
    { bg: 'bg-yellow-100', name: 'Open Jobs', value: 'open_jobs' },
    { bg: 'bg-purple-100', name: 'Employees', value: 'total_employees' },
    { bg: 'bg-gray-100', name: 'Followers', value: 'total_followers' }
  ]
 
  return (
    <div className='px-4'>
      <div className='px-8 pt-8 pb-4 border-b border-neutral-700 mb-6'>
        <h2 className='text-3xl font-bold text-white'>Company Dashboard</h2>
        <p className='text-neutral-400 mt-1'>See Company All The Stats</p>
      </div>
      <h2>Welcome Back To Company Dashboard:</h2>
      {(message && role == 'recruiter') &&
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-black'>
          {allStats?.map(({ bg, name, value }, i) =>
            <div className={`${bg} p-4 rounded-lg`} key={i}>{`All Company ${name}: ${message?.[value] ?? null}`}</div>
          )}
        </div>
      }
      <Errorloading data={{ error: errdata, loading: loaddata }} />
      <Errorloading data={{ error, loading }} />
      {(role && role == 'recruiter') &&
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4 mt-6'>
          {allRecruiterLink.map(({ to, value }, i) =>
            <Link key={i} to={to}><ButtonComps values={value} /></Link>
          )}
        </div>
      }
    </div>
  )
}
