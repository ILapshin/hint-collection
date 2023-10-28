import "../styles/App.css";

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { CgAdd } from "react-icons/cg";
import { HiCheck, HiX } from "react-icons/hi";

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

import Header from "../components/Header";
import TopicItem from "../components/TopicItem";
import countTextareaHeight from "../utils/TextareaHeight";

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");
  const [addHeight, setAddHeight] = useState(2);
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

  const addTopic = async (e) => {
    e.preventDefault();
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
    <div className=" ">
      <Header />
      <div className="container max-w-4xl">
        <div className="text-lg text-cyan-200 float-right cursor-pointer hover:text-cyan-500 mx-6 my-2">
          <GoPlusCircle
            size="3em"
            onClick={() => {
              if (!user) {
                alert("Login to add topics!");
                return;
              }
              setAdd(true);
              setAddHeight(countTextareaHeight(addText));
            }}
          />
        </div>
        <div className="m-2">
          {add ? (
            <div className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white">
              <form className="w-full h-full relative" onSubmit={addTopic}>
                <textarea
                  name="content"
                  className=" w-full h-full resize-none outline-none text-xl"
                  cols={100}
                  rows={addHeight}
                  value={addText}
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
    </div>
  );
};

export default Home;
