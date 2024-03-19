import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { toast } from "react-toastify";
import { signOutStart } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const pathName = useLocation().pathname;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl || "");
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search${searchQuery ? `?${searchQuery}` : ""}`);
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
    <>
      <Navbar className="p-4">
        <Navbar.Brand as={Link} to="/">
          <span
            className={`bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent text-2xl font-bold`}
          >
            InkWell
          </span>
        </Navbar.Brand>

        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="Search"
            className="hidden lg:inline"
            rightIcon={MdSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <Button
          pill
          color="gray"
          className="lg:hidden"
          onClick={() => setOpenSearch((prev) => !prev)}
        >
          <MdSearch size={"1.2em"} />
        </Button>

        <div className="flex gap-4 md:order-2">
          <Button pill color="gray" onClick={() => dispatch(toggleTheme())}>
            <FaMoon />
          </Button>
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img={user.profilePicture}
                  alt="Profile_Picture"
                  rounded
                  className="cursor-pointer object-cover"
                />
              }
              dismissOnClick={true}
              className="min-w-56"
            >
              <Dropdown.Header>
                <span className="text-sm font-bold text-gray-300">
                  {user.username}
                </span>
              </Dropdown.Header>
              <Dropdown.Header>
                <span className="text-xs truncate font-semibold">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/dashboard?tab=profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button pill outline gradientDuoTone={"purpleToBlue"}>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          )}
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" active={pathName === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} to="/search" active={pathName === "/search"}>
            Blogs
          </Navbar.Link>
          <Navbar.Link as={Link} to="/about" active={pathName === "/about"}>
            About
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {
        /* Mobile Search */
        openSearch && (
          <form onSubmit={handleSubmit} className="flex gap-4 w-full p-4">
            <TextInput
              placeholder="Search"
              className="w-full"
              rightIcon={MdSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button gradientDuoTone={"purpleToBlue"} outline type="submit">
              Search
            </Button>
          </form>
        )
      }
    </>
  );
};

export default Header;
