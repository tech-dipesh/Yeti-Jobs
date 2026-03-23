import connect from "../db.js";

const allTableList=['users', 'jobs', 'companies', 'applications', 'saved_jobs', 'email_verified', 'user_companies_follows']
const dataFetch = async (name) => {
  if(!allTableList.includes(name)){
    throw new Error("Invalid Table Name:")
  }
  const { rows } = await connect.query(`select * from ${name}`);
  return rows;
};
export default dataFetch;