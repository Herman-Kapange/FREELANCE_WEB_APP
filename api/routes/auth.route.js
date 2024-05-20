// Importing necessary modules
import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

// Creating an Express router
const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', logout);

// Exporting the router
export default router;
