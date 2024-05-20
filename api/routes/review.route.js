// Importing necessary modules
import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {
  createReview,
  getReviews,
  deleteReview,
} from '../controllers/review.controller.js';

// Creating an Express router
const router = express.Router();

// Route to create a new review (protected by JWT verification)
router.post('/', verifyToken, createReview);

// Route to get reviews for a specific gig by gig ID
router.get('/:gigId', getReviews);

// Route to delete a review by review ID (protected by JWT verification)
router.delete('/:id', deleteReview);

// Exporting the router
export default router;
