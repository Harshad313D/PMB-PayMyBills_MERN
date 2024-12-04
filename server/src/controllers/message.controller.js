
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";


// export const sendMessage = async (req, res) => {
//   const { message } = req.body;
//   const { receiverId } = req.body; // Ensure receiverId is being sent in the request

//   try {
//     const senderId = req.user._id; // Assuming sender ID is in the authenticated user data

//     // Check if message or receiverId is missing
//     if (!message || !receiverId) {
//       return res.status(400).json({ error: 'Message and receiverId are required' });
//     }

//     // Create and save the new message
//     const newMessage = new Message({
//       sender: senderId,
//       receiver: receiverId,
//       message,
//     });

//     await newMessage.save();

//     // Find or create the conversation
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       // Create a new conversation if it doesn't exist
//       conversation = new Conversation({
//         participants: [senderId, receiverId],
//         messages: [newMessage._id],
//       });
//       await conversation.save();
//     } else {
//       // If the conversation exists, add the new message
//       conversation.messages.push(newMessage._id);
//       await conversation.save();
//     }

//     // Emit the message to the conversation using Socket.IO
//     if (req.io && conversation._id) {
//       req.io.to(conversation._id.toString()).emit('newMessage', newMessage);
//     }

//     // Return the message as a response
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log('Error sending message:', error);  // Log the error details
//     res.status(500).json({ error: error.message });
//   }
// };

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Current logged-in user ID

    // Input validation
    if (!message || !senderId || !receiverId) {
      return res.status(400).json({ error: "Message, sender, and receiver are required" });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      console.log("New conversation created");
    } else {
      console.log("Existing conversation found");
    }

    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save the conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Notify receiver via WebSocket
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};





// export const getMessages = async (req, res) => {
//   const { conversationId } = req.params;

//   try {
//     // Find the conversation and populate its messages
//     const conversation = await Conversation.findById(conversationId).populate({
//       path: "messages",
//       populate: {
//         path: "sender receiver",
//         select: "name email",
//       },
//     });

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getMessages = async (req, res) => {
  try {
    const { id: receiver } = req.params;
    const senderId = req.user._id; // current logged-in user

    // Find the conversation involving both participants
    const conversation = await Conversation.findOne({
      participants: { $in: [senderId, receiver] }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    // Return the messages if the conversation exists
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
