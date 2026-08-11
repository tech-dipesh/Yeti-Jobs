import { useRef, useState } from 'react'
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/common/Button"
import { ResumeInfo, uploadResume } from "../../api/auth.user"
import validateFileUpload from "../../auth/User/validateFileUpload"
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { useParams } from 'react-router'
import Errorloading from '../../components/common/Errorloading'
import { faFileArrowUp, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/Loading'
import getOriginalFileName from '../../services/getOriginalFileName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Linkcomps from '../../components/common/Linkcomps'
import Goback from '../../components/common/Goback'

export default function Addresume() {
  const { data: initialData, error: err, loading: loader, execute: callData } = useFetchData(ResumeInfo);
  const { data, error: errState, loading, execute } = UseFetchData(uploadResume)
  const { id } = useParams()
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
  useEffect(() => {
    callData()
  }, [id, data])

  const fileUpload = async () => {
    const err = validateFileUpload(file, 'pdf')
    if (err) {
      setError(err)
      return;
    }
    const formData = new FormData();

    formData.append('resume', content);
    const res = await execute(formData);
    if (data || res) {
      window.location.reload()
      return;
    }
  }

  const clearSelected = () => {
    setPreview(null)
    setFile({})
    if (refInput.current) refInput.current.value = ""
  }
  if (loading || loader) {
    return <Loading />
  }
  const { feedback, resume_url, score } = initialData?.message ?? {};
  const originalName = getOriginalFileName(resume_url)
  return (
    <div className='flex flex-col max-w-3xl mx-auto px-4 pb-12'>
      <Goback to='../profile' />
      <Errorloading data={{ error: error || err || errState }} />
      <h3 className='text-gray-100 font-semibold text-xl  transition-colors flex justify-center mt-8 mb-2'>Upload Your Resume</h3>
      <p className='text-center text-sm text-neutral-400 mb-8'>PDF  format only · Max 2MB</p>

      {initialData?.message && resume_url ?
        <div className='flex flex-col gap-6'>
          <div className='bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-3 border-b border-neutral-700'>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faFilePdf}
                  className='text-red-400 text-sm'
                />
                <span className='text-sm text-neutral-300 font-medium truncate max-w-xs'>
                  {originalName}
                </span>
              </div>
              <a href={resume_url} target='_blank'>
                <Linkcomps to={resume_url} content='Open' />
              </a>
            </div>
            <iframe src={resume_url} className="w-full" style={{ height: '520px', border: 'none' }}>
            </iframe>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col items-center justify-center gap-2'>
              <p className='text-xs uppercase tracking-widest text-neutral-400'>ATS Score</p>
              <div className={`text-5xl font-bold ${score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{score}</div>
              <div className='w-full bg-neutral-700 rounded-full h-2 mt-1'>
                <div className={`h-2 rounded-full transition-all ${score >= 75 ? 'bg-green-400' : score >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${score}%` }} />
              </div>
              <p className={`text-xs font-medium mt-1 ${score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {score >= 75 ? 'Strong' : score >= 50 ? 'Moderate' : 'Needs Work'}
              </p>
            </div>
            <div className='md:col-span-2 bg-neutral-800 border border-neutral-700 rounded-xl p-5'>
              <p className='text-xs uppercase tracking-widest text-neutral-400 font-medium mb-3'>Resume Feedback:</p>
              <ul className='flex flex-col gap-2'>
                {feedback?.map((feed, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm text-neutral-200'>
                    <span className='mt-1 w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0'>{i + 1}</span>
                    {feed}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        :
        <div className='text-sm flex flex-col items-center gap-2 y-8 text-neutral-400'>
          <FontAwesomeIcon icon={faFileArrowUp} className='text-3xl text-neutral-600' />
          <p>No Resume Uploaded yet.</p>
        </div>
      }
      <form encType="multipart/form-data" className='mt-8' method="post" onChange={handleUpload}>
        <label htmlFor='resume'
          className='flex flex-col items-center justify-center-center gap-3 border-2 border-dashed border-neutral-600 hover:border-blue-500 p-10 cursor-pointer transition-colors duration-200 bg-neutral-800'>
          <input ref={refInput} id='resume' type='file' name='resume' className='hidden' onChange={handleUpload} />
          <FontAwesomeIcon icon={faFileArrowUp} className='text-3xl text-neutral-400' />
          <div className='text-center'>
            <p className='text-sm text-neutral-300 font-medium'>Click to upload or drag & drop</p>
            <p className='text-xs text-neutral-500 mt-1'>PDF · Max 2 MB</p>
          </div>
        </label>
      </form>
      {preview &&
        <div className='mt-4 bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden'>
          <p className='text-xs text-neutral-400 px-4 py-2 border-b border-neutral-700 uppercase'>Preview</p>
          <iframe src={preview} className='w-full' style={{ height: '360px', border: 'none' }} />
        </div>
      }
      <div className='flex gap-3 justify-end mt-4'>
        <div
          onClick={clearSelected}
          className='px-5 py-3 rounded-lg text-sm font-medium text-neutral-300 bg-neutral-700 hover:bg-neutral-600'>
          <Buttoncomps values={'Clear'} /></div>
        <button disabled={!file?.name || loading || error} onClick={fileUpload}
          className={`p-4  rounded-xl font-semibold transition-colors bg-slate-700 w-auto border-none ${file?.name ? 'cursor-pointer bg-blue-600 text-white' : 'cursor-not-allowed opacity-50 text-neutral-500 bg-neutral-700'}`}
        >{loading ? 'Uploading...' : 'Submit'}</button>
      </div>
      <Errorloading data={{ error: error || err || errState }} />
    </div>
  )
}
