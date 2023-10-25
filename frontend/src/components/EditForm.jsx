import React, { useState } from "react";

import ConfirmIcon from "./UI/icons/ConfirmIcon";

const EditForm = ({ confirmCallback }) => {
  const [text, setText] = useState("");

  return (
    <form className="answerInputContainer">
      <textarea
        name="editForm"
        className="answerInput"
        cols={100}
        rows={2}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        // ref={ref}
      ></textarea>
      <ConfirmIcon callback={confirmCallback} />
    </form>
  );
};

export default EditForm;
