// Importing necessary modules and files
import Gig from '../models/gig.model.js';
import createError from '../utils/createError.js';

// Function to create a new gig
export const createGig = async (req, res, next) => {
  // Checking if the user is a seller; only sellers can create a gig
  if (!req.isSeller)
    return next(createError(403, 'Only sellers can create a gig!'));

  // Creating a new Gig instance based on the request data
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    // Saving the new gig to the database
    const savedGig = await newGig.save();

    // Sending a success response with the saved gig
    res.status(201).json(savedGig);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to delete a gig
export const deleteGig = async (req, res, next) => {
  try {
    // Finding the gig by its id
    const gig = await Gig.findById(req.params.id);

    // Checking if the user is the owner of the gig; only owners can delete their gigs
    if (gig.userId !== req.userId)
      return next(createError(403, 'You can delete only your gig!'));

    // Deleting the gig from the database
    await Gig.findByIdAndDelete(req.params.id);

    // Sending a success response
    res.status(200).send('Gig has been deleted!');
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to get a single gig by its id
export const getGig = async (req, res, next) => {
  try {
    // Finding a gig by its id
    const gig = await Gig.findById(req.params.id);

    // Handling the case where the gig is not found
    if (!gig) next(createError(404, 'Gig not found!'));

    // Sending a success response with the found gig
    res.status(200).send(gig);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to get a list of gigs based on filters and sorting
export const getGigs = async (req, res, next) => {
  const q = req.query;

  // Creating filters based on query parameters
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
  };

  try {
    // Finding gigs based on the filters and sorting them
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });

    // Sending a success response with the found gigs
    res.status(200).send(gigs);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};
