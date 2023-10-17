import React, { useState } from "react";

import { HiCheck } from "react-icons/hi";
import classes from "./ConfirmIcon.module.css";

const ConfirmIcon = ({ callback }) => {
  return (
    <div>
      <HiCheck size="3em" className={classes.ConfirmIcon} onClick={callback} />
    </div>
  );
};

export default ConfirmIcon;
