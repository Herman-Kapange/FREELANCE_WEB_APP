// Importing necessary modules
import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import { getOrders, intent, confirm } from '../controllers/order.controller.js';

// Creating an Express router
const router = express.Router();

// Route to get all orders (protected by JWT verification)
router.get('/', verifyToken, getOrders);

// Route to create a payment intent for an order by gig ID (protected by JWT verification)
router.post('/create-payment-intent/:id', verifyToken, intent);

// Route to confirm an order (protected by JWT verification)
router.put('/', verifyToken, confirm);

// Exporting the router
export default router;
