import React from "react";
import ContentDisplay from "../components/ContentDisplay";

// const ContentContainer = content => {
const ContentContainer = ({ news, joke, weather, command }) => {
  let content = [...news, ...joke, ...weather];

  const renderHello = () => {
    content = ["None so far. Issue a command!"];
    return content;
  };

  return (
    <ContentDisplay
      content={command.length ? content : renderHello()}
      // content={content}
      command={command}
    />
  );
};

export default ContentContainer;
