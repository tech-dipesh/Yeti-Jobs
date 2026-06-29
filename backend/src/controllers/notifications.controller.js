import client from '../db.js';

import validateCorrectUid from '../utils/ValidateFunUid.js'
export const showAllNotifications=async(req, res)=>{
  const {uid}=req.user;
  const {unread}=req.query
  console.log('unread', unread)
  console.log('users id', uid)
  try {
    const {rows}=await client.query("select n.uid, n.type, n.created_at, n.read_at, n.job_id, n.company_id, n.users_id, j.title as job_title, c.name as company_name from notifications n left join jobs j on j.uid = n.job_id left join companies c on c.uid = n.company_id WHERE n.users_id =$1 order by n.created_at desc", [uid]);
    return res.status(200).json({ message:  rows});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}
export const ReadUnreadSingleNotifications=async(req, res)=>{
  const {uid:userId}=req.user;
  const {uid}=req.params;
  const {isRead}=req.query
  try {
    let checkCondition; 
    if(isRead){
      checkCondition==await client.query("update notifications set read_at=current_timestamp where uid=$1 and users_id=$2 and read_at is null", [uid, userId]);
    }
    else{
      checkCondition=await client.query("update notifications set read_at=null where uid=$1 and users_id=$2 and read_at is not null", [uid, userId]);
    }
    const {rowCount}=checkCondition
    if(!rowCount){
      return res.status(404).json({message: "notifications is already read or No notifications exist"})
    }
   return res.status(200).json({ message:  "Successfully read/unread notifications"});
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

