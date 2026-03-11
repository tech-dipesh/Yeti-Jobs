import React from 'react'

export default function Selectcomps({option, value, name, change, error, multiple}) {
  const changeOption=(e)=>{
    // (e)=>change((prev)=>({...prev, education: e.target.value}))
    console.log('correct value is the ', e.target.value)
    if(multiple){
      change((prev)=>({...prev, [name]: e.target.value}))
    }
    else{
      change(e.target.value)
    }
    console.log('correct is', value)
   error &&  error("")
  }
  // console.log('value is',, )
  return (
    <select value={value} onChange={changeOption} id={name}  className='bg-neutral-700 text-white cursor-pointer p-3 border-none rounded-lg shadow-md hover:bg-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200'>
      <>
      <option hidden>Select Option</option>
      {option?.map((o, i)=>(
        <option className='mb-4 p-2 border rounded cursor-pointer' key={i}>{o}</option>
      ))}
      </>
    </select>
  )
}
