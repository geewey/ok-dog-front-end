import React from "react";
import "./ChatContainer.css";

const formPosStyle = {
  position: "fixed",
  bottom: 10,
  marginBottom: 10,
  backgroundColor: "transparent"
};

const ChatContainer = ({
  conversation,
  handleInput,
  inputValue,
  handleInputValueChange
}) => {
  return (
    <div className="chat-container">
      <div className="chat-bubbles">
        {/* after mapping conversation, call a function to force scroll to the bottom */}
        {conversation.map((ele, idx) => {
          return (
            <p
              key={idx}
              className={ele.byUser ? "chat-bubble" : "ai chat-bubble"}
            >
              <span className="chat-content">{ele.content}</span>
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
            className="send-icon"
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
