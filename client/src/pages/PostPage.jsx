import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/get-posts?slug=${slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          setPost(resData.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!post)
    return (
      <div className="max-w-screen-md mx-auto flex flex-col gap-5 my-12 px-4">
        <h1 className="text-center text-xl sm:text-2xl font-serif leading-normal max-w-2xl mx-auto md:text-3xl">
          Post not found
        </h1>
      </div>
    );

  return (
    <div className="max-w-screen-md mx-auto flex flex-col gap-5 my-12 px-4">
      <h1 className="text-center text-xl sm:text-2xl font-serif leading-normal max-w-2xl mx-auto md:text-3xl">
        {post.title}
      </h1>
      <Link to={`/user/${post.userId}`} className="self-center">
        <Button color="gray" pill size="sm">
          {post.category}
        </Button>
      </Link>

      <img src={post.img} alt={post.title} className="w-full aspect-video" />

      <div className="flex justify-between items-center border-b-[0.5px] pb-4 border-b-slate-500 text-slate-400 text-sm">
        <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
        <p>{Math.ceil(post.content.split(" ").length / 200)} min read</p>
      </div>

      <div
        className="max-w-2xl mx-auto post-content text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostPage;
