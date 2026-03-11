import express from "express"
import client from "../db.js"
import tableDataFetch from "../utils/tableDataFetch.js";
import listingSchema from "../Models/jobs.models.js";
const DATALIST=["uid", "title", "description", "salary", "job_type", "is_job_open", "created_by", "created_at", "skills", "total_job_views"];
const router=express.Router();

export const getAllListingController=async (req, res) => {
  let {page, limit, sortby}=req.query;
  limit=limit??10
  page=page??1;
  sortby=sortby??'created_at'
  if(!DATALIST.includes(sortby)){
    return res.status(401).json({message: "Please Add Only Avaible column list"});
  }
  const {rows}=await client.query(`SELECT * FROM jobs where is_job_open<>'closed' order by ${sortby} desc limit $1 offset $2`, [limit, page])
  return res.status(200).json({message: rows, limit, page})
};  

export const searchJobsListing=async (req, res) => {
  const {title}=req.query;
  if(!title){
    const message='Please Enter Search Term'
    return res.status(204).json({message: message});
  }
  try {
    const {rows, rowCount}=await client.query("select * from jobs where search_title @@ to_tsquery($1)", [`${title}:*`]);
    if(rowCount==0){
      return res.status(204).json({message: "No Content Found"})
    }
    return  res.status(200).json({message: rows})
  } catch (error) {
    return res.status(204).json({message: "No Content Found"});
  }
};


export const getListingController= async (req, res) => {
  const {id}=req.params;
  const {uid}=req?.user;
  console.log('id', id, 'uid', uid)
  try {
    const {rows}=await client.query("select j.*,j.created_by=$1 is_owner,s.job_id is not null is_save,a.user_id is not null is_applied from jobs j left join saved_jobs s on j.uid=s.job_id and s.users_id=$1 left join applications a on j.uid=a.job_id and a.user_id=$1 where j.uid=$2 limit 1;", [uid, id]) 
    if(rows.length===0){
      return res.status(404).json({message: "Id Doesn't exist that you're looking for"})
    }
    await client.query("update jobs set total_job_views=(total_job_views+1) where uid=$1", [id]);
    return res.status(200).json(rows[0])
  } catch (error) {
    (error)
    return res.status(400).json({message: error.message})
  }
};

export const postListingController= async (req, res) => {
  let {title, description, job_type, salary, skills}=req.body;
  const {company_id, uid}=req.user;
  // it's due to the client side sometimes send a cache data where it's sendint a string data even i've try.
  if (typeof skills === 'string') {
    skills = skills.split(',').map(skill => skill.trim());
}
  const allListing={title, description, job_type, salary, skills}
  const validateListing=listingSchema.safeParse(allListing);
  if(!validateListing.success){
      const message=validateListing.error.issues.map(m=>m.message);
      return res.status(404).json({message: message[0]})
    }
  if(!title || !description || !job_type || !salary){
    return res.json({message: "Enter Value to Insert output"})
  }
  try {
    // await client.query("Insert into Jobs (title, description, salary, job_type, company_id, updated_at) values ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)", [title, description, salary, job_type, company_id ])
    const {rows}=await client.query("Insert into jobs (title, description, salary, job_type, company_id, created_by, skills) values ($1, $2, $3, $4, $5, $6, $7) returning uid", [title, description, salary, job_type, company_id , uid,  skills])
   return res.status(200).json({message: rows[0].uid})
  } catch (error) {
   return res.json({message: error.message})
  }
};


export const deleteListingController= async (req, res) => {
  const {id}=req.params;
  try {
    const {rows: query}=await client.query("delete FROM jobs where uid=$1", [id])
    if(query.length===0){
        return res.json({message: "Id Doesn't exist"})
    }
    const data= await tableDataFetch('jobs')
   return res.status(200).json({data})
  } catch (error) {
    (error)
    return res.json({message: error.message})
  }
};


export const putListingController= async (req, res) => {
  const {id}=req.params;
  let {title, description, job_type, salary, skills}=req?.body;
   if(!title || !description || !job_type || !salary || !skills){
    return res.json({message: "Please Enter All Values."})
  }
  const allListing={title, description, job_type, salary, skills}
  const validateListing=listingSchema.safeParse(allListing);
  if(!validateListing.success){
    const message=validateListing.error.issues.map(m=>m.message);
    return res.status(404).json({message: message[0]})
  }
  try {
    await client.query("update jobs set title=$1, description=$2, job_type=$3, salary=$4, skills=$5 where uid=$6", [title, description, job_type, salary, skills, id])
    const {rows}=await client.query("select * from jobs where uid=$1", [id])
    if(!rows){
      return res.status(404).json({message: "Please Enter Id For Get a information"})
    }
    res.status(200).json({message: rows[0]})
  } catch (error) {
    (error)
    res.json({message: error.message})
  }
};

export const verifyOwnerController=async(req, res)=>{
  const {id}=req.params;
  const {uid}=req.user;
  try {
    const {rows}=await client.query("select exists ( select 1 from jobs where uid = $1 and created_by = $2);", [id, uid])
    if(!rows[0].exists){
        return res.status(401).json({message: "You Don't have access to routes."})
    }
      return res.status(200).json({message: "You owned this route."})
  } catch (error) {
    (error)
    return res.status(500).json({message: error.message})
  }
}
export default router;