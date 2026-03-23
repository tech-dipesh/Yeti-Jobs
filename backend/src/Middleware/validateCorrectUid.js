export default function validateCorrectUid(req, res, next){
  const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter a Id"})
  }
  const regex=/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  const checkCorrect=regex.test(id);
  if(!checkCorrect){
    return res.status(400).json({message: "Please Enter Correct Id:"})
  }
  next()
}