import client from '../db.js';

import validateCorrectUid from '../utils/ValidateFunUid.js'
export const showAllNotifications=async(req, res)=>{
  const {uid}=req.user;
  const {unread}=req.query
  console.log('unread', unread)
  console.log('users id', uid)
  try {
    const {rows}=await client.query("select * from notifications where users_id=$1 order by created_at desc", [uid]);
    return res.status(200).json({ message:  rows});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}
export const ReadAllNotifications=async(req, res)=>{
  const {uid}=req.user;
  try {
    await client.query("update notifications set read_at=current_timestamp where uid=$1", [uid]);
    return res.status(200).json({ message:  "Successfully Read All notifications"});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}
export const sendUserNotifications=async(req, res)=>{
  const {job_id, company_id, type}=req.body ?? {}
  const {uid}=req.user;
  
  const allTypes=["new_jobs","application_status","job_alert","bookmark_reminder","company_follow","application_recieved","profile_view","message_recieved","resume_analysed","announcement"]
  try {
    if(validateCorrectUid(job_id) || validateCorrectUid((company_id))){
      return res.status(400).json({message: "Please Enter a Valid UUID at Company and job Id"})
    }
    if(!job_id || !company_id || !type){
      return res.status(422).json({message: "Please Enter a Job Id, Company Id and Type"})
    }
    if(!allTypes.includes((type))){
     return res.status(400).json({message: "Please Only Enter a Allowed Types"}) 
    }
    const {rows}=await client.query("insert into notifications (users_id, job_id, company_id, type) values($1, $2, $3, $4) returning *;", [uid, job_id, company_id, type])
    return res.status(200).json({ message:  rows});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}

