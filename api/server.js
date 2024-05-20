// Importing necessary modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import gigRoute from './routes/gig.route.js';
import orderRoute from './routes/order.route.js';
import conversationRoute from './routes/conversation.route.js';
import messageRoute from './routes/message.route.js';
import reviewRoute from './routes/review.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Initializing the Express application
const app = express();
dotenv.config(); // Configuring dotenv to load environment variables
mongoose.set('strictQuery', true); // Setting strict mode for Mongoose queries

// Function to connect to MongoDB
const connect = async () => {
  try {
    // Attempting to connect to MongoDB using the connection string from the environment variables
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
};

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware to parse JSON in request bodies
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Routing middleware for various API endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  // Extracting status code and error message from the error object or using defaults
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  // Sending the error response
  return res.status(errorStatus).send(errorMessage);
});

// Starting the server and listening on port 8800
app.listen(8800, () => {
  // Connecting to MongoDB when the server starts
  connect();
  console.log('Backend server is running on port 8800!');
});
