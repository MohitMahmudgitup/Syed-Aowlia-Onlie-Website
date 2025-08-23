import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator';
import User from "../models/user_model.js";
import nodemailer from 'nodemailer';

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

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {expiresIn: "30d",});

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
  const { userId } = req.body;
  console.log("userId :",userId)
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID missing", success: false });
    }

    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetUser error:", error); // <-- log the error
    res.status(500).json({ message: "Something went wrong.", success: false, error: error.message });
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
    const  { email, password,   } = req.body;
    let role = "admin"
    if ( email === process.env.ADMIN_EMAIL &&  password  === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email , role: role  }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });      
      return res.status(200).json({ token,role, success: true ,  message: "Admin logged in successfully." });

    }else{
      return res.status(401).json({ message: "Invalid email or password backend.", success: false})
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong.",error, success: false });
  }
}

//Forget password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "ইউজার পাওয়া যায়নি।", success: false });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const resetLink = `${process.env.VITE_FRONTEND_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SEND_EMAIL,
      to: user.email,
      subject: 'পাসওয়ার্ড রিসেট রিকোয়েস্ট',
      html: `
        <h2>হ্যালো ${user.name || 'ইউজার'},</h2>
        <p>আপনি আপনার পাসওয়ার্ড রিসেট করতে চেয়েছিলেন।</p>
        <p>নিচে দেওয়া লিংকে ক্লিক করুন পাসওয়ার্ড রিসেট করার জন্য (২৪ ঘণ্টার মধ্যে বৈধ):</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
      `
    };

    const sendEmail = async (mailOptions) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    };

    await sendEmail(mailOptions);
    return res.status(200).json({
      message: "পাসওয়ার্ড রিসেট ইমেইল সফলভাবে পাঠানো হয়েছে।",
      token,
      success: true,
    });

  } catch (error) {
    console.error("ত্রুটি:", error);
    res.status(500).json({ message: "কিছু সমস্যা হয়েছে।", error, success: false });
  }
};


//setPassword
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "ইউজার পাওয়া যায়নি।" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "পাসওয়ার্ড সফলভাবে রিসেট হয়েছে।", success: true });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "টোকেন অবৈধ বা মেয়াদ শেষ হয়েছে।", success: false });
  }
};


    