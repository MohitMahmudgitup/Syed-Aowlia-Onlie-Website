// import categoryModel from "../models/category_model.js";

// export const getCategory = async (req, res)=>{
//     try {
//         const categories = await categoryModel.find();
//         res.status(200).json({categories, message : "Category get successfully" });
        
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching category", error: error.message });
//     }
// }

// export const createCategory = async (req, res)=>{
//     const { name } = req.body;
//     try {
//         const image = req.file && req.file.filename ;
//         if(!name){
//            return res.json({message: "Enter you Category name.", success :  false})
//         }
//         const newCategory = new categoryModel({ name , image : image });
//         await newCategory.save();
//         res.status(201).json({ category: newCategory, message: "Category created successfully" });
//     } catch (error) {
//         res.status(500).json({success : true, message: "Error fetching category", error: error.message });
//     }
// }

// export const updateCategory = async (req, res)=>{
//         const {id} = req.params;
//     try {
//         const { name } = req.body;
//         const image = req.file && req.file.filename;
//         const categorieID = await categoryModel.findById(id);
//         if(name) categorieID.name = name;
//         if(image) categorieID.image = image;
//         await categorieID.save()
//         res.status(200).json({
//             success: true,
//             message: "Category updated successfully",
//             categorieID
//         })
 
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching category", error: error.message });
//     }

// }

// export const DeleteCategory = async (req, res)=>{
//     const {id} = req.params;
//     try {
//         const categorieID = await categoryModel.findById(id);
//         await categorieID.deleteOne();
//         res.status(200).json({
//             success: true,
//             message: "delete successfully",
//         }) 
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching category", error: error.message });
//     }
// }



import categoryModel from "../models/category_model.js";

// GET all categories
export const getCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ categories, message: "Category retrieved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
}

// CREATE a new category
export const createCategory = async (req, res) => {
    const { name, image } = req.body; // image now comes from Cloudinary URL
    try {
        if (!name) {
            return res.status(400).json({ message: "Enter your Category name.", success: false });
        }
        const newCategory = new categoryModel({ name, image });
        await newCategory.save();
        res.status(201).json({ category: newCategory, message: "Category created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating category", error: error.message });
    }
}

// UPDATE an existing category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body; // image from Cloudinary URL
    try {
        const category = await categoryModel.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found", success: false });

        if (name) category.name = name;
        if (image) category.image = image;

        await category.save();
        res.status(200).json({ success: true, message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
}

// DELETE a category
export const DeleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found", success: false });

        await category.deleteOne();
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
}
