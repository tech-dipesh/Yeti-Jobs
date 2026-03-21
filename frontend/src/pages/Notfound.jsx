import { useLocation } from 'react-router'
import { faFaceSadCry, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Buttoncomps from '../components/common/Button';
import Linkcomps from '../components/common/Linkcomps';
import LogoRounded from "../assets/logo-rounded.png"
import Errorpopup from "../components/Error/Errorpopup"
export default function Notfound() {
  const {pathname} = useLocation();
  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen bg-neutral-600'>
      <Errorpopup error={`${pathname} Doesn't Exist`}/>
      <main className='min-h-screen flex flex-col  items-center  justify-center px-6 text-center'>
        <div className='relative mb-7'>
          <div className='h-24 w-24 rounded-2xl bg-white/10 border  items-center flex justify-center p-5'>
            <img src={LogoRounded} alt="Logo" className='w-12 h-12' />
          </div>
          <div className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-neutral-700'>
            <FontAwesomeIcon icon={faTriangleExclamation} color='white' size='xs' />
          </div>
        </div>
        <h2 className='text-8xl font-black text-white/10 tracking-tight mb-0'>
          <span className='text-white/80'>4</span>0
          <span className='text-white/80'>4</span>
        </h2>
        <h3 className='font-bold text-white my-2 text-xl'>Page Not Found</h3>
        <p className='text-sm text-white/40 max-w-xs my-2'>This Page doesnt' exist on the page.</p>
        <div className='flex items-center gap-2 bg-red-500/15 font-mono font-semibold px-3 py-1.5 rounded-lg mb-8'>
          <FontAwesomeIcon icon={faFaceSadCry} size='sm'/>
          {pathname}
        </div>
        <div className='flex gap-2 flex-wrap justify-center'>
          <Buttoncomps values={ <Linkcomps to={'/'} content={'Homepage'}/>}/>
          <Buttoncomps values={ <Linkcomps to={'/jobs'} content={'Browse All Jobs'}/>}/>
        </div>
      </main>
    </div>
  )
}
