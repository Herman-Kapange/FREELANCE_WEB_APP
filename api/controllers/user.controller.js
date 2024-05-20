// Importing necessary modules and files
import User from '../models/user.model.js';
import createError from '../utils/createError.js';

// Function to delete a user account
export const deleteUser = async (req, res, next) => {
  // Finding the user by id
  const user = await User.findById(req.params.id);

  // Checking if the authenticated user is the owner of the account to be deleted
  if (req.userId !== user._id.toString()) {
    return next(createError(403, 'You can delete only your account!'));
  }

  // Deleting the user account from the database
  await User.findByIdAndDelete(req.params.id);

  // Sending a success response
  res.status(200).send('Account deleted.');
};

// Function to get user details by id
export const getUser = async (req, res, next) => {
  // Finding the user by id
  const user = await User.findById(req.params.id);

  // Sending a success response with the user details
  res.status(200).send(user);
};
