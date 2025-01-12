import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // Get the token from the request headers
    const {token} = req.headers

    // If token is not provided, respond with an unauthorized error
    if (!token) {
      return res.status(201).json({ message: 'Authorization token missing', success: false });
    }

    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token payload doesn't match the admin's email, reject the request
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(203).json({ message: 'Unauthorized access', success: false });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(203).json({ message: 'Invalid token', success: false });
  }
};

export default adminAuth;
