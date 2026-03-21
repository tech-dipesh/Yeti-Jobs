import { useRef, useState } from 'react'
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/common/Button"
import { getIndividualUser, uploadResume } from "../../api/auth.user"
import validateFileUpload from "../../auth/User/validateFileUpload"
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { useNavigate, useParams } from 'react-router'
import Errorloading from '../../components/common/Errorloading'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/Loading'
import getOriginalFileName from '../../services/getOriginalFileName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Linkcomps from '../../components/common/Linkcomps'
import Goback from '../../components/common/Goback'

export default function Addresume() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [content, setContent] = useState()
  const [error, setError] = useState()
  const [preview, setPreview] = useState()
  const refInput = useRef()
  const handleUpload = (e) => {
    setError()
    if (e.target.files.length > 0) {
      const file = e.target?.files[0];
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(file));
      setContent(file)
      const name = file.type
      const type = file.type.split("/")[1];
      const totalSize = (file.size) / 1000;
      setFile({ name, type, size: totalSize })
    }
  }
  const { data, error: errState, loading, execute } = UseFetchData(uploadResume)
  const { data: oldData, error: geterrr, loader, execute: oldExec } = useFetchData(getIndividualUser)
  const { resume_url } = oldData || {};
  useEffect(() => {
    (async () => {
      await oldExec(id)
    })()
  }, [id, data])

  const fileUpload = async () => {
    const err = validateFileUpload(file, 'pdf')
    if (err) {
      setError(err)
      return;
    }
    const formData = new FormData();

    formData.append('resume', content);
    await execute(formData);
    if (data) {
      navigate(0)
    }
  }
  if (loading || loader) {
    return <Loading />
  }
  const originalName = getOriginalFileName(resume_url)
  return (
    <div className='flex flex-col max-w-2xl mx-auto'>
      <Goback to='../profile'/>
      <Errorloading data={{ error: error || geterrr || errState }} />
      <h3 className='text-gray-100 font-medium  hover:text-white transition-colors flex justify-center my-8'>Upload Your Resume</h3>
      <div className='flex items-center gap-3 my-4'>
        <div className='flex-1 border-t border-dashed border-gray-600' />
      </div>
      {resume_url ?
        <div className='flex flex-col items-center gap-4 my-4'>
          <iframe src={resume_url} className="w-60 h-50">
          </iframe>
          <img src={resume_url} alt='Profile Pic' className='h-48 w-48 rounded-full object-cover' />
          <h3 className='text-sm text-neutral-400'>File Name: {originalName}</h3>
          <p className='text-sm'>Resume Url Url: <Linkcomps to={resume_url} content={'Visit'} /></p>
        </div>
        :
        <div className='text-sm flex justify-center my-8'>No Any Pdf Uploaded Yet As of Now. </div>
      }
      <form encType="multipart/form-data" className='flex justify-center' method="post" onChange={handleUpload}>
        <label htmlFor='resume' className='border-2 border-dashed rounded-lg p-6 w-2/4 mx-auto justify-items-center text-center cursor-pointer'>
          <input ref={refInput} id='resume' type='file' name='resume' className='hidden' onChange={handleUpload} />
          <FontAwesomeIcon icon={faFileArrowUp} />
          <p className='text-sm text-gray-400'>Supported formats: <span className='text-gray-200 font-medium'>PDF</span></p>
          <p className='text-xs text-gray-500 mt-1'>Maximum size: 2 MB</p>
        </label>
      </form>
      {preview &&
        <div className='grid justify-items-center'>
          <h3 className='text-xs'>Preview Resume:</h3>
          <iframe src={preview} className='h-38 w-38 lg:h-48 lg:w-48 overflow-hidden  border-0' />
        </div>
      }
       <div className='flex gap-4 justify-end w-2/4 mx-auto my-2'>
        <div
          onClick={() => {
            setPreview(null)
            setFile({})
            if(refInput.current) refInput.current.value=""
          }
          }><Buttoncomps values={'Clear'} /></div>
        <button disabled={!file?.name || loading || error} onClick={fileUpload} className={`p-4  rounded-xl font-semibold transition-colors bg-slate-700 w-auto border-none ${file?.name ? 'cursor-pointer': 'cursor-not-allowed opacity-50'}`}>Submit</button>
      </div>
    </div>
  )
}
