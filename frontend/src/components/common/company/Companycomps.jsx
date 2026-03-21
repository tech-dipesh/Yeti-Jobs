import Linkcomps from "../Linkcomps"
import Buttoncomps from '../Button'
import { faCalendarPlus, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CgWebsite } from "react-icons/cg";

export default function Companycomps({ uid, name, description, website, created_at, founded_year, location }) {
  return (
    <div className='bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col gap-5'>
      <div>
        <h2 className='text-lg font-bold text-white'>Name: <strong>{name}</strong></h2>
      </div>
      <p className='line-clamp-2 text-sm text-gray-200 leading-relaxed'>Description: {description}</p>
      <div className='flex flex-wrap gap04 text-xs text-gray-400 gap-6'>
        <span> <FontAwesomeIcon icon={faCalendarPlus} />{new Date(created_at).toLocaleDateString()}</span>
        <div>Est: {founded_year}</div>
        <div><FontAwesomeIcon icon={faLocationDot}/> {location}</div>
      </div>
      <hr className='border-gray-600' />
      <div className='grid justify-items-center lg:flex lg:items-center lg:justify-between'>
        <Linkcomps
          content={
            <span className='flex gap-1'>
              Visit Website:  <CgWebsite className='mt-1'/>
            </span>
          }
          to={`https://${website}`}
        />
        <div className='flex gap-3 '>
        <Buttoncomps values={<Linkcomps content={'Jobs'} to={`/companies/${uid}/jobs`} />} />
        <Buttoncomps values={<Linkcomps content={'View Company'} to={`/companies/${uid}`} />} />
        </div>
      </div>
    </div>
  )
}
