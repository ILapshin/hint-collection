import React, { useState, useRef, useContext } from "react";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";
import AuthContext from "../context/AuthContext";

import SubtopicItem from "./SubtopicItem";
import AddIcon from "./UI/icons/AddIcon";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const TopicItem = ({ topic, removeCallback }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(topic.content);
  const [value, setValue] = useState(topic.content);
  const [subtopics, setSubtopics] = useState(topic.subtopics);
  const [edit, setEdit] = useState(topic.edit);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");
  let { user, authTokens } = useContext(AuthContext);

  const themeInputRef = useRef();

  const confirmChanges = (e) => {
    updateTopic();
    setEdit(false);
    setText(themeInputRef.current.value);
  };

  const updateTopic = async () => {
    const response = await fetch(`/api/topics/${topic.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ content: value }),
    });
    return response;
  };

  const deleteTopic = async () => {
    const response = await fetch(`/api/topics/${topic.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    removeCallback(topic);
    return response;
  };

  const removeSubtopic = (subtopic) => {
    const newList = subtopics.filter((item) => item.id !== subtopic.id);
    setSubtopics(newList);
  };

  const addSubtopic = async () => {
    if (addText === "") {
      setAdd(false);
      return;
    }
    const response = await fetch(`/api/subtopics/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ topic: topic.id, content: addText }),
    });
    const subtopic = await response.json();
    setSubtopics(subtopics ? [...subtopics, subtopic] : [subtopic]);
    setAddText("");
    setAdd(false);
  };

  return (
    <div className="container ">
      <div>
        {!edit ? (
          <>
            <div
              className="expandableContent"
              onClick={() => {
                expand ? setExpand(false) : setExpand(true);
              }}
            >
              <div className="smallIcon">
                {expand ? <BiCaretDown /> : <BiCaretRight />}
              </div>
              <div>{text}</div>
            </div>
            <div className="expandableContent">
              {user && user.user_id === topic.created_by ? (
                <div>
                  <BiPencil
                    className="smallIcon"
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                  <BiTrash className="smallIcon" onClick={deleteTopic} />
                </div>
              ) : null}
              <AddIcon
                callback={() => {
                  if (!user) {
                    alert("Login to add subtopics!");
                    return;
                  }
                  setAdd(true);
                  setExpand(true);
                }}
              />
            </div>
          </>
        ) : (
          <form className="answerInputContainer">
            <textarea
              name="answerInput"
              className="answerInput"
              cols={100}
              rows={2}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={themeInputRef}
            ></textarea>
            <ConfirmIcon callback={confirmChanges} />
          </form>
        )}
      </div>
      {add ? (
        <form className="answerInputContainer">
          <textarea
            name="editForm"
            className="answerInput"
            cols={100}
            rows={2}
            value={addText}
            onChange={(e) => {
              setAddText(e.target.value);
            }}
          ></textarea>
          <ConfirmIcon callback={addSubtopic} />
        </form>
      ) : null}

      {expand ? (
        <div>
          {subtopics?.map((subtopic) => (
            <SubtopicItem
              subtopic={subtopic}
              removeCallback={removeSubtopic}
              key={subtopic.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TopicItem;
