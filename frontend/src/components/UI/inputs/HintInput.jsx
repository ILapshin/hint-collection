import React, { useState } from "react";

import ConfirmIcon from "../icons/ConfirmIcon";

const HintInput = ({ rows, initialValue, ref, callback }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="answerInputContainer">
      <textarea
        name="answerInput"
        className="answerInput"
        cols={100}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
      ></textarea>
      <ConfirmIcon callback={callback} />
    </div>
  );
};

export default HintInput;
