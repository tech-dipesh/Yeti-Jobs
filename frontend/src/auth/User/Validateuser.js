const phoneNumberRegex = /^\+?(?:[0-9] ?){6,14}[0-9]$/;
import {allWeakPassword} from "../../Data/UserArray"

export const validatePassword=(password)=>{
  if (!password) return "Please Enter Password";
  if(password.length<7) return "Password Must be at least 7 digit Letter."
  if(password.length>15) return "Password Max can be a 15 digit Letter."
  if (!/[A-Z]/.test(password)) {
    return "Password must have least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must have at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must have at least one number.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must have at least one special character.";
  }
  if(allWeakPassword.includes(password)){
    return "Inserted Password is Commonly Used Use Another Password"
  }

  return null;
}
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return "Email is required.";
  }

  if (!email.includes("@")) {
    return "Email must contain an @ symbol.";
  }

  const [localPart, domainPart] = email.split("@");

  if (!localPart || localPart.length === 0) {
    return "Missing username before the @ symbol.";
  }

  if (!domainPart || !domainPart.includes(".")) {
    return "Domain part must include a extension like .com, .in, or .edu.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|edu|net|org)$/;
  if (!emailRegex.test(email)) {
    return "Please use a valid email address (supporting .com, .in, .edu, etc.).";
  }

  return null;
};

 const validateLogin = ({ email, password }) => {
  const emailCheck=validateEmail(email);
   if(emailCheck){
     return emailCheck;
   }
  const passwordCheck=validatePassword((password));
  if(passwordCheck){
     return passwordCheck
  }
  return null;
};

export const validateEditUser= ({fname, lname, education, email, number, experience, password}, type)=>{
  const validEducation=['Basic', 'Matrix', 'High School', 'Undergraduation', 'Postgraduation'];
  if(!fname){
    return "Please Enter a First Name"
  }
  if(fname.length<2){
    return "Please enter at least 2 digit firstname"
  }
  if(!lname){ 
    return "Please Enter a Last Name"
  }
  if(lname.length<2){
    return "Please enter at least 2 digit lastname"
  }
  if(!education){
    return "Please Enter a Education"
  }
  if(!validEducation.includes(education)){
    return "Please enter a Valid Education"
  }
  const emailCheck=validateEmail(email);
   if(emailCheck){
     return emailCheck;
   }

  if(type=='edit'){
    if(!experience){
      return "Please Enter a experience Years"
    }
    if(experience<0 || experience>35){
      return "Please Enter a valid experience Years."
    }
    if(!number){
      return "Please Enter a Phone Number"
    }
    if(!phoneNumberRegex.test(number)){
      return "Please Enter a Valid Internation Phone Number."
    }
  }
  else if(type=='signup'){
    const Err=validatePassword(password)
    if(Err){
      return Err;
    }
  }
  return null;
}
export default validateLogin;
