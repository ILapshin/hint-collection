import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuestionItem from "../components/QuestionItem";
import AddIcon from "../components/UI/icons/AddIcon";
import BackIcon from "../components/UI/icons/BackIcon";
import ConfirmIcon from "../components/UI/icons/ConfirmIcon";

const Subtopic = () => {
  const { subtopicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");

  useEffect(() => {
    fetchSubtopic();
  }, []);

  const fetchSubtopic = async () => {
    const response = await fetch(`/v1/subtopics/${subtopicId}`);
    const data = await response.json();
    setQuestions(data.questions);
  };

  const removeQuestion = (question) => {
    const newList = questions.filter((item) => item.id !== question.id);
    setQuestions(newList);
  };

  const addQuestion = async () => {
    const response = await fetch(`/v1/questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subtopic_id: subtopicId, ucontent: addText }),
    });
    const question = await response.json();
    const newQuestion = (
      <QuestionItem
        question={question}
        removeCallback={removeQuestion}
        key={question.id}
      />
    );
    setQuestions(questions ? [...questions, newQuestion] : [newQuestion]);
    setAddText("");
    setAdd(false);
  };

  return (
    <div>
      <div className="sectionHeader">
        <BackIcon />
        <AddIcon
          callback={() => {
            setAdd(true);
          }}
        />
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
          <ConfirmIcon callback={addQuestion} />
        </form>
      ) : null}
      {questions?.map((question) => (
        <QuestionItem
          question={question}
          removeCallback={removeQuestion}
          key={question.id}
        />
      ))}
    </div>
  );
};

export default Subtopic;
