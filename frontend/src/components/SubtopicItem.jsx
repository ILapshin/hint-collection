import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";

import { Link } from "react-router-dom";

import { BiPencil, BiTrash } from "react-icons/bi";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const SubtopicItem = ({ subtopic, removeCallback }) => {
  const [text, setText] = useState(subtopic.content);
  const [value, setValue] = useState(subtopic.content);
  const [edit, setEdit] = useState(false);
  let { user, authTokens } = useContext(AuthContext);

  const sectionInputRef = useRef();

  const confirmChanges = (e) => {
    updateSubtopic();
    setEdit(false);
    setText(sectionInputRef.current.value);
  };

  const updateSubtopic = async () => {
    const response = await fetch(`/api/subtopics/${subtopic.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ content: value }),
    });
    return response;
  };

  const deleteSubtopic = async () => {
    const response = await fetch(`/api/subtopics/${subtopic.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    removeCallback(subtopic);
    return response;
  };

  return (
    <div className="expandable">
      {!edit ? (
        <div>
          <Link to={`/subtopics/${subtopic.id}`}>
            <div className="smallIcon">{text}</div>
          </Link>
          {user && user.user_id === subtopic.created_by ? (
            <div>
              <BiPencil
                className="smallIcon"
                onClick={() => {
                  setEdit(true);
                }}
              />
              <BiTrash className="smallIcon" onClick={deleteSubtopic} />
            </div>
          ) : null}
        </div>
      ) : (
        <form className="answerInputContainer">
          <textarea
            name="answerInput"
            className="answerInput"
            cols={100}
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={sectionInputRef}
          ></textarea>
          <ConfirmIcon callback={confirmChanges} />
        </form>
      )}
    </div>
  );
};

export default SubtopicItem;
