import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaInfo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardSettings = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resData.success) {
        toast.success("Your account has been deleted");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`/api/user/change-password/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (resData.success) {
        toast.success("Your password has been changed");
        navigate("/dashboard?tab=profile");
        return;
      }

      toast.error(resData.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-0 flex items-center flex-col ">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <div className="mt-8 w-full md:w-1/2">
        <form>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Email Preferences</h2>
            <p className="text-gray-500 text-sm">
              You are currently receiving all emails. You can adjust these
            </p>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold" htmlFor="email">
                Email
              </Label>
              <TextInput
                type="email"
                id="email"
                color={"gray"}
                defaultValue={user.email}
              />
            </div>
            <Button gradientDuoTone={"purpleToBlue"} outline>
              Update
            </Button>
            <Button gradientDuoTone={"pinkToOrange"} outline>
              Unsubscribe
            </Button>
            <Alert color={"failure"} icon={FaInfo}>
              The Newsletter has not been implemented yet.
            </Alert>
          </div>
        </form>

        <form onSubmit={handleChangePassword}>
          <div className="flex flex-col gap-4">
            <div className="mt-8 flex flex-col gap-4">
              <h2 className="text-xl font-bold">Change Password</h2>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold" htmlFor="password">
                  Password
                </Label>
                <TextInput
                  type="password"
                  id="password"
                  color={"gray"}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm font-semibold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </Label>
                <TextInput
                  type="password"
                  id="confirmPassword"
                  color={"gray"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button gradientDuoTone={"purpleToBlue"} outline type="submit">
              Change Password
            </Button>
          </div>
        </form>
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Delete Account</h2>
          <p className="text-gray-500 text-sm">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            gradientDuoTone={"pinkToOrange"}
            outline
            onClick={() => setOpenModal(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      <Modal show={openModal}>
        <Modal.Header>Delete Account</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone={"pinkToOrange"}
            onClick={() => {
              handleDeleteUser();
              setOpenModal(false);
            }}
          >
            Delete
          </Button>
          <Button
            gradientDuoTone={"purpleToBlue"}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardSettings;
