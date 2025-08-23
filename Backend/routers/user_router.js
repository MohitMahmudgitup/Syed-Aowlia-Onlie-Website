import express from "express";
import { authUser } from "../middleware/auth.js";
import { 
  registerUser, 
  loginUser, 
  getUser, 
  updateUser, 
  deleteUser, 
  admin,
  adminLogin,
  forgetPassword,
  resetPassword
} from "../controllers/user_controller.js"; // Assuming your controllers are in the controllers folder

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

//Route for Admin
router.get("/admin", admin);

//Route for Admin
router.post("/adminLogin", adminLogin);

// Route to get user details by ID
router.post("/",authUser, getUser);

// Route to update user details
router.put("/:id", updateUser);

// Route to delete a user
router.delete("/:id", deleteUser);

// Route to forgetPassword a user
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);




export default router;
