import React from 'react'
import Loading from '../Loading';
export default function Errorloading({data}) {
  let {error, loading}=data;

    return (
    <>
      {error && <div className='text-red-500 text-xl justify-center grid justify-items-center'>{typeof error=='string'?error:"Something Went Wrong"}</div>}
      {loading && <Loading/>}
    </>
  )
}
