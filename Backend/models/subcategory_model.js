import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    image : {type: String},
    name: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SubCategory", subCategorySchema);
