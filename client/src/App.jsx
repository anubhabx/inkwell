import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import FooterCustom from "./components/FooterCustom";
import { Slide, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectRoute from "./components/ProtectRoute";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

const App = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<ProtectRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Route>
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <FooterCustom />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={theme === "light" ? "light" : "dark"}
        transition={Slide}
      />
    </>
  );
};

export default App;
