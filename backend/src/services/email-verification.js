import nodemailer from "nodemailer"
import generateRandomNumber from "../utils/generateRandom6DigitNumber.js";
import connect from "../db.js"
import {readFileSync} from "fs"
import { join } from "path";
const email=process.env.NODEMAILER_MY_EMAIL;

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_MY_HOST,
  port: 587,
  secure: false, 
  auth: {
    user:email,
    pass: process.env.NODEMAILER_MY_PASSWORD,
  },
});

const sendMail=async(uid, firstName, lastName, userEmail, type)=>{
  const random6DigitNumber=generateRandomNumber();
  const templatePath=join(process.cwd(), 'src', 'services', 'template.html');
  let readFile = readFileSync(templatePath, 'utf-8');
  readFile=readFile.replace("{{name}}", `${firstName} ${lastName}`)
  readFile=readFile.replace("{{otp}}", random6DigitNumber)
  readFile=readFile.replaceAll("{{type}}", type=='verify'? "Email Verification":"Forget Password")
  readFile=readFile.replaceAll("{{belowmethod}}", type=='verify'? "Signup":"Reset Password")
  const Title=`Please Verify Your Email For ${type=='verify'?'Login':'For Forget Passowrd'}'`
  try {
    await transporter.sendMail({
    from: `${Title} <${email}>`,
    to: userEmail,
    subject: `Please ${type} Your Email!`,
    html: readFile,
  });
  {type=='verify'?
    await connect.query("insert into email_verified(user_id, verified_type, verified_code)  values($1, 'verify_mail', $2)",[uid, random6DigitNumber]):
    await connect.query("insert into email_verified(user_id, verified_type, verified_code)  values($1, 'forget_password', $2)",[uid, random6DigitNumber])
  }
} catch (error) {
  console.log(error)
  return error;
}
}
export default sendMail;