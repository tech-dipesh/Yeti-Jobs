const validateFunUid=(value)=>{
   const regex=/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  const checkCorrect=regex.test(value);
  if(!checkCorrect){
    return "Please Enter Correct Id:"
  }
  return null
}
export default validateFunUid;