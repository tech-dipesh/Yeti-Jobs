import { useEffect, useState } from "react"

const CustomDebounceHook= (cb, timer=300)=>{
  const [value, setValue]=useState(cb);
  useEffect(()=>{
    const debounce=setTimeout(()=>{
      setValue(cb)
    }, timer);
    return ()=>clearTimeout(debounce)
  }, [timer, cb])
  return value;
}
export default CustomDebounceHook