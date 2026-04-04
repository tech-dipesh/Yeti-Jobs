import connect from "../db.js";
import "dotenv/config";
import { supabase } from "../services/Supabase.js";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import gemini from "../utils/grok.js"
const uploadResume = async (req, res) => {
  const { uid: userId } = req.user;
  const { fieldname, originalname, buffer } = req.file;
  if (!originalname) {
    return res.status(404).json({ message: "Please Enter a File" });
  }
  try {
    await connect.query('begin');
    const parser = new PDFParse({ data: buffer });
    const { rows: doesExist, rowCount } = await connect.query(
      "SELECT resume_url FROM users WHERE uid=$1",
      [userId],
    );
    if (rowCount) {
      const { resume_url: resumeUrl } = doesExist[0];
      const splitWorld = resumeUrl?.split("/");
      if (splitWorld) {
        const removetoPath = `upload/${splitWorld[splitWorld.length - 1]}`;
        const { error } = await supabase.storage
          .from("resume")
          .remove([removetoPath]);
        if (error) {
          return res.status(401).json({ message: error.message });
        }
      }
    }
    const randomUUID = crypto.randomUUID();
    const [operationData, pdfContent] = await Promise.all([
      supabase.storage
        .from("resume")
        .upload(`upload/${randomUUID}-${originalname}`, buffer, {
          contentType: "application/pdf",
        }),
      parser.getText().then(async ({ text }) => {
        const result=await gemini(text)
        return result;
      }),
    ]);
    const {data: {path}, error } = operationData;
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { data: {publicUrl} } = supabase.storage.from("resume").getPublicUrl(path);
    console.log(typeof pdfContent?.feedback)
    const [updateResume, updateATS]=await Promise.all([
      connect.query("update users set resume_url=$1 where uid=$2", [publicUrl,userId]),
      connect.query("insert into ats_score (user_id, score, feedback) values($1, $2, $3)", [userId, pdfContent?.ats_score, JSON.stringify(pdfContent?.feedback)])
    ])
    await connect.query('commit');
    return res.status(201).json({ message: "Resume Uploaded Successfully" });
  } catch (error){
    await connect.query('rollback');
    return res.status(500).json({ message: error.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  const { uid } = req.user;
  const { originalname, buffer, mimetype } = req.file;
  try {
    const { rows, rowCount } = await connect.query(
      "SELECT profile_pic_url FROM users WHERE uid=$1",
      [uid],
    );
    if (rowCount == 0) {
      return res.status(501).json({ message: "Please Try Again Later" });
    }
    const randomUUID = crypto.randomUUID();
    const { data, error } = await supabase.storage
      .from("profile_pic")
      .upload(`${randomUUID}-${originalname}`, buffer, {
        contentType: mimetype,
      });

    if (error) {
      return res
        .json(401)
        .json({ message: "Please Enter below 2mb and only image type." });
    }

    const { data: getOutputUrl, error: errorOutputUrl } = supabase.storage
      .from("profile_pic")
      .getPublicUrl(data.path);
    if (errorOutputUrl) {
      return res.json(401).json({ message: errorOutputUrl.message });
    }
    await connect.query(
      "update  users set profile_pic_url=$1 where uid=$2 returning *",
      [getOutputUrl.publicUrl, uid],
    );
    return res
      .status(201)
      .json({ message: "Profile Picture Uploaded Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { uploadResume, uploadProfilePicture };
