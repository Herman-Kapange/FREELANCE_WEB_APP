// Importing necessary modules and files
import createError from '../utils/createError.js';
import Review from '../models/review.model.js';
import Gig from '../models/gig.model.js';

// Function to create a new review
export const createReview = async (req, res, next) => {
  // Checking if the user is a seller; sellers can't create reviews
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  // Creating a new Review instance based on the request data
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    // Checking if the user has already created a review for this gig
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, 'You have already created a review for this gig!')
      );

    // TODO: Check if the user purchased the gig (Implementation pending)

    // Saving the new review to the database
    const savedReview = await newReview.save();

    // Updating the gig to include the new review's star rating
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    // Sending a success response with the saved review
    res.status(201).send(savedReview);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to get reviews for a specific gig
export const getReviews = async (req, res, next) => {
  try {
    // Finding reviews based on the gigId
    const reviews = await Review.find({ gigId: req.params.gigId });

    // Sending a success response with the found reviews
    res.status(200).send(reviews);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to delete a review (Implementation pending)
export const deleteReview = async (req, res, next) => {
  try {
    // Implementation for deleting a review goes here
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};
