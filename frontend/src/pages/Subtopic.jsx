import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

import { CgAdd } from "react-icons/cg";
import { HiCheck, HiX } from "react-icons/hi";
import QuestionItem from "../components/QuestionItem";
import countTextareaHeight from "../utils/TextareaHeight";
import Header from "../components/Header";

const Subtopic = () => {
  const [subtopicId, setSubtopicId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");
  const [addHeight, setAddHeight] = useState(2);
  let { user, authTokens } = useContext(AuthContext);

  const { topicSlug } = useParams();
  const { subtopicSlug } = useParams();

  const history = useNavigate();

  useEffect(() => {
    fetchSubtopic();
  }, []);

  const fetchSubtopic = async () => {
    const response = await fetch(
      `/api/subtopics/${topicSlug}/${subtopicSlug}/`,
      {
        headers: authTokens
          ? {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            }
          : { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setSubtopicId(data.id);
    setQuestions(data.questions);
  };

  const removeQuestion = (question) => {
    const newList = questions.filter((item) => item.id !== question.id);
    setQuestions(newList);
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    if (addText === "") {
      setAdd(false);
      return;
    }
    const response = await fetch(`/api/questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ subtopic: subtopicId, content: addText }),
    });
    const question = await response.json();
    setQuestions(questions ? [...questions, question] : [question]);
    setAddText("");
    setAdd(false);
  };

  return (
    <div className=" ">
      <Header />
      <div className="container max-w-4xl">
        <div className=" inline-block w-full">
          <div className="text-lg text-gray-300 float-left cursor-pointer hover:text-gray-500 mx-4 ml-2 mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                history("/");
              }}
            >
              <GoChevronLeft size="3em" />
            </button>
          </div>
          <div className="text-lg text-cyan-200 float-right cursor-pointer hover:text-cyan-500 mx-6 my-2">
            <GoPlusCircle
              size="3em"
              onClick={() => {
                if (!user) {
                  alert("Login to add question!");
                  return;
                }
                setAdd(true);
                setAddHeight(countTextareaHeight(addText));
              }}
            />
          </div>
        </div>
        <div className="m-2">
          {add ? (
            <div className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white">
              <form className="w-full h-full relative" onSubmit={addQuestion}>
                <textarea
                  name="content"
                  className=" w-full h-full resize-none outline-none text-xl"
                  cols={100}
                  rows={addHeight}
                  value={addText}
                  maxLength={3000}
                  autoFocus
                  onChange={(e) => {
                    setAddText(e.target.value);
                    setAddHeight(countTextareaHeight(addText));
                  }}
                ></textarea>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAddText("");
                    setAdd(false);
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
            </div>
          ) : null}
          <div className="mt-2">
            {questions?.map((question) => (
              <QuestionItem
                question={question}
                removeCallback={removeQuestion}
                key={question.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subtopic;
