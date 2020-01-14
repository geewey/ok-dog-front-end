import React, { useState } from "react";
import ContentContainer from "../containers/ContentContainer";
import ChatContainer from "../containers/ChatContainer";
import NavBar from "../components/NavBar";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

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
  const [command, setCommand] = useState("");
  // store respective fetchContent responses from Rails API
  const [news, setNews] = useState([""]);
  const [joke, setJoke] = useState([""]);
  const [weather, setWeather] = useState([""]);
  // controlled input from ChatContainer.js
  const [inputValue, setInputValue] = useState("");
  // store conversation history
  const initialConversation = {
    content: "Hi! Let's start chatting!",
    byUser: false
  };
  const [conversation, setConversation] = useState([initialConversation]);

  // controlled input from ChatContainer.js
  const handleInputValueChange = event => {
    setInputValue(event.target.value);
  };

  const commandMap = {
    news: setNews,
    joke: setJoke,
    weather: setWeather
  };

  // helper method to make "GET" request and set state
  // based on "command"
  const fetchContent = command => {
    const url = `http://localhost:3000/${command}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    fetch(url, headers)
      .then(resp => resp.json())
      .then(createArray)
      .then(resp => commandMap[command](resp));
  };

  // Flattens the JSON object response into an array
  // ContentContainer.js passes array to ContentDisplay.js
  const createArray = object => {
    let array = [];
    for (const key in object) {
      array.push(object[key]);
    }
    return array;
  };

  const addToConversation = inputValue => {
    const appendToConversation = {
      content: inputValue,
      byUser: true
    };

    setConversation([...conversation, appendToConversation]);
  };

  const handleInput = (event, inputValue) => {
    event.preventDefault();

    // evaluate inputValue
    // returns "joke", "weather", or "news"
    let interpretedInputValue = "";
    switch (inputValue) {
      case "joke":
        interpretedInputValue = "joke";
        break;
      case "news":
        interpretedInputValue = "news";
        break;
      case "weather":
        interpretedInputValue = "weather";
        break;
      default:
        interpretedInputValue = "I don't understand, please try again!";
    }
    // if (inputValue.includes("joke")) {
    //   interpretedInputValue = "joke";
    // }

    addToConversation(inputValue);

    fetchContent(interpretedInputValue);
    setCommand(interpretedInputValue);

    // reset chat input field to empty string ("")
    setInputValue("");
  };

  return (
    <div>
      {/* <NavBar /> */}
      <Menu fixed="top" inverted>
        <Menu.Item as="a" header>
          {/* <Image
            size="mini"
            src="../public/okdoge.png"
            alt="okdoge"
            style={{ marginRight: "1.5em" }}
          /> */}
          Ok Dog - Your Virtual Assistant!
        </Menu.Item>
        {/* <Menu.Item as="a">Home</Menu.Item> */}
      </Menu>
      <Container fluid style={{ minHeight: "80vh" }}>
        <Grid
          columns={2}
          stackable
          divided
          relaxed
          style={{ marginTop: "7em", minHeight: "80vh" }}
        >
          <Grid.Column>
            <ChatContainer
              conversation={conversation}
              handleInput={handleInput}
              inputValue={inputValue}
              handleInputValueChange={handleInputValueChange}
            />
          </Grid.Column>
          <Grid.Column>
            <ContentContainer
              news={news}
              joke={joke}
              weather={weather}
              command={command}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
