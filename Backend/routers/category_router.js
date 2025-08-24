import express from "express";
import upload from "../middleware/category_multer.js"; 

import adminAuth from "../middleware/admin_auth.js";
import {getCategory, createCategory, updateCategory, DeleteCategory } from "../controllers/category_controller.js"
const router = express.Router();

router.get("/getCategory", getCategory);
router.post("/createCategory", upload.single("image"),adminAuth, createCategory);
router.put("/updateCategory/:id",upload.single("image"), updateCategory);
router.delete("/DeleteCategory/:id",DeleteCategory);
export default router;