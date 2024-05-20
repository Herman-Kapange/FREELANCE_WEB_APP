// Importing necessary modules
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Creating a User Schema
const userSchema = new Schema(
  {
    // Username of the user (unique)
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Email of the user (unique)
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of the user
    password: {
      type: String,
      required: true,
    },
    // Profile image URL of the user (optional)
    img: {
      type: String,
      required: false,
    },
    // Country of the user
    country: {
      type: String,
      required: true,
    },
    // Phone number of the user (optional)
    phone: {
      type: String,
      required: false,
    },
    // Description or bio of the user (optional)
    desc: {
      type: String,
      required: false,
    },
    // Flag indicating whether the user is a seller (default: false)
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Enabling automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Creating and exporting the User model
export default mongoose.model('User', userSchema);
