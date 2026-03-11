import React from 'react'

export default function Emptycomps({data, type}) {
  console.log('type', type)
  return (
    <>
    <div className='flex items-start justify-between pb-6 border-b border-slate-700/60 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-white tracking-tight'>All {type}</h1>
            <p className='text-neutral-400 mt-1 text-sm'>View All {type}</p>
          </div>
          <span className='text-sm bg-slate-700/70 text-neutral-300 border border-slate-600/50 px-3 py-1.5 rounded-full font-medium'>
            {data?.length} {data?.length === 1 ? 'User' : 'Users'}
          </span>
        </div>
        {data?.length === 0 && (
          <div className='text-center py-20 text-neutral-400'>
            <p className='text-3xl'>👥</p>
            <p className='mt-2 text-lg'>No Any Users Exist</p>
          </div>
        )}
    </>
  )
}
