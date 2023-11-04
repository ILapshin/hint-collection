import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";

import { BiTrash } from "react-icons/bi";

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

import AnswerItem from "../components/AnswerItem";
import countTextareaHeight from "../utils/TextareaHeight";

const QuestionItem = ({ question, removeCallback }) => {
  const [item, setItem] = useState(question);
  const [text, setText] = useState(question.content);
  const [value, setValue] = useState(question.content);
  const [answers, setAnswers] = useState(question.answers);
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isMarked, setIsMarked] = useState(question.is_marked);
  const [editHeight, setEditHeight] = useState(2);
  let { user, authTokens } = useContext(AuthContext);

  const questionInputRef = useRef();

  const confirmChanges = (e) => {
    e.preventDefault();
    updateQuestion();
    setEdit(false);
    setText(questionInputRef.current.value);
  };

  const toggleMark = (e) => {
    if (!user) {
      alert("Login for marking questions!");
      return;
    }
    markQuestion();
    setIsMarked(isMarked ? false : true);
  };

  const updateQuestion = async () => {
    const response = await fetch(`/api/questions/${question.id}`, {
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

  const markQuestion = async () => {
    const response = await fetch(`/api/questions/toggle-mark/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
  };

  const deleteQuestion = async () => {
    const response = await fetch(`/api/questions/${question.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    removeCallback(question);
  };

  return (
    <div className="mb-2">
      <div className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white">
        {!edit ? (
          <div className="inline-block w-full max-w-full">
            <div className=" float-left">
              <div
                className="cursor-pointer inline-block text-gray-700 dark:text-gray-700 float-left"
                onClick={() => {
                  expand ? setExpand(false) : setExpand(true);
                }}
              >
                <div className="text-xl text-center float-left my-1">
                  {expand ? <GoTriangleDown /> : <GoTriangleRight />}
                </div>
                <h1 className="max-w-prose text-xl float-right break-words whitespace-break-spaces">
                  {text}
                </h1>
              </div>
              <div className=" float-left clear-left text-gray-400 text-sm inline-block mt-2 ml-2">
                <div className="float-left mr-1">{item.creator_name}</div>
                <div className="float-left">
                  {!item.is_edited ? item.created_at : item.edited_at}
                </div>
                <div className="float-left pt-1">
                  {item.is_edited ? <GoPencil /> : null}
                </div>
              </div>
            </div>
            <div className="inline-block float-right">
              {user && user.user_id === question.created_by ? (
                <div className="text-lg my-1 text-gray-300 float-left">
                  <GoPencil
                    className="m-1  cursor-pointer hover:text-gray-600 "
                    onClick={() => {
                      setEdit(true);
                      setEditHeight(countTextareaHeight(value));
                    }}
                  />
                  <BiTrash
                    className="m-1  cursor-pointer hover:text-gray-600 "
                    onClick={deleteQuestion}
                  />
                </div>
              ) : null}
              <div
                className={`text-lg float-left cursor-pointer  ${
                  isMarked
                    ? "text-emerald-500"
                    : "text-gray-200 hover:text-emerald-200"
                }`}
              >
                <GoCheckCircle size="3em" onClick={toggleMark} />
              </div>
            </div>
          </div>
        ) : (
          <form className="w-full h-full relative" onSubmit={confirmChanges}>
            <textarea
              name="content"
              className=" w-full h-full resize-none outline-none text-xl"
              cols={100}
              rows={editHeight}
              value={value}
              maxLength={3000}
              autoFocus
              onChange={(e) => {
                setValue(e.target.value);
                setEditHeight(countTextareaHeight(value));
              }}
              ref={questionInputRef}
            />
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
      {expand ? (
        <>
          {answers?.map((answer) => (
            <AnswerItem answer={answer} key={answer.id} />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default QuestionItem;
