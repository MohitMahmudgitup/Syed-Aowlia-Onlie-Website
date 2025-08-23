import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // Get the token from the request headers
    const {admintoken} = req.headers

    // If token is not provided, respond with an unauthorized error
    if (!admintoken) {
      return res.status(201).json({ message: 'Authorization admintoken missing', success: false });
    }

    // Verify the token with the secret key
    const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);

    // If the token payload doesn't match the admin's email, reject the request
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(203).json({ message: 'Unauthorized access', success: false });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(203).json({ message: 'Invalid admintoken', success: false });
  }
};

export default adminAuth;
