import React, { useState, useRef } from "react";

import { BiPencil, BiTrash } from "react-icons/bi";
import ConfirmIcon from "./UI/icons/ConfirmIcon";

const Section = ({ content }) => {
  const [text, setText] = useState(content);
  const [value, setValue] = useState(content);
  const [edit, setEdit] = useState(false);

  const sectionInputRef = useRef();

  const confirmChanges = (e) => {
    setEdit(false);
    setText(sectionInputRef.current.value);
  };

  return (
    <div className="expandable">
      {!edit ? (
        <div>
          <div className="smallIcon">{text}</div>
          <div>
            <BiPencil
              className="smallIcon"
              onClick={() => {
                setEdit(true);
              }}
            />
            <BiTrash className="smallIcon" />
          </div>
        </div>
      ) : (
        <form className="answerInputContainer">
          <textarea
            name="answerInput"
            className="answerInput"
            cols={100}
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={sectionInputRef}
          ></textarea>
          <ConfirmIcon callback={confirmChanges} />
        </form>
      )}
    </div>
  );
};

export default Section;
