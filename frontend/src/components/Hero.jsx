import ButtonComps from "./common/Button"
import Errorloading from "./common/Errorloading"
import Linkcomps from "./common/Linkcomps"
export default function Hero({isVerify, isLogin, loading}) {
  return (
    <div className='grid gap-8 justify-center'>
       <Errorloading data={{loading}}/>
      {isVerify && <Linkcomps to='/auth/verify-email' content={<ButtonComps values='Your Email is not verified Please Verify.'/>}/>}
      {isLogin && <Linkcomps to='/auth/login' content={<ButtonComps values='Please Login First.'/>}/>}
      <h2 className='font-semibold gap-8 margin-6 text-2xl transition-all justify-center'>Welceom to Our Jobify Page.</h2>
      <h2>Find Your Dream Job.</h2>
      <h3>Apply Job With More Easier and connect with Hiring Partners.</h3>
        <div>
      <Linkcomps content={'Browser Jobs'} to={'/jobs'}/>
        </div>
        <div>
      <Linkcomps  content={'Search Jobs'} to={'/jobs/search'}/>
        </div>
    </div>
  )
}
