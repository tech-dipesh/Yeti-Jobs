import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { unFollowCompany } from "../../api/auth.companies"
import { listAlluserFollowingCompanies } from '../../api/auth.user'
import Popup from '../feedback/Popup'
import Textcomps from '../ui/Textcomps'
import Linkcomps from '../ui/Linkcomps'
import Buttoncomps from '../ui/Button'
import Errorpopup from '../feedback/Errorpopup'
import Loading from '../feedback/Loading'
export default function Followinglist({ setIsFollowing, isFollowing }) {
  const { data, error, loading, execute } = useFetchData(listAlluserFollowingCompanies)
  const { execute: unFollowaction, error: unfollowerr, data: unfollowdata, loading: unfollowload } = useFetchData(unFollowCompany)
  useEffect(() => {
    execute()
  }, [])
  if (loading || unfollowload) {
    return <Loading/>
  }
  const unFollowCompanyAction = async (uid) => {
    await unFollowaction(uid)
    if(unfollowdata){
      window.location.reload()
    }
  }
  return (
    <div>
      <Popup setOpen={setIsFollowing} open={isFollowing} error={error} type={'Skills'} header={<Textcomps content={`Following List:`} />}>
        <>
          <Errorpopup error={unfollowerr} />
          <div className='bg-slate-800 w-80 rounded-xl p-4 flex flex-col divide-slate-700'>
            {data?.message.length > 0 ? data?.message.map(({ name, uid }) => (
              <div className='flex items-center justify-between py-3' key={uid}>
                <div className='flex flex-col'>
                  <span className='text-xm font-semibold text-white'>{name}</span>
                  <Linkcomps to={`/companies/${uid}`} className='hover:text-5xl' content={'Visit Company'} />
                </div>
                <Buttoncomps onClick={() => unFollowCompanyAction(uid)} values='UnFollow' color={'bg-red-700'} />
              </div>
            ))
              :
              <div>
              <p className='text-center text-slate-500 text-sm py-6'>NO Any Company You Followed Yet</p>
              <div className='flex justify-center'>
              <Buttoncomps values={<Linkcomps to={`/jobs`} content={'See All Jobs'}/>}/>
              </div>
              </div>
            }
          </div>
        </>
      </Popup>
    </div>
  )
}
