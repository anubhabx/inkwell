import { Sidebar } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiCog,
  HiDocumentText,
  HiNewspaper,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const DashboardSidebar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Sidebar className="md:max-w-72 w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            icon={HiUser}
            to="/dashboard?tab=profile"
            label={user.role === "admin" ? "Admin" : "User"}
            labelColor={user.role === "admin" ? "dark" : "blue"}
          >
            Profile
          </Sidebar.Item>
          {user.role === "admin" && (
            <>
              <Sidebar.Item
                as={Link}
                to="/dashboard?tab=posts"
                icon={HiDocumentText}
              >
                Posts
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/dashboard?tab=users"
                icon={HiUserGroup}
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/create-post" icon={HiNewspaper}>
                Create
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/dashboard?tab=settings" icon={HiCog}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowLeft}
            onClick={signOut}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
