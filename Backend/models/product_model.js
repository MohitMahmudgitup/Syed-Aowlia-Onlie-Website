import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: { type: Array, },
    name: { type: String,  },
    price: { type: Number,  },
    discount_price: { type: Number },
    description: { type: String, },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category",  },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory",  },
    sizes: { type: [String]},
    stock: { type: Number, default: 0 },
    product_type: { type: String , enum: ["gadget", "garments"], default: "gadget" },
    brand: { type: String },
    model: { type: String },
    color: { type: [String] },
    bestseller: { type: Boolean },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model.product || mongoose.model("Product", productSchema);
export default ProductModel;
