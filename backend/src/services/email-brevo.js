import "dotenv/config"
import { join } from "node:path";
import {readFileSync} from "node:fs"
import generateRandomNumber from "../utils/generateRandom6DigitNumber.js";
import { connect } from "../db.js";
const brevoApiUrl = "https://api.brevo.com/v3/smtp/email"
import disposableDomains from "disposable-email-domains" with {type: "json"}

const fromEmail = process.env.BREVO_FROM_EMAIL ?? "no-reply@daigo.app"
export async function sendEmail({uid, firstName, lastName, userEmail, type} ) {
  const random6DigitNumber=generateRandomNumber();
  const templatePath=join(process.cwd(), 'src', 'services', 'template.html');
  let readFile = readFileSync(templatePath, 'utf-8');
  readFile=readFile.replace("{{name}}", `${firstName} ${lastName}`)
  readFile=readFile.replace("{{otp}}", random6DigitNumber)
  readFile=readFile.replaceAll("{{type}}", type=='verify'? "Email Verification":"Forget Password")
  readFile=readFile.replaceAll("{{belowmethod}}", type=='verify'? "Signup":"Reset Password")
  const vertype = type === 'verify' ? 'verify_mail' : 'forget_password';
   await connect.query( "insert into email_verified(user_id, verified_type, verified_code) values($1, $2, $3)", [uid, vertype, random6DigitNumber] );
   console.log("usermeial", userEmail);
  const response = await fetch(brevoApiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": process.env.BREVO_API ?? "",
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: "Yeti-Jobs" },
      to: [{ email: userEmail }],
      subject: `Please ${type} Your Email!`,
      htmlContent: readFile,
    }),
  })
  console.log("response", response);
  const body=await response.json()
  console.log("body", body);
  if (!response.ok) {
    throw new Error(`Brevo send failed: ${response.status} ${await response.text()}`)
  }
}

export async function  sendMail(params ) {
  try {
    await sendEmail(params)
  } catch (error) {
    console.error(error)
  }
}


export const isTempEmail = (email) => {
  const domain = email.split("@")[1]?.toLowerCase()
  if (domain === 'moravita.com') return true;
  return disposableDomains.includes(domain)
}

export default sendMail;