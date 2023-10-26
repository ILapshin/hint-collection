import "../styles/App.css";

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

import TopicItem from "../components/TopicItem";
import AddIcon from "../components/UI/icons/AddIcon";
import ConfirmIcon from "../components/UI/icons/ConfirmIcon";

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");
  let { user, authTokens } = useContext(AuthContext);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const response = await fetch("/api/topics/");
    const data = await response.json();
    setTopics(data);
  };

  const removeTopic = (topic) => {
    const newList = topics.filter((item) => item.id !== topic.id);
    setTopics(newList);
  };

  const addTopic = async () => {
    if (addText === "") {
      setAdd(false);
      return;
    }
    const response = await fetch(`/api/topics/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ content: addText }),
    });
    const topic = await response.json();

    setTopics(topics ? [...topics, topic] : [topic]);
    setAddText("");
    setAdd(false);
  };

  return (
    <div className="container max-w-4xl">
      <div className="">
        <AddIcon
          callback={() => {
            if (!user) {
              alert("Login to add topics!");
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
          <ConfirmIcon callback={addTopic} />
        </form>
      ) : null}
      {topics?.map((topic) => (
        <TopicItem topic={topic} removeCallback={removeTopic} key={topic.id} />
      ))}
    </div>
  );
};

export default Home;
