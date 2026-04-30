import express from "express";
import { registerUser, loginUser, verifyUser, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
