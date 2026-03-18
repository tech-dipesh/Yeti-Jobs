import nodemailer from "nodemailer"
import generateRandomNumber from "../utils/generateRandom6DigitNumber.js";
import connect from "../db.js"
import {readFileSync} from "fs"
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

// const content=`<div><h1>Dear ${firstName} ${lastName} Thanks for ${type=='verify'?'Signup': 'Forget'} on our platform</h1><h2>Below is your verification code!</h2><h3>${random6DigitNumber}</h3><p>Remember This Verification will be expired after 15 minutes</p>${type=='reset'?"<h1>If you've not try a forget password you can skip it</h1>":''}</div>`
const sendMail=async(uid, firstName, lastName, userEmail, type)=>{
  const random6DigitNumber=generateRandomNumber();
  let readFile=readFileSync("services/template.html", "utf-8")
  readFile=readFile.replace("{{name}}", `${firstName}${lastName}`)
  readFile=readFile.replace("{{otp}}", random6DigitNumber)
  readFile=readFile.replaceAll("{{type}}", type=='verify'? "Email Verification":"Forget Password")
  readFile=readFile.replaceAll("{{belowmethod}}", type=='verify'? "Signup":"Reset Password")
  try {
    const info = await transporter.sendMail({
    from: `${Title} <${email}>`,
    to: userEmail,
    subject: `Please ${type} Your Email!}`,
    html: content,
  });
  {type=='verify'?
    await connect.query("insert into email_verified(user_id, verified_type, verified_code)  values($1, 'verify_mail', $2)",[uid, random6DigitNumber]):
    await connect.query("insert into email_verified(user_id, verified_type, verified_code)  values($1, 'forget_password', $2)",[uid, random6DigitNumber])
  }
} catch (error) {
  return error;
}
}
export default sendMail;