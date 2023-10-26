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
    <div className="border-2 border-cyan-400 border-l-4 rounded-lg m-2 py-2 px-4 bg-white">
      {!edit ? (
        <div className="w-full inline-block ">
          <div className="float-left">
            <Link to={`/subtopics/${subtopic.id}`}>
              <h2 className="text-lg">{text}</h2>
            </Link>
          </div>
          <div className="float-right text-gray-300">
            {user && user.user_id === subtopic.created_by ? (
              <div className="">
                <BiPencil
                  className="m-1 hover:text-gray-600  cursor-pointer"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
                <BiTrash
                  className="m-1 hover:text-gray-600  cursor-pointer"
                  onClick={deleteSubtopic}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <form className="">
          <textarea
            name="answerInput"
            className=""
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
