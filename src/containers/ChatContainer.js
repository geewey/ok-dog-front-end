import React from "react";

const ChatContainer = ({ response }) => {
  return (
    <div>
      <button onClick={() => response("news")}>News</button>
      <button onClick={() => response("joke")}>Joke</button>
      <button onClick={() => response("weather")}>Weather</button>
    </div>
  );
};

export default ChatContainer;
