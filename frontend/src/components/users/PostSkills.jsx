import React, { useState } from 'react'
import { postUserSkills } from '../../api/auth.user';
import useFetchData from '../../hooks/useFetchData';
import validateText from '../../auth/textValidate';
import { useNavigate, useParams } from 'react-router';
import Errorloading from '../Errorloading';
import InputComps from '../ui/Input';
import Buttoncomps from '../ui/Button';
import Loading from '../../Loading';

export default function PostSkills() {
  const navigate=useNavigate()
  const {id}=useParams();
  const [isSkillsOpen, setIsSkillOpen] = useState(false)
  const [skill, setSkills] = useState()
  const { error: skilllerr, data, execute: addprofile, loading } = useFetchData(postUserSkills)
  const [error, setError] = useState("")
  const submitSkill = async (e) => {
    e.preventDefault()
    const err = validateText(skill);
    if (err) {
      return setError(err)
    }

    const res = await addprofile({ id, skill })
    if (skilllerr) {
      setError(skilllerr)
      return;
    }
    if (res || data) {
      navigate(0)
      return;
    }
  }
 if(loading){
  return <Loading/>
 }
  return (
    <>
      <Errorloading data={{ error: error }} />
      <h3>Add User Skills:</h3>
      <div onClick={() => setIsSkillOpen(!isSkillsOpen)}><Buttoncomps values={isSkillsOpen ? 'Escape Skills' : 'Add Skills'} /></div>
      {isSkillsOpen &&
        <>
          <form className='flex gap-2 items-center mt-2' onSubmit={submitSkill}>
            <InputComps placeholder='New Skill' type='text' error={setError} click={setSkills} value={skill} />
            <Buttoncomps values='Add' />
          </form>
        </>}
    </>
  )
}
