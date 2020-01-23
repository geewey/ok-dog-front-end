import React, { useEffect, useRef } from "react";
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
  const conversationEndRef = useRef(null);
  const scrollToBottom = () => {
    conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [conversation]);

  const checkIfURL = message => {
    if (
      message.content &&
      (message.content.startsWith("http") || message.content.startsWith("www"))
    ) {
      return <a href="message.content">See more information here...</a>;
    } else {
      return message.content;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-bubbles-container">
        {conversation.map((message, idx) => {
          return (
            <p
              key={idx}
              className={message.byUser ? "chat-bubble" : "ai chat-bubble"}
            >
              {/* <span className="chat-content">{message.content}</span> */}
              <span className="chat-content">{checkIfURL(message)}</span>
            </p>
          );
        })}
      </div>
      {/* <img
        className="chatbot-avatar"
        src="http://i.imgur.com/6jr3M0j.png"
        alt="chatbot-avatar"
      /> */}
      <div ref={conversationEndRef}></div>
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
