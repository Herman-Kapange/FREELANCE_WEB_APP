// Importing necessary modules and files
import User from '../models/user.model.js';
import createError from '../utils/createError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Function to handle user registration
export const register = async (req, res, next) => {
  try {
    // Hashing the user's password before saving it to the database
    const hash = bcrypt.hashSync(req.body.password, 5);

    // Creating a new User instance with the hashed password
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    // Saving the new user to the database
    await newUser.save();

    // Sending a success response if the user is created
    res.status(201).send('User has been created.');
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to handle user login
export const login = async (req, res, next) => {
  try {
    // Finding the user by username in the database
    const user = await User.findOne({ username: req.body.username });

    // Handling the case where the user is not found
    if (!user) return next(createError(404, 'User not found!'));

    // Comparing the provided password with the hashed password in the database
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // Handling the case where the password is incorrect
    if (!isCorrect)
      return next(createError(400, 'Wrong password or username!'));

    // Creating a JSON Web Token (JWT) for user authentication
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    // Extracting sensitive information from the user object
    const { password, ...info } = user._doc;

    // Setting the JWT as an HTTP-only cookie and sending user information
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to handle user logout
export const logout = async (req, res) => {
  // Clearing the access token cookie on the client side
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('User has been logged out.');
};
