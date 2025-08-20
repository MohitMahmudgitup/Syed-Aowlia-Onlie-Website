import Product from "../models/product_model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, discount_price, brand, stock, price, description, category, subcategory, sizes, bestseller, product_type, model, color } = req.body;

     const images = req.files ? req.files.map(file => file.filename) : [];
     if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required", success: false });
    }

    // Prepare product data for saving
    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      images,
      product_type,
      brand,
      stock: Number(stock) || 0,
      discount_price: Number(discount_price) || 0,
      model,
      color:JSON.parse(color),
      date: Date.now(),
    };

    // Save the product to the database
    const savedProduct = new Product(productData);
    await savedProduct.save();

    return res.json({ message: 'Product created successfully', product: savedProduct, success: true });
  } catch (error) {
    console.error(error);
    return res.json({ message: 'Internal server error', success: false });
  }
};


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
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

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, sizes, price, bestseller, product_type, brand, stock, discount_price, model, color } = req.body;

  try {
    
    const images = req.files ? req.files.map(file => file.filename) : [];
    const updatedProduct = await Product.findById(id);
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }

    if(name) updatedProduct.name = name;
    if(description) updatedProduct.description = description;
    if(sizes) updatedProduct.sizes = JSON.parse(sizes);
    if(price) updatedProduct.price = price;
    if(bestseller) updatedProduct.bestseller = bestseller === "true" || bestseller === true;;
    if(product_type) updatedProduct.product_type = product_type;
    if(brand) updatedProduct.brand = brand;
    if(model) updatedProduct.model = model;
    if(stock) updatedProduct.stock = stock;
    if(color) updatedProduct.color = color;
    if(discount_price) updatedProduct.discount_price = discount_price;
    if(images && images.length > 0) updatedProduct.images = images;
    await updatedProduct.save();
 
    res.status(200).json({updatedProduct, success: true, new: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product.", error, success: false });
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
