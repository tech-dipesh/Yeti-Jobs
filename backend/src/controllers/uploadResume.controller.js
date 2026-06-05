import Pool, { connect } from "../db.js";
import "dotenv/config";
import { supabase } from "../services/Supabase.js";
import { PDFParse } from "pdf-parse";
import gemini from "../utils/grok.js";
import { IMAGE_ALLOWED_TYPE } from "../utils/data.js";
const uploadResume = async (req, res) => {
  const { uid: userId } = req.user;
  if (!req.file) {
    return res.status(404).json({ message: "Please Enter a File" });
  }
  const { fieldname, originalname, buffer } = req.file;
  if (!originalname) {
    return res.status(404).json({ message: "Please Enter a File" });
  }
  try {
    const connect = await Pool.connect();
    await connect.query("begin");
    const parser = new PDFParse({ data: buffer });
    const { rows: doesExist, rowCount } = await Pool.query(
      "SELECT resume_url FROM users WHERE uid=$1",
      [userId],
    );
    if (rowCount && doesExist[0]?.resume_url) {
      const { resume_url: resumeUrl } = doesExist[0];
      const splitWorld = resumeUrl?.split("/");
      if (splitWorld) {
        const removetoPath = `upload/${splitWorld.at(-1)}`;
        const [firstError] = await Promise.all([
          supabase.storage.from("resume").remove([removetoPath]),
          Pool.query("delete from ats_scores where user_id=$1", [userId]),
        ]);
        if (firstError?.error) {
          console.error(`Failed to remove old Resume, ${error}`);
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
        const result = await gemini(text);
        return result;
      }),
    ]);
    const {
      data: { path },
      error,
    } = operationData;
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("resume").getPublicUrl(path);
    console.log("prd", pdfContent);
    const [first, second] = await Promise.all([
      Pool.query("update users set resume_url=$1 where uid=$2 returning *", [
        publicUrl,
        userId,
      ]),
      Pool.query(
        "insert into ats_scores (user_id, score, feedback) values($1, $2, $3) returning *",
        [userId, pdfContent?.ats_scores, JSON.stringify(pdfContent?.feedback)],
      ),
    ]);
    await Pool.query("commit");
    return res.status(201).json({ message: "Resume Uploaded Successfully" });
  } catch (error) {
    console.log(error);
    await Pool.query("rollback");
    return res.status(500).json({ message: error.message });
  } finally {
    await Pool.release();
  }
};

const uploadProfilePicture = async (req, res) => {
  const { uid } = req.user;
  if (!req.file) {
    return res.status(400).json({ message: "Please Enter a Profile Picture" });
  }
  const { originalname, buffer, mimetype, size } = req.file;
  const KB_TO_MB = 2 * 1024 * 1024;
  if (size > KB_TO_MB) {
    return res.status(400).json({ message: "File size exceeds 2MB" });
  }
  if (!IMAGE_ALLOWED_TYPE.includes(mimetype)) {
    return res.status(400).json({ message: "Invalid File Type" });
  }
  try {
    const { rows } = await connect.query(
      "SELECT profile_pic_url FROM users WHERE uid=$1",
      [uid],
    );
    if (!rows || rows.length == 0) {
      return res.status(501).json({ message: "Please Try Again Later" });
    }
    const randomUUID = crypto.randomUUID();
    const { data, error } = await supabase.storage
      .from("profile_pic")
      .upload(`${randomUUID}-${originalname}`, buffer, {
        contentType: mimetype,
      });
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const { data: getOutputUrl, error: errorOutputUrl } = supabase.storage
      .from("profile_pic")
      .getPublicUrl(data.path);
    if (errorOutputUrl) {
      return res.status(401).json({ message: errorOutputUrl.message });
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
