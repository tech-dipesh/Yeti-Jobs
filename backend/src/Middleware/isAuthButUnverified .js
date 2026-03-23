import jwt from "jsonwebtoken"
import "dotenv/config"

const isUnverifiedUser = async(req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'User is Not Logged In.' });
  try {
    req.user = jwt.verify(token, process.env.JSON_SECRET_KEY); 
    if(req.user.isVerified==true){
      return res.status(200).json({message: "User is Already Verified."})
    }
    next();
  }
  catch{
    return res.status(500).json({message: "invalid Please Try Again a Signup."})
  }
};

export default isUnverifiedUser;