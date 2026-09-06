const AsyncSelect=lazy(()=>import("react-select/async"))
import axios from "axios"
import { lazy } from 'react';
export default function Addeducation() {
  const loadAllOptions = async (inputValue) => {
    const {data}=await axios.get(`http://universities.hipolabs.com/search?name=${inputValue}`)
};
  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadAllOptions}
        defaultOptions
        placeholder="Please Search a University"
      />
    </div>
  )
}