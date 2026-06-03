import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { signupUser } from '../../api/auth.user';
import useFetchData from '../../hooks/useFetchData';
import InputComps from '../../components/common/Input';
import ButtonComps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';
import { validateEditUser } from '../../auth/User/Validateuser';
import Selectcomps from '../../components/common/Selectcomps';
import { EducationOption } from '../../Data/OptionList';
import Successcomps from '../../components/common/Success';
import Registerleftcomps from '../../components/common/User/Registerleftcomps';
import Errorpopup from '../../components/Error/Errorpopup';
import Loading from "../../components/Loading.jsx";
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
        <InputComps placeholder='Password' type='password' name='password' value={value.password} click={setValue} error={setAPIError} />
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
