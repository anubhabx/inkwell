import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

const FooterCustom = () => {
  return (
    <Footer container className="border-t-4 border-blue-500 mt-12 md:mt-0">
      <div className="flex flex-col gap-5 justify-between w-full">
        <div className="w-full md:flex justify-between">
          <div className="max-w-72">
            <Link className="font-bold text-2xl">
              <span
                className={`bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent text-2xl font-bold`}
              >
                InkWell
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              A personal project for me to share my projects and thoughts with
              the world.
            </p>
          </div>
          <div className="flex flex-wrap gap-24 mt-6 md:mt-0">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link as={Link} to="/about">
                  About
                </Footer.Link>
                <Footer.Link as={Link} to="/contact">
                  Contact
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  as={Link}
                  to="https://github.com/anubhabx"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github
                </Footer.Link>
                <Footer.Link as={Link} to="/contact"></Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="w-full" />
        <div className="flex flex-col gap-5 md:flex-row">
          <Footer.Copyright
            href="#"
            by="InkWell"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-5">
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon
              href="https://github.com/anubhabx"
              target="_blank"
              rel="noreferrer noopener"
              icon={BsGithub}
            />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsLinkedin} />
            <Footer.Icon icon={BsTwitterX} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCustom;
