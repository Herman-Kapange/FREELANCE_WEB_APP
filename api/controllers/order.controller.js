// Importing necessary modules and files
import createError from '../utils/createError.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from 'stripe';

// Function to create a payment intent for a gig
export const intent = async (req, res, next) => {
  // Creating a new instance of the Stripe SDK with the provided API key
  const stripe = new Stripe(process.env.STRIPE);

  // Finding the gig by its id
  const gig = await Gig.findById(req.params.id);

  // Creating a payment intent for the gig
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100, // Converting price to cents
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // Creating a new order based on the gig and payment intent information
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  // Saving the new order to the database
  await newOrder.save();

  // Sending a success response with the client secret for the payment intent
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// Function to get completed orders for a user (seller or buyer)
export const getOrders = async (req, res, next) => {
  try {
    // Finding orders based on the user type (seller or buyer) and completed status
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    // Sending a success response with the found orders
    res.status(200).send(orders);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to confirm and mark an order as completed
export const confirm = async (req, res, next) => {
  try {
    // Updating the order to mark it as completed based on the provided payment intent
    await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    // Sending a success response
    res.status(200).send('Order has been confirmed.');
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};
