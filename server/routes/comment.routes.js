import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
} from "../controllers/comment.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create-comment", verifyToken, createComment);
router.get("/post-comments/:postId", verifyToken, getPostComments);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);
router.patch("/edit-comment/:commentId", verifyToken, editComment);

export default router;
