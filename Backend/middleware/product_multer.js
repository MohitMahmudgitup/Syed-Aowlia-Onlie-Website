import multer from 'multer';
import path from "path";
import fs from "fs";

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    const uploadPath = path.resolve("uploads/product");

    // ensure the folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`
    cb(null, uniqueSuffix)
  }
})
const upload = multer({storage})

export default upload;
