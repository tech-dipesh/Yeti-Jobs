import connect from "../db.js";

const allTableList=['users', 'jobs', 'companies', 'applications', 'saved_jobs', 'email_verified', 'user_companies_follows']
const dataFetch = async (name) => {
  if(!allTableList.includes(name)){
    throw new Error("Invalid Table Name:")
  }
  const { rows } = await connect.query(`select * from ${name}`);
  return rows;
};
export const allowAllSearchQuery=["uid", "title", "description", "salary", "job_type", "is_job_open", "created_by", "created_at", "skills", "total_job_views"];

export default dataFetch;