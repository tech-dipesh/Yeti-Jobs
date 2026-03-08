import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { bookMarkJob, deleteExistingJobs, individualJobs, removeBookmark } from '../../api/auth.job';
import useFetchData from '../../hooks/useFetchData';
import ButtonComps from "../../components/Button"
import isOwnerMiddleware from '../../../../backend/Middleware/isOwner';
import Applyjob from '../Applications/Applyjob';
export default function EachJob() {
  const navigate = useNavigate()
  const [value, setValue] = useState({});
  const [success, setSuccess] = useState()
  const [error, setError]=useState()
  const { id } = useParams();

  const { error:fetchErr, loading, execute } = useFetchData(individualJobs)
  const { error: errabookmark, loading: loadabookmark, execute: bookmark } = useFetchData(bookMarkJob)
  const { error: removeerrbookmark, loading: loadremovebookmark, execute: removeBook } = useFetchData(removeBookmark)
  const { error: errdelete, loading: loaddelete, execute: deletes } = useFetchData(deleteExistingJobs)
  useEffect(() => {
    ; (async () => {
      execute(id).then(t => setValue(t))
      setError(fetchErr)
    })()
  }, [id])

  const saveJob = async () => {
    await bookmark(id).then(t => setSuccess(t?.message))
    navigate(0)
  }
  const RemoveSavedJobs = async () => {
    const data=await removeBook(id);
    setSuccess(data?.message)
    navigate(0)
  }
  if (loading || loadabookmark || loadremovebookmark) {
    return <div>Loading...</div>
  }
  if (error || errabookmark || removeerrbookmark) {
    return <div className='text-red-500'>{error || errabookmark}</div>
  }
  const { is_owner, is_save } = value || {};

  const deleteJob=async ()=>{
    const con=confirm("Are you really want to delete a job.");
    if(!con) return;
    const res=await deletes(id)
    if(!res){
      setError(errdelete);
      return;
    }
    setTimeout(() => {
        navigate('..')
    }, 250);
    
  }
  const showEditButton = () => {
    // if (is_owner) {
      const sendAllValue={uid: value.uid, title: value.title, description: value.description, job_type: value.job_type, salary: value.salary, skills: value.skills}
      return is_owner && (
        <>
        <div onClick={deleteJob}>
          <ButtonComps values="Delete Job" color='bg-red-500  '/>
        </div>
        <Link to={`edit`} state={sendAllValue}>
          <ButtonComps values="Edit Job" />
        </Link>
        <Link to={`../../applications/${value.uid}/applylist`} state={sendAllValue}>
          <ButtonComps values="All applicant" />
        </Link>
        </>
      );
    // }
  }
  if(loading){
    return <div>Loading....</div>
  }

    const valueButton = is_save  ? "Remove from Saved Jobs" : "Save Job";
    const clickFun = is_save ? RemoveSavedJobs : saveJob
    return (
      <div>
        {success && <div className='text-green-500'>{success}</div>}
        <div  className='bg-neutral-900 p-8 h-auto w-120 rounded-lg'>
          <p>Job Id: {value.uid}</p>
          <p>Title: {value.title}</p>
          <p>Description: {value.description}</p>
          <p>Job Type: {value.job_type}</p>
          <p>Salary: {value.salary}</p>
          <p>Total Job View: {value.total_job_views}</p>
          <p>Experience: {value.experience_years}</p>
          <div className='flex gap-8'>
            Skills:
            {value?.skills?.map((skill, i) => <p key={i} className='border-2 bg-slate-600 p-2 rounded-xl cursor-pointer'>{skill}</p>)}
          </div>
        {showEditButton()}
        </div>
        {!is_owner && 
        <div onClick={clickFun}><ButtonComps values={valueButton} /></div>
      }
        {error && <div className='text-red-500'>{error}</div>}
        <div className='flex justify-end w-full'>
    <Applyjob value={value.is_applied}/>
  </div>
      </div>
    )
  }