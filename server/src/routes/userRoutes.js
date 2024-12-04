import { Router } from "express";
import {  loginUser, registerUser, logoutUser, getUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();
router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getUserProfile").post(verifyJWT, getUserProfile )

export default router;