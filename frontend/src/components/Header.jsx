import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { TbLogout } from "react-icons/tb";
import { BiHome } from "react-icons/bi";

const Header = () => {
  const history = useNavigate();
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className=" h-12 w-full bg-cyan-600 inline-block text-white text-lg">
      <div className="float-left mx-4 my-3 text-lg">
        <Link to={"/"}>
          <BiHome size="1.5em" />
        </Link>
      </div>
      <div className="float-right mx-4 my-2">
        {!user ? (
          <div>
            <button
              onClick={() => {
                history("/login/");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                history("/signup/");
              }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div>
            <button onClick={logoutUser} className="text-xl mx-2">
              <TbLogout size="1.5em" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
