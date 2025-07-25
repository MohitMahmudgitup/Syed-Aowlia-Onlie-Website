import multer from 'multer';

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`
    cb(null, uniqueSuffix)
    // cb(null, file.originalname)
  }
})
const upload = multer({storage})

export default upload;
