import { Avatar, Button, Modal, Table, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [deleteUser, setDeleteUser] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/get-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          setUsers(resData.data);
          if (resData.data.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user.role === "admin") fetchUsers();
  }, [users.length, user.role]);

  const handleShowMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/get-users?skip=${users.length}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.success) {
        setUsers([...users, ...resData.data]);
        if (resData.data.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (user.role !== "admin") return;

    try {
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.success) {
        newUsers = users.filter((user) => user._id !== id);
        setUsers(newUsers);
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-center">Current Users</h1>

      {!users && !loading && <p className="text-center">No users found</p>}

      <div className="table-auto items-center flex flex-col gap-4">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Profile Picture</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-700">
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  <Avatar
                    img={user.profilePicture}
                    rounded
                    className="object-cover"
                  />
                </Table.Cell>
                <Table.Cell className="text-white">{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell className="text-white">{user.role}</Table.Cell>
                <Table.Cell>
                  <Button
                    gradientDuoTone={"pinkToOrange"}
                    outline
                    onClick={() => {
                      setDeleteUser(user._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {showMore && (
          <Button gradientDuoTone={"purpleToBlue"} onClick={handleShowMore}>
            Show More
          </Button>
        )}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Delete User</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              gradientDuoTone={"pinkToOrange"}
              onClick={() => {
                handleDeleteUser(deleteUser);
                setShowModal(false);
              }}
            >
              Delete
            </Button>
            <Button
              gradientDuoTone={"purpleToBlue"}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {loading && <FaSpinner className="animate-spin mx-auto" />}
    </div>
  );
};

export default DashboardUsers;
