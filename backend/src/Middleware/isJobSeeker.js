const isJobSeeker= (req, res, next)=>{
  const {role}=req?.user;
  if(role!='guest'){
    return res.status(403).json({message: "Recruiter or Admin Can't Perform a User Action"})
  }
  next()
}

export default isJobSeeker;