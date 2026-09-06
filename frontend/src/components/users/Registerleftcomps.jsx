import logoIcon from "../../assets/logo-rounded.png"
import Benifits from '../../Data/Benifits';
import Textcomps from '..//ui/Textcomps';
import { CheckCircle } from "lucide-react";
export default function Registerleftcomps({type}) {
  return (
    <div className='p-6 md:p-10 space-y-6 flex flex-col justify-center bg-[#314158] rounded-2xl shadow-lg'>
  <div className="flex items-center gap-3">
    <img src={logoIcon} className="w-10 h-10" alt='Logo'/>
    <span className="text-2xl font-bold text-cyan-400">YetiJobs</span>
  </div>

  <h2 className='text-2xl font-semibold text-white'>Welcome to the {type} page</h2>

  <div className="space-y-3">
    {Benifits.map((benefit, i) => (
      <div className="flex items-center gap-3" key={i}>
        <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
        <Textcomps content={benefit} className="text-gray-200 text-sm" />
      </div>
    ))}
  </div>

  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
    <div className="text-center">
      <p className="text-2xl font-bold text-white">50+</p>
      <p className="text-xs text-gray-300">Companies</p>
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold text-white">2000+</p>
      <p className="text-xs text-gray-300">Jobs</p>
    </div>
  </div>

  {/* <div className="bg-white/5 rounded-lg p-4 text-center"> */}
  {/*   <p className="text-sm text-gray-200">“Found my dream internship in 2 weeks!”</p> */}
  {/*   <p className="text-xs text-cyan-400 mt-1">– Rajesh S., Software Engineer</p> */}
  {/* </div> */}
  {/**/}
  <span className="text-cyan-400 text-xs uppercase tracking-widest text-center mt-2">Student Project</span>
</div>
  )
}
