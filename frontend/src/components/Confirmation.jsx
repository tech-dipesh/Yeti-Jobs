import Buttoncomps from './common/Button'
export default function Confirmation({type, confirm, cancel}) {
  return (
    <div className='fixed inset-x-0 top-10 flex justify-center z-50'>
      <div className='bg-slate-800 border border-slate-600 rounded-xl shadow-lg p-6 w-82'>
         <h3  className='font-semibold mb-5 text-center'>Are You Really Want to {type}</h3>
         <div className='grid grid-cols-2 gap-3'>
              <span onClick={cancel}>
              <Buttoncomps values='Cancel'/>
              </span>
              <span onClick={confirm}>
              <Buttoncomps values='Ok' color={'bg-red-500'}/>
              </span>
         </div>
      </div>
    </div>
  )
}
