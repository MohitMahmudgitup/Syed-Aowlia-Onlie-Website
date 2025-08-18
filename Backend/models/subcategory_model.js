import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    image : {type: String},
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SubCategory", subCategorySchema);
