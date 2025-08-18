import express from "express";
import upload from "../middleware/product_multer.js"; // Ensure this path is correct
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product_controller.js";
import adminAuth from "../middleware/admin_auth.js";

const router = express.Router();

// Route to create a product with image upload
router.post(
  "/add",
  adminAuth,
  upload.array("images", 5),
  createProduct
); 

// Other routes...
router.get("/", getAllProducts);
router.get("/:id",adminAuth, getProductById);
router.put("/:id",upload.array("images", 5), adminAuth, updateProduct);
router.delete("/:id",adminAuth, deleteProduct);

export default router;
