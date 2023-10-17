import React, { useState, useRef } from "react";

import { BiPencil } from "react-icons/bi";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const Answer = ({ content }) => {
  const [text, setText] = useState(content);
  const [value, setValue] = useState(content);
  const [edit, setEdit] = useState(false);

  const answerInputRef = useRef();

  const confirmChanges = (e) => {
    setEdit(false);
    setText(answerInputRef.current.value);
  };

  return (
    <div>
      {!edit ? (
        <>
          <div>{text}</div>
          <BiPencil
            size="2em"
            onClick={() => {
              setEdit(true);
            }}
          />
        </>
      ) : (
        <form className="answerInputContainer">
          <textarea
            name="answerInput"
            className="answerInput"
            cols={100}
            rows={10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={answerInputRef}
          ></textarea>
          <ConfirmIcon callback={confirmChanges} />
        </form>
      )}
    </div>
  );
};

export default Answer;
