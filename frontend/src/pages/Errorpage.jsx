import { useRouteError } from 'react-router'
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Buttoncomps from '../components/common/Button';
import Linkcomps from '../components/common/Linkcomps';

export default function Error404() {
  const { message, statusText } = useRouteError() ?? {}
  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen bg-neutral-800 items-center justify-center px-6'>
      <main className='bg-red-950 border border-red-700 rounded-2xl w-full max-w-2xl p-20 flex flex-col items-center justify-center text-center gap-6'>
          <div className='flex items-center justify-center gap-3 mb-5'>
            <div className='h-12 w-12 bg-red-800 border border-red-600 rounded-full flex items-center justify-center shrink-0'>
              <FontAwesomeIcon icon={faBug} size='lg' color='white' />
            </div>
            <h1 className='text-2xl font-black text-red-300 '>Something Went Wrong</h1>
            </div>
              <div className='h-px bg-red-900 mb-5' />

              <div className='inline-flex items-center gap-2 bg-red-900 border rounded-lg p-3 font-mono text-sm text-red-300'>
                <span className='bg-red-700 text-red-100 font-bold px-2 py-1 rounded'>{message || statusText || 'Something Went Wrong'}</span>
              </div>
          <div className='flex gap-3 flex-wrap justify-center'>
            <Buttoncomps values={<Linkcomps to={'/'} content={'Go Home'} />} />
            <Buttoncomps values={<Linkcomps to={'/jobs'} content={'Browse Jobs'} />} />
            <Buttoncomps values={<Linkcomps to={'/jobs/search'} content={'Search Jobs'} />} />
          </div>
      </main>
    </div>
  )
}
