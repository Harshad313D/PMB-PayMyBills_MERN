// // express setup
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
// routes import
import userRouter from "./routes/userRoutes.js";
import cardsRouter from "./routes/cardsRoutes.js"
import requestRouter from "./routes/friendRequestRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
// // routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/cards", cardsRouter)
app.use("/api/v1/request", requestRouter)
app.use("/api/v1/message", messageRouter)

export default app


// we are setting socket server in app.js

