// Importing necessary modules
import express from 'express';
import { deleteUser, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

// Creating an Express router
const router = express.Router();

// Route to delete a user by user ID (protected by JWT verification)
router.delete('/:id', verifyToken, deleteUser);

// Route to get user information by user ID (protected by JWT verification)
router.get('/:id', getUser);

// Exporting the router
export default router;
