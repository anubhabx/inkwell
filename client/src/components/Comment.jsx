import { Avatar, Button, Modal, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const Comment = ({ comment, setComments }) => {
  const [Commenter, setCommenter] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment.comment);
  const [openModal, setOpenModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/get-user/${comment.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          setCommenter(resData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [comment]);

  const handleCommentEdit = async () => {
    try {
      const res = await fetch(`/api/comment/edit-comment/${comment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const resData = await res.json();

      if (resData.success) {
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === comment._id ? { ...c, comment: newComment } : c
          )
        );
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = async () => {
    try {
      const res = await fetch(
        `/api/comment/delete-comment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await res.json();

      if (resData.success) {
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-500 dark:bg-gray-50 dark:bg-opacity-5 bg-opacity-5 p-4">
      <div className="flex items-center gap-4">
        <Avatar img={Commenter?.profilePicture} size="md" rounded />
        <p className="text-sm font-semibold">{Commenter?.username}</p>
        <p className="text-xs text-gray-500">
          {moment(comment?.createdAt).fromNow()}
        </p>
      </div>
      {editing ? (
        <div className="flex flex-col gap-4">
          <Textarea
            type="text"
            className="w-full p-2 rounded-lg bg-gray-300 dark:bg-gray-50 dark:bg-opacity-5 bg-opacity-5"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={5}
          />
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => setEditing(false)}
              gradientDuoTone={"pinkToOrange"}
              outline
            >
              Cancel
            </Button>
            <Button
              gradientDuoTone={"purpleToBlue"}
              outline
              onClick={handleCommentEdit}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-base text-gray-300 pb-2">{comment?.comment}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {user._id === Commenter?._id && (
              <button onClick={() => setEditing(true)}>Edit</button>
            )}
            {user.role === "admin" ||
              (user._id === Commenter._id && (
                <button
                  onClick={() => {
                    setCommentIdToDelete(comment._id);
                    setOpenModal(true);
                  }}
                >
                  Delete
                </button>
              ))}
          </div>
        </>
      )}
      <Modal show={openModal}>
        <Modal.Header>
          <p className="text-lg">Delete Comment</p>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm">
            Are you sure you want to delete this comment?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone={"pinkToOrange"}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            gradientDuoTone={"purpleToBlue"}
            onClick={() => {
              setOpenModal(false);
              handleCommentDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Comment;
