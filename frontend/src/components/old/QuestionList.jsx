import React from "react";

import Question from "./Question";
import Answer from "./Answer";
import AddIcon from "./UI/icons/AddIcon";
import BackIcon from "./UI/icons/BackIcon";

const QuestionList = ({ title, items }) => {
  return (
    <div>
      <div className="sectionHeader">
        <BackIcon />
        <h1>{title}</h1>
        <AddIcon />
      </div>
      {items.map((item) => (
        <Question
          header={item.question}
          content={<Answer content={item.answer} />}
          check={item.check}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default QuestionList;
