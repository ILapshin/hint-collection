import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";

import { HiCheck, HiX } from "react-icons/hi";
import { BiPencil } from "react-icons/bi";
import {
  GoCheck,
  GoCheckCircle,
  GoChevronLeft,
  GoPencil,
  GoPlusCircle,
  GoTriangleDown,
  GoTriangleRight,
  GoX,
} from "react-icons/go";

import countTextareaHeight from "../utils/TextareaHeight";

const AnswerItem = ({ answer }) => {
  const [item, setItem] = useState(answer);
  const [text, setText] = useState(answer.content);
  const [value, setValue] = useState(answer.content);
  const [edit, setEdit] = useState(false);
  const [editHeight, setEditHeight] = useState(2);
  let { user, authTokens } = useContext(AuthContext);

  const answerInputRef = useRef();

  const confirmChanges = (e) => {
    e.preventDefault();
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
    const data = await response.json();
    setItem(data);
  };

  return (
    <div className="border-2 border-cyan-400 border-l-4 rounded-lg m-2 py-2 px-4 bg-white">
      {!edit ? (
        <div className="w-full relative">
          <div className="">
            <div className="max-w-prose min-h-2 text-lg break-words whitespace-break-spaces">
              {text}
            </div>
            <div className="  clear-left text-gray-400 text-sm inline-block mt-1">
              <div className="float-left mr-1">{item.creator_name}</div>
              <div className="float-left">
                {!item.is_edited ? item.created_at : item.edited_at}
              </div>
              <div className="float-left pt-1">
                {item.is_edited ? <GoPencil /> : null}
              </div>
            </div>
          </div>
          {user && user.user_id === answer.created_by ? (
            <button
              onClick={() => {
                setEdit(true);
                setEditHeight(countTextareaHeight(value));
              }}
              className="absolute bottom-0 -right-1 text-gray-200  cursor-pointer hover:text-gray-500"
            >
              <GoPencil size="2em" />
            </button>
          ) : null}
        </div>
      ) : (
        <form className="w-full h-full relative" onSubmit={confirmChanges}>
          <textarea
            name="content"
            className=" w-full h-full resize-none outline-none text-lg"
            cols={100}
            rows={editHeight}
            value={value}
            maxLength={3000}
            autoFocus
            onChange={(e) => {
              setValue(e.target.value);
              setEditHeight(countTextareaHeight(value));
            }}
            ref={answerInputRef}
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

export default AnswerItem;
