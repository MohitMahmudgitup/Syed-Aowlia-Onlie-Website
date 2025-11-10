import Product from "../models/product_model.js";
import { cloudinaryInstance, connetCloudnary } from "../config/cloudinary.js";

// Ensure Cloudinary is configured
connetCloudnary();

export const createProduct = async (req, res) => {
  try {
    const {
      name, discount_price, brand, stock, price, description,
      category, subcategory, sizes, bestseller, product_type,
      model, color, ram, rom, storage, processor, display, battery, os
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required", success: false });
    }

    // Upload images to Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinaryInstance.uploader.upload(file.path, { folder: "products" });
        images.push(result.secure_url);
      }
    }

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subcategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true",
      images,
      product_type,
      brand,
      stock: Number(stock) || 0,
      discount_price: Number(discount_price) || 0,
      model,
      color,
      date: Date.now(),
      ram, rom, storage, processor, display, battery, os,
    };

    const savedProduct = new Product(productData);
    await savedProduct.save();

    return res.json({ message: "Product created successfully", product: savedProduct, success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found", success: false });

    const updates = req.body;

    // If new images are uploaded, send to Cloudinary
    if (req.files && req.files.length > 0) {
      const cloudImages = [];
      for (const file of req.files) {
        const result = await cloudinaryInstance.uploader.upload(file.path, { folder: "products" });
        cloudImages.push(result.secure_url);
      }
      updates.images = cloudImages;
    }

    Object.assign(product, updates);
    await product.save();

    return res.json({ message: "Product updated successfully", product, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update product", success: false });
  }
};



// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
  
    res.status(200).json({ products, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products.", error, success: false });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }
    res.status(200).json({ product, success: true, product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product.", error, success: false });
  }
};


// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product.", error, success: false });
  }
};
