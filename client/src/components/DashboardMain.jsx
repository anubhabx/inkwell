import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signOutStart,
} from "../redux/user/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  newUsername: z.string().optional(),
  newEmail: z.string().email().optional(),
});

const DashboardMain = () => {
  const { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formError, setFormError] = useState(null);
  const fileInputRed = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (imageFile) {
      handleImageUpload();
    }
  }, [imageFile]);

  const handleImageUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, `profile-pictures/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setFormError("An error occurred while uploading the file");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setUploadProgress(null);
        });
      }
    );
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data?.newUsername,
          email: data?.newEmail,
          profilePicture: imageFileUrl,
        }),
      });

      const resData = await res.json();

      if (!resData.success) {
        toast.error(resData.message);
        setFormError(resData.message);
        dispatch(updateFailure(resData.message));
        return;
      }

      setFormError(null);
      setIsEditing(false);
      toast.success(resData.message);
      dispatch(updateSuccess(resData.data));
    } catch (error) {
      console.log(error);
      setFormError(error.message);
    }
  };

  const signOut = () => {
    try {
      dispatch(signOutStart());

      const res = fetch("/api/auth/sign-out", {
        method: "GET",
        credentials: "include",
      });

      if (res.success) {
        toast.success("Signed out successfully");
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center flex-col mx-auto max-w-screen-md px-4 md:px-0">
      <h1 className="text-xl md:text-2xl font-semibold">
        Welcome {user.username}!{" "}
      </h1>

      <p className="text-gray-500">
        {user.role === "admin"
          ? "You have full access to the dashboard"
          : "You have limited access to the dashboard"}
      </p>

      <form className="w-full md:w-96 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img
            src={imageFileUrl || user.profilePicture}
            alt="Profile_Picture"
            className={`rounded-full w-32 h-32 mx-auto ${
              isEditing
                ? "cursor-pointer hover:border-4 hover:border-blue-500 transition-all duration-100 ease-linear"
                : "cursor-default"
            } border-2 bg-gradient-to-br from-purple-500 to-blue-500 border-transparent object-cover`}
            onClick={() => {
              isEditing && fileInputRed.current.click();
            }}
          />
          {uploadProgress && (
            <div className="flex items-center justify-center mt-2">
              <FaSpinner className="animate-spin" />
              <p className="ml-2">{uploadProgress}%</p>
            </div>
          )}
          <FileInput
            ref={fileInputRed}
            type="file"
            accept="image/*"
            className="hidden"
            onInput={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImageFile(file);
                setImageFileUrl(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <div className="mt-4">
          <Label className="text-sm font-semibold">Username</Label>
          <TextInput
            type="text"
            defaultValue={user.username}
            disabled={!isEditing}
            {...register("newUsername")}
          />
        </div>
        <div className="mt-4">
          <Label className="text-sm font-semibold">Email</Label>
          <TextInput
            type="email"
            defaultValue={user.email}
            disabled={!isEditing}
            {...register("newEmail")}
          />
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <Button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            gradientDuoTone={"purpleToBlue"}
            outline
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button type="submit" gradientDuoTone={"purpleToPink"} outline>
              Save Changes
            </Button>
          )}

          <Button
            type="button"
            onClick={signOut}
            gradientDuoTone={"purpleToPink"}
            outline
          >
            Sign Out
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DashboardMain;
