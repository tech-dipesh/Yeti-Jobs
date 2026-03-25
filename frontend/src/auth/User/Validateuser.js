const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 const validateLogin = ({ email, password }) => {
  if (!email) return "Please Enter Emails";
  if (!password) return "Please Enter Password";
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  if(password.length<6) return "Password Must be at least 6 digit Letter."
  if(password.length>25) return "Password Max can be a 25 digit Letter."
  if (!emailRegex.test(email)) return "Email Format is Invalid.";
  if (!passwordRegex.test(password)) return "Invalid password format.";
  return null;
};

export const validateEditUser= ({fname, lname, education, email, experience, password}, type)=>{
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
  if(!email){
    return "Please Enter a Email"
  }
  if (!emailRegex.test(email)) return "Invalid email format.";
  if(type=='edit'){
    if(!experience){
      return "Please Enter a experience Years"
    }
    if(experience<0 || experience>35){
      return "Please Enter a valid experience Years."
    }
  }
  else if(type=='signup'){
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!password){
      return "Please Enter a Password";
    }
    if(!passwordRegex.test(password)){
      return "Invalid password format.";
    }      
  }
  return null;
}
export default validateLogin;