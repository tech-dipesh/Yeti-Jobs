import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData';
import { getSingleCompany, updateCompany } from '../../api/auth.companies';
import validateCompany from '../../auth/ValidateCompany';
import InputComps from '../../components/common/Input';
import ButtonComps from '../../components/common/Button';
import Errorloading from '../../components/common/Errorloading';
import Goback from '../../components/common/Goback';
export default function Editcompany() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [value, setValue] = useState({ name: '', description: '', website: '', founded_year: '', location: '' })
  const [error, setError] = useState("")
  const { execute } = useFetchData(getSingleCompany)
  const { loading, execute: editcompany } = useFetchData(updateCompany)
  useEffect(() => {
    (async () => {
      const res = await execute(id)
      setValue({ name: res.name, description: res.description, website: res.website, founded_year: res.founded_year, location: res.location })
    })()
  }, [])


  const editForm = async (e) => {
    e.preventDefault();
    const trim={
      name: value.name.trim(),
      description: value.description.trim(),
      website: value.website.trim(),
      founded_year: value.founded_year.trim(),
      location: value.location.trim(),
    }
    const err = validateCompany(trim);
    if (err) {
      setError(err);
      return;
    }
    const res = await editcompany({ id, value:trim });
    if (res) {
      setTimeout(() => {
        navigate("../../all")
      }, 200);
    }
  }
  return (
    <div className='bg-slate-700 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 py-8 space-y-8'>
        <Goback to={"../"}/>
        <div className='mb-6 border-b border-neutral-200 pb-4'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Edit Company</h1>
          <p className='text-sm text-neutral-500 mt-1'>Update your company details below</p>
        </div>
        <form onSubmit={editForm} className='w-full space-y-4 bg-white dark:bg-gray-900 p-6  md:p-4 rounded-lg shadow-md'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-sm font-medium text-gray-700 '>Name</h3>
            <InputComps placeholder='Name' name='name' type='text' value={value.name} click={setValue} error={setError} />
          </div>
          <h3>Description</h3>
          <InputComps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError} />
          <h3>Website</h3>
          <InputComps placeholder='Website' name='website' type='text' value={value.website} click={setValue} error={setError} />
          <h3>Founded Year</h3>
          <InputComps placeholder='Founded Year' name='founded_year' type='number' value={value.founded_year} click={setValue} error={setError} />
          <h3>Location:</h3>
          <InputComps placeholder='Company Location' name='location' type='text' value={value.location} click={setValue} error={setError} />
          <div className='pt-4 border-t border-neutral-200 flex justify-center'>
            <ButtonComps values='Save Changes' />
          </div>
        </form>
        <Errorloading data={{ error, loading }} />
      </div>
    </div>
  )
}
