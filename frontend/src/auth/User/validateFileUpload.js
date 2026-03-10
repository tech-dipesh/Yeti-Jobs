const validateFileUpload= (value, content)=>{
  if(!value.name){
    return "Please Upload a file."
  }
  if(value.type!=content){
    return `Only ${content} is allowed`
  }
  if(value.size>1500){
    return "file Can't be more than 1.5mb."
  }
  return null;
}
export default validateFileUpload;