import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router"
import validateLogin from "../../auth/User/Validateuser.js"

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser } from "../../api/auth.user.js"
import ButtonComps from '../../components/common/Button';
import InputComps from '../../components/common/Input';
import { useAuth } from '../../context/Authcontext';
import useFetchData from '../../hooks/useFetchData.js';
import Successcomps from '../../components/common/Success';
import Errorloading from '../../components/common/Errorloading';
import Linkcomps from '../../components/common/Linkcomps';
import Registerleftcomps from '../../components/common/User/Registerleftcomps';
import Errorpopup from '../../components/Error/Errorpopup';
import Loading from "../../components/Loading.jsx";

export default function Login() {
  const { reexecute, data: checkuser, error:checkUserError } = useAuth()
  const { state } = useLocation()
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data, loading, error: apierror, execute } = useFetchData(loginUser)
  useEffect(() => {
    if(checkUserError?.login && checkUserError?.verify==false){
      navigate(state?.from || "/verify-email")
    }
    if(checkuser){
      navigate(state?.from || '/')
    }
  }, [checkuser, state])

  const submitForm = async (e) => {
    e.preventDefault();
    setError("")
    const trim = { email: value.email.trim(), password: value.password.trim() }
    const err = validateLogin(trim);
    if (err) return setError(err);
    const res = await execute(trim)
    if (res) {
      await reexecute()
      navigate(state?.from || "/")
    }
    else {
      setError(apierror)
    }
  };
  if(loading){
    return <Loading/>
  }



  return (
    <div className='grid md:grid-cols-2 gap-8 items-center min-h-screen bg-slate-700 p-6'>
  <div className='order-2 md:order-1'>
    <div className='bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600 p-8 shadow-xl'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-white'>Welcome Back</h1>
        <p className='text-slate-400 text-sm mt-2'>Sign in to continue to YetiJobs</p>
      </div>
      <Successcomps data={data} />
      <form onSubmit={submitForm} className='space-y-5'>
        <div>
          <label className='block text-sm font-medium text-slate-300 mb-1'>Email address</label>
          <InputComps
            type='text'
            name='email'
            placeholder='you@example.com'
            value={value.email}
            click={setValue}
            error={setError}
            autoComplete='current-password'
            className='w-full'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-300 mb-1'>Password</label>
          <InputComps
            type='password'
            name='password'
            placeholder='••••••••'
            value={value.password}
            click={setValue}
            error={setError}
            autoComplete='current-password'
            className='w-full'
          />
        </div>
        <button
          type='submit'
          className='w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all duration-200 cursor-pointer'
        >
          Sign In
        </button>
      </form>
      <div className='mt-6 pt-4 border-t border-slate-700'>
        <p className='text-xs text-center text-slate-400 uppercase tracking-wider'>Quick demo</p>
        <button
          type='button'
          onClick={() => setValue({ email: 'Test@gmail.com', password: 'Test@1234' })}
          className='mt-2 w-full py-2 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20 transition-colors cursor-pointer'
        >
          Use guest account
        </button>
        <p className='text-xs text-center text-slate-500 mt-2'>No registration – just click and explore</p>
      </div>
      <Errorloading data={{ error: error || apierror, loading }} />
      <div className='flex flex-col sm:flex-row justify-center gap-4 mt-6 pt-4 border-t border-slate-700'>
        <Linkcomps to='../forget-password' content={<span className='text-sm text-cyan-400 hover:underline'>Forgot password?</span>} />
        <Linkcomps to='../verify-email' content={<span className='text-sm text-cyan-400 hover:underline'>Verify email</span>} />
        <Linkcomps to='../signup' content={<span className='text-sm text-cyan-400 hover:underline'>Create account</span>} />
      </div>
    </div>
  </div>
  <div className='order-1 md:order-2'>
    <Registerleftcomps type='Login' />
  </div>
</div>
  )
}
