const isJobSeeker= (req, res, next)=>{
  if(req.user.company_id){
    return res.status(403).json({message: "Recruiter Can't Perform a User Action"})
  }
  next()
}

export default isJobSeeker;