const validateText= (value)=>{
  if(!value) {
    return "Please Enter a Only Text."
  }
  const regex=/^[a-zA-Z\s]+$/
  if(value.length<3){
    return `${value} must be 3 leter.`
  }
  if(value.length>25) return `${value} can't be more than 25 letter`
  if(!regex.test(value)){
    return "Please Dont' Enter Any Number or Special Charachter."
  }
  return null;
}

export default validateText;