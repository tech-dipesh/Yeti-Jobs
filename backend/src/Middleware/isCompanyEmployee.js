import jwt from "jsonwebtoken"
import connect from "../db.js"
const isCompanyEmployee = async (req, res, next) => {
  const {role}=req?.user;
  if(!role || role=='guest'){
    return res.status(403).json({message: "You're not a employee of the company"});
  }
  next();
};


export default isCompanyEmployee;