import express from 'express';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getReceivers
} from '../controllers/friendRequest.controller.js';

const router = express.Router();

router.post('/send', sendFriendRequest);
router.post('/accept', acceptFriendRequest);
router.post('/reject', rejectFriendRequest);
router.get('/:userId', getFriendRequests);
router.post('/get-receiveres',getReceivers);

export default router;
