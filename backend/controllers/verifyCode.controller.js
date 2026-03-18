import connect from "../db.js";
import jwt from "jsonwebtoken"
import sendMail from "../services/email-verification.js";
import userSchema from "../Models/users.models.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";
import bcrypt from "bcryptjs";
import currentDate from "../utils/currentDateFormat.js";
import VerifyJwt from "../services/verifyJwt.js";
async function verifyEmailConfirmation(req, res) {
const {uid, role, company_id}=req.user;
  try {
    const {code}=req.body;
    if(!code){
      return res.status(404).json({message: "Please Enter Verification Code"})
    }
  const {rows} =await connect.query("select e.verified_code, e.is_verified, e.expired_at, e.uid, e.user_id, u.email from email_verified e inner join users u on u.uid=e.user_id where e.user_id=$1  order by e.created_at desc limit 1", [uid])
  const {verified_code, is_verified:userVerified, expired_at}=rows[0];
  if(verified_code!=code){
    return res.status(422).json({message: "Please Enter Correct Code"})
  }
  if(userVerified==true){
      return res.status(401).json({message: "Token Already In Used, You've Already Logged In."})
  }
 
  if(expired_at<currentDate){
      return res.status(403).json({message: "Token is Expired Please Generate new Token"})
  }
  const content={uid, role, company_id, userVerified:true};
  VerifyJwt(res, content)
  await connect.query(`update email_verified set is_verified=true where user_id=$1 and verified_code=$2 and verified_type='verify_mail'`, [uid, code]);
  return res.json({message: "Verification Code Have Been Succssfully Verified"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: error.message})
  }
}



export const resendVerificationCode=async (req, res)=>{
  const {uid}=req.user;
  if(!uid){
    return res.status(401).json({message: "Please First Logged In"});
  }
  try {
    const {rowCount, rows:output}=await connect.query("select is_verified from email_verified where is_verified=true and user_id=$1", [uid])
    console.log('row count', rowCount, 'output', output)
    if(rowCount>0){
      return res.status(403).json({message: "You've Already Verified Your Code."});
    }
    const {rows}=await connect.query("select fname, lname, email from users where uid=$1", [uid])
    const {fname, lname, email}=rows[0];
     await sendMail(uid, fname, lname, email, 'verify');
   return res.status(201).json({message: 'Resend Verification Code Have Been sent to your mail'})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({message: error.message})
  }
}


export const forgetEmailPassword=async (req,res)=>{
  const {email}=req.body;
  if(!email){
    return res.status(400).json({message: "Please Enter Email"});
  }
  try {
    const {rows, rowCount}=await connect.query("select fname, lname, uid from users where email=$1", [email])
    if(rowCount===0){
      return res.status(422).json({message: "Email Doesnt Exist."})
    }
    const {fname, lname, uid}=rows[0];
    sendMail(uid, fname, lname, email, 'forget')
    return res.status(201).json({message: 'The password Have Beeen forget you can check your email for verify your code.'})
  } catch (error) {
    (error)
    return res.status(401).json({message: error.message})
  }
}

export const verifyForgetPassword=async (req,res)=>{
  const {code, newpassword, email}=req.body;
  if(!code || !newpassword || !email){
    return res.status(400).json({message: "Please Enter Your Code For Verification also a new passwoord and email"})
  }
  try {
    const {rows:isEmail}=await connect.query("select exists(select 1 from users where email=$1)", [email]);
    if(!isEmail[0].exists){
      return res.status(422).json({message: "Invalid Email Please First Logged in."})
    }
    const {rows: rowList, rowCount}=await connect.query("select e.is_verified, e.expired_at, u.uid from users u inner join email_verified e on e.user_id=u.uid where u.email=$1 and e.verified_code=$2 order by e.expired_at desc limit 1;", [email, code])
    const {uid}=rowList[0]
    if(rowCount==0){
      return res.status(400).json({message: "Please Enter Correct Code."})
    }
    const {is_verified, expired_at}=rowList[0] || {};
    if(is_verified==true){
      return res.status(403).json({message: "You've already Used a Token."})
    }
    if(expired_at<currentDate){
      return res.status(403).json({message: "Token is Expired Please Generate new Token"})
    }
    const hashPassword=await bcrypt.hash(newpassword, 12)
   const {rows}= await connect.query("update users set password=$1 where email=$2 returning fname, lname", [hashPassword, email])
    await connect.query("update email_verified set is_verified=true where uid=$1 and verified_code=$2 and verified_type='forget_password'", [uid, code])
    return res.status(201).json({message: `You: ${rows[0].fname}, ${rows[0].lname} Password have been updated`})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  }
  export default verifyEmailConfirmation;