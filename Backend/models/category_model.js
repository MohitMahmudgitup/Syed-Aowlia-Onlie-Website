import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    image : {type: String},
    name: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Category", categorySchema);
