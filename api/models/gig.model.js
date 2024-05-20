// Importing necessary modules
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating a Gig Schema
const GigSchema = new Schema(
  {
    // User ID associated with the gig
    userId: {
      type: String,
      required: true,
    },
    // Title of the gig
    title: {
      type: String,
      required: true,
    },
    // Description of the gig
    desc: {
      type: String,
      required: true,
    },
    // Total star rating of the gig
    totalStars: {
      type: Number,
      default: 0,
    },
    // Number of stars received by the gig
    starNumber: {
      type: Number,
      default: 0,
    },
    // Category of the gig
    cat: {
      type: String,
      required: true,
    },
    // Price of the gig
    price: {
      type: Number,
      required: true,
    },
    // Cover image URL for the gig
    cover: {
      type: String,
      required: true,
    },
    // Images associated with the gig (array of URLs)
    images: {
      type: [String],
      required: false,
    },
    // Short title for the gig
    shortTitle: {
      type: String,
      required: true,
    },
    // Short description for the gig
    shortDesc: {
      type: String,
      required: true,
    },
    // Delivery time in days for the gig
    deliveryTime: {
      type: Number,
      required: true,
    },
    // Number of revisions allowed for the gig
    revisionNumber: {
      type: Number,
      required: true,
    },
    // Features associated with the gig (array of strings)
    features: {
      type: [String],
      required: false,
    },
    // Number of sales for the gig
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    // Enabling automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Creating and exporting the Gig model
export default mongoose.model('Gig', GigSchema);
