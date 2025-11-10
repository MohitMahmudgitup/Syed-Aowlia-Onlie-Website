// import express from "express";
// import upload from "../middleware/category_multer.js"; 

// import adminAuth from "../middleware/admin_auth.js";
// import {getCategory, createCategory, updateCategory, DeleteCategory } from "../controllers/category_controller.js"
// const router = express.Router();

// router.get("/getCategory", getCategory);
// router.post("/createCategory", upload.single("image"),adminAuth, createCategory);
// router.put("/updateCategory/:id",upload.single("image"), updateCategory);
// router.delete("/DeleteCategory/:id",DeleteCategory);
// export default router;


import express from "express";
import upload from "../middleware/category_multer.js"; 
import { connetCloudnary, cloudinaryInstance } from "../config/cloudinary.js";
import adminAuth from "../middleware/admin_auth.js";
import { getCategory, createCategory, updateCategory, DeleteCategory } from "../controllers/category_controller.js";

const router = express.Router();

// Configure Cloudinary
connetCloudnary();

router.get("/getCategory", getCategory);

// Upload image to Cloudinary before creating category
router.post(
  "/createCategory",
  adminAuth,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) return next(); 

      const result = await cloudinaryInstance.uploader.upload(req.file.path, {
        folder: "category",
      });

      // Replace local file info with Cloudinary URL
      req.body.image = result.secure_url;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: error.message });
    }
  },
  createCategory
);

router.put(
  "/updateCategory/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (req.file) {
        const result = await cloudinaryInstance.uploader.upload(req.file.path, {
          folder: "category",
        });
        req.body.image = result.secure_url;
      }
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: error.message });
    }
  },
  updateCategory
);

router.delete("/DeleteCategory/:id", DeleteCategory);

export default router;
