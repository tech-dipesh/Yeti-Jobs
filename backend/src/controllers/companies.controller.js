import connect from "../db.js";
import tableDataFetch from "../utils/Querytablehelper.js";
import companySchema from "../Models/companies.models.js";
import { supabase } from "../services/Supabase.js";

export const getAllCompaniesList= async (req, res)=>{
  try {
    const {rows}=await connect.query("select c.*, c.name, count(j.company_id) as job_count from companies c left join jobs j on j.company_id = c.uid group by c.uid, c.name;")
    // SELECT c.uid, c.name, COUNT(j.company_id) as job_count FROM companies c LEFT JOIN jobs j ON j.company_id = c.uid GROUP BY c.uid, c.name;
   return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export const getCompanyController= async(req, res) => {
  const {uid, role}=req?.user;
  const {id}=req.params;
  try {
    let rows;
    if(role=='guest'){
      const {rows:guestrows} = await connect.query("select c.*, (select exists(select 1 from user_companies_follows u where u.company_id=c.uid and u.user_id=$1) as is_followed) from companies c where c.uid=$2;", [uid, id]);
      rows=guestrows[0];
    }
    else{
      const {rows:nonguestrows}=await connect.query("select * from companies c where c.uid=$1;", [id]);
      rows=nonguestrows[0]
    }
    if(rows?.length==0){
      return res.status(404).json({message: "Please Enter a Valid Country Id."})
    }
    return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};


export const postCompanyController=async (req, res) => {
  const {name, description, website, location, founded_year}=req?.body;
  const validateAllInput=companySchema.safeParse(req?.body);
  const {originalname, buffer,mimetype}=req.file || {};
  try {
    if(!req.file){
      return res.json({messagee: "Please Upload a Company Logo"});
    }
    if(!validateAllInput.success){
        const message=validateAllInput.error.issues[0].message;
        return res.status(422).json({message})
    }
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
    return res.status(201).json({message: "New Company Added"});
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
    const { rowCount}=await connect.query("delete from companies where uid=$1", [id]);
    if(!rowCount){
      return res.status(404).json({message: "Please Enter Correct Uid:"})
    }
    return res.status(200).json({message: "Id Deleted Succssfully"})
  } catch (error) {
    return res.status(500).json({message: "Please Enter Correct Uid"})
  }
};


export const putCompanyController= async(req, res) => {
  const {id}=req.params;
  const {name, description, website, location, founded_year}=req.body;
  const validateAllInput=companySchema.safeParse(req?.body);
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues[0].message;
      return res.status(404).json({message})
  }
  try {
    const {rows:query}=await connect.query("select exists (select 1 from companies where uid=$1)", [id]);
    if(!query[0].exists){
      return res.status(201).json({message: "Please Enter a Valid Company Uid"})
    }
    const {rows}=await connect.query("update companies set name=$1, description=$2, website=$3, location=$4, founded_year=$5 where uid=$6 returning *", [name, description, website, location, founded_year,id])
    return res.status(200).json({message: rows[0]})
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
    const {rows}=await connect.query("select j.uid, j.title, j.expired_at, j.experience_years, j.total_job_views, j.description, j.salary, j.job_type, j.is_job_open, j.created_by, c.name as company_name from jobs j left join companies c on c.uid=j.company_id where company_id=$1", [id])
    return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


export const getallApplicationsList=async (req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query("select a.uid as application_id,  a.status, a.cover_letter, a.notice_period, a.expected_salary, a.why_hire, u.resume_url, u.phone_number, j.title as job_title, j.total_job_views, u.uid as applicant_id, j.uid as job_id from applications a join users u on a.user_id = u.uid join jobs j on a.job_id = j.uid where j.company_id=$1", [id])
   return res.status(200).json({message: rows})
  } catch (error) {
   return res.status(500).json({message: error.message})
  }
}


export const companyDashBoard=async (req, res)=>{
  const {company_id}=req.user;
  try {
    const {rows}=await connect.query(`select count(distinct j.uid) as total_jobs, count(distinct uc.company_id) as total_followers, count(distinct a.uid) as total_applications, count(distinct case when j.is_job_open ='active'then j.uid end) as open_jobs, count(distinct u.uid) as total_employees from jobs j left join applications a on j.uid = a.job_id left join users u on u.company_id = j.company_id inner join user_companies_follows uc on uc.company_id=$1  where j.company_id = $1;`,[company_id])
    return res.status(200).json({message: rows[0]})
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
}

export const getAllCompaniesFollowers=async(req, res)=>{
  const {company_id}=req?.user;
  try {
    const {rows}=await connect.query("select u.* from users u left join user_companies_follows uc on uc.user_id=u.uid where uc.company_id=$1", [company_id])
    return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const followCompany=async(req, res)=>{
  const {id: company_id}=req?.params
  const {uid: user_id}=req?.user
  try {
    const {rows}=await connect.query("select exists(select 1 from user_companies_follows where user_id=$1 and company_id=$2)", [user_id, company_id])
    if(rows[0].exists){
        return res.status(201).json({message: "Can't Follow a Single Company Multiple Times By User"})
    }
    await connect.query("insert into user_companies_follows (user_id, company_id) values ($1, $2)", [user_id, company_id])
    return res.status(201).json({message: "Succssfully Followed To Company"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export const unFollowCompany=async(req, res)=>{
  const {id: company_id}=req?.params
  const {uid: user_id}=req?.user
  try {
    const {rows}=await connect.query("select exists(select 1 from user_companies_follows where user_id=$1 and company_id=$2);", [user_id, company_id]);
    if(!rows[0].exists){
      return res.status(201).json({message: "Invalid Uid or You've Not Followed Yet"});
    }
    await connect.query("delete from user_companies_follows where user_id=$1 and company_id=$2", [user_id, company_id])
    return res.status(201).json({message: "Succssfully Unfollowed a Company"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}