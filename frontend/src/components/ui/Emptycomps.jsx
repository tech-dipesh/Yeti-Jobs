import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Emptycomps({ data, type }) {
  return (
    <main className='grid grid-cols-1 gap-6 lg:inline'>
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-6 border-b border-slate-700/60 mb-8'>
        <div className='mx-4 '>
          <h1 className='text-3xl font-bold text-white tracking-tight'>All {type}</h1>
          <p className='text-neutral-400 mt-1 text-sm'>View All {type}</p>
        </div>
        <span className='text-sm bg-slate-700/70 text-neutral-300 border border-slate-600/50 mr-12 text-nowrap px-4 py-3 lg:mx-8 lg:py-2 lg:px-2  rounded-full font-medium'>
          {data?.length} {type}
        </span>
      </div>
      {data?.length === 0 && (
        <div className='text-center py-20  text-neutral-400'>
          <p className='text-3xl'><FontAwesomeIcon icon={faPeopleGroup} /></p>
          <p className='mt-2 text-lg'>No Any {type} Exist</p>
        </div>
      )}
    </main>
  )
}
