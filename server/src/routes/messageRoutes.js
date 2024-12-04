import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to send a new message
router.post("/send/:id", verifyJWT, sendMessage);

// Route to get messages for a specific conversation
router.get("/:conversationId", verifyJWT, getMessages);

export default router;
