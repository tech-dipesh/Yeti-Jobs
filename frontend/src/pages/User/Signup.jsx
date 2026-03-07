import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { signupUser } from '../../api/auth.user';
import useFetchData from '../../hooks/useFetchData';
import InputComps from '../../components/Input';
import ButtonComps from '../../components/Button';
import Errorloading from '../../components/Errorloading';
import {validateEditUser} from '../../auth/User/Validateuser';
import Textcomps from '../../components/Textcomps';
import reactIcons from "../../assets/react.svg"
import Linkcomps from '../../components/Linkcomps';
import Benifits from '../../Data/Benifits';

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
    const err=validateEditUser(value, 'signup')
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
    <div className='grid grid-cols-2 items-center min-h-screen bg-cyan-700'>
      <div className='p-16 space-y-4 flex justify-center flex-col'>
      <Textcomps content='Welcome to the signup page:'/>
      <Linkcomps to={'/'} content={<img src={reactIcons} alt="Profile" />}/>
      <Textcomps content={'Jobify! Where You Test a Student project With Industry Standard.'}/>
      {Benifits.map(benifit=>(
        <div className='gap-7'>
        <Textcomps content={benifit}/>
        </div>
        ))}
      </div>
      <div className='bg-white/10 backdrop-blur m-8 rounded-2xl p-8 flex flex-col gap-4'>
      <form action="" onSubmit={submitForm} className='grid space-y-4'>
        <InputComps placeholder='First Name' type='text' name='fname' value={value.fname} click={setValue} error={setAPIError}/>
        <InputComps placeholder='Last Name' type='text' name='lname' value={value.lname} click={setValue} error={setAPIError}/>
        <InputComps placeholder='Email' type='email' name='email' value={value.email} click={setValue} error={setAPIError}/>
        <select value={value.education} onChange={(e)=>setValue((prev)=>({...prev, education: e.target.value}))}>
          <option>Basic</option>
          <option>Matrix</option>
          <option>High School</option>
          <option>Undergraduation</option>
          <option>Postgraduation</option>
        </select>
        <InputComps placeholder='Password' type='password' name='password' value={value.password} click={setValue} error={setAPIError}/>
        <ButtonComps values='Submit' color='bg-cyan-500' text='text-black'/>
      <Link to='../forget-password'><ButtonComps values='Reset Your Password'/></Link>
      <Link to='../login'><ButtonComps values='Login' color='bg-red-500'/></Link>
      </form>
       <Errorloading data={{error:apiError}}/>
      <Errorloading data={{error, loading}}/>
      {data && <Errorloading data={{error:data?.message}}/>}
      </div>
    </div>
  )
}
