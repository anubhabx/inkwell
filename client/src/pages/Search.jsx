import {
  Button,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { GoSortAsc, GoSortDesc, GoSearch } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    searchTerm: "",
    category: "uncategorized",
    sort: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const searchTermFromUrl = new URLSearchParams(location.search);
    const searchTerm = searchTermFromUrl.get("searchTerm");
    const category = searchTermFromUrl.get("category");
    const sort = searchTermFromUrl.get("sort");

    setSearchData({
      searchTerm: searchTerm || "",
      category: category || "",
      sort: sort || "desc",
    });

    setSearchData(searchTerm || category || "");

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const searchQuery = searchTermFromUrl.toString();
        const res = await fetch(`/api/post/get-posts?${searchQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.success) {
          setPosts(resData.data);
          if (resData.data.length < 9) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location.search]);

  const handleSearchDataChange = (e) => {
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleShowMore = async () => {
    try {
      setLoading(true);
      const skip = posts.length;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("skip", skip);
      const res = await fetch(`/api/post/get-posts?${urlParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.success) {
        setPosts((prevPosts) => [...prevPosts, ...resData.data]);
        if (resData.data.length < 9) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm || "");
    urlParams.set("category", searchData.category || "");
    urlParams.set("sort", searchData.sort || "desc");
    const searchQuery = urlParams.toString();
    setSearchQuery(searchData.searchTerm || searchData.category || "");
    navigate(`/search${searchQuery ? `?${searchQuery}` : ""}`);
  };

  return (
    <div className="flex flex-col gap-4 my-12 px-4 max-w-screen-md mx-auto">
      <h1 className="text-center text-3xl font-serif leading-normal max-w-2xl mx-auto md:text-4xl">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : "Showing all posts"}
      </h1>
      <form>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <TextInput
            id="searchTerm"
            placeholder="Search"
            className="flex-grow"
            onChange={handleSearchDataChange}
            value={searchData.searchTerm}
          />
          <Select
            onChange={handleSearchDataChange}
            id="category"
            value={searchData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="next_js">Next.JS</option>
            <option value="react_js">React.JS</option>
            <option value="tailwind_css">Tailwind CSS</option>
            <option value="firebase">Firebase</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="node_js">Node.JS</option>
            <option value="express_js">Express.JS</option>
            <option value="mongo_db">MongoDB</option>
          </Select>
          <Select
            icon={searchData.sort === "asc" ? GoSortAsc : GoSortDesc}
            id="sort"
            onChange={handleSearchDataChange}
            value={searchData.sort}
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Select>
          <Button color="gray" pill onClick={handleSearch}>
            <GoSearch />
          </Button>
        </div>
      </form>

      <div className="flex flex-col items-center gap-4">
        {loading && <Spinner />}

        {!loading && posts.length === 0 && (
          <h2 className="text-center text-xl font-serif">No posts found</h2>
        )}

        {!loading &&
          posts &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>

      {showMore && (
        <Button
          gradientDuoTone={"purpleToBlue"}
          className="self-center"
          onClick={handleShowMore}
          outline
        >
          Show more
        </Button>
      )}
    </div>
  );
};

export default Search;
