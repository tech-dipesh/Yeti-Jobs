import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router"
import validateLogin from "../../auth/User/Validateuser.js"
import {loginUser} from "../../api/auth.user.js"
import ButtonComps from '../../components/Button.jsx';
import InputComps from '../../components/Input.jsx';
import { useAuth } from '../../context/Authcontext.jsx';
import useFetchData from '../../hooks/useFetchData.js';
import Successcomps from '../../components/Success.jsx';
import Errorloading from '../../components/Errorloading.jsx';
import reactIcons from "../../assets/react.svg"
import Linkcomps from '../../components/Linkcomps.jsx';
import Textcomps from '../../components/Textcomps.jsx';
import Benifits from "../../Data/Benifits.js"

export default function Login() {
  const {reexecute, data:checkuser}=useAuth()
  
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {data, loading, error:apierror, execute}=useFetchData(loginUser)
  useEffect(()=>{
    if(checkuser){
      navigate("/")
    }
  }, [])
  const submitForm = async (e) => {
    e.preventDefault();
    const err = validateLogin(value);
    if (err) return setError(err);
  const result = await execute(value); 
  if (result) {
    await reexecute();
    navigate("/");  
  } 
  setError(apierror)
  };


  return (
      <div className='w-screen overflow-x-hidden flex items-center justify-center gap-8 bg-slate-700 p-6'>
        <div className='border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4 flex-1 self-stretch w-1/2 '>
        <Linkcomps to={'/'} content={<img src={reactIcons} alt="Profile" />}/>
        <Textcomps content={'Jobify! Where You Test a Student project With Industry Standard.'}/>
        <Textcomps content="Jobs Where With Major Benifits"/>
        {Benifits.map(benifit=>(
          <div className='gap-7 mb-2'>
          <Textcomps content={benifit}/>
          </div>
          ))}
        </div>
        <div className='border border-white/20 rounded-2xl p-6  flex flex-col gap-4 flex-1 self-stretch w-1/2'>
        <h1 className='font-semibold justify-center align-middle'>Welcome to Jobify.</h1>
        <form onSubmit={submitForm} className='flex flex-col gap-4 align-middle'>
          <h2>Email</h2>
          <InputComps type='text' name='email' placeholder='Email' value={value.email} click={setValue} error={setError}/>
          <h2>Password</h2>
          <InputComps type='password' name='password' placeholder='Password' value={value.password} click={setValue} error={setError}/>
        <button 
          type="submit" 
          className='w-24 py-3 rounded-xl bg-cyan-500 text-black font-bold text-lg tracking-wide hover:bg-cyan-400 active:scale-95 transition-all duration-200 cursor-pointer'>
          Submit
        </button>
        </form>
        <Successcomps data={data}/>
        <Errorloading data={{loading}}/>
        <Errorloading data={{error: error}}/>
        <div className='flex gap-4 justify-between'>
        <Linkcomps to='../forget-password' content={<ButtonComps values="Can't sign in?" color='bg-red-500' text='text-white'/>}/>
        <Linkcomps to='../signup' content={<ButtonComps values='Create an account' color='bg-red-500' text='text-white'/>}/>
        </div>
        </div>
      </div>
  )
}
