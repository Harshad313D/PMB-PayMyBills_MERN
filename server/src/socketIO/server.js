import dotenv from "dotenv";
import app from "../app.js"; // Import the app instance
import connectDB from "../db/indexDB.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Configure dotenv to read environment variables
dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => {
    // Create an HTTP server to use with both the app and Socket.IO
    const server = createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Allow the specified origin (set a default for dev)
        methods: ["GET", "POST"],
        credentials: true, // Allow credentials such as cookies
      },
    });

    // Add Socket.IO to the app instance (to make io available in routes/controllers)
    app.use((req, res, next) => {
      req.io = io; // Add the io instance to request object
      next();
    });

    // Socket.IO event handling
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Listen for a user joining a conversation
      socket.on("joinConversation", (conversationId) => {
        if (conversationId) {
          socket.join(conversationId);
          console.log(`User ${socket.id} joined conversation: ${conversationId}`);
        } else {
          console.error("Invalid conversationId received");
        }
      });

      // Listen for user disconnection
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    // Start the server
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
