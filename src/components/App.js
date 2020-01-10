import React, { useState, useEffect } from "react";
import "./App.css";
import ContentContainer from "../containers/ContentContainer";
import ChatContainer from "../containers/ChatContainer";

const App = () => {
  const [command, setCommand] = useState([]);
  const [news, setNews] = useState([]);
  const [joke, setJoke] = useState([]);
  const [weather, setWeather] = useState([]);

  const commandMap = {
    news: setNews,
    joke: setJoke,
    weather: setWeather
  };

  // Helper method to make "GET" request based on command
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

  const displayContent = command => {
    switch (command) {
      case news:
        return news;
      case joke:
        return joke;
      case weather:
        return weather;
      default:
        return ["Enter a command!"];
    }
  };

  const handleResponse = command => {
    fetchContent(command);
    setCommand(command);
  };

  return (
    <div>
      <ChatContainer response={handleResponse} />
      <ContentContainer content={displayContent(command)} />
    </div>
  );
};

export default App;
