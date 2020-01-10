import React from "react";

const ContentContainer = ({ content }) => {
  return (
    <div>
      {content.map(item => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default ContentContainer;
