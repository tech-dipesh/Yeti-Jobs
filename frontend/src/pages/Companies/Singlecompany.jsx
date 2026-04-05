import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import { deleteCompany, getSingleCompany, followCompany, unFollowCompany } from '../../api/auth.companies'
import Errorloading from '../../components/common/Errorloading'
import Linkcomps from '../../components/common/Linkcomps'
import Buttoncomps from '../../components/common/Button'
import AllCompanyJobs from './AllCompanyJobs'
import { useAuth } from '../../context/Authcontext'
import Popup from '../../components/Popup'
import { faCalendarPlus, faClipboardCheck, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import authUid from '../../auth/authUid'
import Errorpopup from '../../components/Error/Errorpopup'
import Loading from '../../components/Loading'
import Textcomps from "../../components/common/Textcomps"
export default function Singlecompany() {
  const { id } = useParams()
  const { data: { role } } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [copy, setCopy] = useState(false)
  const { data, error: singleerr, loading, execute } = useFetchData(getSingleCompany)
  const { execute: deleteaction, error: deleteerr, loading: deleteload, data: deletedata } = useFetchData(deleteCompany)
  const { execute: followaction, error: followerr, data: followdata, loading: followload } = useFetchData(followCompany)
  const { execute: unFollowaction, error: unfollowerr, data: unfollowdata, loading: unfollowload } = useFetchData(unFollowCompany)

  useEffect(() => {
    execute(id)
  }, [id, followdata, unfollowdata, deletedata])

  if (!authUid(id)) {
    return <Errorloading data={{ error: "Please Enter a Correct UID" }} />
  }
  const clickDelete = async () => {
    await deleteaction(id);
    if (deletedata) {
      setTimeout(() => {
        navigate(0)
      }, 50);
    }
  }
  const { name, description, created_at, website, is_followed } = data?.message || {};
  const clickFollow = async () => {
    await followaction(id);
    if (followdata) {
      navigate(0)
    }
  }
  const clickUnFollow = async () => {
    await unFollowaction(id);
    if (unfollowdata) {
      navigate(0)
    }
  }
  if (loading || followload || unfollowload || deleteload) {
    return <Loading />
  }
  return (
    <div>
      <Errorpopup error={singleerr || deleteerr || followerr || unfollowerr} />
      <Errorloading data={{ error }} />
      {data &&
        <div className='bg-slate-800 rounded-xl p-6 space-y-3 flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-white'>Name: {name}</h1>
            <p className='text-gray-400 text-sm leading-relaxed'>Description: {description}</p>
            <hr className='border-gray-700' />
            <div className='flex items-center gap-6 text-sm text-gray-400 font-bold'>
              <span><FontAwesomeIcon icon={faCalendarPlus} /><strong>Founded Year: {new Date(created_at).toLocaleDateString()}</strong></span>
              <Link to={website} className='text-blue-500 hover:underline' target='_blank'>Visit Website</Link>
            </div>
          </div>
          <div>
            {role == 'guest' && 
              <div className='flex justify-center md:justify-end md:shrink-0' onClick={is_followed ? clickUnFollow : clickFollow}>
            <Buttoncomps values={is_followed ? 'UnFollow' : 'Follow'} color={is_followed && 'bg-red-500'} />
            </div>
            }
            <div className='flex items-center gap-2 py-2 p-1 rounded-lg border hover:bg-slate-700 cursor-pointer' 
            onClick={()=>{
              const CorrectUrl = window.location.href;
              navigator.clipboard.writeText(CorrectUrl)
              setCopy(true)
              setTimeout(() => {
                setCopy(false)
              }, 2500);
            }}>
              <span>{copy ?'Shared':'Share'}</span>
              <FontAwesomeIcon icon={copy ? faClipboardCheck:faShareNodes} className='transition-all'/>
            </div >
        </div >
        </div>
      }
      {role == 'admin' &&
        <div className='flex gap-3 my-4'>
          {!open ?
            <span onClick={() => setOpen(true)}>
              <Buttoncomps values={'Delete Company'} color={'bg-red-500'} />
            </span>
            :
            <Popup setOpen={setOpen} error={error || singleerr} setError={setError} fetchError={deleteerr} type={'Company'} header={<Textcomps content={`Do You Really Want To Delete a Job:`} />}>
              <span onClick={clickDelete} className="justify-center flex">
                <Buttoncomps values="Delete Job" color={'bg-red-500'} />
              </span>
            </Popup>
          }
          <Buttoncomps values={<Linkcomps content={'Edit Company'} to={`edit`} />} />
        </div>
      }
      <AllCompanyJobs />
    </div>
  )
}
