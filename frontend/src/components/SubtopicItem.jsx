import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { GoCheck, GoPencil, GoX, GoCheckCircle } from "react-icons/go";
import { BiTrash } from "react-icons/bi";

import AuthContext from "../context/AuthContext";
import countTextareaHeight from "../utils/TextareaHeight";

const SubtopicItem = ({
  subtopic,
  topicSlug,
  removeCallback,
  updateCallback,
}) => {
  const [item, setItem] = useState(subtopic);
  const [text, setText] = useState(subtopic.content);
  const [value, setValue] = useState(subtopic.content);
  const [edit, setEdit] = useState(false);
  const [editHeight, setEditHeight] = useState(2);
  let { user, authTokens } = useContext(AuthContext);

  const sectionInputRef = useRef();

  const confirmChanges = (e) => {
    e.preventDefault();
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
    const data = await response.json();
    setItem(data);
    updateCallback(data);
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
        <div className=" inline-block w-full max-w-full">
          <div className="float-left">
            <div className="">
              <Link to={`/${topicSlug}/${subtopic.slug}/`}>
                <h2 className="max-w-prose text-lg float-left break-words whitespace-break-spaces">
                  {text}
                </h2>
              </Link>

              <div className=" float-left clear-left text-gray-400 text-sm inline-block mt-1">
                <div className="float-left mr-1">{item.creator_name}</div>
                <div className="float-left">
                  {!item.is_edited ? item.created_at : item.edited_at}
                </div>
                <div className="float-left pt-1">
                  {item.is_edited ? <GoPencil /> : null}
                </div>
              </div>
            </div>
          </div>
          <div className="float-right inline-block text-gray-300">
            <div className="float-left mx-2 text-lg text-gray-400">
              {"Вопросов: "}
              {user ? `${item.num_marked} из ` : null}
              {item.num_questions}
            </div>
            {user && user.user_id === subtopic.created_by ? (
              <div className=" text-lg mt-2 float-right">
                <GoPencil
                  className="m-1 hover:text-gray-600  cursor-pointer"
                  onClick={() => {
                    setEdit(true);
                    setEditHeight(countTextareaHeight(value));
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
        <form className="w-full h-full relative" onSubmit={confirmChanges}>
          <textarea
            name="content"
            className=" w-full h-full resize-none outline-none text-lg"
            cols={100}
            rows={editHeight}
            value={value}
            maxLength={255}
            autoFocus
            onChange={(e) => {
              setValue(e.target.value);
              setEditHeight(countTextareaHeight(value));
            }}
            ref={sectionInputRef}
          ></textarea>
          <button
            onClick={(e) => {
              e.preventDefault();
              setValue(text);
              setEdit(false);
            }}
            className="absolute bottom-0 right-12 text-rose-200  cursor-pointer hover:text-rose-500"
          >
            <GoX size="3em" />
          </button>
          <button
            type="submit"
            className="absolute bottom-0 right-0 text-emerald-200  cursor-pointer hover:text-emerald-500"
          >
            <GoCheck size="3em" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SubtopicItem;
