import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { listOfAllCompaniesFollowers } from '../../api/auth.companies'
import { useEffect } from 'react';
import Loading from '../../components/feedback/Loading';
import Errorloading from "../../components/ui/Errorloading"
import Emptycomps from "../../components/ui/Emptycomps"
import Usercomps from "../../components/users/Usercomps"
export default function CompanyFollowers() {
  const { data, error, loading, execute } = useFetchData(listOfAllCompaniesFollowers);
  useEffect(() => { execute() }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <div className='min-h-screen bg-slate-900 text-white'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <Emptycomps data={data?.message} type='Followers' />
        <Errorloading data={{ error }} />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {data?.message && data?.message?.map(({ userid, firstname, lastname, education, email, role, resume_url, profile_pic_url, skills, experience_years }) => (
            <Usercomps key={userid} fullname={`${firstname}${lastname}`} education={education} email={email} role={role} resume_url={resume_url} profile_pic_url={profile_pic_url} skills={skills} experience_years={experience_years} />
          ))
          }
        </div>
      </div>
    </div>
  )
}
