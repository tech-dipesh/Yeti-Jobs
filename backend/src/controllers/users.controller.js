import bcrypt from "bcryptjs";
import connect from "../db.js";
import tableDataFetch from "../utils/Querytablehelper.js";
import userSchema, { loginUserSchema, updateUserSchema } from "../Models/users.models.js";
import sendMail from "../services/email-verification.js";
import isUserVerifiedEmail from "../utils/isUserEmailVerified.js";
import dns from "dns/promises"
import VerifyJwt from "../services/verifyJwt.js";
export const getAllUserController= async (req, res)=>{
  try {
    const {rows}=await connect.query("select uid as userId, fname as firstName, lname as lastName, education, email, role, resume_url, profile_pic_url, skills, experience from users")
    return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(201).json({message: error.message})
  }
}

export const sendUserLoggedInStatus=async (req, res)=>{
  return res.status(200).json({message: req.user})
}

export const getloginUserController= async (req, res) => {
  const {email, password}=req?.body || {};
  try {
    const validateuser=loginUserSchema.safeParse(req?.body);
    if(!validateuser.success){
      const message=validateuser.error.issues[0].message;
      return res.status(422).json({message: message})
    }
    const {rows}= await connect.query("select email, password, uid, company_id, role from users where email=$1", [email]);
    if(rows.length==0){
      return res.status(401).json({message: "Invalid Email Id."});
    }
    const saltPassword=await bcrypt.compare(password, rows[0].password);
    if(!saltPassword){
      return res.status(404).json({message: "Please Enter a Correct Password."})
    }
    let {uid, role, company_id=null}=rows[0];
    if(!role)role='guest'
    const userVerified=await isUserVerifiedEmail(uid)
   const content={uid, role, company_id, userVerified};
   VerifyJwt(res, content)
    return res.status(200).json({message: "Succssfully Logged In"});
  } catch (error) {
    return res.status(500).json({message: error.message}) 
  }
};


export const getParticularUserController=  async (req, res) => {
  const {id, company_id}=req.params;
  try {
    const { rows } = await connect.query("SELECT uid, profile_pic_url, fname, education, email, experience, resume_url, skills, company_id IS NOT NULL AS is_employee, uid AS job_uid FROM users WHERE uid =$1", [id]);
    if(rows.length==0) return res.status(404).json({message: "Please Enter Correct Uid"})
    return res.status(200).json({message: rows[0]});
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};




export const postSignupUserController= async (req, res) => {
  try {
    const { fname, lname, education, email, password} = req.body;
    const allUser={fname, lname, education, email, password}
    const validateuser=userSchema.safeParse(allUser);
    if(!validateuser.success){
      const message=validateuser.error.issues[0].message;
      return res.status(422).json({message: message})
    }
    const domain = email.split('@')[1];
    try {
      const checkDomainExistance = await dns.resolveMx(domain);
      if (!checkDomainExistance || checkDomainExistance.length === 0) {
        return res.status(422).json({ message: "Invalid email domain: No mail servers found." });
      }
    } catch (dnsError) {
      return res.status(422).json({ message: `The email domain '${domain}' does not exist or is invalid.` });
    }
    
    const {rows: query}=await connect.query("select exists(select 1 from users where email=$1)", [email]);
    if(query[0].exists){
      return res.status(401).json({message: `The User with same email already exist.`})
    }
    const hashPassword=await bcrypt.hash(password, 12);
    const {rows}=await connect.query(
      "insert into users (fname, lname, education, email, password) values ($1, $2, $3, $4, $5) returning *",
      [fname, lname, education, email, hashPassword],
    );
    const {uid, role, fname:firstName, lname:lastName, email:userEmail}=rows[0]
     sendMail(uid, firstName, lastName, userEmail, 'verify')
    const content={uid, role, company_id:null, userVerified: false};
    VerifyJwt(res, content)
    return res.status(201).json({message: "Succssfully Signed Up, Verification Code have been sent to your mail"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteUserController= async (req, res) => {
  const { id } = req.params;
  try {
    await connect.query("delete from users where uid=$1", [id]);
    const {rows}=await tableDataFetch('users')
    return res.status(200).json({message: rows});
  } catch (error) {
   return res.status(500).json({message: error.message});
  }
};


export const addUserSkills=async (req, res)=>{
  const {uid}=req.user;
  const {skills}=req.body;
  if(!skills){
    return res.status(201).json({message: "Please Enter Skills."})
  }
  try {
    
    const {rows: ifExist, rowCount}=await connect.query("select skills from users where uid=$1", [uid])
    const {skills: doesSkillExist}=ifExist[0];
    if(doesSkillExist!=null && doesSkillExist.includes(skills)){
      return res.status(401).status(200).json({message: "Skills Already Exist"});
    }
    const {rows}=await connect.query("update users set skills=array_append(skills, $1) where uid=$2 returning *", [skills, uid])
   return res.status(201).send({message: rows[0]})
  } catch (error) {
    return res.status(501).json({message: error.message})
  }
}

export const putUserController= async(req, res) => {
   const {id}=req.params;
  const {fname, lname, education, email }=req.body;
    const validateuser=updateUserSchema.safeParse(req?.body);
  if(!validateuser.success){
    const message=validateuser.error.issues[0].message;
    return res.status(422).json({message});
  }
  try {
    const {rows:query}=await connect.query("select exists(select 1 from users where uid=$1)", [id]);
   if(!query[0].exists){
    return res.status(201).json({message: "Invalid User Id"})
   }
    const {rows}=await connect.query("update users set fname=$1, lname=$2, education=$3, email=$4 where uid=$5 returning *", [fname, lname, education, email, id])
   return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};



// const ALLOWED_BODY = ['fname', 'lname', 'education', 'email', 'password'];


export const patchUserController= async(req, res)=>{
  const {id}=req.params;
  if(!id){
    return res.status(422).json({message: "Please Enter the Id"})
  }
  try {
    const {rows: query}=await connect.query("select exists(select 1 from users where uid=$1)", [id])
    if(!query[0].exists){
      return res.status(404).json({message: "Invalid User Id or You're not a owner"})
    }
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClause = fields.map((f, i) => `${f} = $${i + 1}`)
    const length=fields.length+1;
    await connect.query(`UPDATE users SET ${setClause} WHERE uid = $${length}`, [...values, id]);
    const {rows}=await connect.query(`select * from users WHERE uid=$1`, [id]);
    return res.status(201).json({message: rows[0]})
  } catch (error) {
    return res.status(502).json({message: error.message})
  }
}


export const litOfAllFollowingCompanies=async(req, res)=>{
  const {uid}=req?.user;
  try {
    const {rows, rowCount}=await connect.query("select c.* from companies c left join user_companies_follows u on u.company_id=c.uid where u.user_id=$1", [uid])
    if(rowCount==0){
      return res.status(204).json({message: "YOu've Not Following Any Company As Of Now"})
    }
    return res.status(200).json({message: rows})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


export const userLoggedOutcontroller=async(req, res)=>{
  const httpOptions={
  httpOnly: true,
  secure: true,
  sameSite: "none"
  }
  res.clearCookie("token", httpOptions);
  return res.status(200).json({message: 'Logged Out Succssfully'});
}