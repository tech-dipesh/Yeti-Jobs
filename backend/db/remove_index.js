import "dotenv/config"
import { Client, Connection, Pool } from "pg";
import dotenv from "dotenv"
import path from "node:path"
dotenv.config({ path: path.join(process.cwd(), '..', '.env') });


const client = new Client({
  connectionString: process.env.DATABASE_PASSWORD,
  ssl: {rejectUnauthorized: false},
});
try {
  if(!(process.env.DATABASE_PASSWORD)){
    throw new Error("Please Enter DATABASE_PASSWORD")
  }
  await client.connect()
  console.log('connected to database');
} catch (error) {
  console.log('err', error)
}
const dropIndexes = `
  DROP INDEX IF EXISTS idx_jobs_company_id;
  DROP INDEX IF EXISTS index_jobs_search_title;
  DROP INDEX IF EXISTS idx_jobs_created_by;
  DROP INDEX IF EXISTS idx_jobs_is_open;
  DROP INDEX IF EXISTS idx_users_email;
  DROP INDEX IF EXISTS idx_companies_name;
  DROP INDEX IF EXISTS idx_jobs_company_open;
  DROP INDEX IF EXISTS unique_user_companies;
  DROP INDEX IF EXISTS idx_applications_user_id;
  DROP INDEX IF EXISTS idx_jobs_company_open;
  DROP INDEX IF EXISTS idx_applications_job_id;
  DROP INDEX IF EXISTS idx_applications_status;
  DROP INDEX IF EXISTS idx_saved_jobs_user_id;
  DROP INDEX IF EXISTS idx_verified_code_user_id;
  DROP INDEX IF EXISTS idx_user_educations_user_id;
  DROP INDEX IF EXISTS idx_ats_scores_user_id;
  DROP INDEX IF EXISTS idx_ats_scores_user_id;
  DROP INDEX IF EXISTS idx_notifications_user_read;
  DROP INDEX IF EXISTS idx_notifications_user_created;
;`


try {
  await client.query(dropIndexes)
  console.log("all index is removed");
  await client.end()
  process.exit(0)
} catch (error) {
  console.log(error);
}
