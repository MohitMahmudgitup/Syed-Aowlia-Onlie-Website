import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount_price: { type: Number },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    sizes: { type: [String]},
    stock: { type: Number, default: 0 },
    product_type: { type: String , enum: ["gadget", "garments"], default: "gadget" },
    brand: { type: String },
    model: { type: String },
    color: { type: [String] },
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model.product || mongoose.model("Product", productSchema);
export default ProductModel;
