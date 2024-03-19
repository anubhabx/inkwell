import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import { handleError } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { userId, postId, comment } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next(handleError(404, "Post not found"));
    }

    const newComment = new Comment({
      userId,
      postId,
      comment,
    });

    await newComment.save();

    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    if (!comments) {
      return next(handleError(404, "Comments not found"));
    }

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  try {
    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    if (!editedComment) {
      return next(handleError(404, "Comment not found"));
    }

    res.status(200).json({ success: true, data: editedComment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return next(handleError(404, "Comment not found"));
    }

    res.status(200).json({ success: true, data: deletedComment });
  } catch (error) {
    next(error);
  }
};
