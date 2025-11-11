import express from "express";
import {   addHeroImage,
  getHeroImages,
  updateHeroImages,
  deleteHero,deleteSingleHeroImage } from "../controllers/Hero_controller.js";

const router = express.Router();
import upload from "../middleware/hero_multer.js";

// Multiple images upload
router.post("/add", upload.any(), addHeroImage);
 router.get("/", getHeroImages);
router.put("/update/:id", upload.any(), updateHeroImages);
router.delete("/delete/:id", deleteHero);
router.delete("/delete-single", deleteSingleHeroImage);
export default router;
