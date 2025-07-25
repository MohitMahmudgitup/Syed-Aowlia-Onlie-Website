import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrder,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/order_controller.js"; // Adjust the path as needed
import adminAuth from "../middleware/admin_auth.js";
import {authUser}  from "../middleware/auth.js";

const router = express.Router();

//Admin Features

router.post("/list",adminAuth, getAllOrders);
router.post("/status",adminAuth, updateOrderStatus);

//Payment Features

router.post("/place",authUser , placeOrder);
router.post("/stripe",authUser , placeOrderStripe);
router.post("/razorpay",authUser , placeOrderRazorpay);

//User Features

router.post("/",authUser , getUserOrder);

//Verify payment
router.post("/verifystripe",authUser , verifyStripe);



export default router;
