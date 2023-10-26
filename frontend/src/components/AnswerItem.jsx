import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";

import { BiPencil } from "react-icons/bi";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const AnswerItem = ({ answer }) => {
  const [text, setText] = useState(answer.content);
  const [value, setValue] = useState(answer.content);
  const [edit, setEdit] = useState(false);
  let { user, authTokens } = useContext(AuthContext);

  const answerInputRef = useRef();

  const confirmChanges = (e) => {
    updateAnswer();
    setEdit(false);
    setText(answerInputRef.current.value);
  };

  const updateAnswer = async () => {
    const response = await fetch(`/api/answers/${answer.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
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
          {user && user.user_id === answer.created_by ? (
            <BiPencil
              size="2em"
              onClick={() => {
                setEdit(true);
              }}
            />
          ) : null}
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
