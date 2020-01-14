import React from "react";
import "./ChatContainer.css";

const formPosStyle = {
  position: "fixed",
  size: "150",
  bottom: 10,
  marginBottom: 10,
  backgroundColor: "white"
};

const ChatContainer = ({
  conversation,
  handleInput,
  inputValue,
  handleInputValueChange
}) => {
  return (
    <div className="chat-container">
      <div>
        {conversation.map((ele, idx) => {
          return (
            <p
              key={idx}
              className={
                ele.byUser
                  ? "user-input chat-bubble"
                  : "chatbot-input chat-bubble"
              }
            >
              {ele.content}
            </p>
          );
        })}
      </div>
      <form
        onSubmit={event => handleInput(event, inputValue)}
        style={formPosStyle}
      >
        <input
          type="text"
          autoFocus={true}
          value={inputValue}
          onChange={handleInputValueChange}
          placeholder="Type here to chat!"
        />
        <button type="submit">
          <img
            alt="Submit"
            style={{ width: "20px", height: "20px" }}
            src="https://static.thenounproject.com/png/326025-200.png"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
