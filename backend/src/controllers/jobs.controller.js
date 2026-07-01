import express from "express"
import client from "../db.js"
import { ALLOW_SEARCH_QUERY } from "../utils/data.js";
import listingSchema from "../Models/jobs.models.js";
import {prefixQuery} from '../utils/Prefixquery.js';
const router=express.Router();

export const ListJobsControllerWithFilter=async (req, res) => {
  let {page=1, limit=10, sortby='created_at', min_salary=null, max_salary=null, min_exp=null, max_exp=null,status=null, posted=null,skills=null, location=null,  job_type=null}=req.query;
  const offset=(Number(page)-1)*Number(limit);
  try {
    console.log('sort by', sortby)
    if(!ALLOW_SEARCH_QUERY.includes(sortby)){
      return res.status(400).json({message: "Please Add Only Avaible column list"});
    }
    let skillsParam = null;
    if (skills) {
      skillsParam = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    }
    console.log('skillsParam', skillsParam)
    const sql = "select j.*, c.name as company_name from jobs j left join companies c on c.uid = j.company_id where ($1::int is null or salary >= $1) and ($2::int is null or salary <= $2) and ($3::int is null or experience_years >= $3) and ($4::int is null or experience_years <= $4) and ($5::text is null or job_type::text = $5) and ($6::text is null or is_job_open::text = $6) and ($7::int is null or j.created_at >= now() - ($7 || ' days')::interval) and ($8::text[] is null or skills @> $8) and ($9::text is null or j.location ilike $9) order by case when $10::text = 'salary' then salary when $10::text = 'total_job_views' then total_job_views else extract(epoch from j.created_at)::bigint end asc limit $11 offset $12";
    const countsql = "select count(*) from jobs j left join companies c on c.uid = j.company_id where ($1::int is null or salary >= $1) and ($2::int is null or salary <= $2) and ($3::int is null or experience_years >= $3) and ($4::int is null or experience_years <= $4) and ($5::text is null or job_type::text = $5) and ($6::text is null or is_job_open::text = $6) and ($7::int is null or j.created_at >= now() - ($7 || ' days')::interval) and ($8::text[] is null or skills @> $8) and ($9::text is null or j.location ilike $9)";

    const params = [ min_salary || null, max_salary || null, min_exp || null, max_exp || null, job_type || null, status === 'open' ? true : status === 'closed' ? false : null, posted === '24h' ? 1 : posted === '7d' ? 7 : posted === '30d' ? 30 : null,  skills ? skillsParam:  null, `%${location}%`  || null, sortby === 'salary' || sortby === 'created_at' ? sortby : null, limit, offset ];
    const countparams = [ min_salary || null, max_salary || null, min_exp || null, max_exp || null, job_type || null, status === 'open' ? true : status === 'closed' ? false : null, posted === '24h' ? 1 : posted === '7d' ? 7 : posted === '30d' ? 30 : null,  skills ? skillsParam:  null, location || null]
    const [{rows: countTotal}, {rows}]=await Promise.all([
      client.query(countsql, countparams),
      client.query(sql, params)
    ])
    console.log('rowa is', rows)
    return res.status(200).json({message: rows || [], limit, page, total: countTotal[0].count})
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({message: error.message})
  }
};  

export const getAllJobsController=async (req, res) => {
  let {page=1, limit=10, sortby='created_at', filter='', min_salary, max_salary, min_exp, max_exp, job_type }=req.query;
  const offset=(Number(page)-1)*Number(limit);
  try {
    if(!ALLOW_SEARCH_QUERY.includes(sortby)){
      return res.status(400).json({message: "Please Add Only Avaible column list"});
    }
    const {rows: countTotal}=await client.query("select count(*) as count from jobs");
    const {rows}=await client.query(`select j.*, c.name as company_name from jobs j left join companies c on c.uid=j.company_id  order by ${sortby} desc limit $1 offset $2`, [limit, offset])
    return res.status(200).json({message: rows || [], limit, page, total: countTotal[0].count})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};  

export const searchJobsListing=async (req, res) => {  
  const {sortby='created_at', title}=req.query;
  if(!title){
    return res.status(404).json({message: 'Please Enter Search Term'});
  }
  if(!ALLOW_SEARCH_QUERY.includes(sortby)){
    return res.status(401).json({message: "Please Add Only Avaible column list"});
  }
  try {
    const tsQuery=prefixQuery(title)
    const {rows, rowCount}=await client.query(`select j.*, c.name as company_name from jobs j left join companies c on c.uid=j.company_id where search_title @@ plainto_tsquery($1) order by ${sortby} desc`, [tsQuery]);
    return  res.status(200).json({message: rows})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: error.message});
  }
};


export const getJobsController= async (req, res) => {
  const {id}=req.params;
  const {uid, company_id}=req?.user;
  try {
    const {rows}=await client.query("select j.*, c.name as company_name, c.logo_url, j.company_id = $3 as is_owner, s.job_id is not null as is_saved, a.user_id is not null as is_applied from jobs j left join companies c on c.uid=j.company_id left join saved_jobs s ON j.uid = s.job_id and s.user_id = $1 left join applications a ON j.uid = a.job_id and a.user_id = $1 WHERE j.uid = $2 limit 1;", [uid, id, company_id]) 
    if(rows.length===0){
      return res.status(404).json({message: "Id Doesn't exist that you're looking for"})
    }
    await client.query("update jobs set total_job_views=(total_job_views+1) where uid=$1", [id]);
    return res.status(200).json({message: rows[0]})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const postJobsController= async (req, res) => {
  let {title, description, job_type, salary, skills, experience_years}=req.body;
  const {company_id, uid}=req.user;
  if (typeof skills === 'string') {
    skills = skills.split(',').map(skill => skill.trim());
  }
  experience_years=experience_years ??0;
  const allListing={title, description, job_type, salary, skills, experience_years}
  const validateListing=listingSchema.safeParse(allListing);
  if(!validateListing.success){
    const message=validateListing.error.issues[0].message;
    return res.status(404).json({message})
  }
  try {
    // await client.query("Insert into Jobs (title, description, salary, job_type, company_id, updated_at) values ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)", [title, description, salary, job_type, company_id ])
    const {rows}=await client.query("Insert into jobs (title, description, salary, job_type, company_id, created_by, skills, experience_years) values ($1, $2, $3, $4, $5, $6, $7, $8) returning uid", [title, description, salary, job_type, company_id , uid,  skills, experience_years])
    return res.status(200).json({message: rows[0]})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};


export const deleteJobsController= async (req, res) => {
  const {id}=req.params;
  try {
    const {rows:query}=await client.query("select exists(select 1 from jobs where uid=$1)", [id]);
    if(!query[0].exists){
      return res.json({message: "Id Doesn't exist"})
    }
    await client.query("delete FROM jobs where uid=$1", [id])
    return res.status(204).json({message: 'Job Deleted Successfully'})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};


export const putJobsController= async (req, res) => {
  const {id}=req.params;
  if (typeof req.body.skills === 'string') {
    req.body.skills = req.body.skills.split(',').map(s => s.trim());
  }
  let {title, description, job_type, salary, skills, experience_years, location}=req?.body;
  const validateListing=listingSchema.safeParse(req?.body);
  if(!validateListing.success){
    const message=validateListing.error.issues[0].message;
    return res.status(404).json({message})
  }
  try {
    await client.query("update jobs set title=$1, description=$2, job_type=$3, salary=$4, skills=$5::text[], location=$6 where uid=$7", [title, description, job_type, salary, skills, location, id])
    const {rows}=await client.query("select * from jobs where uid=$1", [id])
    if(!rows){
      return res.status(404).json({message: "Please Enter Id For Get a information"})
    }
    return res.status(200).json({message: rows[0]})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const verifyOwnerController=async(req, res)=>{
  const {id}=req.params;
  const {company_id}=req.user;
  try {
    const {rows}=await client.query("select exists (select 1 from jobs where uid = $1 and company_id = $2);", [id, company_id])
    if(!rows[0].exists){
      return res.status(401).json({message: "You're Not a Owner of Routes."})
    }
    return res.status(200).json({message: "You owned this route."})
  } catch (error) {
    (error)
    return res.status(500).json({message: error.message})
  }
}
export default router;
