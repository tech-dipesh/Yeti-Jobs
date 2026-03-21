import validateFileUpload from "./User/validateFileUpload";

const isValidWebsite=(val)=>{
  try {
    new URL(val)
    return true;
  } catch {
    return false;
  }
}

const validateCompany= ({name, description, website, location, founded_year, company_logo})=>{
  if(!name){
    return "Please Enter the Name."
  }
  if(!description){
    return "Please Enter the Description."
  }
  if(!website){
    return "Please Enter the Website."
  }
  if(!founded_year){
    return "Please Enter the Founded Year."
  }
  if(founded_year>2026){
    return "Founded Year Can't be a future Date."
  }
  if(founded_year<1900){
    return "Founded Year Can't be a Before 1900."
  }
  if(!location){
    return "Please Enter the Location of Company."
  }
  if(name.length<2 || name.length>25){
    return "Name Can't be more than a 25 and less than 2 letter."
  }
  if(description.length<25 || description.length>250){
    return "Description Can't be more than a 250 letter and less than 25 letter."
  }
  if(website.length<3 || website.length>20){
    return "website Can't be more than a 20 letter and less than 3 letter."
  }
  if(!isValidWebsite(website)){
    return "Please Enter Website in correct format."
  }
  const err=validateFileUpload(company_logo, 'image');
  if(err){
    return err;
  }
  return null;
}


export default validateCompany;