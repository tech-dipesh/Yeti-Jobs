import useFetchData from '../../hooks/useFetchData';
import { postNewCompany } from '../../api/auth.companies';
import Inputcomps from "../../components/Input" 
import { useState } from 'react';
import ButtonComps from "../../components/Button"
import validateCompany from '../../auth/ValidateCompany';
import { useNavigate } from 'react-router';
export default function NewCompany() {
  const [value, setValue]=useState({name: '', description: '', website: ''})
  const [Error, setError]=useState("")
  const {data, error, loading, execute}=useFetchData(postNewCompany);
  const navigate=useNavigate()
  const submitForm=async(e)=>{
    e.preventDefault()
    const err=validateCompany(value)
    if(err){
      setError(err)
      return;
    }
    await execute(value);
    if(data){
      navigate("../all")
      return;
    }
    if(error){
      setError(error)
      return;
    }
  }
  
  return (
    <div>
      <h1>New Company.</h1>
      <form onSubmit={submitForm}>
          <h3>Name</h3>
          <Inputcomps placeholder='Name' name='name' type='text' value={value.name} click={setValue} error={setError}/>
          <h3>Description</h3>
          <Inputcomps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError}/>
          <h3>Website</h3>
          <Inputcomps placeholder='Website' name='website' type='text' value={value.website} click={setValue} error={setError}/>
          <hr />
          <ButtonComps values='Submit'/>
      </form>
      {Error && <div className='text-red-500'>{Error}</div>}
    </div>
  )
}
