import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import QuestionItem from "../components/QuestionItem";
import AddIcon from "../components/UI/icons/AddIcon";
import BackIcon from "../components/UI/icons/BackIcon";
import ConfirmIcon from "../components/UI/icons/ConfirmIcon";

const Subtopic = () => {
  const { subtopicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");
  let { user, authTokens } = useContext(AuthContext);

  const history = useNavigate();

  useEffect(() => {
    fetchSubtopic();
  }, []);

  const fetchSubtopic = async () => {
    const response = await fetch(`/api/subtopics/${subtopicId}`, {
      headers: authTokens
        ? {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          }
        : { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setQuestions(data.questions);
  };

  const removeQuestion = (question) => {
    const newList = questions.filter((item) => item.id !== question.id);
    setQuestions(newList);
  };

  const addQuestion = async () => {
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
    <div>
      <div className="sectionHeader">
        <BackIcon callback={() => history("/")} />
        <AddIcon
          callback={() => {
            if (!user) {
              alert("Login to add questions!");
              return;
            }
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
