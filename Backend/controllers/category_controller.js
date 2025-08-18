import categoryModel from "../models/category_model.js";

export const getCategory = async (req, res)=>{
    try {
        const categories = await categoryModel.find();
        res.status(200).json({categories, message : "Category get successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
}

export const createCategory = async (req, res)=>{
    const { name } = req.body;
    try {
        const image = req.file && req.file.filename ;
        if(!name){
           return res.json({message: "Enter you Category name.", success :  false})
        }
        const newCategory = new categoryModel({ name , image : image });
        await newCategory.save();
        res.status(201).json({ category: newCategory, message: "Category created successfully" });
    } catch (error) {
        res.status(500).json({success : true, message: "Error fetching category", error: error.message });
    }
}

export const updateCategory = async (req, res)=>{
        const {id} = req.params;
    try {
        const { name } = req.body;
        const image = req.file && req.file.filename;
        const categorieID = await categoryModel.findById(id);
        if(name) categorieID.name = name;
        if(image) categorieID.image = image;
        await categorieID.save()
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            categorieID
        })
 
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }

}

export const DeleteCategory = async (req, res)=>{
    const {id} = req.params;
    try {
        const categorieID = await categoryModel.findById(id);
        await categorieID.deleteOne();
        res.status(200).json({
            success: true,
            message: "delete successfully",
        }) 
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
}