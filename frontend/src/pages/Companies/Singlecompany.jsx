import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import { deleteCompany, getSingleCompany, updateCompany } from '../../api/auth.companies'
import ButtonComps from '../../components/Button'
import validateCompany from '../../auth/ValidateCompany'
import InputComps from '../../components/Input'
import Errorloading from '../../components/Errorloading'

export default function Singlecompany() {
  const {id}=useParams()
  const navigate=useNavigate()
  const [edit, SetEdit]=useState(false)
  const [Error, setError]=useState("")
  const {data, error, loading,execute}=useFetchData(getSingleCompany)
  const {data:res, execute:delAction}=useFetchData(deleteCompany)
  const {data:updatedata, execute:update, error: updateerr}=useFetchData(updateCompany)
  useEffect(()=>{
    execute(id)
  }, [id])

  const [value, setValue]=useState({name: '', description: '', website: ''})
  
  const deleteComp=()=>{
    const con=confirm("Are you really want to delete it.")
    if(!con){
      return;
    }
      delAction(id)
      navigate("../all", {state: res})
  }
  const ChangeFormat=()=>{
    setValue({name: data?.name, description: data?.description, website: data?.website})
    SetEdit(!edit)
  }

  const editForm=(event)=>{
  event.preventDefault()
  const err=validateCompany(value)
    if(err){
      setError(err)
      return;
    }
    update({id, value});
    if(updatedata){
      navigate(0)
      return;
    }
    if(updateerr){
      setError(updateerr)
      return;
    }
  }
  return (
    <div>
      <Errorloading data={{error, loading}}/>
      {data &&
        <div>
            <h1>Name: {data.name}</h1>
            <h1>Description: {data.name}</h1>
            <Link to={`http://${data.website}`} className='text-blue-500 underline'>Website: {data.website}</Link>
            <h3>Created: {data.created_at}</h3>
        </div>
      }
      <div onClick={deleteComp}>
        <ButtonComps values='deleteComp' color='bg-red-500'/>
      </div>
    

    <div>
      <div  onClick={ChangeFormat}>
        <ButtonComps values={!edit ? 'Edit Content': 'Escape Edit'}/>
      </div>
    {edit && 
    <form onSubmit={editForm}>
      <h3>Name</h3>
      <InputComps placeholder='Name' name='name' type='text' value={value.name} click={setValue} error={setError}/>
      <h3>Description</h3>
      <InputComps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError}/>
      <h3>Website</h3>
      <InputComps placeholder='Website' name='website' type='text' value={value.website} click={setValue} error={setError}/>
      <hr />
      <ButtonComps values='Submit'/>
    </form>
    }
    </div>
    {(error || Error) && <div className='text-red-500'>{error || Error}</div>}
    </div>
  )
}
