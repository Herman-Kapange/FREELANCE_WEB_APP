// Importing necessary modules
import express from 'express';
import {
  createMessage,
  getMessages,
} from '../controllers/message.controller.js';
import { verifyToken } from '../middleware/jwt.js';

// Creating an Express router
const router = express.Router();

// Route to create a new message (protected by JWT verification)
router.post('/', verifyToken, createMessage);

// Route to get messages for a specific conversation by ID (protected by JWT verification)
router.get('/:id', verifyToken, getMessages);

// Exporting the router
export default router;
