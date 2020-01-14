import React from "react";

const ContentDisplay = ({ content, command }) => {
  return (
    <div className="content-display">
      <div>Current command: {command}</div>
      <div>
        {content.map(item => (
          <p key={Math.random() * 100000}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default ContentDisplay;
