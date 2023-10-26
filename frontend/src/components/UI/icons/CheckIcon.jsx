import React, { useState } from "react";

import { BiCheckCircle } from "react-icons/bi";

import classes from "./AddIcon.module.css";

const CheckIcon = ({ callback, isMarked }) => {
  const [curCheck, setCurCheck] = useState(isMarked);

  const toggle = (e) => {
    callback();
    curCheck ? setCurCheck(false) : setCurCheck(true);
  };

  return (
    <div>
      <BiCheckCircle
        size="3em"
        className=""
        color={curCheck ? "green" : "gray"}
        onClick={toggle}
      />
    </div>
  );
};

export default CheckIcon;
