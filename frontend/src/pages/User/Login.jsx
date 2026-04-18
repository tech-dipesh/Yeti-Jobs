import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router"
import validateLogin from "../../auth/User/Validateuser.js"
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
  }, [checkUserError?.login, checkUserError?.verify, checkuser, navigate, state])

  const submitForm = async (e) => {
    e.preventdefault();
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

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center min-h-screen bg-slate-700 p-6'>
      <Errorpopup error={apierror} />
      <Registerleftcomps type={'Login'} />
      <div className='border border-white/20 rounded-2xl p-6  flex flex-col gap-4 flex-1 self-stretch w-full'>
        <h1 className='font-semibold justify-center align-middle'>Welcome Back To The YetiJobs.</h1>
        <Successcomps data={data} />
        <form onSubmit={submitForm} className='flex flex-col gap-4 align-middle'>
          <h2>Email</h2>
          <InputComps type='text' name='email' placeholder='Email' value={value.email} click={setValue} error={setError}
            autoComplete='current-password' />
          <h2>Password</h2>
          <InputComps type='password' name='password' placeholder='Password' value={value.password} click={setValue} error={setError} autoComplete='current-password' />
          <button
            type="submit"
            className='w-24 py-3 self-center rounded-xl bg-slate-800 text-white font-bold text-lg hover:bg-slate-900 transition-all duration-200 cursor-pointer'>
            Submit
          </button>
        </form>
        <div className='flex flex-col gap-2'>
          <p className='text-xs text-center text-neutral-400 uppercase tracking-widest'>Quick Fill</p>
          <button
            type='button'
            onClick={() => setValue({ email: 'Test@gmail.com', password: 'Test@1234' })}
            className='px-4 py-2 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/40 transition-colors cursor-pointer mx-auto'
          >
            Guest User
          </button>
        </div>
        <Errorloading data={{ error: error || apierror, loading }} />
        <div className='grid grid-cols-1 lg:grid-cols-3 justify-items-center  gap-4 justify-between my-4 '>
          <Linkcomps to='../forget-password' content={<ButtonComps values="Reset Your Password" color='bg-red-500' text='text-white' />} />
          <Linkcomps to='../verify-email' content={<ButtonComps values="Verify Email?" color='bg-red-700' text='text-white' />} />
          <Linkcomps to='../signup' content={<ButtonComps values='Create an account' color={'bg-slate-800'} text='text-white' />} />
        </div>
      </div>
    </div>
  )
}
