import express from "express";
import {
  changePassword,
  deleteUser,
  getUser,
  getUsers,
  updateProfile,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/update/:id", verifyToken, updateProfile);
router.get("/get-users", verifyToken, getUsers);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/get-user/:userId", verifyToken, getUser);
router.put("/change-password/:id", verifyToken, changePassword);

export default router;
