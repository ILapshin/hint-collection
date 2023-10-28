import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { TbLogin, TbLogout } from "react-icons/tb";
import { BiHome, BiLogIn, BiLogOut } from "react-icons/bi";

const Header = () => {
  const history = useNavigate();
  let { user, logoutUser, username, fetchUsername } = useContext(AuthContext);

  useEffect(() => {
    if (!username) {
      fetchUsername();
    }
  }, []);

  return (
    <div className=" h-12 w-fullinline-block text-lg">
      <div className="float-right mx-4 my-2">
        {!user ? (
          <div>
            <button
              className="text-xl mx-2 my-1 text-gray-300 hover:text-gray-500 "
              onClick={() => {
                history("/login/");
              }}
            >
              <BiLogIn size="1.5em" />
            </button>
          </div>
        ) : (
          <div className=" inline-block float-right">
            <div className=" text-xl mx-2 mt-1 text-gray-500 float-left">
              {username}
            </div>
            <button
              onClick={logoutUser}
              className="text-xl mx-2  my-1 text-gray-300 hover:text-gray-500 float-right"
            >
              <BiLogOut size="1.5em" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
