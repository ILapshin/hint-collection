import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const history = useNavigate();
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Link to={"/"}>Home</Link>
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
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
