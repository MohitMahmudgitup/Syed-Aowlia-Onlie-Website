import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { connetCloudnary } from "./config/cloudinary.js";
import userRoutes from "./routers/user_router.js";
import productRoutes from "./routers/product_router.js";
import cartRouter from './routers/cart_router.js';
import orderRouter from './routers/order_router.js';
import categoryRouter from "./routers/category_router.js"
import footerRouter from "./routers/Footer_router.js"; 
import subCategoryRouter from "./routers/subcategory_router.js"
// App  setup

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use('/api/cart', cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/footer", footerRouter);

connectDB();
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
