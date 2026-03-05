const validateText= (value)=>{
  if(!value) return "Please Enter a Text."
  const regex=/^[a-zA-Z]+$/
  if(value.length<3){
    return `${value} must be 3 leter.`
  }
  if(value.length>25) return `${value} can't be more than 25 letter`
  if(regex.test(value)==false){
    return "Please Only enter the Text"
  }
  return null;
}

export default validateText;