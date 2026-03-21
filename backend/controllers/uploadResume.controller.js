import connect from "../db.js"
import "dotenv/config"
import { supabase } from "../services/Supabase.js";

const uploadResume=  async (req, res)=>{
  const {uid: userId}=req.user;
  const {fieldname, originalname, buffer}=req.file;
  if(!originalname){
    return res.status(404).json({message: "Please Enter a File"})
  }
  try { 
    // const {rows: doesExist}=await connect.query("SELECT EXISTS (SELECT resume_url FROM users WHERE uid=$1)", [userId]);
    const {rows: doesExist, rowCount}=await connect.query("SELECT resume_url FROM users WHERE uid=$1", [userId]);
    if(rowCount){
      const {resume_url: resumeUrl}=doesExist[0];
      const splitWorld=resumeUrl?.split("/")
      if(splitWorld){
        const removetoPath=`upload/${splitWorld[splitWorld.length-1]}`
        const {error}= await supabase.storage.from('resume').remove([removetoPath])
        if(error){
          return res.status(401).json({message: error.message})
        }
      }
     }

    const randomUUID=crypto.randomUUID()
    const {data, error}=await supabase.storage.from('resume').upload(`upload/${randomUUID}-${originalname}`, buffer, {contentType: 'application/pdf'})
    if(error){
      return res.status(502).json({message: error.message})
    }
    const {path}=data;
    const {data: getOutputUrl}=supabase.storage.from('resume').getPublicUrl(path)
    const {publicUrl}=getOutputUrl
await connect.query("update users set resume_url=$1 where uid=$2", [publicUrl, userId])
   return res.status(201).json({message: 'Resume UPloaded Successfully'})
  } catch (error) {
    (error)
    // res.status(401).json({message: error.message})
    return res.status(401).json({message: "Please only add less than 2mb file and Must be a pdf file type"})
  }
}



const uploadProfilePicture=async (req, res)=>{
  const {uid}=req.user;
  
  const {originalname, buffer, mimetype}=req.file;
  try {
    const {rows, rowCount}=await connect.query("SELECT profile_pic_url FROM users WHERE uid=$1", [uid]);
    if(rowCount==0){
        return res.status(501).json({message: "Please Try Again Later"})
    }
    const randomUUID=crypto.randomUUID()
   const {data, error}= await supabase.storage.from("profile_pic").upload(`${randomUUID}-${originalname}`, buffer, {contentType: mimetype})
   
   if(error){
      return res.json(401).json({message: "Please Enter below 2mb and only image type."})
   }
   
   const {data: getOutputUrl, error: errorOutputUrl}= supabase.storage.from("profile_pic").getPublicUrl(data.path)
   if(errorOutputUrl){
      return res.json(401).json({message: errorOutputUrl.message})
   }
  const {rows:check}=await connect.query("update  users set profile_pic_url=$1 where uid=$2 returning *", [getOutputUrl.publicUrl, uid])
    return res.status(201).json({message: 'Profile Picture Uploadd Successfully'})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
export {uploadResume, uploadProfilePicture};
