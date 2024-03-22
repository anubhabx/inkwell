import React, { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaArrowUp, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Card, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardPosts = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [postData, setPostData] = useState({
    postsInLastMonth: 0,
    totalPosts: 0,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/get-posts?userId=${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          setPosts(resData.data);
          setPostData({
            postsInLastMonth: resData.postsInLastMonth,
            totalPosts: resData.totalPosts,
          });
          if (resData.data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user.role === "admin") {
      fetchPosts();
    }
  }, [user._id]);

  const handleShowMore = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/post/get-posts?userId=${user._id}&skip=${posts.length}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await res.json();

      if (resData.success) {
        setPosts([...posts, ...resData.data]);
        if (resData.data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      setShowModal(false);
      const res = await fetch(`/api/post/delete-post/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.success) {
        toast.success(resData.message);
        setPosts(posts.filter((post) => post._id !== postIdToDelete));
      } else {
        toast.error(resData.message);
      }

      if (posts.length === 1) {
        setPosts(null);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPostIdToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md px-4 flex flex-col items-center gap-4">
      {postData && (
        <div className="flex w-full items-center gap-5">
          <Card className="flex-grow">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Total Posts
            </p>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {postData.totalPosts}
            </h5>
          </Card>
          <Card className="flex-grow">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Posts in Last Month
            </p>
            <h5 className="text-2xl flex items-center gap-4 font-bold tracking-tight text-gray-900 dark:text-white">
              {postData.postsInLastMonth}
              <FaArrowAltCircleUp size={".8em"} color="green" />
            </h5>
          </Card>
        </div>
      )}
      <h1 className="text-2xl font-bold">Posts from {user.username}</h1>
      {!posts && !loading && (
        <>
          <p className="text-xl font-bold">No posts found</p>
          <Button
            gradientDuoTone={"purpleToBlue"}
            outline
            as={Link}
            to={"/create-post"}
          >
            Create Post
          </Button>
        </>
      )}
      {posts && posts.length > 0 && (
        <div className="flex flex-col gap-3 items-center w-full">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex gap-3 w-full p-4 flex-col md:flex-row rounded-md shadow-md transition duration-300 bg-blue-100 ease-in-out bg-opacity-5 hover:bg-opacity-10"
            >
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <Link to={`/post/${post.slug}`} className="text-xl font-bold">
                  <img
                    src={post.img}
                    alt="Post Image"
                    className="w-full min-w-32 md:w-32 aspect-video object-cover rounded-md bg-gray-300"
                  />
                </Link>
                <div className="flex flex-col justify-between gap-4 flex-grow">
                  <Link
                    to={`/post/${post.slug}`}
                    className="text-base font-semibold text-white"
                  >
                    {post.title}
                  </Link>
                  <Link
                    to={`/posts/category/${post.category}`}
                    className="text-sm text-gray-500"
                  >
                    {post.category}
                  </Link>
                </div>
              </div>
              <div className="flex gap-2 md:flex-row justify-end">
                <Link to={`/edit-post/${post._id}`}>
                  <Button gradientDuoTone={"purpleToBlue"} outline>
                    Edit
                  </Button>
                </Link>
                <div>
                  <Button
                    gradientDuoTone={"pinkToOrange"}
                    outline
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {loading && <FaSpinner className="animate-spin" />}
      {showMore && (
        <Button
          gradientDuoTone={"purpleToBlue"}
          outline
          onClick={handleShowMore}
        >
          Show More
        </Button>
      )}
      <Modal show={showModal}>
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone={"pinkToOrange"} onClick={handleDeletePost}>
            Yes
          </Button>
          <Button
            gradientDuoTone={"purpleToBlue"}
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardPosts;
