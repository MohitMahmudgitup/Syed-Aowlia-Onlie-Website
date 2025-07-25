import jwt from 'jsonwebtoken';

export const authUser = (req, res, next) => {
  try {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized', success: false });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({
        message: 'Token expired. Please login again.',
        success: false,
      });
    } else {
      return res.status(401).send({
        message: 'Invalid token.',
        success: false,
        error: error.message,
      });
    }
  }
};
