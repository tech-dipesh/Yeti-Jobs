import connect from "../db.js";
import tableDataFetch from "../utils/tableDataFetch.js";
import companySchema from "../Models/companies.models.js";
import { exactOptional } from "zod";
import dataFetch from "../utils/tableDataFetch.js";


export const getAllCompaniesList= async (req, res)=>{
  try {
    const message=await dataFetch('companies');
   return res.status(200).json(message)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export const getCompanyController= async(req, res) => {
  const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter Id For Get the element;"})
  }
  try {
    const {rows, rowCount}=await connect.query("select * from companies where uid=$1", [id]);
    if(!rowCount){
      return res.status(404).json({message: "Please Enter Correct Uid:"})
    }
    return res.status(200).json(rows[0])
  } catch (error) {
    return res.status(404).json({message: "Please Enter Correct Uid"})
  }
};


export const postCompanyController=async (req, res) => {
  const {name, description, website}=req?.body;
  const allList={name, description, website};
  const validateAllInput=companySchema.safeParse(allList);
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues.map(m=>m.message);
      return res.status(404).json(message)
  }
  try {
    const {rowCount}=await connect.query("select * from companies where name=$1", [name]);
    if(rowCount){
      return res.status(401).json({message: "Company is Already Registed"});
    }
    const {rows}=await connect.query("insert into companies (name, description, website) values ($1, $2, $3) returning *", [name, description, website])
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}


export const deleteCompanyController= async(req, res) => {
  const {id}=req.params;
    if(!id){
    return res.status(404).json({message: "Please Enter Id For Delete the element;"})
  }
  try {
    const {rows, rowCount}=await connect.query("delete from companies where uid=$1", [id]);

    if(!rowCount){
      return res.json({message: "Please Enter Correct Uid:"})
    }
    const data=await tableDataFetch('companies')
    return res.status(200).json({message: "Id Deleted Succssfully"})
  } catch (error) {
    return res.status(404).json({message: "Please Enter Correct Uid"})
  }
};


export const putCompanyController= async(req, res) => {
  const {id}=req.params;
  const {name, description, website}=req.body;
   if(!name || !description || !website){
    return res.status(404).json({message: "Please Enter all value"})
  }
    const allList={name, description, website};
  const validateAllInput=companySchema.safeParse(allList);
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues.map(m=>m.message);
      return res.status(404).json(message)
  }
  try {
    const {rows, rowCount}=await connect.query("update companies set name=$1, description=$2, website=$3 where uid=$4 returning *", [name, description, website, id])
    console.log(rowCount)
    if(!rowCount){
      return res.status(404).json({message: "Please Enter Id For Get a information"})
    }
    res.status(200).json(rows[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
};

export const getAllEmployeesList=async(req, res)=>{
  const {company_id}=req.params;
  try {
    const {rows}=await connect.query("select concat(fname, ' ', lname) as full_name, email, experience, education, role, resume_url, profile_pic_url from users where company_id=$1;", [company_id])
    return res.status(201).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export const companyStatsController=async (req, res)=>{
  const {id}=req.user;
  try {
    
    const {rows}=await connect.query(`select count(*) from applications a join jobs j on a.job_id = j.uid where j.company_id = $1;`, [id]);
    const {rows:rows1}=await connect.query("select count(*)  from applications where applied_at >= date_trunc('week', NOW());")
    const {count: totalApplications}=rows[0];
    const {count:  thisWeekapplications}=rows1[0];
    const {rows: totalStatus}=await connect.query("select status, round(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(),2) as percentage from applications group by status;")
    res.status(200).json({message: {totalApplications, thisWeekapplications, totalStatus}})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getAllJobsList=async (req, res)=>{
  const {id}=req.params;
  const {rows}=await connect.query("select title, description, salary, job_type, company_name, is_job_open, created_by from jobs where company_id=$1", [id])
  res.status(200).json({message: rows})
}


export const getallApplicationsList=async (req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query("select a.uid as application_id,  a.status, u.resume_url, j.title as job_title, j.total_job_views, u.uid as applicant_id from applications a join users u on a.user_id = u.uid join jobs j on a.job_id = j.uid where j.company_id=$1", [id])
   return res.status(200).json({message: rows})
  } catch (error) {
    console.log(error)
    res.status(401).json({message: error.message})
  }
}


export const companyDashBoard=async (req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query( `select *, count(*) over() as totalCount from jobs j join applications a on j.uid = a.job_id 
      where j.company_id = $1`,
      [id])
      return res.status(200).json({message: rows})
    } catch (error) {
      return res.status(501).json({message: error.message})
    }
}