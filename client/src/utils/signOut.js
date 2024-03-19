import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const signOut = () => {
  const dispatch = useDispatch();

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
