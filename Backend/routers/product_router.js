import express from "express";
import upload from "../middleware/multer.js"; // Ensure this path is correct
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
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createProduct
); // Use the same name you have in your form

// Other routes...
router.get("/", getAllProducts);
router.get("/:id",adminAuth, getProductById);
router.put("/:id",adminAuth, updateProduct);
router.delete("/:id",adminAuth, deleteProduct);

export default router;
