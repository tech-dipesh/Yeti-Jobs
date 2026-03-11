import "dotenv/config"
import jwt from "jsonwebtoken"

const alreadyLoggedIn = async(req, res, next) => {
  const {token}=req.cookies ?? {}
  if(token){
    const decode=jwt.verify(token, process.env.JSON_SECRET_KEY);
    if(decode){
      return res.status(203).json({message: "user Is Already Logged In."})
    }
  }
  next();
};

export default alreadyLoggedIn;