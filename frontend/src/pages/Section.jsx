import React from "react";

import Question from "../components/Question";
import Answer from "../components/Answer";
import AddIcon from "../components/UI/icons/AddIcon";
import BackIcon from "../components/UI/icons/BackIcon";

const SECTION = {
  id: 1,
  title: "База",
  items: [
    {
      id: 1,
      question: "Вопрос 1",
      answer: "Ответ 1",
      check: true,
    },
    {
      id: 2,
      question: "Вопрос 2",
      answer: "Ответ 2",
      check: false,
    },
  ],
};

const Section = ({ title, items }) => {
  return (
    <div>
      <div className="sectionHeader">
        <BackIcon />
        <h1>{SECTION.title}</h1>
        <AddIcon />
      </div>
      {SECTION.items.map((item) => (
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

export default Section;
