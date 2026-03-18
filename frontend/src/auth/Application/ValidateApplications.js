const ValidateApplication = (output) => {
  const {cover_letter, expected_salary, notice_period, why_hire}=output ?? {};

  if (!expected_salary) {
    return "Please Enter Your Expected Salary";
  }
  if (!notice_period) {
    return "Please Enter Notice Period.";
  }
  if (cover_letter && cover_letter.length < 10) {
    return "Cover Letter can be below a 10 Character";
  }
  if (cover_letter && cover_letter.length > 250) {
    return "Cover Letter can't be above a 250 Character";
  }
  if (why_hire && why_hire.length < 10) {
    return "Why Hire can be below a 10 Character";
  }
  if (why_hire && why_hire.length > 250) {
    return "Why Hire can't be above a 250 Character";
  }

  const regex = /^\d+$/;
  if (!regex.test(expected_salary)) {
    return "Only Number on Expected Salary is allowed";
  }
  if (!regex.test(notice_period)) {
    return "Only Number on Notice Period is allowed";
  }
  if(expected_salary>1000000){
    return "Expected Salary Can't be Above 1000000"
  }
  if(expected_salary<5000){
    return "Expected Salary Can't be Below 5000"
  }
  if(notice_period<0){
    return "Notice Period Can't be Below 0 days"
  }
  if(notice_period>90){
    return "Notice Period Can't be Above 90 days"
  }
  
  return null;
};
export default ValidateApplication;
