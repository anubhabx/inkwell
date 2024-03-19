import mongoose from "mongoose";
import { generateCoverPhoto } from "../utils/generateCoverPhoto.js";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    img: {
      type: String,
      default: generateCoverPhoto(),
    },
    likes: {
      type: Array,
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
