import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/get-posts", getPosts);
router.delete("/delete-post/:postId", verifyToken, deletePost);
router.put("/update-post/:postId", verifyToken, updatePost);

export default router;
