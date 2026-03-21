import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { forgetPassword, verifyForgetPassword } from '../../api/auth.user'
import InputComps from '../../components/common/Input'
import Buttomcomps from "../../components/common/Button"
import { validateEmail, validatePassword } from '../../auth/User/Validatecodeemail'
import Errorloading from '../../components/common/Errorloading'
import Success from '../../components/common/Success'
import validateCode from '../../auth/User/Validatecodeemail'
import { Link, useNavigate } from 'react-router'
import Goback from '../../components/common/Goback'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
export default function Resetpassword() {
  const [email, setEmail] = useState("")
  const [value, setValue] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()
  const { data, loading, error: apierror, execute } = useFetchData(forgetPassword)
  const { data: resetdata, loading: resetload, error: reseterr, execute: resetexec } = useFetchData(verifyForgetPassword)

  const butSubmit = async (e) => {
    e.preventDefault();
    const err = validateEmail(email)
    if (err) {
      setError(err)
      return;
    }
    setError("")
    const res = await execute(email)
    if (res) {
      setIsOpen(!isOpen)
    }
    setError(error)
  }

  const verifyCode = async (e) => {
    e.preventDefault()
    const err = validateCode(value) || validatePassword(password) || validateEmail(email)
    if (err) {
      setError(err)
      return;
    }
    const res = await resetexec({ code: value, email, newpassword: password })
    if (res) {
      navigate("../login")
    }
  }
  const { message } = data ?? '';
  return (
    <>

      <Link to='../login' className='relative align-middle justify-items-center'><Goback content='Go Back To Login' to='../login' /></Link>
      <article className='min-h-screen flex items-center justify-center px-4'>
        <div className='w-full max-w-md bg-slate-700 border border-slate-600 rounded-2xl flex flex-col gap-6 p-8'>
          <Success data={message} />
          {!isOpen ?
            <>
              <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold text-white'>Reset your Password.</h1>
                <p className='text-sm text-slate-400'>Enter your email and we'll send you a reset code.</p>
              </div>
              <Errorloading data={{ loading, error: apierror }} />
              <form onSubmit={butSubmit} className='flex flex-col gap-4'>
                <InputComps type='text' placeholder='Email' click={setEmail} value={email} error={setError} />
                <Buttomcomps values='Send Reset Code' color={'bg-neutral-700'} />
              </form>
              <div className="border-t border-slate-700" />
              <div className='flex flex-col items-center gap-2'>
                <p className='text-sm text-slate-400'>Already have a code?</p>
                <div onClick={() => setIsOpen(true)} className='w-full'>
                  <Buttomcomps  values={
                      <div>
                        <span>Enter Code Instead</span>
                        <FontAwesomeIcon icon={faArrowRight}/>
                      </div>} color={'bg-neutral-700'} />
                </div>
              </div>
            </> :
            <>
              <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold text-white'>Verify Reset Code</h1>
                <p className='text-sm text-slate-400'>Enter your email, the code you received, and your new password.</p>
              </div>
              {/* {data && <Successcomps data={data.message} />} */}

              <form onSubmit={verifyCode} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs text-slate-400'>Your Email</label>
                  <InputComps placeholder='Email' type='text' click={setEmail} value={email} error={setError} />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs text-slate-400'>Reset Code</label>
                  <InputComps placeholder='6-digit code' type='number' click={setValue} email={value} error={setError} />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs text-slate-400'>New Password</label>
                  <InputComps placeholder='New Password' type='password' click={setPassword} value={password} error={setError} />
                </div>
                <Buttomcomps values='Submit Code' color={'bg-neutral-700'} />
              </form>
              <Errorloading data={{ loading: resetload, error: reseterr }} />
              <Success data={resetdata?.message} />

              <div className='border-t border-slate-700' />

              <div className='flex flex-col items-center gap-2'>
                <p className='text-sm text-slate-400'>Need to resend the code?</p>
                <div onClick={() => setIsOpen(false)} className='w-full'>
                  <Buttomcomps
                    values={
                      <div>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        <span>Back to Email</span>
                      </div>}
                    color={'bg-neutral-700'} />
                </div>
              </div>
            </>
          }
          <Errorloading data={{ error }} />
        </div>
      </article>
    </>
  )
}
