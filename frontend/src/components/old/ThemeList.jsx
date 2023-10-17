import React, { useState } from "react";

import Theme from "./Theme";
import AddIcon from "./UI/icons/AddIcon";
import SectionList from "./SectionList";

const ThemeList = ({ themes }) => {
  return (
    <div>
      <div className="sectionHeader">
        <div></div>
        <h1>HINTS</h1>
        <AddIcon />
      </div>
      {themes.map((theme) => (
        <Theme
          header={theme.title}
          content={<SectionList sections={theme.sections} />}
          key={theme.id}
        />
      ))}
    </div>
  );
};

export default ThemeList;
