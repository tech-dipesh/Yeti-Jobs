import { useEffect, useState } from 'react'
import InputComps from '../../components/common/Input'
import ButtonComps from "../../components/common/Button"
import { validateEditUser } from '../../auth/User/Validateuser'
import { getIndividualUser, patchIndivualUser } from "../../api/auth.user"
import {  useNavigate, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import Selectcomps from '../../components/common/Selectcomps'
import { EducationOption } from '../../Data/OptionList'
import Loading from '../../components/Loading'
import Errorloading from '../../components/common/Errorloading'
import Textcomps from "../../components/common/Textcomps"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
export default function Edituser() {
  const { id } = useParams();
  const navigate=useNavigate()
  const [value, setValue] = useState({ fname: '', lname: '', education: '', email: '', experience: '', number: '' });
  const [error, setError] = useState("")
  const { execute: fetchUser, data: startValue, error: errorData, loading } = useFetchData(getIndividualUser);
  const { data, execute: updateUser, error: patchError, loading: isUpdating } = useFetchData(patchIndivualUser);
  const [number, setNumber]=useState()
  useEffect(() => {
    fetchUser(id)
  }, [id]);
  useEffect(() => {
    if(errorData){
      navigate("/")
    }
    if (startValue?.message) {
      setValue({
        fname: startValue.message.fname || '',
        lname: startValue.message.lname || '',
        education: startValue.message.education || '',
        email: startValue.message.email || '',
        experience: startValue.message.experience || '',
      });
      setNumber(startValue?.message?.phone_number)
    }
  }, [startValue]);

  const submitForm = async (e) => {
    e.preventdefault();
    const trim = {
      fname: value.fname.trim(),
      lname: value.lname.trim(),
      education: value.education.trim(),
      email: value.email.trim(),
      experience: value.experience.toString(),
      number: number?.trim()
    }
    const err = validateEditUser(trim, 'edit');
    if (err) return setError(err);
    const result=await updateUser({ id, ...trim });
    if (result) {
        window.location.href = "../profile";
    }
  };
  if (errorData) {
    return navigate("/")
  }
  if (loading || isUpdating) {
    return <Loading />
  }
  return (
    <div className='flex flex-col items-center max-w-md mx-auto w-full'>
      <Errorloading data={{ error: error || errorData || patchError }} />
      <Textcomps content='Edit User' style={'text-2xl mx-auto text-center w-full'} />
      <form onSubmit={submitForm} className='w-full h-full space-y-2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md'>
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
          <label className='text-sm font-medium mb-1'>Phone Number:</label>
          <PhoneInput
            placeholder="Enter Phone Number"
            value={number}
            onChange={setNumber}
            defaultCountry="IN"
            className="flex items-center ring-2 ring-gray-50 rounded-lg px-2 h-11 w-full bg-transparent dark:bg-neutral-800"
            inputclassname="bg-transparent h-full w-full text-white placeholder-gray-400 focus:outline-none"
          />
          <h2>Experience in Years</h2>
          <InputComps placeholder='experience' name='experience' type='number' value={value.experience} click={setValue} error={setError} />
          <label className='text-sm font-medium mb-1'>Education:</label>
          <Selectcomps value={value.education} change={setValue} option={EducationOption} multiple={true} />
        </div>
        <span className='justify-center flex'>
          <ButtonComps values='Submit' />
        </span>
      </form>
    </div>
  )
}
