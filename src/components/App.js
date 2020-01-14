import React, { useState } from "react";
import "./App.css";
import ContentContainer from "../containers/ContentContainer";
import ChatContainer from "../containers/ChatContainer";
// import { Navbar } from "react-bootstrap";
// import NavbarHeader from "react-bootstrap/lib/NavbarHeader";
import NavbarHeader from "../components/NavbarHeader";

// styling components
const headingStyle = {
  position: "fixed",
  top: 0,
  backgroundColor: "white",
  borderBottom: "1px solid"
};
const listStyle = {
  paddingTop: "60px",
  paddingBottom: "60px"
};

const App = () => {
  // upon initiation, command is empty
  const [command, setCommand] = useState([]);
  const [conversation, setConversation] = useState([]);

  // Store respective fetchContent responses here
  const [news, setNews] = useState([""]);
  const [joke, setJoke] = useState([""]);
  const [weather, setWeather] = useState([""]);

  const [inputValue, setInputValue] = useState("");

  const handleInputValueChange = event => {
    setInputValue(event.target.value);
  };

  const commandMap = {
    news: setNews,
    joke: setJoke,
    weather: setWeather
  };

  const conversationSubmit = response => {
    const conversation = {
      content: []
    };
  };

  // const content = [...news, ...joke, ...weather];

  // Helper method to make "GET" request based on command
  // Sets response to the state
  const fetchContent = command => {
    let url = `http://localhost:3000/${command}`;
    fetch(url)
      .then(resp => resp.json())
      .then(createArray)
      .then(resp => commandMap[command](resp));
  };

  // Flattens the JSON object response into an array
  const createArray = object => {
    let array = [];
    for (const key in object) {
      array.push(object[key]);
    }
    return array;
  };

  const handleInput = (event, inputValue) => {
    event.preventDefault();
    // debugger;
    fetchContent(inputValue);
    setCommand(inputValue);
  };

  return (
    <div>
      <NavbarHeader />
      <ChatContainer
        handleInput={handleInput}
        inputValue={inputValue}
        handleInputValueChange={handleInputValueChange}
      />
      <ContentContainer
        news={news}
        joke={joke}
        weather={weather}
        command={command}
      />
    </div>
  );
};

export default App;
