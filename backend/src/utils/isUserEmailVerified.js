import connect from "../db.js";
async function isUserVerifiedEmail(uid) {
  try {
    const { rows} = await connect.query(
      "select exists (select from email_verified where user_id=$1 order by expired_at desc);",
      [uid],
    );
    if(rows.length==0){
      return false;
    }
    const { exists } = rows[0];
    if(exists==true){
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    console.log('er', error)
    return false;
  }
}
export default isUserVerifiedEmail;
