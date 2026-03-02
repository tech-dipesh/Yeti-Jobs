const validateJobs=({title, description, job_type, skills, salary}, oldValue=null)=>{
  const numregex=/^[1-9]\\d*$/
  if(!title){
    return "Please Enter the Title."
  }
  if(!description){
    return "Please Enter the Description"
  }
  if(!job_type){
    return "Please Enter the Job Type."
  }
  if(!skills){
    return "Please Enter the Skills"
  }
  if(!salary){
    return "Please Enter the Salary."
  }

  if(!Number.isFinite(+salary)){
    return "Please Enter only numeric value on."
  }
  if(title.length<2 || title.length>25){
    return "Title Can't be more than a 25 and less than 2 letter."
  }
  if(description.length<25 || description.length>250){
    return "description Can't be more than a 250 letter and less than 25 letter."
  }
  if(salary<10000 || salary>2500000){
    return "Please Enter a valid salary Range."
  } 
  if(oldValue){
    const checkWhetherSameOrNot=oldValue.title==title && oldValue.description==description && oldValue.job_type==job_type &&  oldValue?.skills==skills && oldValue.salary==salary
    if(checkWhetherSameOrNot){
      return "Please Change Something for update."
    }
  }
  return null;
}
export default validateJobs;