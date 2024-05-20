// Importing necessary modules and files
import createError from '../utils/createError.js';
import Conversation from '../models/conversation.model.js';

// Function to create a new conversation
export const createConversation = async (req, res, next) => {
  // Creating a new Conversation instance based on the request data
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    // Saving the new conversation to the database
    const savedConversation = await newConversation.save();

    // Sending a success response with the saved conversation
    res.status(201).send(savedConversation);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to update a conversation's read status
export const updateConversation = async (req, res, next) => {
  try {
    // Finding and updating a conversation based on its id
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // Updating the readBySeller or readByBuyer based on the user type
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true } // Returning the updated document
    );

    // Sending a success response with the updated conversation
    res.status(200).send(updatedConversation);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to get a single conversation by its id
export const getSingleConversation = async (req, res, next) => {
  try {
    // Finding a conversation based on its id
    const conversation = await Conversation.findOne({ id: req.params.id });

    // Handling the case where the conversation is not found
    if (!conversation) return next(createError(404, 'Not found!'));

    // Sending a success response with the found conversation
    res.status(200).send(conversation);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to get all conversations for a user
export const getConversations = async (req, res, next) => {
  try {
    // Finding conversations based on the user type (seller or buyer)
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 }); // Sorting conversations by updatedAt in descending order

    // Sending a success response with the found conversations
    res.status(200).send(conversations);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};
