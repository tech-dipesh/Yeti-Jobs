import client from '../db.js';
export const showAllNotifications=(req, res)=>{
  try {
    return res.status(200).json({ message:  "Notifications Show All notification"});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}
export const ReadAllNotifications=(req, res)=>{
  const {id}=req.params
  const {uid}=req.user;
  try {
    return res.status(200).json({ message:  uid});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}
export const sendUserNotifications=async(req, res)=>{
  const {id}=req.params
  const {uid}=req.user;
  try {
    const {rows}=await client.query("select * from notifications where users_id=$1", [uid])
    console.log('rows is', rows);
    return res.status(200).json({ message:  "Send User Notification Pos"});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: error.message }); 
  }
}

