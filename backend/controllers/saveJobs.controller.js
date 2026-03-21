import connect from "../db.js"

const getallSaveJob=async(req, res)=>{
  const {uid}=req.user;
  const {rows}=await connect.query("select j.uid, j.title, j.description, j.salary, j.job_type, j.is_job_open, j.skills from jobs j inner join saved_jobs s on s.job_id=j.uid where s.users_id=$1;", [uid]);
  return res.status(200).json({message: rows})
}

const storeSaveJob=async (req, res)=>{
  const {uid}=req.user;
  const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter Jobs id to bookmarked jobs"});
  }
  try {
    const {rowCount}=await connect.query("select job_id, users_id from saved_jobs where job_id=$1 and users_id=$2", [id, uid]);
    if(rowCount>0){
      return res.status(400).json({message: "The Jobs is already Bookmarked don't need to bookmark again"});
    }
    await connect.query("insert into saved_jobs (job_id, users_id) values ($1, $2) returning *", [id, uid])
    return res.status(201).json({message: "Jobs have been bookmarked"})
  } catch (error) {
    return res.status(403).json({message: error.message})
  }
}

const unsaveListJob=async (req, res)=>{
  const {uid}=req.user;
   const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter Jobs id to bookmarked jobs"});
  }
  try {
      const {rowCount}=await connect.query("select job_id from saved_jobs where job_id=$1 and users_id=$2", [id, uid]);
    if(rowCount==0){
      return res.status(400).json({message: "Please first Bookmark to remove from bookmark"});
    }
    await connect.query("delete from saved_jobs where job_id=$1 and users_id=$2", [id, uid]);
    return res.status(201).json({message: 'Successfully Removed jobs from bookmark'})
  } catch (error) {
    return res.status(403).json({message: error.message})
  }
}

export {storeSaveJob, getallSaveJob, unsaveListJob}