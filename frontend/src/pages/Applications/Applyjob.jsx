import React from 'react'
import ButtonComps from '../../components/common/Button'
import useFetchData from '../../hooks/useFetchData'
import { useNavigate, useParams } from 'react-router'
import {applyToParticularJob, withdrawToParticularJob} from "../../api/auth.applications"
import Loading from '../../components/Loading'
export default function Applyjob({value}) {
  const {id}=useParams(value);
  const navigate=useNavigate()
  const {data, loading, error, execute}=useFetchData(applyToParticularJob)
  const {data:output, loading:loader, error:err, execute: withd}=useFetchData(withdrawToParticularJob)
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

  const FunOp=value ? removeJob: Applyjob;
  const content=value ? 'Withdraw Apply': "Apply Job";
   if(loading || loader){
    return <Loading/>
   }
  return (
  <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Apply to the job</h1>
      <div onClick={FunOp}>
        <ButtonComps values={content} color={value ? 'bg-yellow-500' : 'bg-green-500'} onClick={FunOp} />
      </div>
    {error || err ? <div className="text-red-500">{error || err}</div> : null}
    {data && <div>{data.message}</div>}
    {output && <div>{output.message}</div>}
  </div>
  )
}
