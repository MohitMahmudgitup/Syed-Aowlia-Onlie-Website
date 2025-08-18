import express from "express";
import upload from "../middleware/subCategory_multer.js"; 
import {getSubCategory, createSubCategory, updateSubCategory, DeleteSubCategory } from "../controllers/subCategory_controller.js"
const router = express.Router();

router.get("/getSubCategory", getSubCategory);
router.post("/createSubCategory", upload.single("image"), createSubCategory);
router.put("/updateSubCategory/:id",upload.single("image"), updateSubCategory);
router.delete("/deleteSubCategory/:id",DeleteSubCategory);
export default router;