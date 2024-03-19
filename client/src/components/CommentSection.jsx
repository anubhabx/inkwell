import { Avatar, Button, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { user } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/comment/post-comments/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          setComments(resData.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    try {
      const res = await fetch("/api/comment/create-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, postId, comment }),
      });

      const resData = await res.json();

      if (resData.success) {
        setComments((prevComments) => [resData.data, ...prevComments]);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col mt-4">
      {user ? (
        <div className="flex items-center text-sm gap-3 text-gray-500">
          <p>Signed in as</p>
          <Avatar
            img={user.profilePicture}
            alt={user.username}
            size="xs"
            rounded
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-black dark:text-white"
          >
            @{user.username}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-center text-sm">
            You must be logged in to comment
          </p>
          <Link to="/sign-in">
            <Button gradientDuoTone={"purpleToBlue"} outline>
              Sign in
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-4">
        <Textarea
          type="text"
          placeholder="Write a comment..."
          className="w-full"
          rows={5}
          required
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {500 - comment.trim(" ").length} characters left
          </p>
          <Button
            gradientDuoTone={"purpleToBlue"}
            outline
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm self-center text-center text-gray-500">
            No comments yet
          </p>
        ) : (
          <>
            <div className="flex gap-3 items-center">
              <h1 className="text-base">Comments</h1>
              <span className="text-xs border px-2 py-1 rounded-md my-4">
                {comments.length}
              </span>
            </div>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                setComments={setComments}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
