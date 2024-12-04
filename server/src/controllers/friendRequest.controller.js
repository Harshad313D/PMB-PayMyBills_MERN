import { FriendRequest } from '../models/request.model.js';
import { User } from "../models/user.model.js";

// Send Friend Request
export const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const existingRequest = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already exists.' });
    }

    const friendRequest = new FriendRequest({ sender: senderId, receiver: receiverId });
    await friendRequest.save();

    res.status(200).json({ message: 'Friend request sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    request.status = 'accepted';
    await request.save();

    await User.findByIdAndUpdate(request.sender, { $push: { friends: request.receiver } });
    await User.findByIdAndUpdate(request.receiver, { $push: { friends: request.sender } });

    res.status(200).json({ message: 'Friend request accepted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject Friend Request
export const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    request.status = 'rejected';
    await request.save();

    res.status(200).json({ message: 'Friend request rejected.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Friend Requests
export const getFriendRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await FriendRequest.find({ receiver: userId, status: 'pending' }).populate('sender', 'fullName username email');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getReceivers = async(req, res)=>{
  try {
    const { sender } = req.body;

    if (!sender) {
      return res.status(400).json({ error: "Sender ID is required" });
    }

    // Find all documents with the given sender and status 'accepted'
    const results = await FriendRequest.find({ sender, status: "accepted" });

    // Extract only the receiver IDs
    const receiverIds = results.map((item) => item.receiver);

    const receiversData = await User.findOne({ _id: { $in: receiverIds } });


    res.status(200).json({ receiversData});
  } catch (error) {
    console.error("Error fetching receiver IDs:", error);
    res.status(500).json({ error: "Server error" });
  }
}


