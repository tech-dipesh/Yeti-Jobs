const isOwnerMiddleware=async (req, res, next)=>{
  const {id}=req.params;
  const {uid, role}=req.user;
  if(id!=uid && role!='admin'){
      return res.status(401).json({message: "You're not a Owner of This Route."})
  }
  next()
}
export default isOwnerMiddleware;