import { connect } from "../db.js";
import validateFunUid from "../utils/ValidateFunUid.js";

export const verifyAdminController = (req, res) => {
  const {role}=req.user;
  if(role!='admin'){
    return res.status(201).json({message: "UnAuthorized, You're not a Admin, You Don't Have Access."})
  }
  else{
    return res.status(200).json({message: 'Success'})
  }
};



export const assignUsersToCompanies=async (req, res)=>{
  const {company_id, uid}=req.body ?? {};
  try {
    if(!company_id || !uid){
      return res.status(429).json({message: "Please Enter the company_id And uid"})
    }
    const err=validateFunUid(company_id)
    const err1=validateFunUid(uid)
    if(err) return res.status(201).json({message: err})
    if(err1)  return res.status(201).json({message: err1})
    const {rows:check}=await connect.query("select exists(SELECT 1 from users where uid=$1 and company_id is not null);", [uid])
    if(check[0].exists){
      return res.status(422).json({message: "User is Already Assign to the Companies."})
    }
    const {rows}=await connect.query("update users set company_id=$1 where uid=$2 returning *;", [company_id, uid])
    return res.status(201).json({message: rows[0]})
  } catch (error) {
    return res.status(201).json({message: error.message})
  }
}



export const searchCompany=async(req, res)=>{
  const {q}=req.query;
  if(!q){
    return res.status(429).json({message: "Please Enter Search Query"})
  }
  try {
    const {rows}=await connect.query("select name, uid from companies where name ilike $1", [`%${q}%`])
    return res.status(200).json({message: rows})  
  } catch (error) {
    return res.status(500).json({message: error.message})    
  }
}



export const searchUsers=async(req, res)=>{
   const {q}=req.query;
  if(!q){
    return res.status(429).json({message: "Please Enter Search Query"})
  }
  try {
    const {rows}=await connect.query("select fname, lname, company_id, experience, uid from users where fname ilike $1 or lname ilike $1;", [`%${q}%`])
    return res.status(200).json({message: rows})  
  } catch (error) {
    return res.status(500).json({message: error.message})    
  }
}