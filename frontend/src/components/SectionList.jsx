import React from "react";

import Section from "./Section";

const SectionList = ({ sections }) => {
  return (
    <div>
      {sections.map((section) => (
        <Section content={section.title} key={section.id} />
      ))}
    </div>
  );
};

export default SectionList;
