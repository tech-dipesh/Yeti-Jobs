import useFetchData from '../../hooks/useFetchData';
import { postNewCompany } from '../../api/auth.companies';
import Inputcomps from "../../components/common/Input" 
import { useState } from 'react';
import ButtonComps from "../../components/common/Button"
import validateCompany from '../../auth/ValidateCompany';
import { useNavigate } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
import { all } from 'axios';
export default function NewCompany() {
  const [value, setValue]=useState({name: 'Usa', description: 'unisted states of america', website: 'https://usa.com', founded_year: '2000', location: 'usa', company_logo: {}})
  const [Error, setError]=useState("")
  const {data, error, loading, execute}=useFetchData(postNewCompany);
  const navigate=useNavigate()
  const submitForm=async(e)=>{
    e.preventDefault()
  const fileInput = e.target.elements.company_logo;
  const file = fileInput.files[0];

    const err=validateCompany(value)
    if(err){
      setError(err)
      return;
    }
  const formData = new FormData();
  formData.append('name', value.name);
  formData.append('description', value.description);
  formData.append('website', value.website);
  formData.append('founded_year', value.founded_year);
  formData.append('location', value.location);
  formData.append('company_logo', file);
    await execute(formData);
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
      <form onSubmit={submitForm} className='w-full space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md' encType='multipart/form-data'>
          <h3>Name</h3>
          <Inputcomps placeholder='Name' name='name' type='text' value={value.name} click={setValue} error={setError}/>
          <h3>Company Logo</h3>
          <div className='border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer'>
            <input type="file" name="company_logo"  className='bg-transparent h-11 w-full rounded-lg text-black placeholder-gray-400 ring-2 px-2  ring-gray-500' 
            onChange={(e)=>{ 
              const file = e.target.files[0];
               const allContent={ name:file.name, type:file.type.split("/")[0], size: (file.size) / 1000 }
               console.log('allcontent', allContent)
                 setValue((prev)=>({...prev, company_logo:allContent}))
               }}/>

                  <p>Click Here or drag A Company Logo(Only image type allowed)</p>
          </div>
          <h3>Description</h3>
          <Inputcomps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError}/>
          <h3>Website</h3>
          <Inputcomps placeholder='Website' name='website' type='text' value={value.website} click={setValue} error={setError}/>
          <h3>Founded Year</h3>
          <Inputcomps placeholder='Founded Year' name='founded_year' type='number' value={value.founded_year} click={setValue} error={setError}/>
          <h3>Location:</h3>
          <Inputcomps placeholder='Company Location' name='location' type='text' value={value.location} click={setValue} error={setError}/>
          <hr />
          <ButtonComps values='Submit'/>
      </form>
      <Errorloading data={{error, loading}}/>
      <Errorloading data={{error:Error}}/>
    </div>
  )
}
