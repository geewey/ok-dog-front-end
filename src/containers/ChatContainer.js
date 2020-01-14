import React from "react";

const ChatContainer = ({ response }) => {
  return (
    <div className="chat-container">
      <button onClick={() => response("news")}>Get the news</button>
      <button onClick={() => response("joke")}>Get a joke</button>
      <button onClick={() => response("weather")}>Get the weather</button>
    </div>
  );
};

export default ChatContainer;
