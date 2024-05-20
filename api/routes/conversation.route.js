// Importing necessary modules
import express from 'express';
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from '../controllers/conversation.controller.js';
import { verifyToken } from '../middleware/jwt.js';

// Creating an Express router
const router = express.Router();

// Route to get all conversations (protected by JWT verification)
router.get('/', verifyToken, getConversations);

// Route to create a new conversation (protected by JWT verification)
router.post('/', verifyToken, createConversation);

// Route to get a single conversation by ID (protected by JWT verification)
router.get('/single/:id', verifyToken, getSingleConversation);

// Route to update a conversation by ID (protected by JWT verification)
router.put('/:id', verifyToken, updateConversation);

// Exporting the router
export default router;
