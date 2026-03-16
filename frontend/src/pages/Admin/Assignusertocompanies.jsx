import React, { useEffect, useState } from 'react'
import Titlecomps from '../../components/common/Titlecomps'
import InputComps from '../../components/common/Input'
import CustomDebounceHook from '../../hooks/useDebounce';
import { searchJobs } from '../../api/auth.job';
import useFetchData from '../../hooks/useFetchData';
import { assignCompaniesToUsers, getSearchCompanies, getSearchUsers } from '../../api/auth.admin';
import ButtonComps from '../../components/common/Button';
import Loading from '../../components/Loading';
import Errorloading from '../../components/common/Errorloading';
import Emptycomps from '../../components/Emptycomps';
import { useNavigate } from 'react-router';

export default function Assignusertocompanies() {
  const navigate = useNavigate()
  const [companySearch, setCompanySearch] = useState("")
  const [userSearch, setUsersSearch] = useState("")
  const [error, setError] = useState("")
  const [value, setValue] = useState({ company_id: '', uid: '' })
  const debounce = CustomDebounceHook(companySearch, 350)
  const debounce1 = CustomDebounceHook(userSearch, 350)
  let { data: userdata, error: usererror, execute: userexec } = useFetchData(getSearchUsers);
  let { data: compdata, error: comperror, execute: compexec } = useFetchData(getSearchCompanies);
  const { data, error: apierror, loading, execute } = useFetchData(assignCompaniesToUsers);

  useEffect(() => {
    if (debounce) {
      compexec(debounce);
    }
    if (debounce1) userexec(debounce1)
  }, [debounce, debounce1]);
  const submitBoth = async () => {
    await execute(value);
    if (data.message) {
      setTimeout(() => {
        // navigate("/")
        navigate(0, { replace: true })
      }, 150);
    }
  }
  if (loading) return <Loading />
  console.log('value is', userdata?.message)
  return (
    <main className='min-h-screen p-8'>
      <Errorloading data={{ error: usererror || comperror || apierror || error }} />
      <h1 className='text-center text-2xl font-bold text-slate-100 mb-8 tracking-wide'>Assign User To Company</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-slate-800 border border-slate-600 rounded-2xl p-6 flex flex-col  gap-4'>
              <div className='flex items-center justify-between flex-wrap gap-2'>
              <h2 className='text-slate-100  font-semibold text-lg border border-slate-500 rounded-lg px-4 py-1.5 w-fit'>Users</h2>
              <span className='p-2' onClick={() => { setUsersSearch(''); userdata.message = []; setValue(prev => ({ ...prev, uid: null })) }}><ButtonComps values='Clear' /></span>
              {/* <button onClick={() => className='text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-500 px-3 py-1 rounded-lg transition-colors' */}
              {/* > Clear</button> */}
              <InputComps
                click={setUsersSearch}
                error={setError}
                placeholder='User Search'
                value={userSearch}
                type='text'
              />
            </div>
            <div className='grid grid-cols-1  gap-4 lg:grid-cols-3'>
              {userdata && userdata?.message.length > 0 ? userdata?.message.map(({ uid, fname, lname, experience, company_id }) => {
                const whichSelect = value.uid === uid;
                return (
                  <div key={uid} onClick={() => setValue((prev) => ({ ...prev, uid }))}
                    className={` rounded-xl p-4 border transition-colors
                        ${company_id ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer pointer-events-auto'}
                      ${whichSelect
                        ? 'bg-slate-500 border-slate-300 text-white'
                        : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                      }`}
                  >
                    <p className='mb-2 text-xl font-semibold truncate text-gray-800'>{`${fname} ${lname}`}</p>
                    <p className='mt-1 opacity-90'>{experience ?? '0'} yrs experience</p>
                    {company_id && <p className='text-red-500 opacity-90 m-2 font-semibold'>Already Assigned to Companies</p>}
                    {whichSelect && (
                      <span className='text-sm mt-2 inline-block bg-white/20 px-2 py-0.5 rounded-full'>
                        Selected
                      </span>
                    )}
                  </div>
                )
              }) :
                <p className='col-span-2 text-center text-sm italic text-slate-500 py-6'>
                  No users found
                </p>
              }

            </div>
          </div>
          <div className='bg-slate-800 border border-slate-600 rounded-2xl p-6 flex flex-col gap-4'>
              <div className='flex items-center justify-between flex-wrap gap-2'>
              <h2 className='text-slate-100 font-semibold text-lg border border-slate-500 rounded-lg px-4 py-1.5 w-fit'>Companies</h2>
              <span className='p-2'
                onClick={() => { setCompanySearch(''); compdata.message = []; setValue((prev) => ({ ...prev, company_id: null })) }}
              ><ButtonComps values='Clear' /></span>
              {/* <button onClick={() => className='text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-500 px-3 py-1 rounded-lg transition-colors' */}
              {/* > Clear</button> */}
              <InputComps
                click={setCompanySearch}
                error={setError}
                placeholder='Company Search'
                value={companySearch}
                type='text'
              />
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              {compdata && compdata?.message.length > 0 ? compdata?.message.map(({ uid, name }) => {
                const whichSelect = value.company_id === uid;
                return (
                  <div key={uid} onClick={() => setValue((prev) => ({ ...prev, company_id: uid }))}
                    className={`cursor-pointer rounded-xl p-4 border transition-colors ${whichSelect
                      ? 'bg-slate-500 border-slate-300 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                      }`}
                  >
                    <p className='mb-2 text-xl font-semibold truncate text-gray-800'>Name: {name}</p>
                    {whichSelect && (
                      <span className='text-xs mt-2 inline-block bg-white/20 px-2 py-0.5 rounded-full'>
                        Selected
                      </span>
                    )}
                  </div>
                )
              }) :
                <p className='col-span-2 text-center text-sm italic text-slate-500 py-6'>
                  No Company found
                </p>
              }

            </div>
          </div>
        </div>

      <div className='flex flex-col items-center gap-2 mt-10'>
        <button
          onClick={submitBoth}
          disabled={!value.uid || !value.company_id}
          className={`px-8 py-2.5 rounded-xl font-semibold text-sm border transition-colors ${value.uid && value.company_id
            ? 'bg-slate-600 hover:bg-slate-500 text-white border-slate-400 cursor-pointer'
            : 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
            }`}
        >
          Assign User to Companies
        </button>
        <p className='text-xs text-slate-500'>
          Only Allow When User Select Both
        </p>
      </div>
    </main>
  )
}
