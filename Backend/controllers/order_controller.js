// Placing orders using COD Method

import orderModel from "../models/order_model.js";
import userModel from "../models/user_model.js";
import Stripe from "stripe";

// Global variable
const currency = "USD";
const deliveryCharge = 10;

// Get Stripe secret key from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req , res)=>{
    try {
        const { userId , items ,  address ,  amount  } = req.body;
        
        const orderData  = {
            userId ,
            items ,
            address ,
            amount ,
            status: "Order Placed", 
            paymentMethod :  "COD",
            payment :  false ,
            data : Date.now()
        }

        const newOrder = new  orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartdata:{}})
        res.status(201).json({message : "Order Placed Successfully" , data : newOrder , success: true})

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to place order" ,success: false });
    }


}

// Placing orders using Stripe Method

export const placeOrderStripe = async (req , res)=>{
  try {
    const { userId , items ,  address ,  amount  } = req.body;
    const { origin } = req.headers;
    const orderData  = {
      userId ,
      items ,
      address ,
      amount ,
      status: "Order Placed", 
      paymentMethod :  "Stripe",
      payment :  false ,
      data : Date.now()
  }
  const newOrder = new  orderModel(orderData);
  await newOrder.save();
  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: currency,
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
        },
      },
        quantity: item.quantity,
      };
  
});
line_items.push({
  price_data: {
    currency: currency,
    unit_amount: deliveryCharge * 100,
    product_data: {
      name: "Discount Charges",
      },
      },
      quantity: 1
})

const session = await stripe.checkout.sessions.create({
  success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
  line_items, // assumed to be a properly formatted array of items
  mode: "payment", // could be "subscription" if you're handling recurring payments
});

res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({success : false , message : "Error creating order" });
    
    
  }
}

// Verify Stripe

export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success == true ) {
      await orderModel.findByIdAndUpdate(orderId , {payment : true});
      await userModel.findByIdAndUpdate(userId , {cartdata : {}});
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success : false , message : "Order cancelled" });
    }
    
  } catch (error) {
    console.error(error);
    res.json({success : false , message : "Error verifying order" });
  }

}

// Placing orders using Rezorpay Method

export const placeOrderRazorpay = async (req , res)=>{

}

// All oder data for  admin panel

export const getAllOrders = async (req , res)=>{
  try {
    const orders = await orderModel.find({})
    res.status(200).json({message : "All Orders" , data : orders , success
      : true})
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get all orders" ,success:
          false });
          }

}

// user Order

export const getUserOrder = async (req, res) => {
    try {
      const { userId } = req.body;
      // console.log("User ID received:", userId);  // Log the userId
      const userOrder = await orderModel.find({ userId });
      // console.log("Orders found:", userOrder);  // Log the retrieved orders
      res.status(200).json({ message: "User Order Data", data: userOrder, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get user order", success: false });
    }
  };
  

// update  order status from admin  panel

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Check if orderId and status are provided
    if (!orderId || !status) {
      return res.status(400).json({ 
        message: "Order ID and status are required", 
        success: false 
      });
    }

    // Update the order status
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    // If no order found, return error
    if (!order) {
      return res.status(404).json({ 
        message: "Order not found", 
        success: false 
      });
    }

    // Success response
    res.status(200).json({ 
      message: "Order Status Updated", 
      data: order, 
      success: true 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Failed to update order status", 
      success: false 
    });
  }
};


