import express from "express";
import {
  googleAuth,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleAuth);
router.get("/sign-out", signOut);

export default router;
