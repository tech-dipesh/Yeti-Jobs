  import Searchjobs from "../pages/Jobs/Searchjobs"
  import ButtonComps from "./common/Button"
  import Errorloading from "./common/Errorloading"
  import Linkcomps from "./common/Linkcomps"
  export default function Hero({isVerify, isLogin, loading}) {
    
    return (
      <main className='max-w-4xl mx-auto space-y-8'>
        <Errorloading data={{loading}}/>
        {isVerify && <Linkcomps to='/auth/verify-email' content={<ButtonComps values='Your Email is not verified Please Verify.'/>}/>}
        {isLogin && <Linkcomps to='/auth/login' content={<ButtonComps values='Please Login First.'/>}/>}
        <div className='bg-slate-800/50 p-8 rounded-xl border border-slate-600 text-center space-y-4'>
      <h1 className='text-4xl font-bold text-white'>Find your Dream Job From Jobify.</h1>
      <p className='text-slate-400 text-lg'>Connect With Top Hiring Partners and Apply with Ease.</p>
      
      <div className='max-w-2xl mx-auto pt-4'>
        <Searchjobs/>
      </div>
      </div>
      </main>
    )
  }
