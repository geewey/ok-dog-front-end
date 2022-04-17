import React, { useState } from "react";
import "./App.css";
import ChatContainer from "../containers/ChatContainer";
// import NavBar from "../components/NavBar";
import { Container, Menu } from "semantic-ui-react";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const urlEndpoint = "https://ok-dog-back-end.herokuapp.com";

const App = () => {
  const dogEmoji = () => {
    let array = ["🐕", "🐶", "🐩"];
    return array[Math.floor(Math.random() * 3)];
  };

  const initialMessages = [
    {
      content: "Hi! I am Ok Dog, here to help fetch your tasks. " + dogEmoji(),
      byUser: false
    },
    {
      content:
        "You can ask me for the current weather in a city, top news headlines, or I can also tell you a joke! " +
        dogEmoji(),
      byUser: false
    }
  ];

  // store conversation history into state
  const [conversation, setConversation] = useState(initialMessages);
  // controlled input from ChatContainer.js
  const [inputValue, setInputValue] = useState("");

  const handleInputValueChange = event => {
    // restricts input length to 240 characters or less
    event.target.value.length > 240
      ? alert(
          "Woof! Message length cannot exceed 240 characters. " + dogEmoji()
        )
      : setInputValue(event.target.value);
  };

  const addToConversation = (messageArray, isByUser = true) => {
    const setMessage = async message => {
      let appendToConversation = {
        content: message,
        byUser: isByUser
      };
      await sleep(100);
      setConversation(conversation => [...conversation, appendToConversation]);
    };

    messageArray.forEach(message => setMessage(message));
  };

  // helper method: news object
  const displayNews = news => {
    return `TITLE: ${news.title}. DESCRIPTION: ${news.description}`;
  };

  // helper method: (1) make "GET" request, (2) set state
  // // dynamic: based on "command"
  // // const fetchContent = command => {

  // dynamic: based on Dialogflow or API
  const fetchContent = userInput => {
    // for testing:
    // let url = `http://localhost:3000/dialogflow/${userInput}`;
    // let url = `https://e2e29aca.ngrok.io/dialogflow/${userInput}`;
    
    // default URL is to hit endpoint that makes external API calls
    let url = `${urlEndpoint}/${userInput}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    // joke
    if (userInput === "joke") {
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation([resp.joke], false));
    // news
    } else if (userInput === "news") {
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation([displayNews(resp), resp.url], false));
    // dialogflow
    } else {
      url = `${urlEndpoint}/dialogflow/${userInput}`;
      fetch(url, headers)
        .then(resp => resp.json())
        .then(resp => addToConversation([resp.fulfillmentText], false));
    }
  };

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
        ["Alright, here is a top news headline from BBC! " + dogEmoji()],
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
            🐕
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
