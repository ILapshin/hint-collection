import React, { useState, useRef } from "react";

import { BiCaretRight, BiCaretDown, BiPencil, BiTrash } from "react-icons/bi";

import AddIcon from "./UI/icons/AddIcon";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const Topic = ({ header, content }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(header);
  const [value, setValue] = useState(header);
  const [edit, setEdit] = useState(false);

  const themeInputRef = useRef();

  const confirmChanges = (e) => {
    setEdit(false);
    setText(themeInputRef.current.value);
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
            <div className="expandableContent">
              <div>
                <BiPencil
                  className="smallIcon"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
                <BiTrash className="smallIcon" />
              </div>
              <AddIcon />
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

      {expand ? <div>{content}</div> : null}
    </div>
  );
};

export default Topic;
