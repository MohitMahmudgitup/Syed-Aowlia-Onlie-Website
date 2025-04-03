import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator';
import User from "../models/user_model.js"; // assuming you are using ES modules and models are stored in a "models" folder

// User registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email});
    
    if(!username ||  !email || !password) {
        return res.json({ message: "Please fill in all fields.", success:false })
    }

    if (existingUser) {
      return res.json({ message: "User already exists.", success: false });
    }

    if (!validator.isEmail(email)) {
        return res.json({ message: "Invalid email format.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (password.length<6) {
        return res.json({ message: "Password must be at least 6 characters",  success:false })
    }

    const newUser = new User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {expiresIn: "1h",});

    res.json({ user: savedUser, token, success: true ,  message: "User created successfully." });

  } catch (error) {
    res.json({ message: "Something went wrong." ,  success: false });

  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) { return res.json({ message: "User not found.", success: false }); }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .json({ message: "Invalid credentials.", success: false });
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token, success: true , message : "User logged in successfully." });

  } catch (error) {
    res.status(200).json({ message: "Something went wrong.", success: false });
  }
};

// Get user details
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};

// Update user data
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, email, cartdata } = req.body;

  try {
    // Find the user and update the data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userName, email, cartdata },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully.", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};

export const admin = (req,res) =>{
    return res.status(200).json({message: "Admin dashboard", success: true});
}

// Admin login

export const adminLogin = async (req, res) => {
  try {
    const  { email, password } = req.body;

    if ( email === process.env.ADMIN_EMAIL &&  password  === process.env.ADMIN_PASSWORD) {
      const  token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30s",
      });
      return res.status(200).json({ token, success: true ,  message: "Admin logged in successfully." });

    }else{
      return res.status(401).json({ message: "Invalid email or password.", success: false})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong.",error, success: false });
  }
}
    