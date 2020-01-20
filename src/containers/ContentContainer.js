import React from "react";
import ContentDisplay from "../components/ContentDisplay";

const ContentContainer = ({ content, command }) => {
  return (
    <React.Fragment>
      <div>[TESTING] Current command: {command}</div>
      <ContentDisplay content={content} command={command} />
    </React.Fragment>
  );
};

export default ContentContainer;
