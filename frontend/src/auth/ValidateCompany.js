const isValidWebsite=(val)=>{
  try {
    new URL(val)
    return true;
  } catch (error) {
    return false;
  }
}

const validateCompany= ({name, description, website})=>{
  if(!name){
    return "Please Enter the Name."
  }
  if(!description){
    return "Please Enter the Description."
  }
  if(!website){
    return "Please Enter the Website."
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
  console.log(isValidWebsite(website))
  if(!isValidWebsite(website)){
    return "Please Enter Website in correct format."
  }
  return null;
}


export default validateCompany;