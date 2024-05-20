// Importing necessary modules
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating an Order Schema
const OrderSchema = new Schema(
  {
    // ID of the gig associated with the order
    gigId: {
      type: String,
      required: true,
    },
    // Image URL associated with the gig (optional)
    img: {
      type: String,
      required: false,
    },
    // Title of the gig
    title: {
      type: String,
      required: true,
    },
    // Price of the gig
    price: {
      type: Number,
      required: true,
    },
    // Seller's user ID associated with the order
    sellerId: {
      type: String,
      required: true,
    },
    // Buyer's user ID associated with the order
    buyerId: {
      type: String,
      required: true,
    },
    // Flag indicating whether the order is completed
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // Payment intent ID associated with the order
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    // Enabling automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Creating and exporting the Order model
export default mongoose.model('Order', OrderSchema);
