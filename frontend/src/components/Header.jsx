import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const history = useNavigate();
  let { user, authTokens, logoutUser } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    const response = await fetch(`/api/auth/users/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
          <div>{userData.username}</div>
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
