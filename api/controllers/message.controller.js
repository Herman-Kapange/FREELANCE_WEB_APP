// Importing necessary modules and files
import createError from '../utils/createError.js';
import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

// Function to create a new message
export const createMessage = async (req, res, next) => {
  // Creating a new Message instance based on the request data
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    // Saving the new message to the database
    const savedMessage = await newMessage.save();

    // Updating the conversation associated with the message
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true } // Returning the updated document
    );

    // Sending a success response with the saved message
    res.status(201).send(savedMessage);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};

// Function to get messages for a specific conversation
export const getMessages = async (req, res, next) => {
  try {
    // Finding messages based on the conversationId
    const messages = await Message.find({ conversationId: req.params.id });

    // Sending a success response with the found messages
    res.status(200).send(messages);
  } catch (err) {
    // Passing any errors to the next middleware
    next(err);
  }
};
