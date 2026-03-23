import jwt from "jsonwebtoken"
import connect from "../db.js"
const isCompanyEmployee = async (req, res, next) => {
  const {role}=req.user;
  // const {rows}=await connect.query("select exists ( select 1 from users where uid = $1 and company_id = $2);", [uid, company_id])

  if(role=='guest'){
    return res.status(403).json({message: "You're not a employee of the company"});
  }
  
  next();
};


export default isCompanyEmployee;