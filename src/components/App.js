import React, { useState } from "react";
import ContentContainer from "../containers/ContentContainer";
import ChatContainer from "../containers/ChatContainer";
import "./App.css";
// import NavBar from "../components/NavBar";
import { Container, Grid, Menu, Image } from "semantic-ui-react";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  // store conversation history into state
  const initialMessages = [
    {
      content: "Hi! Let's chat!",
      byUser: false
    },
    {
      content:
        "You can ask 'news' for the top current BBC headline, or I can tell you a joke!",
      byUser: false
    }
  ];
  const [conversation, setConversation] = useState(initialMessages);
  // controlled input from ChatContainer.js
  const [inputValue, setInputValue] = useState("");
  // store fetchContent responses from Rails API, based on command
  // const [content, setContent] = useState([]);
  // upon initiation, command is empty
  // const [command, setCommand] = useState("");

  // controlled input from ChatContainer.js
  const handleInputValueChange = event => {
    // restricts input length to 240 characters or less
    event.target.value.length > 240
      ? alert("Message length cannot be greater than 240 characters")
      : setInputValue(event.target.value);
  };

  const addToConversation = (value, isByUser = true) => {
    const appendToConversation = {
      content: value,
      byUser: isByUser
    };
    setConversation(conversation => [...conversation, appendToConversation]);
  };

  // helper method: (1) make "GET" request, (2) set state
  // // dynamic: based on "command"
  // // const fetchContent = command => {

  // dynamic: based on Dialogflow
  const fetchContent = userInput => {
    // const url = `http://localhost:3000/${command}`;
    let url = `http://localhost:3000/dialogflow/${userInput}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    // hacking the Google Dialogflow
    if (userInput === "joke") {
      url = `http://localhost:3000/${userInput}`;
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation(resp.joke, false));
    } else if (userInput === "news") {
      url = `http://localhost:3000/${userInput}`;
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation(resp.description, false));
    } else {
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation(resp.dialogflow_response, false));
    }
    // .then(createArray)
    // .then(resp => setContent(resp));
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

  const handleInput = async (event, userInput) => {
    event.preventDefault();
    addToConversation(inputValue);
    await sleep(500);

    // evaluate userInput, returns "joke", "weather", or "news"
    let lowerCaseValue = userInput.toLowerCase();
    let interpretedUserInput = "";
    // reset user input field to empty string ("")
    setInputValue("");
    if (lowerCaseValue.includes("joke")) {
      addToConversation("Okay, here's a joke!", false);
      fetchContent("joke", false);
      return;
    }
    if (lowerCaseValue.includes("news")) {
      addToConversation(
        "Alright, here's the top news headline from BBC.",
        false
      );
      fetchContent("news", false);
      return;
    }
    // } else if (lowerCaseValue.includes("news")) {
    //   interpretedUserInput = "news";
    //   addToConversation("Alright, here's the top news headline.", false);
    // } else if (lowerCaseValue.includes("weather")) {
    //   interpretedUserInput = "weather";
    //   addToConversation("Sure thing, here's the current forecast.", false);
    // } else {
    //   interpretedUserInput = "error";
    //   addToConversation("I don't understand, please try again!", false);
    // }

    // fetchContent(interpretedUserInput);
    fetchContent(userInput);
    // setCommand(interpretedUserInput);
  };

  return (
    <React.Fragment>
      <Menu fixed="top" inverted>
        {/* <Menu inverted> */}
        <Menu.Item as="a" header>
          {/* <Image src={logo} alt="okdoge" style={{ marginRight: "1.5em" }} /> */}
          {/* <img src={logo} alt="okdoge" /> */}
          <span role="img" aria-labelledby="ok-doge">
            🦴
          </span>
          Ok Dog - Your Virtual Assistant!
        </Menu.Item>
        {/* <Menu.Item as="a">Home</Menu.Item> */}
      </Menu>
      <Container
        // fluid
        // style={{ paddingTop: "10px", minHeight: "70vh" }}
        text
        style={{ marginTop: "4em" }}
        // style={{ marginTop: "4em", backgroundColor: "white" }}
      >
        {/* <Grid
          columns={1}
          // stackable
          // divided
          relaxed
          // style={{ marginTop: "7em", minHeight: "70vh" }}
          style={{ minHeight: "70vh" }}
        >
          <Grid.Column> */}
        <ChatContainer
          conversation={conversation}
          handleInput={handleInput}
          inputValue={inputValue}
          handleInputValueChange={handleInputValueChange}
        />
        {/* </Grid.Column> */}
        {/* <Grid.Column> */}
        {/* <ContentContainer content={content} command={command} /> */}
        {/* <ContentContainer content={content} /> */}
        {/* </Grid.Column> */}
        {/* </Grid> */}
      </Container>
    </React.Fragment>
  );
};

export default App;
