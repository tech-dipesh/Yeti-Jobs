import React, { useEffect, useState } from 'react'
import { getIndividualUser, postUserSkills, uploadProfilePicture } from '../../api/auth.user';
import { Link, useNavigate, useParams } from 'react-router';
import authUid from "../../auth/authUid"
import Inputcomps from "../../components/common/Input"
import ButtonComps from '../../components/common/Button';
import validateText from "../../auth/textValidate"
import useFetchData from '../../hooks/useFetchData';
import Textcomps from '../../components/common/Textcomps';
import defaultImage from "../../assets/default-image.webp"
import Linkcomps from "../../components/common/Linkcomps"
import Loading from '../../components/Loading';
export default function Individualuser() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('skills', id)
  const [isSkillsOpen, setIsSkillOpen] = useState(false)
  const [error, setError] = useState("")
  const [skill, setSkills] = useState()


  const { data, loading, error: err, execute } = useFetchData(getIndividualUser);
  const {data: profileData, error:skilllerr, execute: addprofile}=useFetchData(postUserSkills)
  useEffect(() => {
    ; (async () => {
      await execute(id);
    })()
  }, [])

  const isValid = authUid(id);
  if (!isValid) return <div>Incorrect uid please enter correct uid</div>
  const submitSkill = async () => {
    const err = validateText(skill);
    if (err) {
      return setError(err)
    }
  
   const res= await addprofile({id, skill})
   if(res){
     setTimeout(() => {
       navigate(0)
      }, 500);
      return;
    }
    if(skilllerr){
      setError(skilllerr)
    }
  }
   if(loading){
  return <Loading/>
 }
  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      {error || err && <div className='text-red-500'>{error || err}</div>}
      {data &&
        <div>
          <div className='flex justify-center mb-4'>
          <img src={data.profile_pic_url || defaultImage} alt='profile' 
            className='h-32 w-32 rounded-full object-cover border-4 border-gray-300 shadow-lg' />
            <div className='grid justify-center mt-4'>
            <Linkcomps content={'Change Photo'} to={'profile-picture'} />
          </div>
      </div>
          <h1 className='text-2xl font-bold text-center'>{data.fname} {data.lname}</h1>
          <p className='text-gray-600 text-center mb-4'>{data.email}</p>
         <div className='grid grid-cols-2 gap-4 bg-slate-500 p-4 rounded-lg'>
          <span className='font-semibold'>Education:</span> {data.education}</div>
        <div><span className='font-semibold'>Experience:</span> {data.experience_years} years
      </div>
          <h3>Profile Pic url: {data.profile_pic_url ?? 'none'}</h3>
          {data.profile_pic_url &&
          <Link to={data.resume_url} target='_blank' className='text-blue-300 underline'> {data.resume_url ?? 'none'}</Link>
          }
          <h4>Skills:</h4>
          <div className='flex flex-wrap  gap-2 text-gray-400 text-2xl'>
            {!data.skills?.length && <div className="text-gray-400">No skills added</div>}
            <div className='flex flex-wrap gap-2 my-4'>
            {data.skills && data.skills.map((u, i) => <p key={i} className='bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium'>{u}</p>)}
            </div>
          </div>
          <h3>Add User Skills:</h3>
          <div onClick={() => setIsSkillOpen(!isSkillsOpen)}><ButtonComps values={isSkillsOpen ? 'Escape Skills': 'Add Skills'} /></div>
          {isSkillsOpen &&
          <>
            <div className='flex gap-2 items-center mt-2'>
          <Inputcomps placeholder='New Skill' type='text' click={setSkills} value={skill}/>
          <ButtonComps values='Add' onClick={submitSkill}/>
        </div>
          </>  }
        
            <div className='flex flex-wrap gap-3 mt-6 pt-4 border-t'>
            <Link to='edit'><ButtonComps values="Edit Profile" /></Link>
            <Link to='resume'><ButtonComps values="Upload Resume" /></Link>
          </div>
              {data.is_employee && <ButtonComps values="You're a employee." />}
        </div>
      }
    </div>
  )
}
