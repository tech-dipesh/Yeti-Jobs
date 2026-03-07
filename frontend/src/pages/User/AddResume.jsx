import React, { useState } from 'react'
import Inputcomps from "../../components/Input"
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/Button"
import { getIndividualUser, uploadResume } from "../../api/auth.user"
import validateFileUpload from "../../auth/User/validateFileUpload"
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { Link, useParams } from 'react-router'
import Errorloading from '../../components/Errorloading'
import Successcomps from '../../components/Success'
export default function Addresume() {
  const {id}=useParams()
  const [file, setFile] = useState({ name: '', type: '', size: '' })
  const [content, setContent] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const handleUpload = (e) => {
    setError()
    if (e.target.files.length > 0) {
      const file = e.target?.files[0];
      setContent(file)
      const name = file.type
      const type = file.type.split("/")[1];
      const totalSize = (file.size) / 1000;
      setFile({ name, type, size: totalSize })
    }
  }
  const { data, error:errState, loading, execute } = UseFetchData(uploadResume)
   const {data:oldData, execute:oldExec}=useFetchData(getIndividualUser)
   const {resume_url}=oldData || {};
  useEffect(()=>{
    (async()=>{
      await oldExec(id)
    })()
  }, [id])

  const fileUpload = async () => {
    const err=validateFileUpload(file, 'pdf')
    if(err){
      setError(err)
      return
    }
    const formData = new FormData();
  
  formData.append('resume', content);
    await execute(formData).then(t =>{
      setSuccess(t?.message || 'Resume Upload') 
    }
  );
}

return (
  <div>
    <h2>Upload Your Resume</h2>
    <Errorloading data={{error}}/>
    <Errorloading data={{error: errState, loading}}/>
    <Successcomps data={data?.message}/>
    <form encType="multipart/form-data" method="post" onChange={handleUpload}>
    <div className='border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer'>
  <Inputcomps type='file' name='resume' className='hidden' />
  <p>Click Here or drag A Resume(PDF only)</p>
    </div>
    </form>
    <div onClick={fileUpload}>
      <Buttoncomps values='submit' />
    </div>
    {file.name && <p className='text-green-600'>Selected: {file.name}</p>}
    <div>
    <h2>your Old Resume.</h2>
    {!resume_url && <div>You've not upadted Resume as of now.</div>}
    {resume_url && <>
    <iframe src={resume_url} width="100%" height="600px">
  <p>Your browser does not support iframes. <a href={resume_url}>Download the PDF</a>.</p>
    </iframe>
      <Link to={`https://${resume_url}`} className='text-blue-500 underline'>Link to Resume Pic</Link>
    </>}
  </div>
  </div>
)
}
