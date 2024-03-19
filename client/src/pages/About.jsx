import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="my-12 max-w-screen-md mx-auto flex flex-col gap-6">
      <h1 className="font-serif text-2xl font-semibold">About this project</h1>
      <p className="text-gray-500">
        This project is a full-stack web application built with the MERN stack.
        It is a simple blog application where users can create, read, update,
        and delete posts. The frontend is built with{" "}
        <Link to={"react.dev"} target="_blank" className="text-blue-500">
          React
        </Link>
        ,{" "}
        <Link to={"tailwindcss.com"} target="_blank" className="text-blue-500">
          Tailwind CSS
        </Link>
        , and{" "}
        <Link className="text-blue-500" target="_blank" to={"redux.js.org"}>
          Redux
        </Link>
        . I have used{" "}
        <Link
          to={"flowbite-react.com"}
          target="_blank"
          className="text-blue-500"
        >
          Flowbite
        </Link>{" "}
        as the component library. The backend is built with{" "}
        <Link className="text-blue-500" target="_blank" to={"nodejs.org"}>
          Node.js
        </Link>
        ,{" "}
        <Link className="text-blue-500" target="_blank" to={"expressjs.com"}>
          Express
        </Link>
        , and{" "}
        <Link className="text-blue-500" target="_blank" to={"mongodb.com"}>
          MongoDB
        </Link>
        . The application is deployed to Heroku and Netlify. The source code is
        available on GitHub. The project is open-source and contributions are
        welcome. The project is for educational purposes only.
      </p>
      <h1 className="font-serif text-2xl font-semibold">About the developer</h1>
      <p className="text-gray-500">
        Hi, I'm{" "}
        <Link
          to={"https://github.com/anubhabx"}
          target="_blank"
          className="text-blue-500"
        >
          Anubhab Debnath
        </Link>
        . I'm a full-stack web developer. I love building web applications and
        learning new technologies. I'm passionate about open-source software and
        I love to contribute to open-source projects. I'm also a blogger and I
        love to write about web development. I'm currently learning TypeScript
        and NextJS. I'm open to new opportunities and I'm looking for a job as a
        full-stack web developer. Feel free to contact me if you have any
        questions or if you want to work with me.
      </p>
      <Button gradientDuoTone={"purpleToBlue"} outline>
        <Link to="/contact" className="w-full">
          Contact me
        </Link>
      </Button>

      <h1 className="font-serif text-2xl font-semibold">More Projects</h1>
      <p className="text-gray-500">
        I have built many projects. You can check out my projects on GitHub.
      </p>
      <Button gradientDuoTone={"purpleToBlue"} outline>
        <Link to="https://github.com/anubhabx" target="_blank">
          View Projects
        </Link>
      </Button>
    </div>
  );
};

export default About;
