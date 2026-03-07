import React, { useState } from 'react'
import Inputcomps from "../../components/Input"
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/Button"
import { getIndividualUser, uploadProfilePicture } from "../../api/auth.user"
import validateFileUpload from "../../auth/User/validateFileUpload"
import Errorloading from '../../components/Errorloading'
import Successcomps from '../../components/Success'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import { useEffect } from 'react'
export default function ProfilePhoto() {
  const {id}=useParams();
  const navigate=useNavigate()
  const [file, setFile] = useState({ name: '', type: '', size: '' })
  const [content, setContent] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const {data:oldData, execute:oldExec}=useFetchData(getIndividualUser)
  useEffect(()=>{
    (async()=>{
      await oldExec(id)
    })()
  }, [id])
  const handleUpload = (e) => {
    setError()
    if (e.target.files.length > 0) {
      const file = e.target?.files[0];
      setContent(file)
      const name = file.name
      const type=file.type.split("/")[0]
      const splitFileName = file.name.split(".")[1];
      const totalSize = (file.size) / 1000;
      setFile({ name, type, size: totalSize })
    }
  }
  const {data,  error:errState, loading, execute } = UseFetchData(uploadProfilePicture)

  const fileUpload = async () => {
    const err=validateFileUpload(file, 'image')
    if(err){
      setError(err)
      return
    }
    const formData = new FormData();
  formData.append('profile', content);
    const res=await execute(formData)
    if(res){
      navigate(0)
    }
}

const {profile_pic_url}=oldData || {}
return (
  <div>
    <h2>Add Your Profile Photo</h2>
    <Errorloading data={{error}}/>
    <Errorloading data={{error: errState, loading}}/>
    <Successcomps data={data?.message || success}/>
    <form encType="multipart/form-data" method="post" onChange={handleUpload} >
      <Inputcomps type='file' name='profile'/>
    </form>
  <div onClick={fileUpload}>
    <Buttoncomps values='submit' />
  </div>

  <div>
    <h2>your Old Profile Picture.</h2>
    {!profile_pic_url && <div>You've not upadted Profile Picture. as of now.</div>}
    {profile_pic_url && <>
      <img src={profile_pic_url} alt="Resume" className='h-2/4 w-2/4 cover '/>
      <Link to={`https://${profile_pic_url}`} className='text-blue-500 underline'>Link to Profile Pic</Link>
    </>}
  </div>
  </div>
)
}
