import { useState } from 'react'
import validateVerifyMail from '../../auth/User/Validatecodeemail';
import ButtonComps from "../../components/common/Button"
import InputComps from '../../components/common/Input';
import { verifyUser, resendVerificationCode } from '../../api/auth.user';

import {useLocation, useNavigate } from "react-router"
import {useAuth} from "../../context/Authcontext"
import useFetchData from '../../hooks/useFetchData';
import Errorloading from '../../components/common/Errorloading';
import Successcomps from '../../components/common/Success';
import { useEffect } from 'react';
import Loading from '../../components/Loading';
import Goback from '../../components/common/Goback';
import Errorpopup from '../../components/Error/Errorpopup';

export default function VerifyEmail() {
  const [value, setValue] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate()
  const {data:isUser, error: autherr, reexecute}=useAuth();
  const { state } = useLocation();
  const { error: apierror, loading, data, execute } = useFetchData(verifyUser);
  const { error: apiresend, loading: loadresend, data: resenddata, execute: resendexecute } = useFetchData(resendVerificationCode);
  console.log('is user', isUser)
  useEffect(() => {
    if(isUser?.isVerified===true || data){
      navigate(state?.from || "/")
    }
  }, [data, isUser, navigate, state?.from])
  
  const verifyYourMail = async () => {
    const err = validateVerifyMail(value);
    if (err) {
      setError(err)
      return;
    }

    const res=await execute(value)
     if (res || data) {
    await reexecute();
    window.location.href = state?.from || "/"; 
  }
  }


  const verifyResendCode = async () => {
    setError("")
    await resendexecute(value);
    if(apierror){
      setError(apierror)
    }
  }

  if(loading || loadresend){
    return <Loading/>
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Goback to='../login' content='Go Back To Login'/>
      <div className='bg-neutral-800 rounded-2xl p-10 w-full max-w-lg flex flex-col items-center gap-8'>
      <Errorpopup error={autherr}/>
      <Successcomps data={resenddata?.message || data?.message} />
      <div className='text-center'>
        <h1 className='text-xl font-bold '>Verify Your Mail</h1>
        <h2 className='text-sm my-1 opacity-85 justify-center'>We've sent a 6-digit code to your email</h2>
      </div>
      <Errorloading data={{ error: apierror || error || apiresend }} />
      <div className='w-full flex-col items-center justify-center gap-4'>
        <InputComps type='number' placeholder='6 digit Code' value={value}  click={setValue} error={setError} />
        <span className='flex justify-center'>
          <ButtonComps values='submit' onClick={verifyYourMail}/>
        </span>
      </div>
      <div className='grid justify-items-center bg-neutral-700 rounded-lg py-4 px-2 align-middle gap-4 my-4' >
        <p className='opacity-80 text-gray-100'>Didn't receive code?</p>
          <ButtonComps values='Resend Code' onClick={verifyResendCode}/> 
          <p className='opacity-80 text-sm text-gray-300'>Please Check Your Spam Folder If You've not Recieved a Code</p>
      </div>
      </div>
    </div>
  )
}

