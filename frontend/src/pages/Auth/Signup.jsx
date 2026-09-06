import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { signupUser } from '../../api/auth.user.js';
import useFetchData from '../../hooks/useFetchData.js';
import InputComps from '../../components/ui/Input.jsx';
import ButtonComps from '../../components/ui/Button.jsx';
import Errorloading from '../../components/ui/Errorloading.jsx';
import { validateEditUser } from '../../auth/User/Validateuser.js';
import Selectcomps from '../../components/ui/Selectcomps.jsx';
import { EducationOption } from '../../Data/OptionList.js';
import Successcomps from '../../components/ui/Success.jsx';
import Registerleftcomps from '../../components/users/Registerleftcomps.jsx';
import Errorpopup from '../../components/feedback/Errorpopup.jsx';
import Loading from "../../components/feedback/Loading.jsx";
import PasswordInput from '@/components/auth/Passwordinput.jsx';
export default function Signup() {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    fname: "",
    lname: "",
    education: "",
    email: "",
    password: ""
  })

  const [apiError, setAPIError] = useState("")
  const { data, error, loading, execute } = useFetchData(signupUser)

  const submitForm = async (e) => {
    e.preventDefault()
    const trim = {
      fname: value.fname.trim(),
      lname: value.lname.trim(),
      education: value.education.trim(),
      email: value.email.trim(),
      password: value.password.trim()
    }
    const err = validateEditUser(trim, 'signup')
    if (err) {
      setAPIError(err)
      return;
    }
    e.preventDefault();
    const res = await execute(trim)
    if (data || res) {
      navigate("../verify-email", { state: "Please Verify Your Mail" })
    }
  }
  if(loading){
    return <Loading/>
  }
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center min-h-screen bg-slate-700 p-6'>
  <Errorpopup error={apiError} />
  <div className='bg-white/10 backdrop-blur m-8 rounded-2xl p-8 flex flex-col gap-4'>
    <h1 className='font-semibold text-center text-2xl text-white'>Welcome back</h1>
    <form onSubmit={submitForm} className='grid space-y-4'>
      <InputComps placeholder='First Name' type='text' name='fname' value={value.fname} click={setValue} error={setAPIError} autoComplete='current-password'/>
      <InputComps placeholder='Last Name' type='text' name='lname' value={value.lname} click={setValue} error={setAPIError} />
      <InputComps placeholder='Email' type='email' name='email' value={value.email} click={setValue} error={setAPIError} />
      <Selectcomps value={value.education} name={'education'} change={setValue} option={EducationOption} multiple={true} />
      <div>
        <PasswordInput value={value.password} setValue={setValue} setError={setAPIError} />
        <div className='text-right mt-1'>
          <Link to='../forget-password' className='text-xs text-cyan-400 hover:underline'>Forgot password?</Link>
        </div>
      </div>
      <ButtonComps values='Signup' color='bg-cyan-500' text='text-black' />
    </form>
    <Errorloading data={{ error: error || apiError }} />
    <Successcomps data={data?.message} />
    <div className='flex justify-between items-center'>
      <Link to='../verify-email'>
        <ButtonComps values='Verify Email' />
      </Link>
      <Link to='../login'>
        <ButtonComps values="Already have account?" color='bg-red-500' />
      </Link>
    </div>
  </div>
  <div className='order-1 md:order-2'>
    <Registerleftcomps type={'Login'} />
  </div>
</div>
  )
}
