import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

const OAuth = () => {
  const path = useLocation().pathname;
  const auth = getAuth(app);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleOAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      dispath(signInStart());

      const responseFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: responseFromGoogle.user.displayName,
          email: responseFromGoogle.user.email,
          googlePhotoUrl: responseFromGoogle.user.photoURL,
        }),
      });

      const resData = await res.json();

      if (resData.success === false) {
        dispath(signInFailure(resData.message));
        return;
      }

      dispath(signInSuccess(resData.data));
      toast.success(`Welcome back, ${resData.data.username}!`);
      navigate("/");
    } catch (error) {
      dispath(signInFailure(error.message));
    }
  };

  return (
    <Button gradientDuoTone={"pinkToOrange"} outline onClick={handleOAuth}>
      <FaGoogle className="mr-2" />
      <span>Sign {path === "/sign-up" ? "Up" : "In"} with Google</span>
    </Button>
  );
};

export default OAuth;
