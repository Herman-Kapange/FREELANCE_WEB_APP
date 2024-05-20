// Importing necessary modules
import express from 'express';
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

// Creating an Express router
const router = express.Router();

// Route to create a new gig (protected by JWT verification)
router.post('/', verifyToken, createGig);

// Route to delete a gig by ID (protected by JWT verification)
router.delete('/:id', verifyToken, deleteGig);

// Route to get a single gig by ID
router.get('/single/:id', getGig);

// Route to get all gigs
router.get('/', getGigs);

// Exporting the router
export default router;
