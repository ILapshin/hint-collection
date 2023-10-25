import React, { useState, useRef } from "react";

import { BiPencil } from "react-icons/bi";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const AnswerItem = ({ answer }) => {
  const [text, setText] = useState(answer.content);
  const [value, setValue] = useState(answer.content);
  const [edit, setEdit] = useState(false);

  const answerInputRef = useRef();

  const confirmChanges = (e) => {
    updateAnswer();
    setEdit(false);
    setText(answerInputRef.current.value);
  };

  const updateAnswer = async () => {
    const response = await fetch(`/v1/answers/${answer.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    });
    return response;
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

export default AnswerItem;
