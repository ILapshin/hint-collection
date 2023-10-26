import React, { useState, useRef, useContext } from "react";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { HiCheck, HiX } from "react-icons/hi";
import AuthContext from "../context/AuthContext";

import SubtopicItem from "./SubtopicItem";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

import countTextareaHeight from "../utils/TextareaHeight";

const TopicItem = ({ topic, removeCallback }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(topic.content);
  const [value, setValue] = useState(topic.content);
  const [subtopics, setSubtopics] = useState(topic.subtopics);
  const [edit, setEdit] = useState(topic.edit);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");
  const [editHeight, setEditHeight] = useState(2);
  let { user, authTokens } = useContext(AuthContext);

  const themeInputRef = useRef();

  const confirmChanges = (e) => {
    e.preventDefault();
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
      <div className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white">
        {!edit ? (
          <div className="">
            <div
              className="cursor-pointer inline-block text-gray-700 dark:text-gray-700 float-left"
              onClick={() => {
                if (expand && add) {
                  setAddText("");
                  setAdd(false);
                }
                expand ? setExpand(false) : setExpand(true);
              }}
            >
              <div className="text-xl text-center float-left my-1">
                {expand ? <BiCaretDown /> : <BiCaretRight />}
              </div>
              <h1 className="max-w-prose text-xl float-right break-words whitespace-break-spaces">
                {text}
              </h1>
            </div>
            <div className="inline-block float-right">
              {user && user.user_id === topic.created_by ? (
                <div className="text-lg my-1 text-gray-300 float-left">
                  <BiPencil
                    className="m-1  cursor-pointer hover:text-gray-600 "
                    onClick={() => {
                      setEdit(true);
                      setEditHeight(countTextareaHeight(value));
                    }}
                  />
                  <BiTrash
                    className="m-1  cursor-pointer hover:text-gray-600 "
                    onClick={deleteTopic}
                  />
                </div>
              ) : null}
              <div className="text-lg text-cyan-200 float-right  cursor-pointer hover:text-cyan-500">
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
          <form
            className="w-full h-full relative"
            onSubmit={confirmChanges}
            onAbort={(e) => {
              e.preventDefault();
              setValue("");
              setEdit(false);
            }}
          >
            <textarea
              name="content"
              className=" w-full h-full resize-none outline-none text-xl"
              cols={100}
              rows={editHeight}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setEditHeight(countTextareaHeight(value));
              }}
              ref={themeInputRef}
            ></textarea>
            <button
              type="abort"
              className="absolute bottom-2 right-14 text-rose-200  cursor-pointer hover:text-rose-500"
            >
              <HiX size="3em" />
            </button>
            <button
              type="submit"
              className="absolute bottom-2 right-2 text-emerald-200  cursor-pointer hover:text-emerald-500"
            >
              <HiCheck size="3em" />
            </button>
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
