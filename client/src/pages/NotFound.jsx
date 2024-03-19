import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center flex-col py-12 px-4">
      <h1 className="text-4xl font-serif font-bold">404</h1>
      <p className="text-center text-gray-500 mt-2">
        This page you are trying to visit either does not exist or cannot be
        reached at the moment.
      </p>
      <Link to="/">
        <Button gradientDuoTone={"purpleToBlue"} outline className="mt-4">
          Go back to home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
