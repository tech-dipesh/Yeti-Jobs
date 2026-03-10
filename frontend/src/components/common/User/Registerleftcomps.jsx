import React from 'react'

import reactIcons from "../../../assets/react.svg"
import Benifits from '../../../Data/Benifits';
import Textcomps from '../Textcomps';

export default function Registerleftcomps() {
  return (
    <div className='p-6 md:p-12 space-y-4 flex justify-center flex-col'>
      <h2 className='text-3xl font-bold text-gray-300 text-sm`'>Welcome to the signup page:</h2>
      <div className="flex items-center gap-3">
     <img src={reactIcons} className="w-10 h-10" alt='Logo'/>
     <span className="text-2xl font-bold text-cyan-400">Jobify</span>
    </div>
      {Benifits.map((benefit, i)=>(
        <div className="flex items-center gap-3" key={i}>
     <span className="text-cyan-400 text-lg">✓</span>
     <Textcomps content={benefit}/>
       </div>
        ))}
      <span className="text-cyan-400 text-sm uppercase tracking-widest">Student Project</span>
      </div>
  )
}
