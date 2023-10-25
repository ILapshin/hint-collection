import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";

import AnswerItem from "../components/AnswerItem";
import CheckIcon from "./UI/icons/CheckIcon";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const QuestionItem = ({ question, removeCallback }) => {
  const [text, setText] = useState(question.content);
  const [value, setValue] = useState(question.content);
  const [answers, setAnswers] = useState(question.answers);
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isMarked, setIsMarked] = useState(question.is_marked);
  let { authTokens, logoutUser } = useContext(AuthContext);

  const questionInputRef = useRef();

  const confirmChanges = (e) => {
    updateQuestion();
    setEdit(false);
    setText(questionInputRef.current.value);
  };

  const toggleMark = (e) => {
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
    return response;
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
    <div>
      <div>
        {!edit ? (
          <>
            <div
              onClick={() => {
                expand ? setExpand(false) : setExpand(true);
              }}
            >
              <div>{expand ? <BiCaretDown /> : <BiCaretRight />}</div>
              <div>{text}</div>
            </div>
            <div>
              <div>
                <BiPencil
                  className="smallIcon"
                  onClick={() => {
                    expand ? setEdit(false) : setEdit(true);
                  }}
                />
                <BiTrash className="smallIcon" onClick={deleteQuestion} />
              </div>
              <CheckIcon callback={toggleMark} isMarked={isMarked} />
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
              ref={questionInputRef}
            ></textarea>
            <ConfirmIcon callback={confirmChanges} />
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
