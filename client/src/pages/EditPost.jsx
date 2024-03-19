import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Alert,
  Button,
  FileInput,
  Label,
  Progress,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import app from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { user } = useSelector((state) => state.user);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formError, setFormError] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/get-posts?postId=${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          const post = resData.data[0];
          setTitle(post.title);
          setCategory(post.category);
          setContent(post.content);
          setImageFileUrl(post.img);
          return;
        }

        setFormError(resData.message);
      };

      fetchPost();
    } catch (error) {
      console.error(error.message);
    }
  }, [postId]);

  useEffect(() => {
    if (imageFile) {
      handleImageUpload();
    }
  }, [imageFile]);

  const handleImageUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, `post-images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setFormError("An error occurred while uploading the file");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setFormError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/post/update-post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          title,
          category,
          content,
          img: imageFileUrl,
        }),
      });

      const resData = await res.json();

      if (resData.success) {
        toast.success(resData.message);
        // navigate("/dashboard?tab=posts");
        navigate(`/post/${resData.data.slug}`);
        return;
      }

      toast.error(resData.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 px-4">
      <h1 className="text-3xl font-bold text-center">Create Post</h1>
      <div className="max-w-screen-lg mx-auto px-4 md:px-0">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <div className="flex flex-col gap-2 flex-grow">
              <Label className="text-sm font-semibold" htmlFor="title">
                Title
              </Label>
              <TextInput
                value={title}
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 min-w-32">
              <Label className="text-sm font-semibold" htmlFor="category">
                Category
              </Label>
              <Select
                value={category}
                id="category"
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-56"
              >
                <option value="uncategorized">Select a category</option>
                <option value="nextjs">Next.JS</option>
                <option value="reactjs">React.JS</option>
                <option value="tailwindcss">Tailwind CSS</option>
                <option value="firebase">Firebase</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="nodejs">Node.JS</option>
                <option value="expressjs">Express.JS</option>
                <option value="mongodb">MongoDB</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FileInput
              type="file"
              accept="image/*"
              onInput={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                }
              }}
            />
            {imageUploadProgress && <Progress progress={imageUploadProgress} />}
            {imageFileUrl && (
              <img
                src={imageFileUrl}
                alt="Post"
                className="w-full h-96 object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold" htmlFor="content">
              Content
            </Label>
            <ReactQuill
              theme="snow"
              id="content"
              className="w-full h-96 mb-12"
              required
              value={content}
              onChange={(value) => setContent(value)}
            />
            {formError && <Alert color={"failure"}>{formError}</Alert>}
            <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
              {loading ? (
                <FaSpinner className="animate-spin w-5 h-5" />
              ) : (
                "Update Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
