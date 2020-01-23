import React, { useState } from "react";
// import ContentContainer from "../containers/ContentContainer";
import ChatContainer from "../containers/ChatContainer";
import "./App.css";
// import NavBar from "../components/NavBar";
import { Container, Grid, Menu, Image } from "semantic-ui-react";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  // store conversation history into state
  const dogEmoji = () => {
    let array = ["🐕", "🐶", "🐩", "🦴"];
    return array[Math.floor(Math.random() * 4)];
  };

  const initialMessages = [
    {
      content: "Hi! I am Ok Dog, here to help fetch your tasks. " + dogEmoji(),
      byUser: false
    },
    {
      content:
        "You can ask me for the current weather in a city, the top BBC headline at the moment, or I can also tell you a joke! " +
        dogEmoji(),
      byUser: false
    }
  ];
  const [conversation, setConversation] = useState(initialMessages);
  // controlled input from ChatContainer.js
  const [inputValue, setInputValue] = useState("");
  // controlled input from ChatContainer.js
  const handleInputValueChange = event => {
    // restricts input length to 240 characters or less
    event.target.value.length > 240
      ? alert(
          "Message length cannot be greater than 240 characters. " + dogEmoji()
        )
      : setInputValue(event.target.value);
  };

  // const addToConversation = (value, isByUser = true) => {
  //   const appendToConversation = {
  //     content: value,
  //     byUser: isByUser
  //   };
  //   setConversation(conversation => [...conversation, appendToConversation]);
  // };
  const addToConversation = (messageArray, isByUser = true) => {
    messageArray.forEach(message => {
      let appendToConversation = {
        content: message,
        byUser: isByUser
      };
      setConversation(conversation => [...conversation, appendToConversation]);
    });
  };

  // helper method: (1) make "GET" request, (2) set state
  // // dynamic: based on "command"
  // // const fetchContent = command => {

  // dynamic: based on Dialogflow
  const fetchContent = userInput => {
    // const url = `http://localhost:3000/${command}`;
    // let url = `http://localhost:3000/dialogflow/${userInput}`;
    let url = `https://e2e29aca.ngrok.io/dialogflow/${userInput}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    // hacking the Google Dialogflow
    if (userInput === "joke") {
      // url = `http://localhost:3000/${userInput}`;
      url = `https://e2e29aca.ngrok.io/${userInput}`;
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation([resp.joke], false));
    } else if (userInput === "news") {
      // url = `http://localhost:3000/${userInput}`;
      url = `https://e2e29aca.ngrok.io/${userInput}`;
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp =>
          addToConversation([resp.title, resp.description, resp.url], false)
        );
    } else {
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation([resp.fulfillmentText], false));
    }
  };

  // Flattens the JSON object response into an array
  // ContentContainer.js passes array to ContentDisplay.js
  // const createArray = object => {
  //   let array = [];
  //   for (const key in object) {
  //     array.push(object[key]);
  //   }
  //   return array;
  // };

  const handleInput = async (event, userInput) => {
    event.preventDefault();
    if (userInput.length === 0) {
      alert("Message length cannot be empty. " + dogEmoji());
      return;
    }

    addToConversation([inputValue]);
    // reset user input field to empty string ("")
    setInputValue("");
    await sleep(500);

    // evaluate userInput to returns "joke", "weather", or "news"
    let lowerCaseValue = userInput.toLowerCase();
    if (lowerCaseValue.includes("joke")) {
      addToConversation(["Okay, here's a joke! " + dogEmoji()], false);
      fetchContent("joke", false);
      return;
    }
    if (lowerCaseValue.includes("news")) {
      addToConversation(
        ["Alright, here is the top news headline from BBC!" + dogEmoji()],
        false
      );
      fetchContent("news", false);
      return;
    }
    if (lowerCaseValue.includes("help")) {
      addToConversation(
        [
          "Try asking me one of the following: joke, news, or weather! " +
            dogEmoji()
        ],
        false
      );
      return;
    }
    fetchContent(userInput);
  };

  return (
    <React.Fragment>
      <Menu fixed="top" inverted>
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
      <Container text style={{ marginTop: "4em" }}>
        <ChatContainer
          conversation={conversation}
          handleInput={handleInput}
          inputValue={inputValue}
          handleInputValueChange={handleInputValueChange}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
