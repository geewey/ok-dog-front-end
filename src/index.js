import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
// import ChatBot from "react-simple-chatbot";

ReactDOM.render(<App />, document.getElementById("root"));

// const steps = [
//   {
//     id: "0",
//     message: "Welcome to react chatbot!",
//     trigger: "1"
//   },
//   {
//     id: "1",
//     message: "I'm alive!",
//     trigger: "2"
//   },
//   {
//     id: "2",
//     message: "What is your name?",
//     trigger: "3"
//   },
//   {
//     id: "3",
//     user: true,
//     trigger: "4"
//   },
//   {
//     id: "4",
//     message: "Hi {previousValue}, nice to meet you!",
//     trigger: "5"
//   },
//   {
//     id: "5",
//     message: "Where are you located? I only understand postcodes...",
//     trigger: "6"
//   },
//   {
//     id: "6",
//     message: "{previousValue} sounds like a great place.",
//     trigger: "end"
//   },
//   {
//     id: "end",
//     message: "Gotta go. Bye bye for now!",
//     end: true
//   }
// ];

// ReactDOM.render(
//   <div>
//     <ChatBot steps={steps} />
//   </div>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
