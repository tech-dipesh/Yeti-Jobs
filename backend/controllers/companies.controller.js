import connect from "../db.js";
import tableDataFetch from "../utils/tableDataFetch.js";
import companySchema from "../Models/companies.models.js";
import { supabase } from "../services/Supabase.js";

export const getAllCompaniesList= async (req, res)=>{
  try {
    const {rows}=await connect.query("select c.*, count(j.company_id) as count from companies c left join jobs j on j.company_id=c.uid group by c.uid;")
   return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export const getCompanyController= async(req, res) => {
  const {id}=req.params;
  try {
    const {rows, rowCount}=await connect.query("select * from companies where uid=$1", [id]);
    return res.status(200).json(rows[0])
  } catch (error) {
    return res.status(404).json({message: "Please Enter Correct Uid"})
  }
};


export const postCompanyController=async (req, res) => {
  const {name, description, website, location, founded_year}=req?.body;
  const allList={name, description, website, location, founded_year};
  const validateAllInput=companySchema.safeParse(allList);
  const {originalname, buffer,mimetype}=req.file || {};
  if(!originalname){
    return "Please Enter a Company Logo";
  }
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues.map(m=>m.message);
      return res.status(422).json({message: message[0]})
  }
  try {
    const {rows:isExist}=await connect.query("select exists(select 1 from companies where name = lower($1)) from companies limit 1;", [name]);
    if(isExist[0].exists){
      return res.status(401).json({message: "Company is Already Registed"});
    }
    const randomUUID=crypto.randomUUID()
    const {data, error}=await supabase.storage.from('company').upload(`/${randomUUID}-${originalname}`, buffer, {contentType: mimetype})
    if(error){
      return res.status(502).json({message: error.message})
    }
    const {data:getUrl}= supabase.storage.from('company').getPublicUrl(data.path)
    const {rows}=await connect.query("insert into companies (name, description, website, location, founded_year, logo_url) values ($1, $2, $3, $4, $5, $6) returning *", [name, description, website, location, founded_year, getUrl.publicUrl])
  // return res.status(201).json({message: 'hello'})
    return res.status(201).json(rows[0]);
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
  const {name, description, website, location, founded_year}=req.body;
   if(!name || !description || !website || !location || !founded_year){
    return res.status(404).json({message: "Please Enter all value"})
  }
    const allList={name, description, website, location, founded_year};
  const validateAllInput=companySchema.safeParse(allList);
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues.map(m=>m.message);
      return res.status(404).json(message)
  }
  try {
    const {rows, rowCount}=await connect.query("update companies set name=$1, description=$2, website=$3, location=$4, founded_year=$5 where uid=$6 returning *", [name, description, website, location, founded_year,id])
    if(!rowCount){
      return res.status(404).json({message: "Please Enter Id For Get a information"})
    }
    return res.status(200).json(rows[0])
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const getAllEmployeesList=async(req, res)=>{
  const {company_id}=req.user;
  try {
    const {rows}=await connect.query("select concat(fname, ' ', lname) as full_name, email, experience, education, role, resume_url, profile_pic_url from users where company_id=$1;", [company_id])
    return res.status(201).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export const companyStatsController=async (req, res)=>{
  const {id, company_id}=req.user;
  try {
    const {rows}=await connect.query(`select count(*) from applications a join jobs j on a.job_id = j.uid where j.company_id = $1;`, [company_id]);
    const {rows:rows1}=await connect.query("select count(*)  from applications a join jobs j on a.job_id=j.uid where applied_at >= date_trunc('week', NOW());", [])
    const {count: allapplications}=rows[0];
    const {count:  thisweekapplications}=rows1[0];
    const {rows: totalstatus}=await connect.query("select status, round(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(),2) as percentage from applications a join jobs j on j.uid=a.job_id where j.company_id=$1  group by status;", [company_id])
    res.status(200).json({message: {allapplications, thisweekapplications, totalstatus}})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getAllJobsList=async (req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query("select uid, title, experience_years, total_job_views, description, salary, job_type, is_job_open, created_by from jobs where company_id=$1", [id])
    res.status(200).json({message: rows})
  } catch (error) {
    
    return res.status(500).json({message: error.message})
  }
}


export const getallApplicationsList=async (req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query("select a.uid as application_id,  a.status, u.resume_url, j.title as job_title, j.total_job_views, u.uid as applicant_id, j.uid as job_id from applications a join users u on a.user_id = u.uid join jobs j on a.job_id = j.uid where j.company_id=$1", [id])
   return res.status(200).json({message: rows})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}


export const companyDashBoard=async (req, res)=>{
  const {company_id}=req.user;
  try {
    const {rows}=await connect.query( `select count(distinct j.uid) as total_jobs, count(distinct a.uid) as total_applications, count(distinct case when j.is_job_open ='active'then j.uid end) as open_jobs, count(distinct u.uid) as total_employees from jobs j left join applications a on j.uid = a.job_id left join users u on u.company_id = j.company_id where j.company_id = $1;`,
      [company_id])
    
      return res.status(200).json({message: rows[0]})
    } catch (error) {
      return res.status(501).json({message: error.message})
    }
}
