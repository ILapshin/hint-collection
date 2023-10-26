import React, { useState } from "react";

import { CgAdd } from "react-icons/cg";

import classes from "./AddIcon.module.css";

const AddIcon = ({ callback }) => {
  return (
    <div>
      <CgAdd size="3em" className="" onClick={callback} />
    </div>
  );
};

export default AddIcon;
