import React from "react";

import { FaTelegram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" fixed bottom-4 right-4 inline-block">
      <a
        className="text-gray-300 hover:text-gray-500 xl:m-1 xl:float-right"
        href="https://github.com/ILapshin"
      >
        <FaGithub size="1.5em" />
      </a>
      <a
        className="text-gray-300 hover:text-gray-500 xl:m-1 xl:float-right"
        href="https://www.linkedin.com/in/ilapshin/"
      >
        <FaLinkedin size="1.5em" />
      </a>

      <a
        className="text-gray-300 hover:text-gray-500 xl:m-1 xl:float-right"
        href="https://t.me/igor_1559"
      >
        <FaTelegram size="1.5em" />
      </a>
      <a
        className="text-gray-300 hover:text-gray-500 xl:m-1 xl:float-right"
        href="mailto:igorlapshin@list.ru"
      >
        <FaEnvelope size="1.5em" />
      </a>
    </div>
  );
};

export default Footer;
