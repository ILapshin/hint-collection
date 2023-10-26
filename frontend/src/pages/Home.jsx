import "../styles/App.css";

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { CgAdd } from "react-icons/cg";

import TopicItem from "../components/TopicItem";
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
    <div className=" bg-cyan-50 h-screen">
      <div className="container max-w-4xl">
        <div className="text-lg text-cyan-200 float-right cursor-pointer hover:text-cyan-500 mx-4 my-2">
          <CgAdd
            size="3em"
            onClick={() => {
              if (!user) {
                alert("Login to add topics!");
                return;
              }
              setAdd(true);
            }}
          />
        </div>
        <div className="mt-2">
          {add ? (
            <form className="border border-blue-300 rounded-md">
              <textarea
                name="editForm"
                className=""
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
            <TopicItem
              topic={topic}
              removeCallback={removeTopic}
              key={topic.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
