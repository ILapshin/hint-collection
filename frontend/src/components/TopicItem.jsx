import React, { useState, useRef, useContext } from "react";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
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
    <div className="">
      <div className="border-2 border-cyan-500 rounded-xl py-2 px-4 w-full inline-block border-l-4">
        {!edit ? (
          <div className="">
            <div
              className="cursor-pointer inline-block text-gray-700 dark:text-gray-700 float-left"
              onClick={() => {
                expand ? setExpand(false) : setExpand(true);
              }}
            >
              <div className="text-xl w-6 h-8 text-center float-left">
                {expand ? <BiCaretDown /> : <BiCaretRight />}
              </div>
              <h1 className="text-xl float-right ">{text}</h1>
            </div>
            <div className="inline-block float-right">
              {user && user.user_id === topic.created_by ? (
                <div className="text-lg my-1 text-gray-500 float-left">
                  <BiPencil
                    className="m-1  cursor-pointer"
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                  <BiTrash
                    className="m-1  cursor-pointer"
                    onClick={deleteTopic}
                  />
                </div>
              ) : null}
              <div className="text-lg text-cyan-500 float-right  cursor-pointer">
                <CgAdd
                  size="3em"
                  onClick={() => {
                    if (!user) {
                      alert("Login to add subtopics!");
                      return;
                    }
                    setAdd(true);
                    setExpand(true);
                  }}
                />
              </div>
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
              ref={themeInputRef}
            ></textarea>
            <ConfirmIcon callback={confirmChanges} />
          </form>
        )}
      </div>
      {add ? (
        <form className="">
          <textarea
            name="editForm"
            className=""
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
        <div className="">
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
