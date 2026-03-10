import React from 'react'
import Loading from '../Loading';

export default function Errorloading({data}) {
  const {error, loading}=data;
    return (
    <>
      {error && <div className='text-red-500 text-xl justify-center'>{error}</div>}
      {loading && <Loading/>}
    </>
  )
}
