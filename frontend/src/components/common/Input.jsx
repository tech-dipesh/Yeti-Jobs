export default function InputComps({placeholder, type='text', value, click, error, name, height, ...rest}) {
  if(error==undefined) error=function(){}
  if(click==undefined) click=function(){}
  const handleEveryInputChange=(e)=>{
    if(name){
      click((prev)=>({...prev, [name]: e.target.value}))
      error("")
    }
    else{
      click(e.target.value)
      error("")
    }
  }
  return (
    <input type={type} {...rest} className={`bg-transparent ${height ? height :'h-11'} w-full rounded-lg text-white dark:bg-neutral-800 placeholder-gray-400 ring-2 px-2  ring-gray-500 focus:ring-sky-600 focus:outline-none`} name={name} id={name} placeholder={placeholder} value={value} onChange={handleEveryInputChange}/>
  )
}
