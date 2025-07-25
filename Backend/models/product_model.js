import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.model.product || mongoose.model("Product", productSchema);
export default ProductModel;
