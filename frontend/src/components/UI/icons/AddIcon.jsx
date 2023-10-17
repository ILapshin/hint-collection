import React, { useState } from "react";

import { CgAdd } from "react-icons/cg";

import classes from "./AddIcon.module.css";

const AddIcon = () => {
  return (
    <div>
      <CgAdd size="3em" color="green" className={classes.addIcon} />
    </div>
  );
};

export default AddIcon;
