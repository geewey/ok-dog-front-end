import React from "react";

const formPosStyle = {
  position: "fixed",
  size: "150",
  bottom: 10,
  marginBottom: 10,
  backgroundColor: "white"
};

const ChatContainer = ({ handleInput, inputValue, handleInputValueChange }) => {
  return (
    <div className="chat-container">
      <form
        onSubmit={event => handleInput(event, inputValue)}
        style={formPosStyle}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
          placeholder="Type here to chat!"
        />
      </form>
    </div>
  );
};

export default ChatContainer;
