import Product from "../models/product_model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, discount_price, brand, stock, price, description, category, subcategory, sizes, bestseller, product_type } = req.body;

     const images = req.files ? req.files.map(file => file.filename) : [];


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
      stock,
      discount_price,
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
  const {
    name,
    price,
    description,
    category,
    subcategory,
    sizes,
    bestseller,
    product_type,
    brand,
    stock,
    discount_price,
  } = req.body;

  try {
    const images = req.files ? req.files.filename : null;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        images,
        category,
        subcategory,
        sizes,
        bestseller,
        product_type,
        brand,
        stock,
        discount_price,
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }

    res.status(200).json({ product: updatedProduct, success: true, new: true });
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
