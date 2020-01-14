import React, { useState } from "react";
import "./App.css";
import ContentContainer from "../containers/ContentContainer";
import ChatContainer from "../containers/ChatContainer";
// import { Navbar } from "react-bootstrap";
// import NavbarHeader from "react-bootstrap/lib/NavbarHeader";
import NavbarHeader from "../components/NavbarHeader";

const App = () => {
  // initially there is no command
  const [command, setCommand] = useState([]);

  // Store respective fetchContent responses here
  const [news, setNews] = useState([""]);
  const [joke, setJoke] = useState([""]);
  const [weather, setWeather] = useState([""]);

  const commandMap = {
    news: setNews,
    joke: setJoke,
    weather: setWeather
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

  const handleResponse = command => {
    fetchContent(command);
    setCommand(command);
  };

  return (
    <div>
      <NavbarHeader />
      <ChatContainer response={handleResponse} />
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
