import React, { useState } from "react";

import { BiCheckCircle } from "react-icons/bi";

import classes from "./AddIcon.module.css";

const CheckIcon = ({ check }) => {
  const [curCheck, setCurCheck] = useState(check);

  const toggle = (e) => {
    curCheck ? setCurCheck(false) : setCurCheck(true);
  };

  return (
    <div>
      <BiCheckCircle
        size="3em"
        className={classes.addIcon}
        color={curCheck ? "green" : "gray"}
        onClick={toggle}
      />
    </div>
  );
};

export default CheckIcon;
