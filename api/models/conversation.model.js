// Importing necessary modules
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating a Conversation Schema
const ConversationSchema = new Schema(
  {
    // Unique identifier for the conversation
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // Seller's user ID associated with the conversation
    sellerId: {
      type: String,
      required: true,
    },
    // Buyer's user ID associated with the conversation
    buyerId: {
      type: String,
      required: true,
    },
    // Flag indicating whether the seller has read the conversation
    readBySeller: {
      type: Boolean,
      required: true,
    },
    // Flag indicating whether the buyer has read the conversation
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    // Optional: Last message in the conversation
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    // Enabling automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Creating and exporting the Conversation model
export default mongoose.model('Conversation', ConversationSchema);
