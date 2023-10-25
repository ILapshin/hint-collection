import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to={"/login/"}>Login</Link>
    </div>
  );
};

export default Header;
