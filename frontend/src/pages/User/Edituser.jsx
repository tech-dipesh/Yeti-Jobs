import React, { useEffect, useState } from 'react'
import InputComps from '../../components/common/Input'
import ButtonComps from "../../components/common/Button"
import {validateEditUser} from '../../auth/User/Validateuser'
import {getIndividualUser, patchIndivualUser} from "../../api/auth.user"
import {  useNavigate, useParams } from 'react-router'
import UseFetchData from '../../hooks/useFetchData'
import useFetchData from '../../hooks/useFetchData'
import Selectcomps from '../../components/common/Selectcomps'
import { EducationOption } from '../../Data/OptionList'
import Loading from '../../components/Loading'
import Errorloading from '../../components/common/Errorloading'

export default function Edituser() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [value, setValue] = useState({ fname: '', lname: '', education: '', email: '', experience: '' });
  const [error, setError]=useState("")
  const { execute: fetchUser, error: errorData, loading } = useFetchData(getIndividualUser);
  const { execute: updateUser, error:patchError, loading: isUpdating } = useFetchData(patchIndivualUser);
  useEffect(() => {
    fetchUser(id)
    .then(data => {
      if (data) setValue(data);
    })
  }, [id]);


  const submitForm = async (e) => {
    e.preventDefault();
    const err = validateEditUser(value, 'edit');
    if (err) return setError(err);
    await updateUser({ id, ...value });
    setTimeout(() => {
      navigate(-1)
    }, 500);
  };
   if(loading || isUpdating){
    return <Loading/>
   }
  return (
    <div className='flex flex-col items-center max-w-md mx-auto w-full'>
      <Errorloading data={{error: error || errorData || patchError}}/>
      <h2 className='mb-8 relative'>Edit User: </h2>
      <form onSubmit={submitForm} className='w-full h-full space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md'>
        <div className='flex flex-col gap-1'>

        <label className='text-sm font-medium mb-1'>First Name:</label>
        <InputComps
          placeholder='FirstName'
          name='fname'
          type='text'
          value={value.fname}
          click={setValue}
          error={setError} />
        <label className='text-sm font-medium mb-1'>Last Name:</label>
        <InputComps placeholder='LastName' name='lname' type='text' value={value.lname} click={setValue} error={setError} />
        <label className='text-sm font-medium mb-1'>Email:</label>
        <InputComps placeholder='Email' name='email' type='text' value={value.email} click={setValue} error={setError} />
          <h2>Experience in Years</h2>
        <InputComps placeholder='experience' name='experience' type='number' value={value.experience} click={setValue} error={setError} />
        <label className='text-sm font-medium mb-1'>Education:</label>
        <Selectcomps value={value.education} change={setValue} option={EducationOption} multiple={true}/>
      </div>
        <ButtonComps values='Submit' />
      </form>
    </div>
  )
}
