import Buttoncomps from "../ui/Button"
import Linkcomps from "../ui/Linkcomps"
import Errorpopup from "../feedback/Errorpopup"
export default function Hero({ isVerify }) {
  return (
    <main className='max-w-4xl mx-auto space-y-8'>
      {isVerify && <Errorpopup error={'Please Verify Your Email'}/>}
      <div className='bg-slate-800/50 p-8 rounded-xl border border-slate-600 text-center space-y-4'>
        <h1 className='text-4xl font-bold text-white'>Climb your career like a Yeti climbs a mountain.</h1>
        <p className='text-slate-400 text-lg'>Connect With Top Hiring Partners and Apply with Ease.</p>

        <div className='max-w-2xl mx-auto pt-4'>
          <Linkcomps to={'/jobs/search'} content={<Buttoncomps values="Looking for Job? Search Here" />} />
        </div>
      </div>
    </main>
  )
}
