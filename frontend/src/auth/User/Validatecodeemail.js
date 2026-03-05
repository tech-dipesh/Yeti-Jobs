 const validateCode = (verifyCode) => {
  if(!verifyCode) return "Please Enter a code"
  if(verifyCode.length<6) return "Please Enter At Least 6 Digit Code"
  if(verifyCode.length>6) return "Please Enter Only 6 Digit Code"
  const regex= /^\d+$/;
  if(!regex.test(verifyCode)){
    return "Only Number is allowed"
  }
  return null;
};

export const validateEmail=(email)=>{
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!email){
    return "Please Enter a Email"
  }
  if (!emailRegex.test(email)) return "Invalid email format.";
  return null;
}

export const validatePassword=(password)=>{
  if (!password) return "Please Enter Password";
  if(password.length<6) return "Password Must be at least 6 digit Letter."
  if(password.length>25) return "Password Max can be a 25 digit Letter."
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  if (!passwordRegex.test(password)) return "Invalid password format.";

}
export default validateCode;  