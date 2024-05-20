// Importing necessary modules and files
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

// Middleware function to verify the authentication token
export const verifyToken = (req, res, next) => {
  // Extracting the token from the request's cookies
  const token = req.cookies.accessToken;

  // Checking if the token is present in the request
  if (!token) return next(createError(401, 'You are not authenticated!'));

  // Verifying the token using the secret key
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    // Handling the case where the token is not valid
    if (err) return next(createError(403, 'Token is not valid!'));

    // Assigning the user id and seller status from the token payload to the request object
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    // Passing control to the next middleware
    next();
  });
};
