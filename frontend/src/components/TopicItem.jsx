import React, { useState, useRef } from "react";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";

import SubtopicItem from "./SubtopicItem";
import AddIcon from "./UI/icons/AddIcon";
import ConfirmIcon from "./UI/icons/ConfirmIcon";
import EditForm from "./EditForm";

const TopicItem = ({ topic, removeCallback }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(topic.content);
  const [value, setValue] = useState(topic.content);
  const [subtopics, setSubtopics] = useState(topic.subtopics);
  const [edit, setEdit] = useState(topic.edit);
  const [add, setAdd] = useState(false);
  const [addText, setAddText] = useState("");

  const themeInputRef = useRef();

  const confirmChanges = (e) => {
    updateTopic();
    setEdit(false);
    setText(themeInputRef.current.value);
  };

  const updateTopic = async () => {
    const response = await fetch(`/v1/topics/${topic.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    });
    return response;
  };

  const deleteTopic = async () => {
    const response = await fetch(`/v1/topics/${topic.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    removeCallback(topic);
    return response;
  };

  const removeSubtopic = (subtopic) => {
    const newList = subtopics.filter((item) => item.id !== subtopic.id);
    setSubtopics(newList);
  };

  const addSubtopic = async () => {
    const response = await fetch(`/v1/subtopics/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: addText }),
    });
    const subtopic = await response.json();
    const newSubtopic = (
      <SubtopicItem
        subtopic={subtopic}
        removeCallback={removeSubtopic}
        key={subtopic.id}
      />
    );
    setSubtopics([...subtopics, newSubtopic]);
    setAddText("");
    setAdd(false);
  };

  return (
    <div className="container ">
      <div>
        {!edit ? (
          <>
            <div
              className="expandableContent"
              onClick={() => {
                expand ? setExpand(false) : setExpand(true);
              }}
            >
              <div className="smallIcon">
                {expand ? <BiCaretDown /> : <BiCaretRight />}
              </div>
              <div>{text}</div>
            </div>
            <div className="expandableContent">
              <div>
                <BiPencil
                  className="smallIcon"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
                <BiTrash className="smallIcon" onClick={deleteTopic} />
              </div>
              <AddIcon callback={() => setAdd(true)} />
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
              ref={themeInputRef}
            ></textarea>
            <ConfirmIcon callback={confirmChanges} />
          </form>
        )}
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
          <ConfirmIcon callback={addSubtopic} />
        </form>
      ) : null}

      {expand ? (
        <div>
          {subtopics?.map((subtopic) => (
            <SubtopicItem
              subtopic={subtopic}
              removeCallback={removeSubtopic}
              key={subtopic.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TopicItem;
