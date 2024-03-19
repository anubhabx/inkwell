import React, { useEffect, useState } from "react";
import { Banner, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.user);

  if (user)
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch("/api/post/get-posts?limit=6", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const resData = await res.json();

          if (resData.success) setPosts(resData.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPosts();
    }, [user._id]);

  return (
    <div className="max-w-screen-md mx-auto p-4 my-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome To{" "}
          <Link to={"/"}>
            <span className="font-bold bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent">
              InkWell
            </span>
          </Link>
        </h1>
        <p className="text-gray-500">
          InkWell is a personal blog app made as a personal project using the
          MERN stack. You can find all my blogs here.
        </p>
        <Link to={"/search"} className="w-max">
          <Button gradientDuoTone={"purpleToBlue"} outline>
            View all posts
          </Button>
        </Link>
      </div>

      <Banner>
        <div className="flex flex-col gap-4 p-4 bg-gray-800 dark:bg-gray-100 dark:bg-opacity-10 bg-opacity-10 rounded-lg mt-12">
          <span className="text-gray-700 dark:text-gray-300">
            This is a personal project. You can find more of my projects on my
            GitHub
          </span>
          <Link to={"https://github.com/anubhabx"} className="w-max">
            <Button gradientDuoTone={"purpleToBlue"} outline>
              <FaGithub className="mr-2" />
              Visit GitHub
            </Button>
          </Link>
        </div>
      </Banner>

      <div className="flex flex-col gap-4 mt-12">
        <h1 className="text-2xl font-semibold font-serif">Recent Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col gap-4 justify-between p-4 w-full rounded-lg bg-gray-100 bg-opacity-5 hover:bg-opacity-10 transition-opacity duration-200"
            >
              <img
                src={post.img}
                alt={post.title}
                className="aspect-video object-cover w-full rounded-lg "
              />
              <div className="flex flex-col gap-4 w-full">
                <h2 className="text-xl font-serif">{post.title}</h2>
                <p className="text-gray-500">
                  {post.category.split("_").join("")}
                </p>
                <Link to={`/post/${post.slug}`} className="w-full">
                  <Button color={"gray"} pill className="w-full">
                    Read article
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link to={"/search"} className="flex items-center justify-center">
          <Button gradientDuoTone={"purpleToBlue"} outline>
            View all posts
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
