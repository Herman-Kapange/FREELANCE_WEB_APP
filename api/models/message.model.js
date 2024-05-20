// Importing necessary modules
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating a Message Schema
const MessageSchema = new Schema(
  {
    // ID of the conversation associated with the message
    conversationId: {
      type: String,
      required: true,
    },
    // User ID associated with the message
    userId: {
      type: String,
      required: true,
    },
    // Message content
    desc: {
      type: String,
      required: true,
    },
  },
  {
    // Enabling automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Creating and exporting the Message model
export default mongoose.model('Message', MessageSchema);
