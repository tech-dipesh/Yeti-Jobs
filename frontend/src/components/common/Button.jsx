export default function Buttoncomps({ values='Submit', color:colors, text: texts, onClick }) {
  const color=colors ? colors : 'bg-slate-700';
  const text=texts ? texts : '';
  return (
    <button className={`opacity-90 cursor-pointer ${color} font-semibold  py-2 px-4 rounded m-2 duration-500 ${text}`} onClick={onClick}>{values}</button>
  )
}
