// Add product to user's cart

import User from '../models/user_model.js'; // Assuming you have a User model

export const addProductToUserCart = async (req, res) => {
    const { userId, itemId, size, quantity = 1 } = req.body;  // Default quantity to 1 if not provided

    try {
        // Validate input data
        if (!userId || !itemId || !size) {
            return res.json({ message: "Missing required fields", success: false });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ message: 'User not found', success: false });
        }

        let cartdata = user.cartdata || {}; // Initialize cartdata if it doesn't exist

        // Check if the item already exists in the user's cart
        if (cartdata[itemId]) {
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] += quantity; // Increment the existing size quantity
            } else {
                cartdata[itemId][size] = quantity; // Add the size with the given quantity
            }
        } else {
            cartdata[itemId] = { [size]: quantity }; // Add a new product with size
        }

        // Update the user's cart
        await User.findByIdAndUpdate(userId, { cartdata });

        res.status(200).json({
            message: 'Product added to cart successfully',
            success: true,
            cartdata,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};




// update user's cart

export const updateProductInUserCart = async (req, res) => {
    const { userId, itemId, size, quantity } = req.body;

    try {
        // Validate input data
        if (!userId || !itemId || !size || typeof quantity !== 'number') {
            return res.json({ message: "Missing or invalid required fields", success: false });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ message: 'User not found', success: false });
        }

        let cartdata = user.cartdata || {}; // Initialize cartdata if it doesn't exist

        // Ensure itemId exists in cartdata
        if (!cartdata[itemId]) {
            cartdata[itemId] = {};
        }

        // Update the quantity for the specific size
        cartdata[itemId][size] = quantity;

        // Save the updated cartdata
        await User.findByIdAndUpdate(userId, { cartdata });

        res.status(200).json({
            message: 'Cart updated successfully',
            success: true,
            cartdata,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


// Get  user's cart

export const getUserCart = async (req, res) => {
    const { userId } = req.params; // Assume userId is passed as a URL parameter

    try {
        // Validate input
        if (!userId) {
            return res.json({ message: "User ID is required", success: false });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ message: 'User not found', success: false });
        }

        // Get the user's cart data
        const cartdata = user.cartdata || {}; // Default to an empty object if no cart data

        res.status(200).json({
            message: 'Cart retrieved successfully',
            cartdata,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const deleteProductFromUserCart = async (req, res) => {
    const { userId, itemId, size } = req.body;

    try {
        // Validate input data
        if (!userId || !itemId || !size) {
            return res.json({ message: "Missing required fields", success: false });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ message: 'User not found', success: false });
        }

        let cartdata = user.cartdata || {}; // Initialize cartdata if it doesn't exist

        // Check if the item and size exist in the cart
        if (cartdata[itemId] && cartdata[itemId][size]) {
            // Remove the size from the item's sizes
            delete cartdata[itemId][size];

            // If no sizes remain for the item, remove the item entirely
            if (Object.keys(cartdata[itemId]).length === 0) {
                delete cartdata[itemId];
            }

            // Save the updated cartdata
            await User.findByIdAndUpdate(userId, { cartdata });

            return res.status(200).json({
                message: 'Product removed from cart successfully',
                success: true,
                cartdata,
            });
        } else {
            return res.json({ message: 'Product or size not found in cart', success: false });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
