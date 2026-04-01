import { useRef, useState } from 'react'
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/common/Button"
import { getIndividualUser, uploadProfilePicture } from "../../api/auth.user"
import validateFileUpload from "../../auth/User/validateFileUpload"
import Errorloading from '../../components/common/Errorloading'
import Successcomps from '../../components/common/Success'
import { useLocation, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import { useEffect } from 'react'
import Linkcomps from "../../components/common/Linkcomps"
import Textcomps from "../../components/common/Textcomps"
import Loading from '../../components/Loading'
import defaultImage from "../../assets/default-image.webp"
import getOriginalFileName from '../../services/getOriginalFileName'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Errorpopup from '../../components/Error/Errorpopup'
import Goback from '../../components/common/Goback'
export default function ProfilePhoto() {
  const { id } = useParams();
  const {state}=useLocation()
  const [file, setFile] = useState(null)
  const [content, setContent] = useState()
  const [error, setError] = useState()
  const [preview, setPreview] = useState("")
  const { data: oldData, error:oldErr, execute: oldExec } = useFetchData(getIndividualUser)
  const { data, error: errState, loading, execute } = UseFetchData(uploadProfilePicture)
  const refInput = useRef()
  useEffect(() => {
    oldExec(id)
  }, [id])

  const handleUpload = (e) => {
    setError()
    if (e.target.files.length > 0) {
      const file = e.target?.files[0];
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(file));
      setContent(file)
      const name = file.name
      const type = file.type.split("/")[0]
      const splitFileName = file.name.split(".")[1];
      const totalSize = (file.size) / 1000;
      setFile({ name, type, size: totalSize })
    }

  }

  const fileUpload = async () => {
    const err = validateFileUpload(file, 'image')
    if (err) {
      setError(err)
      return
    }
    const formData = new FormData();
    formData.append('profile', content);
    const res = await execute(formData)
    if (res || data) {
      window.location.href = state?.from || "../profile";
    }
  }

  const { profile_pic_url } = oldData || {}
  if (loading) {
    return <Loading />
  }
  const originalName = getOriginalFileName(profile_pic_url)
  return (
    <div className='flex flex-col max-w-2xl mx-auto'>
      <Errorpopup error={oldErr || errState}/>
      <Goback to='../profile'/>
      <Errorloading data={{ error }} />
      <Successcomps data={data} />
      <h3 className='text-gray-100 font-medium  hover:text-white transition-colors flex justify-center my-8'>Upload Your Profile Picture</h3>
      <div className='flex items-center gap-3 my-4'>
        <div className='flex-1 border-t border-dashed border-gray-600' />
      </div>
      <div className=' p-4 flex items-center gap-5'>
        <Textcomps content={'Current Profile Picture'} />
      </div>
      {profile_pic_url ?
        <div className='flex flex-col items-center gap-4 my-4'>
          <img src={profile_pic_url} alt='Profile Pic' className='h-48 w-48 rounded-full object-cover' />
          <h3 className='text-sm text-neutral-400'>File Name: {originalName}</h3>
          <p className='text-sm'>Profile Pic Url: <Linkcomps to={profile_pic_url} content={'Visit'} /></p>
        </div>
        :
        <div className='flex justify-center my-5'>
          <img src={defaultImage} alt="Default Image" className='w-48 h-48 rounded-full object-cover' />
          {/* <h3 className='text-sm'>No Any Image Uploaded yet</h3> */}
        </div>
      }

      <form encType="multipart/form-data" method="post" className='flex justify-center'>
        <label htmlFor="profileInput" className='border-2 border-dashed rounded-lg p-6 w-2/4 mx-auto justify-items-center text-center cursor-pointer'>
          <input ref={refInput} id='profileInput' type='file' name='profile' className='hidden' onChange={handleUpload} />
          <FontAwesomeIcon icon={faFileArrowUp} />
          <p className='text-sm text-gray-400'>Supported formats: <span className='text-gray-200 font-medium'>JPG, PNG</span></p>
          <p className='text-xs text-gray-500 mt-1'>Maximum size: 2 MB</p>
        </label>
      </form>
      {preview &&
      <div className='grid justify-center align-middle my-4'>
        <h3 className='text-xs'>Preview Image:</h3>
       <img src={preview} alt={defaultImage} className='h-32 w-32 rounded-full object-cover grid justify-items-center'/>
      </div>
       }
      <div className='flex gap-4 justify-end w-2/4 mx-auto my-2'>
        <div
          onClick={() => {
            setPreview(null)
            setFile({})
            if(refInput.current) refInput.current.value=""
          }
          }>
            <Buttoncomps values={'Clear'} />
        </div>
        <button disabled={!file?.name || loading} onClick={fileUpload} className={`p-4  rounded-xl font-semibold transition-colors bg-slate-700 w-auto border-none ${file}? 'cursor-pointer': 'cursor-not-allowed'`}>Submit</button>
      </div>
    </div>
  )
}
