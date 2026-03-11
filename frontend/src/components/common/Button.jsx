import React from 'react'

export default function ButtonComps({ values='Submit', color:colors, text: texts }) {
  const color=colors ? colors : 'bg-slate-700';
  const text=texts ? texts : '';
  return (
    <button className={`opacity-90 min-w-min cursor-pointer ${color} font-semibold  py-2 px-4 rounded m-2 duration-500 ${text}`}>{values}</button>
  )
}
