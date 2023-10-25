import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuestionItem from "../components/QuestionItem";
import AddIcon from "../components/UI/icons/AddIcon";
import BackIcon from "../components/UI/icons/BackIcon";

const Subtopic = () => {
  const { subtopicId } = useParams();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getSubtopic();
  }, []);

  const getSubtopic = async () => {
    const response = await fetch(`/v1/subtopics/${subtopicId}`);
    const data = await response.json();
    setTitle(data.content);
    setQuestions(data.questions);
  };

  const removeQuestion = (question) => {
    const newList = questions.filter((item) => item.id !== question.id);
    setQuestions(newList);
  };

  return (
    <div>
      <div className="sectionHeader">
        <BackIcon />
        <h1>{title}</h1>
        <AddIcon />
      </div>
      {questions.map((question) => (
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
