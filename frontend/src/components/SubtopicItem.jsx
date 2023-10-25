import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";

import { BiPencil, BiTrash } from "react-icons/bi";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const SubtopicItem = ({ subtopic, removeCallback }) => {
  const [text, setText] = useState(subtopic.content);
  const [value, setValue] = useState(subtopic.content);
  const [edit, setEdit] = useState(false);

  const sectionInputRef = useRef();

  const confirmChanges = (e) => {
    updateSubtopic();
    setEdit(false);
    setText(sectionInputRef.current.value);
  };

  const updateSubtopic = async () => {
    const response = await fetch(`/v1/subtopics/${subtopic.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    });
    return response;
  };

  const deleteSubtopic = async () => {
    const response = await fetch(`/v1/subtopics/${subtopic.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    removeCallback(subtopic);
    return response;
  };

  return (
    <div className="expandable">
      {!edit ? (
        <div>
          <Link to={`/subtopic/${subtopic.id}`}>
            <div className="smallIcon">{text}</div>
          </Link>
          <div>
            <BiPencil
              className="smallIcon"
              onClick={() => {
                setEdit(true);
              }}
            />
            <BiTrash className="smallIcon" onClick={deleteSubtopic} />
          </div>
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
