import cron from "node-cron";
import connect from "../db.js";
cron.schedule("0 0 * * *", async () => {
  const { rows } = await connect.query("select created_at, uid from jobs");
  const todayDate = new Date().toLocaleDateString();
  const newMap = rows.map((row) => ({
    created_at: row.created_at.toLocaleDateString(),
    uid: row.uid,
  }));
  try {
    const checkWhichNeedUpdate = newMap.filter((n) => {
      if (n.created_at < todayDate) {
        return { n };
      }
    });
    if (checkWhichNeedUpdate.length > 0) {
      for (let i of checkWhichNeedUpdate) {
        await connect.query(
          "update jobs set is_job_open='closed' where uid=$1",
          [i.uid],
        );
      }
    }
    return res.status(200).json({message: "data cleaned successfuly"});
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
});

export default cron;
