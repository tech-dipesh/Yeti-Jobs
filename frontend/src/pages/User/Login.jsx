import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router"
import validateLogin from "../../auth/User/Validateuser.js"
import {loginUser} from "../../api/auth.user.js"
import ButtonComps from '../../components/common/Button.jsx';
import InputComps from '../../components/common/Input.jsx';
import { useAuth } from '../../context/Authcontext.jsx';
import useFetchData from '../../hooks/useFetchData.js';
import Successcomps from '../../components/common/Success.jsx';
import Errorloading from '../../components/common/Errorloading.jsx';
import Linkcomps from '../../components/common/Linkcomps.jsx';
import Registerleftcomps from '../../components/common/User/Registerleftcomps.jsx';
import Errorpopup from '../../components/Error/Errorpopup.jsx';

export default function Login() {
  const {reexecute, data:checkuser}=useAuth()
  const {state}=useLocation()
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {data, loading, error:apierror, execute}=useFetchData(loginUser)
  
  useEffect(()=>{
    if(checkuser || data){
      navigate(state?.from || "/")
    }
  }, [checkuser, navigate, state])
  
  const submitForm = async (e) => {
    e.preventDefault();
    setError("")
    const trim={email: value.email.trim(), password: value.password.trim()}
    const err = validateLogin(trim);
    if (err) return setError(err);
   const res= await execute(trim)
  if(res){
    await reexecute()
    navigate(state?.from || "/")
  }
  else{
    setError(apierror)
  }
  };


  return (
      <div className='grid md:grid-cols-2 grid-cols-1 items-center min-h-screen bg-slate-700 p-6'>
        <Errorpopup error={apierror}/>
        <Registerleftcomps type={'Login'}/>
        <div className='border border-white/20 rounded-2xl p-6  flex flex-col gap-4 flex-1 self-stretch w-full'>
        <h1 className='font-semibold justify-center align-middle'>Welcome Back To The YetiJobs.</h1>
        <Successcomps data={data}/>
        <form onSubmit={submitForm} className='flex flex-col gap-4 align-middle'>
          <h2>Email</h2>
          <InputComps type='text' name='email' placeholder='Email' value={value.email} click={setValue} error={setError}
          autoComplete='current-password'/>
          <h2>Password</h2>
          <InputComps type='password' name='password' placeholder='Password' value={value.password} click={setValue} error={setError} autoComplete='current-password'/>
        <button 
          type="submit" 
          className='w-24 py-3 self-center rounded-xl bg-slate-800 text-white font-bold text-lg hover:bg-slate-900 transition-all duration-200 cursor-pointer'>
          Submit
        </button>
        </form>
        <Errorloading data={{error: error || apierror, loading}}/>
        <div className='grid grid-cols-1 lg:grid-cols-2 justify-items-center  gap-4 justify-between my-4 '>
        <Linkcomps to='../forget-password' content={<ButtonComps values="Can't sign in?" color='bg-red-500' text='text-white'/>}/>
        <Linkcomps to='../signup' content={<ButtonComps values='Create an account' color={'bg-slate-800'} text='text-white'/>}/>
        </div>
        </div>
      </div>
  )
}
