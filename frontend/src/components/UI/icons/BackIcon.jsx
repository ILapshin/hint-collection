import React, { useState } from "react";

import { IoReturnDownBackOutline } from "react-icons/io5";

const BackIcon = ({ callback }) => {
  return (
    <div>
      <IoReturnDownBackOutline size="2em" className="" onClick={callback} />
    </div>
  );
};

export default BackIcon;
