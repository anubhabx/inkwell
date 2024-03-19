import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row p-4 rounded-lg bg-blue-50 bg-opacity-5 hover:bg-opacity-10 transition-opacity duration-200">
      <img
        src={post.img}
        alt={post.title}
        className="aspect-video object-cover w-full md:max-w-56 rounded-lg "
      />
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-serif my-2">{post.title}</h2>
        <p className="text-gray-500">{post.category.split("_").join("")}</p>
        <Button color={"gray"} pill className="w-full">
          <Link to={`/post/${post.slug}`}>Read article</Link>
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
