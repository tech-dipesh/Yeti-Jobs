import { useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"

import InputComps from '../ui/Input';
import CleanFilterEmptySpace from "../../auth/CleanFilterEmptySpace"

import Errorpopup from '../feedback/Errorpopup';

import ValidateApplication from '../../auth/Application/ValidateApplications';
import { applyToParticularJob } from '../../api/auth.applications';
import useFetchData from '../../hooks/useFetchData';
import Popup from '../feedback/Popup';
import Loading from "../feedback/Loading";
import Buttoncomps from "../ui/Button";
import Errorloading from "../ui/Errorloading";
const allDivOptions = [
  { label: 'Cover Letter:', name: 'cover_letter', type: 'text' },
  { label: 'Expected Salary:', name: 'expected_salary', type: 'number', required: true },
  { label: 'Notice Period in:', name: 'notice_period', type: 'number', required: true },
  { label: 'Why Should We Hire You?', name: 'why_hire', type: 'text' }
]
export default function ApplyJobPopup({apply, setApply}) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState(null)
  const [value, setValue] = useState({ cover_letter: '', expected_salary: '', notice_period: '', why_hire: '' })
  
  const { loading, error: apiapplyerror, execute } = useFetchData(applyToParticularJob)
  const submitFormApply = async (e) => {
    e.preventDefault()
    const err = ValidateApplication(value)
    if (err) {
      setError(err)
      return;
    }
    const clean = CleanFilterEmptySpace(value);
    const res = await execute({ id, value: clean })
    if (res) {
      setApply(!apply)
      navigate(0)
    }
  }
  
  if (loading) {
    return <Loading/>
  }
  return (  
    
    <Popup header={'Apply To the Job:'} setOpen={setApply} open={apply} height='min-h-auto' width='w-2xl'>
          <div>
            <Errorpopup error={apiapplyerror} />
            <form className='flex flex-col gap-4' onSubmit={submitFormApply}>
              {allDivOptions?.map(({ label, name, type, required }, i) =>
                <div className='flex flex-col gap-1' key={i}>
                  <label className='text-sm text-gray-300'>{label} {required && <span className='text-red-500 ml-0.5'>*</span>}</label>
                  <InputComps value={value[name]} name={name} type={type} click={setValue} placeholder={label} error={setError} height={(name == 'cover_letter' || name == 'why_hire') && 'h-24'} />
                  {
                    (name == 'cover_letter' || name == 'why_hire') &&
                    <span className='text-xs text-gray-400 text-right'>{250 - value[name]?.length} Charachter Left
                    </span>
                  }
                </div>
              )}
              <Errorloading data={{ error }} />
              <div className='justify-center flex'>
                <Buttoncomps color={'bg-red-500'} />
              </div>
            </form>
          </div>
        </Popup>

  )
}