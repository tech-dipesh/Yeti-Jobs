import { useEffect } from 'react'
import { savedJobsList } from '../../api/auth.job'
import useFetchData from '../../hooks/useFetchData'
import Jobcomps from '../../components/common/Jobs/Jobcomps'
import Errorloading from '../../components/common/Errorloading'
import Loading from '../../components/Loading'
import Emptycomps from '../../components/Emptycomps'
import { Link } from 'react-router'
import Buttoncomps from '../../components/common/Button'

export default function AllBookmarks() {
  const { data, error, loading, execute } = useFetchData(savedJobsList)
  useEffect(() => {
    execute()
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <div className='min-h-screen grid min-w-screen w-auto bg-slate-900 text-white'>
      <Errorloading data={{ error }} />
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <Emptycomps data={data?.message} type='Bookmarks' />
        <div className='container grid grid-cols-1  lg:grid-cols-3 gap-16 p-8 '>
          {data && data?.message?.map(({ uid, title, description, job_type, is_job_open, salary, expired_at }) => (
            <Jobcomps uid={uid} title={title} description={description} job_type={job_type} is_job_open={is_job_open} salary={salary} expired_at={expired_at} />
          ))}
        </div>
        <Errorloading data={{ error, loading }} />
      </div>
    </div>
  )
}
