import React from 'react'
import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { forgetPassword, verifyForgetPassword } from '../../api/auth.user'
import InputComps from '../../components/Input'
import Buttomcomps from "../../components/Button"
import validateVerifyMail, { validateEmail, validatePassword } from '../../auth/User/Validatecodeemail'
import Errorloading from '../../components/Errorloading'
import Success from '../../components/Success'
import validateCode from '../../auth/User/Validatecodeemail'
import Successcomps from '../../components/Success'
import { useNavigate } from 'react-router'
export default function Resetpassword() {
  const [email, setEmail]=useState("")
  const [value, setValue]=useState("")
  const [password, setPassword]=useState("")
  const [error, setError]=useState("")
  const [isOpen, setIsOpen]=useState(false);

  const navigate=useNavigate()
  const {data, loading, error: apierror, execute}=useFetchData(forgetPassword)
  const {data:resetdata, loading:resetload, error: reseterr, execute:resetexec}=useFetchData(verifyForgetPassword)

  const butSubmit=async (e)=>{
    e.preventDefault();
    const err=validateEmail(email)
    if(err){
      setError(err)
      return;
    }
    setError("")
    const res=await execute(email)
    if(res){
      setIsOpen(!isOpen)
    }
    setError(error)
  }

  const verifyCode=async (e)=>{
    e.preventDefault()
     const err=validateCode(value) || validatePassword(password) || validateEmail(email)
    if(err){
      setError(err)
      return;
    }
    const res=await resetexec({code:value, email, newpassword:password})
    if(res){
      navigate("../login")
    }
  }
  const {message}=data ?? '';
  return (
    <div>
      <Errorloading data={{error}}/>
      {!isOpen &&
      <>
      <h1>Reset your Password.</h1>
      <Errorloading data={{loading, error:apierror}}/>
      <Success data={message}/>
      <form onSubmit={butSubmit}>
        <InputComps type='text' click={setEmail} value={email} error={setError}/>
        <Buttomcomps/>
      </form>
      <div onClick={()=>setIsOpen(!isOpen)}>
      <Buttomcomps values='Already Have Code!'/>
      </div>
      </>}
      <hr />
      {isOpen && 
      <>
      {data && <Successcomps data={data.message}/>}
      <div onClick={()=>setIsOpen(!isOpen)}>
      <Buttomcomps values='Go BAck to to email!'/>
      </div>
      <h1>Add the Forget Password Authetncitcation.</h1>
      <form onSubmit={verifyCode} className='m-16'>
        <h3>your Email:</h3>
        <InputComps placeholder='Email' type='text' click={setEmail} value={email} error={setError}/>
        <h2>Your Code:</h2>
        <InputComps placeholder='Digit Code' type='number' click={setValue} email={value} error={setError}/>
        <h2>New Password:</h2>
        <InputComps placeholder='New Password' type='password' click={setPassword} email={password} error={setError}/>
        <Buttomcomps values='Submit Code'/>
      </form>
      <Errorloading data={{loading:resetload, error:reseterr}}/>
      <Success data={resetdata?.message}/>
      </>
      }
    </div>
    
  )
}
