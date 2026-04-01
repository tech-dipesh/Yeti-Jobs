import { useEffect, useState } from 'react'
import { getIndividualUser, postUserSkills } from '../../api/auth.user';
import { useNavigate, useParams } from 'react-router';
import authUid from "../../auth/authUid"
import Inputcomps from "../../components/common/Input"
import ButtonComps from '../../components/common/Button';
import validateText from "../../auth/textValidate"
import useFetchData from '../../hooks/useFetchData';
import Textcomps from '../../components/common/Textcomps';
import defaultImage from "../../assets/default-image.webp"
import Linkcomps from "../../components/common/Linkcomps"
import Loading from '../../components/Loading';
import Errorloading from "../../components/common/Errorloading"
import Popup from '../../components/Popup';
import Buttoncomps from '../../components/common/Button';
import { useAuth } from "../../context/Authcontext"
import getOriginalFileName from '../../services/getOriginalFileName';
import Followinglist from '../../components/common/User/Followinglist';
export default function Individualuser() {
  const [open, setOpen] = useState(false);
  const {data:globalContext}=useAuth()
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user } = useAuth()
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [isFollowing, setIsFollowing]=useState(false)
  const { data, loading, error: err, execute } = useFetchData(getIndividualUser);
  const { data: skillsdata, loader, skilllerr, execute: addSkill } = useFetchData(postUserSkills)

  useEffect(() => {
    execute(id);
     document.addEventListener("keydown", (e)=>{
      if(e.key=='Escape'){
        setIsFollowing(false)
      }
    })
  }, [id])
  
  const isValid = authUid(id);
  if (!isValid) return <Errorloading data={{ error: 'Incorrect uid please enter correct uid' }} />

  const submitSkill = async () => {
    const validateErr = validateText(value);
    if (validateErr) {
      return setError(validateErr)
    }
    await addSkill({ id, skill: value })
    if (skillsdata) {
      navigate(0)
      return;
    }
  }
  const { profile_pic_url, fname, lname, email, education, experience_years, resume_url, skills } = data?.message || {}
  const originalName = getOriginalFileName(profile_pic_url)
  const {role}=globalContext ?? {};
  if(loader || loading){
    return <Loading/>
  }

  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      {data &&
        <div className='grid'>
          <div className='flex justify-center mb-4'>
            <img src={profile_pic_url || defaultImage} alt='profile'
              className='h-32 w-32 rounded-full object-cover border-4 border-gray-300 shadow-lg' />
          </div>
          <span className='grid justify-center mt-4'> <Linkcomps to={'profile-picture'} content={<ButtonComps values='Change Photo' />}></Linkcomps></span>
          <div className='grid justify-center mb-4'>
            <h1 className='text-2xl font-bold text-center transition-colors'>{fname} {lname}</h1>
            <span className="px-3 py-1 text-sm bg-green-800 my-4 font-mono rounded-lg text-white mx-auto">{user?.role == 'guest' ? 'Job Seeker' : user?.role == 'admin' ? 'Admin' : 'Recruiter'}</span>
            <p className='text-gray-600 text-center mb-4'>{email}</p>
            <Textcomps content={`Education: ${education}`} />
            <Textcomps content={`Experience: ${experience_years ?? '0'} years`} />
            <span className='my-4 justify-center grid cursor-pointer'> <Linkcomps to={'edit'} content={<ButtonComps values='Edit Profille' />}></Linkcomps></span>
            {role=='guest' && 
            <span className='my-4 justify-center grid cursor-pointer' onClick={()=>setIsFollowing(!isFollowing)}><ButtonComps values='Following List' /></span>
            }
            {isFollowing && <Followinglist setIsFollowing={setIsFollowing} isFollowing={isFollowing}/>}
          </div>
          <div className='grid justify-items-center'>
            <h4 className='font-bold font-sans'>Skills:</h4>
            {(!skills || skills.length == 0) && <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">No skills added</div>}
            <div className='flex flex-wrap justify-center gap-2 max-w-sm'>
              {skills && skills.map((u, i) => <p key={i} className='bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium '>{u}</p>)}
            </div>
            {!open ?
              <span onClick={() => setOpen(true)}>
                <Buttoncomps values={'Add Skills'} />
              </span>
              :
              <Popup setOpen={setOpen} open={open} value={value} setValue={setValue} submitFunction={submitSkill} error={error} setError={setError} fetchError={skilllerr} type={'Skills'} header={<Textcomps content={`Enter a Skills:`} />}>
                <>
                <Inputcomps click={setValue} value={value} type="text" error={setError} />
                <span onClick={submitSkill} className="justify-center flex">
                  <Buttoncomps values={`Add Skill`} color={'bg-red-500'} />
               </span>
                </>
              </Popup>
            }
          </div>
          <Errorloading data={{ error: err }} />
          <div className='grid align-middle justify-items-center  gap-3 mt-6 pt-4 '>
            <Textcomps content={'Resume'} />
            {resume_url ? <Textcomps content={originalName} /> : <Textcomps style={'text-red-500'} content={'No Resume Added'} />}
            <div className='flex gap-6'>
              {resume_url && <Linkcomps content={'View Resume'} to={resume_url} />}
              <Linkcomps to='resume' content={<Buttoncomps values={'Upload Resume'} />} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}
