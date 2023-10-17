import React, { useState, useRef } from "react";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";

import CheckIcon from "./UI/icons/CheckIcon";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const Question = ({ header, content, check }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(header);
  const [value, setValue] = useState(header);
  const [edit, setEdit] = useState(false);

  const questionInputRef = useRef();

  const confirmChanges = (e) => {
    setEdit(false);
    setText(questionInputRef.current.value);
  };

  return (
    <div>
      <div className="expandable">
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
            <div>
              <div>
                <BiPencil
                  className="smallIcon"
                  onClick={() => {
                    expand ? setEdit(false) : setEdit(true);
                  }}
                />
                <BiTrash className="smallIcon" />
              </div>
              <CheckIcon check={check} />
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
              ref={questionInputRef}
            ></textarea>
            <ConfirmIcon callback={confirmChanges} />
          </form>
        )}
      </div>
      {expand ? (
        <>
          <div>{content}</div>
        </>
      ) : null}
    </div>
  );
};

export default Question;
