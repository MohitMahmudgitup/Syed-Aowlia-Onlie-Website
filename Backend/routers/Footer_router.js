import express from "express";
import adminAuth from "../middleware/admin_auth.js";
import {
  createFooter,
  updateFooter,
  getFooter,
  deleteFooter,
} from "../controllers/Footer_controller.js";
import { uploadFooter } from "../middleware/footer_multer.js";

const router = express.Router();

// Create Footer
router.post(
  "/",
  adminAuth,
  uploadFooter.fields([
    { name: "logo", maxCount: 1 },
    { name: "paymentMethods", maxCount: 10 }
  ]),
  createFooter
);

// Update Footer
router.put(
  "/:id",
  adminAuth,
  uploadFooter.fields([
    { name: "logo", maxCount: 1 },
    { name: "paymentMethods", maxCount: 10 }
  ]),
  updateFooter
);

router.get("/", getFooter);
router.delete("/:id", adminAuth, deleteFooter);

export default router;
