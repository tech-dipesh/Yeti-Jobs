import jwt from "jsonwebtoken"
import connect from "../db.js"
const isCompanyEmployee = async (req, res, next) => {
  const {role, company_id}=req?.user;
  if(role=='admin'){
    next()
  }
  if(role!=='recruiter'){
    return res.status(403).json({message: "You're not a employee of the company"});
  }
  if (!company_id) {
    return res.status(403).json({ message: "You're not associated with the any company." });
  }
  next();
};

export default isCompanyEmployee;