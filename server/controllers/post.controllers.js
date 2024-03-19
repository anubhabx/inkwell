import Post from "../models/post.model.js";
import { handleError } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    next(handleError(400, "Title and content are required"));
  }

  const titleExists = await Post.findOne({ title: req.body.title });

  if (titleExists) {
    next(handleError(400, "A post with this title already exists"));
  }

  const slug = req.body.title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: savedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const skip = parseInt(req.query.skip) || 0;
    const sortingOrder = req.query.order === "desc" ? -1 : 1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortingOrder })
      .limit(limit)
      .skip(skip);

    if (!posts) {
      next(handleError(404, "No posts found"));
    }

    const totalPosts = await Post.countDocuments();

    const dateToday = new Date();

    const oneMonthAgo = new Date(
      dateToday.getFullYear(),
      dateToday.getMonth() - 1,
      dateToday.getDate()
    );

    const postsInLastMonth = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    }).countDocuments();

    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
      postsInLastMonth,
      totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);

    if (!post) {
      return next(handleError(404, "Post not found"));
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (req.role !== "admin" || req.userId !== req.body.userId) {
    return next(handleError(403, "You are not allowed to perform this action"));
  }

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          ...req.body,
          slug: req.body.title
            .toLowerCase()
            .split(" ")
            .join("-")
            .replace(/[^a-zA-Z0-9-]/g, "-"),
        },
      },
      { new: true }
    );

    if (!post) {
      return next(handleError(404, "Post not found"));
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
