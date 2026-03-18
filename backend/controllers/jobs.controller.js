import express from "express"
import client from "../db.js"
import tableDataFetch from "../utils/tableDataFetch.js";
import listingSchema from "../Models/jobs.models.js";
const DATALIST=["uid", "title", "description", "salary", "job_type", "is_job_open", "created_by", "created_at", "skills", "total_job_views"];
const router=express.Router();

export const getAllListingController=async (req, res) => {
  let {page=1, limit=10, sortby='created_at'}=req.query;
  const offset=(page-1)*limit;
  try {
    if(!DATALIST.includes(sortby)){
      return res.status(401).json({message: "Please Add Only Avaible column list"});
    }
    const {rows: countTotal}=await client.query("select count(*) as count from jobs");
    const {rows}=await client.query(`select j.*, c.name as company_name from jobs j left join companies c on c.uid=j.company_id  order by ${sortby} desc limit $1 offset $2`, [limit, offset])
    return res.status(200).json({message: rows, limit, page, total: countTotal[0].count})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: error.message})
  }
};  

export const searchJobsListing=async (req, res) => {
  const {sortby='created_at', title}=req.query;
  if(!title){
    const message='Please Enter Search Term'
    return res.status(204).json({message: message});
  }
  try {
    const {rows, rowCount}=await client.query(`select j.*, c.name as company_name from jobs j left join companies c on c.uid=j.company_id where search_title @@ to_tsquery($1) order by ${sortby} desc`, [title]);
    return  res.status(200).json({message: rows})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: error.message});
  }
};


export const getListingController= async (req, res) => {
  const {id}=req.params;
  const {uid, company_id}=req?.user;
  try {
    const {rows}=await client.query("select j.*, c.name as company_name, c.logo_url, j.company_id = $3 as is_owner, s.job_id is not null as is_saved, a.user_id is not null as is_applied from jobs j left join companies c on c.uid=j.company_id left join saved_jobs s ON j.uid = s.job_id and s.users_id = $1 left join applications a ON j.uid = a.job_id and a.user_id = $1 WHERE j.uid = $2 limit 1;", [uid, id, company_id]) 
    if(rows.length===0){
      return res.status(404).json({message: "Id Doesn't exist that you're looking for"})
    }
    await client.query("update jobs set total_job_views=(total_job_views+1) where uid=$1", [id]);
    return res.status(200).json(rows[0])
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: error.message})
  }
};

export const postListingController= async (req, res) => {
  let {title, description, job_type, salary, skills, experience_years}=req.body;
  const {company_id, uid}=req.user;
  // it's due to the client side sometimes send a cache data where it's sendint a string data even i've try.
  if (typeof skills === 'string') {
    skills = skills.split(',').map(skill => skill.trim());
}
  experience_years=experience_years ??0;
  const allListing={title, description, job_type, salary, skills, experience_years}
  const validateListing=listingSchema.safeParse(allListing);
  if(!validateListing.success){
      const message=validateListing.error.issues.map(m=>m.message);
      return res.status(404).json({message: message[0]})
    }
  try {
    // await client.query("Insert into Jobs (title, description, salary, job_type, company_id, updated_at) values ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)", [title, description, salary, job_type, company_id ])
    const {rows}=await client.query("Insert into jobs (title, description, salary, job_type, company_id, created_by, skills, experience_years) values ($1, $2, $3, $4, $5, $6, $7, $8) returning uid", [title, description, salary, job_type, company_id , uid,  skills, experience_years])
   return res.status(200).json({message: rows[0]})
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
  let {title, description, job_type, salary, skills, experience_years, location}=req?.body;
  const allListing={title, description, job_type, salary, skills, experience_years, location}
  const validateListing=listingSchema.safeParse(allListing);
  if(!validateListing.success){
    const message=validateListing.error.issues.map(m=>m.message);
    return res.status(404).json({message: message[0]})
  }
  try {
    await client.query("update jobs set title=$1, description=$2, job_type=$3, salary=$4, skills=$5, location=$6 where uid=$7", [title, description, job_type, salary, skills, location, id])
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
  const {company_id}=req.user;
  try {
    const {rows}=await client.query("select exists ( select 1 from jobs where uid = $1 and company_id = $2);", [id, company_id])
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