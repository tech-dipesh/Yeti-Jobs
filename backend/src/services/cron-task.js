import cron from "node-cron";
import connect from "../db.js";
cron.schedule("0 0 * * *", async () => {
  try {
    const {rows} = await connect.query("update jobs set is_job_open = 'closed' where created_at < CURRENT_DATE and is_job_open = 'open'");
    console.log(`Total ${rows.length} Data Cleaned Successfully.`);
  } catch (error) {
    console.log(error.message );
  }
});

export default cron;
