import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { signupUser } from '../../api/auth.user';
import useFetchData from '../../hooks/useFetchData';
import InputComps from '../../components/common/Input';
import ButtonComps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';
import {validateEditUser} from '../../auth/User/Validateuser';
import TextComps from '../../components/common/Textcomps';
import reactIcons from "../../assets/react.svg"
import Linkcomps from '../../components/common/Linkcomps';
import Benifits from '../../Data/Benifits';
import Selectcomps from '../../components/common/Selectcomps';
import { EducationOption } from '../../Data/OptionList';
import Successcomps from '../../components/common/Success';

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
    console.log('err', err)
    if(err){
      setAPIError(err)
      return;
    }
    e.preventDefault();
    await execute(value)
    if(data){
      navigate("../verify-email", {state: "Please Verify Your Mail"})
    }
  }
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center min-h-screen bg-slate-700 p-6'>
      <div className='p-6 md:p-16 space-y-4 flex justify-center flex-col'>
      <h2 className='text-3xl font-bold text-gray-300 text-sm`'>Welcome to the signup page:</h2>
      <div className="flex items-center gap-3">
     <img src={reactIcons} alt='Icon' className="w-10 h-10"/>
     <span className="text-2xl font-bold text-cyan-400">Jobify</span>
    </div>
      {Benifits.map((benefit, i)=>(
        <div className="flex items-center gap-3" key={i}>
     <span className="text-cyan-400 text-lg">✓</span>
     <TextComps content={benefit}/>
       </div>
        ))}
      </div>
      <div className='bg-white/10 backdrop-blur m-8 rounded-2xl p-8 flex flex-col gap-4'>
      <form  onSubmit={submitForm} className='grid space-y-4'>
        <InputComps placeholder='First Name' type='text' name='fname' value={value.fname} click={setValue} error={setAPIError}/>
        <InputComps placeholder='Last Name' type='text' name='lname' value={value.lname} click={setValue} error={setAPIError}/>
        <InputComps placeholder='Email' type='email' name='email' value={value.email} click={setValue} error={setAPIError}/>
        <Selectcomps value={value.education} change={setValue} option={EducationOption} multiple={true}/>
        <InputComps placeholder='Password' type='password' name='password' value={value.password} click={setValue} error={setAPIError}/>
        <ButtonComps values='Submit' color='bg-cyan-500' text='text-black'/>
      </form>
      <Link to='../forget-password'><ButtonComps values='Reset Your Password'/></Link>
      <Link to='../login'><ButtonComps values='Login' color='bg-red-500'/></Link>
       <Errorloading data={{error:apiError}}/>
      {data && <Successcomps  data={data?.message}/>}
      </div>
      <Errorloading data={{error, loading}}/>
    </div>
  )
}
