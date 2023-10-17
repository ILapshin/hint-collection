import "../styles/App.css";

import React, { useState } from "react";

import Topic from "../components/Topic";
import AddIcon from "../components/UI/icons/AddIcon";
import SectionList from "../components/SectionList";

const TOPICS = [
  {
    id: 1,
    title: "python",
    sections: [
      {
        title: "База",
        id: 1,
      },
      {
        title: "База 2 ",
        id: 2,
      },
      {
        title: "База 3",
        id: 3,
      },
    ],
  },
  {
    id: 2,
    title: "test",
    sections: [],
  },
];

const Home = ({ themes }) => {
  return (
    <div>
      <div className="sectionHeader">
        <div></div>
        <h1>Themes</h1>
        <AddIcon />
      </div>
      {TOPICS.map((theme) => (
        <Topic
          header={theme.title}
          content={<SectionList sections={theme.sections} />}
          key={theme.id}
        />
      ))}
    </div>
  );
};

export default Home;
