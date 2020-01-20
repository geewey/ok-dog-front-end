import React from "react";

const ContentDisplay = ({ content }) => {
  return (
    <div className="content-display">
      <div>
        {content.map(item => (
          <p key={Math.random() * 100000}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default ContentDisplay;
