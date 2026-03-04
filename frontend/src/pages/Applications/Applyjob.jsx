import React from 'react'
import ButtonComps from '../../components/Button'
import useFetchData from '../../hooks/useFetchData'
import { useNavigate, useParams } from 'react-router'
import {applyToParticularJob, withdrawToParticularJob} from "../../api/auth.applications"
export default function Applyjob({value}) {
  const {id}=useParams(value);
  const navigate=useNavigate()
  const {data, loading, error, execute}=useFetchData(applyToParticularJob)
  const {output, loader, err, execute: withd}=useFetchData(withdrawToParticularJob)
  const Applyjob=async()=>{
    const con=confirm("Are you really want to apply a job.")
    if(!con){
      return;
    }
    await execute({id, status: 'applied'})
    navigate(0)
  }
  const removeJob=async()=>{
    const con=confirm("Are you really want to withdraw from a job.")
    if(!con){
      return;
    }
    await withd(id)
    navigate(0)
  }

  console.log('data', data)
  console.log('erro', error)
  const FunOp=value ? removeJob: Applyjob;
  const content=value ? 'Withdraw Apply': "Apply Job";
  return (
  <div className="max-w-4xl mx-auto bg-gray-500  rounded-2xl">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Apply to the job</h1>
      <div onClick={FunOp}>
        <ButtonComps values={content} color='bg-red-500'/>
      </div>
    {error && <div>{error}</div>}
    {err && <div>{err}</div>}
    {loading && <div>Loading...</div>}
    {loader && <div>Loading...</div>}
    {data && <div>{data.message}</div>}
    {output && <div>{output.message}</div>}
  </div>
    
  )
}
