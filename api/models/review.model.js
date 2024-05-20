// Importing necessary modules
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating a Review Schema
const ReviewSchema = new Schema(
  {
    // ID of the gig associated with the review
    gigId: {
      type: String,
      required: true,
    },
    // User ID associated with the review
    userId: {
      type: String,
      required: true,
    },
    // Star rating given in the review (enum values: 1 to 5)
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    // Review description
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

// Creating and exporting the Review model
export default mongoose.model('Review', ReviewSchema);
