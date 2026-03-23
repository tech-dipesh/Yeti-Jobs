import multer from "multer"
const storage=multer.diskStorage({
  filename: (req, file, cb)=>{
    const ext=path.extname(file.originalname);
    cb(null, `${Date.now()}${file.originalname}${ext}`)
  },
  destination: (req, file, cb)=>{
    cb(null, './upload')
  }
})

const upload=multer({storage: multer.memoryStorage()})
export default upload;