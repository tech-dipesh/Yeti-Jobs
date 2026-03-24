import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { signupUser } from '../../api/auth.user';
import useFetchData from '../../hooks/useFetchData';
import InputComps from '../../components/common/Input';
import ButtonComps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';
import {validateEditUser} from '../../auth/User/Validateuser';
import Selectcomps from '../../components/common/Selectcomps';
import { EducationOption } from '../../Data/OptionList';
import Successcomps from '../../components/common/Success';
import Registerleftcomps from '../../components/common/User/Registerleftcomps';

export default function Signup() {
  const navigate=useNavigate()
  const [value, setValue] = useState({
    fname: "",
    lname: "",
    education: "",
    email: "",
    password: ""
  })

  const [apiError, setAPIError]=useState("")
  const {data, error, loading, execute}=useFetchData(signupUser)

  const submitForm = async (e) => {
    e.preventDefault()
    const err=validateEditUser(value, 'signup')
    if(err){
      setAPIError(err)
      return;
    }
    e.preventDefault();
    const res=await execute(value)
    if(data || res){
      navigate("../verify-email", {state: "Please Verify Your Mail"})
    }
  }
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center min-h-screen bg-slate-700 p-6'>
      <Registerleftcomps type='Signup'/>
      <div className='bg-white/10 backdrop-blur m-8 rounded-2xl p-8 flex flex-col gap-4'>
      <form  onSubmit={submitForm} className='grid space-y-4'>
        <InputComps placeholder='First Name' type='text' name='fname' value={value.fname} click={setValue} error={setAPIError}/>
        <InputComps placeholder='Last Name' type='text' name='lname' value={value.lname} click={setValue} error={setAPIError}/>
        <InputComps placeholder='Email' type='email' name='email' value={value.email} click={setValue} error={setAPIError}/>
        <Selectcomps value={value.education} name={'education'} change={setValue} option={EducationOption} multiple={true}/>
        <InputComps placeholder='Password' type='password' name='password' value={value.password} click={setValue} error={setAPIError}/>
        <ButtonComps values='Signup' color='bg-cyan-500' text='text-black'/>
      </form>
      <Errorloading data={{error: error || apiError, loading}}/>
      {<Successcomps  data={data?.message}/>}
      <span className='flex flex-col lg:flex-row justify-between'>
      <Link to='../forget-password'><ButtonComps values='Reset Your Password'/></Link>
      <Link to='../login' className='grid justify-items-center'><ButtonComps values='Login' color='bg-red-500'/></Link>
      </span>
       
      </div>
    </div>
  )
}
