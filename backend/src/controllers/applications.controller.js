import connect from "../db.js"
import applicationSchema, { validateAllInputApplicationStatus } from "../Models/applications.models.js";
import validateFunUid from "../utils/ValidateFunUid.js";

export const allAppliedJobs=async (req, res)=>{
  const {uid}=req.user;
  try {
    const {rows}=await connect.query("select j.title, j.description, j.job_type, a.applied_at, a.cover_letter, a.notice_period, a.expected_salary, a.why_hire, j.experience_years, j.expired_at, a.status, j.uid from jobs j inner join applications a on a.job_id=j.uid where user_id=$1", [uid]);
    return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const particularJobsListController=async(req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query("SELECT CONCAT(u.fname,' ', u.lname) AS full_name, u.experience, u.phone_number, u.resume_url, u.skills AS user_skills, a.status, a.applied_at FROM applications a INNER JOIN users u ON a.user_id = u.uid WHERE a.job_id=$1;", [id]);
    return res.json({message: rows})
  } catch (error) {
     return  res.status(504).json({message:error.message})
  }
}
export const applyJobApplicationController=async (req, res)=>{
  const {uid}=req?.user;
  const {id: job_id}=req.params;
  const {cover_letter, notice_period, expected_salary, why_hire}=req.body;
  try {
    const validateListing=applicationSchema.safeParse(req.body);
  if(!validateListing.success){
      const message=validateListing.error.issues[0].message;
      return res.status(422).json({message: message})
    }
    const {rowCount, rows: appliedList}=await connect.query("select exists(select 1 from applications where user_id=$1 and job_id=$2);", [uid, job_id])
    if(appliedList[0].exists){
      return res.status(401).json({message: "You've Already Applied"})
    }
    await connect.query("insert into applications (user_id, job_id, cover_letter, notice_period, expected_salary, why_hire) values ($1, $2, $3, $4, $5, $6)", [uid, job_id, cover_letter, notice_period, expected_salary, why_hire])
    return res.status(201).json({message: "You've Successfully applied to the role."})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}



export const withdrawJobApplicationController= async (req, res)=>{
  const {id: job_id}=req.params;
  const {uid}=req.user;
  try {
    const {rows}=await connect.query("select exists(select 1 from applications where job_id=$1 and user_id=$2);", [job_id, uid]);
    if(!rows[0].exists){
      return res.status(200).json({message: "No id Data Exist"})
    }
    await connect.query("delete from applications where job_id=$1 and user_id=$2", [job_id, uid])
    return res.status(200).json({message: 'Successfully Withdraw from applications'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}



export const changeApplicationStatus=async (req, res)=>{
  const {id:job_id}=req.params;
  let {status, user_id}=req?.body;
  const err=validateFunUid(user_id);
  if(!user_id){
    return res.status(404).json({message: "Please Enter a User Id"});
  }
  if(err){
    return res.status(422).json({message: err})
  }
  const validateApplication=validateAllInputApplicationStatus.safeParse({status});
  if(!validateApplication.success){
    const message=validateApplication.error.issues[0].message;
    return res.status(422).json({message: message})
  }
  try {
      const [{rows: invalid}, {rows}]=await Promise.all([
        ("select exists(select 1 from applications where job_id=$1)", [job_id]),
       ("select exists(select 1 from applicatkions where user_id=$1 and job_id=$2)", [user_id, job_id])
    ])
    if(!invalid[0].exists){
      return res.status(422).json({message: "Invalid Job Id."})
    }
    if(!rows[0].exists){
      return res.status(422).json({message: "You've Not Applied Please First Apply."})
    }
    if(rows[0].status===status){
     return res.status(401).json({message: "Please Change the Application Status"})
   }
    await connect.query("update applications set status=$1 where user_id=$2 and job_id=$3", [status, user_id, job_id])
    return res.status(201).json({message: "Application Status Updated Successfully"});
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
