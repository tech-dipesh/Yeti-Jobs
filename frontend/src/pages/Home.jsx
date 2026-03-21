import { useEffect, useState } from 'react'
import { useAuth } from '../context/Authcontext';
import Hero from '../components/Hero';
import { majorFeatures } from '../Data/Benifits';
import useFetchData from '../hooks/useFetchData';
import { allJobsList } from '../api/auth.job';
import Textcomps from '../components/common/Textcomps';
import Linkcomps from '../components/common/Linkcomps';
import Loading from '../components/Loading';
import Errorpopup from '../components/Error/Errorpopup';

export default function Home() {
  const { data, error, loading } = useAuth();
  const [isVerify, setIsVerify] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const { data: jobs, error: err, loading: loader, execute } = useFetchData(allJobsList)
  useEffect(() => {
    (() => {
      execute(({page:1, limit:5}))
      if (error === 'Please Verify Your verification code.') {
        setIsVerify(true);
        setIsLogin(false);
      } else if (error === 'No token Please Loged in First') {
        setIsLogin(true);
        setIsVerify(false);
      } else if (data && data.uid) {
        setIsVerify(false);
        setIsLogin(false);
      }
    })();
  }, []);
  const allLinks=[
        { name: 'Browse Jobs', path: '/jobs' },
        { name: 'Search Jobs', path: '/jobs/search' },
        { name: 'All Companies', path: '/companies/all' },
        { name: 'All Your Applications', path: '/applications/me' }
      ];
  const first5Job=jobs?.message?.slice(0, 5);
  if(loader || loading){
    return <Loading/>
  }
  return (
    <div className='bg-slate-700 min-h-screen'>
  <div className='max-w-6xl mx-auto px-4 py-8 space-y-8'>
      <Errorpopup error={err || err || isVerify}/>
      <Hero isVerify={isVerify} isLogin={isLogin} />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {allLinks.map((item, i) => (
        <Linkcomps 
          key={i}
          content={item.name} 
          to={item.path}
          className='bg-slate-800/30 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-white text-center py-3 rounded-lg transition-all'
        />
      ))}
      
    </div>
     <div className='bg-slate-800/50 p-6 rounded-xl border border-slate-600 w-auto'>
          <h3 className='text-2xl font-semibold text-white mb-6'>Top 5 Recent Jobs:</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-auto'>
            {first5Job&& first5Job?.map(({title, uid, job_type, salary}) => (
              <div key={uid} className='bg-slate-700/50 p-4 rounded-lg border border-slate-600'>
                <Linkcomps to={`jobs/${uid}`} content={'Visit Job'}/>
                <h4 className='text-white font-medium'>{title || "2nd & 3rd Title"}</h4>
                <p className='text-slate-400 text-sm'>{job_type || "Limited Type"}</p>
                <p className='text-cyan-400 text-sm mt-1'>₹ {salary || "Salary"}</p>
              </div>
            ))}
          </div>
    </div>
     <div className='bg-slate-800/50 p-6 rounded-xl border border-slate-600'>
      <h2 className='text-2xl font-semibold text-white mb-6'>Features:</h2>
      <div className='flex flex-wrap gap-3'>
        {majorFeatures.map((feature, i) => (
          <div 
            key={i}
            className='flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600'
          >
            <span className='text-cyan-400 text-lg'>✓</span>
            <Textcomps content={feature} style='text-slate-300' />
          </div>
        ))}
      </div>
    </div>
    
  </div>
    </div>
  )
}