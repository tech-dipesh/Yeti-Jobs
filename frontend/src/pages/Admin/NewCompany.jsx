import useFetchData from '../../hooks/useFetchData';
import { postNewCompany } from '../../api/auth.companies';
import Inputcomps from "../../components/common/Input"
import { useRef, useState } from 'react';
import ButtonComps from "../../components/common/Button"
import validateCompany from '../../auth/ValidateCompany';
import { useNavigate } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
import Textcomps from '../../components/common/Textcomps';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function NewCompany() {
  const refInput = useRef(null)
  const [value, setValue] = useState({ name: '', description: '', website: '', founded_year: '', location: '', company_logo: {} })
  const [Error, setError] = useState("")
  const { data, error, loading, execute } = useFetchData(postNewCompany);
  const navigate = useNavigate()
  const submitForm = async (e) => {
    e.preventDefault()
    const fileInput = e.target.elements.company_logo;
    const file = fileInput?.file[0];
    if(file){
      setError("Please Enter a Company.")
      return;
    }
    const err = validateCompany(value)
    if (err) {
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
    if (data) {
      navigate("../all")
      return;
    }
    if (error) {
      setError(error)
      return;
    }
  }

  const uploadCompanyLogo = (e) => {
    const file = e.target.files[0];
    const allContent = { name: file.name, type: file.type.split("/")[0], size: (file.size) / 1000 }
    setValue((prev) => ({ ...prev, company_logo: allContent }))
  }

  return (
    <div className='bg-slate-700 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 py-8 space-y-8'>
        <Textcomps content='Add New Company' style={'text-2xl mx-auto text-center w-full'} />
        <form onSubmit={submitForm} className='w-full space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md' encType='multipart/form-data'>
          <label htmlFor='name'>Name</label>
          <Inputcomps placeholder='Name' name='name' id='name' type='text' value={value.name} click={setValue} error={setError} />
          <div>
            <label htmlFor='resume' className='border-2 my-8 border-dashed rounded-lg p-6 w-full flex flex-col gap-2 mx-auto justify-items-center items-center text-center cursor-pointer'>
              <input ref={refInput} id='resume' type='file' name='resume' className='hidden' onChange={uploadCompanyLogo} />
              <FontAwesomeIcon icon={faFileArrowUp} />
              <p className='text-sm text-gray-400'>Supported formats: <span className='text-gray-200 font-medium'>PNG/JPG/JPEG</span></p>
              <p className='text-xs text-gray-500 mt-1'>Maximum size: 2 MB</p>
            </label>
          </div>
          <label>Description</label>
          <Inputcomps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError} />
          <label>Website</label>
          <Inputcomps placeholder='Website' name='website' type='text' value={value.website} click={setValue} error={setError} />
          <label>Founded Year</label>
          <Inputcomps placeholder='Founded Year' name='founded_year' type='number' value={value.founded_year} click={setValue} error={setError} />
          <label>Location:</label>
          <Inputcomps placeholder='Company Location' name='location' type='text' value={value.location} click={setValue} error={setError} />
          <hr />
          <span className='flex justify-center'>
          <ButtonComps values='Submit' />
          </span>
        </form>
        <Errorloading data={{ error, loading }} />
        <Errorloading data={{ error: Error || error}} />
      </div>
    </div>
  )
}
