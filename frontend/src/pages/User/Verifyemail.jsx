import React, { useState } from 'react'
import validateVerifyMail from '../../auth/User/Validatecodeemail';
import ButtonComps from "../../components/Button"
import InputComps from '../../components/Input';
import  {verifyUser, resendVerificationCode} from '../../api/auth.user';

import { useLocation, useNavigate } from "react-router"
import useFetchData from '../../hooks/useFetchData';
import Errorloading from '../../components/Errorloading';
import Successcomps from '../../components/Success';

export default function VerifyEmail() {
  const [value, setValue] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [isResend, SetIsResend]=useState(false);
  const [resendCode, setResendCode]=useState();

  const navigate = useNavigate()

  const {state}=useLocation();
  const {error:apierror, loading, data, execute}=useFetchData(verifyUser);
  const {error:apiresend, loading:loadresend, data:resenddata, execute:resendexecute}=useFetchData(resendVerificationCode);
  const verifyYourMail = async (e) => {
    e.preventDefault();
    const err=validateVerifyMail(value);
    if(err){
      setError(err)
      return;
    }
  
   await execute(value)
    if(data){
      navigate(state.from || '../')
    }
  }

  
  const verifyResendCode=async ()=>{
    setError("")
    const res= await resendexecute(value);

    // if(res){

    // }
  }

  return (
    <div className='grid align-middle justify-center'>
      <Successcomps data={resenddata?.message}/>
      <Errorloading data={{error:apierror, loading}}/>
        <div>
        <h1 className='text-blue-500'>Verify Your Mail</h1>
        <form onSubmit={verifyYourMail}>
        <InputComps type='number' placeholder='Please Enter a Number' value={value} click={setValue} error={setError} />
        {/* <input type="number" placeholder='' value={value} /> */}
        <ButtonComps values='submit' />
      </form>
      {
        success && <div>{success}</div>
      }
      <div>
      </div>
      {
        error && <div className='text-red-500'>{error}</div>
      }
      </div>
         <div  className='flex align-middle my-24' >
        <h2>Resend Veify Code</h2>
      <div onClick={verifyResendCode}>
      <ButtonComps values='Resend Verification Code'/>
      </div>
        </div>
    </div>
  )
}
