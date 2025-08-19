import subCategoryModel from "../models/subcategory_model.js";

export const getSubCategory = async (req, res)=>{
    try {
        const categories = await subCategoryModel.find().populate("category"); 
        res.status(200).json({categories, message : "Category get successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
}

export const createSubCategory = async (req, res)=>{
    const { name, category } = req.body;
    try {
        const image = req.file && req.file.filename ;
        if(!name){1
           return res.json({message: "Enter you Category name.", success :  false})
        }
        const newSubCategory = new subCategoryModel({ name , image, category });
        await newSubCategory.save();
        res.status(201).json({  newSubCategory, message: "Category created successfully" });
    } catch (error) {
        res.status(500).json({success : true, message: "Error fetching category", error: error.message });
    }
}

export const updateSubCategory = async (req, res)=>{
        const {id} = req.params;
    try {
        const { name } = req.body;
        const image = req.file && req.file.filename;
        const subCategorieID = await subCategoryModel.findById(id);
        if(name) subCategorieID.name = name;
        if(image) subCategorieID.image = image;
        await subCategorieID.save()
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            subCategorieID
        })
 
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }

}

export const DeleteSubCategory = async (req, res)=>{
    const {id} = req.params;
    try {
        const subCategory = await subCategoryModel.findById(id);
        await subCategory.deleteOne();
        res.status(200).json({
            success: true,
            message: "delete successfully",
        }) 
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
}