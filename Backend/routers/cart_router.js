import express from 'express';
import { addProductToUserCart, updateProductInUserCart, getUserCart ,deleteProductFromUserCart } from '../controllers/card_controller.js'; // Note the .js extension
import { authUser } from '../middleware/auth.js';

const router = express.Router();

// Add product to user's cart
router.post('/add', authUser , addProductToUserCart);

// Update product in user's cart
router.put('/update', authUser , updateProductInUserCart);

// Get user's cart
router.get('/get', authUser , getUserCart);

router.post('/delete', deleteProductFromUserCart);


export default router;
