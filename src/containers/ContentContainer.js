import React from "react";
import ContentDisplay from "../components/ContentDisplay";

// const ContentContainer = content => {
const ContentContainer = ({ news, joke, weather, command }) => {
  let content = [...news, ...joke, ...weather];

  const renderHello = () => {
    content = ["Let's start chatting!"];
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
